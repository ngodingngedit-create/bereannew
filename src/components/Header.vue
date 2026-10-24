<template>
  <!-- Backdrop: blokir scroll & sentuhan halaman selama panel search terbuka -->
  <div v-if="isSearchOpen" class="search-overlay" @click="closeSearch" aria-hidden="true"></div>
  <header class="site-header">
    <div class="header-container">
      <!-- Left: Logo -->
      <div class="logo">
        <img src="/logo/logo.webp" alt="Logo" class="logo-img" />

      </div>

      <!-- Center: Menu -->
      <nav class="main-nav mobile-hidden">
        <ul>
          <li><a href="#" class="nav-item" :class="{ active: activeSection === 'home' }" @click.prevent="navigateToSection('home')">{{ getMenuLabel('home') }}</a></li>
          <li><a href="#" class="nav-item" :class="{ active: activeSection === 'product' }" @click.prevent="navigateToSection('product')">{{ getMenuLabel('product') }}</a></li>
        </ul>
      </nav>

      <!-- Right: Action Icons -->
      <div class="header-actions">
        <!-- Search Icon (hidden on product page) -->
        <button v-if="currentPage !== 'product'" class="action-btn mobile-hidden" @click="handleSearchClick" :class="{ 'search-active': isSearchOpen }" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <!-- Language Switcher Dropdown (Accordion-style dropdown) -->
        <div class="lang-switcher-container mobile-hidden">
          <button class="action-btn lang-btn" @click="toggleLangDropdown" aria-label="Select Language">
            <span v-html="currentLangObj.flagSvg" class="current-flag"></span>
            <span class="lang-code">{{ currentLangObj.code.toUpperCase() }}</span>
            <svg class="chevron-icon" :class="{ 'rotate': isLangDropdownOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <Transition name="lang-accordion">
            <div v-if="isLangDropdownOpen" class="lang-dropdown-card">
              <div class="lang-options-list">
                <button 
                  v-for="lang in languages" 
                  :key="lang.code" 
                  class="lang-option-item" 
                  :class="{ 'active': currentLang === lang.code }"
                  @click="selectLanguage(lang.code)"
                >
                  <span class="flag-wrapper" v-html="lang.flagSvg"></span>
                  <span class="lang-name">{{ lang.name }}</span>
                  <svg v-if="currentLang === lang.code" class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Cart Icon -->
        <button class="action-btn cart-btn" @click="openCart" aria-label="Shopping Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="cart-badge">{{ totalItems }}</span>
        </button>

        <!-- Profile Icon (Placed on the far right) -->
        <div class="profile-switcher-container mobile-hidden" style="position: relative;">
          <button class="action-btn" :class="{ 'profile-active': currentPage === 'profile' || currentPage === 'dashboard-user' }" aria-label="Profile" @click="handleProfileClick">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          <Transition name="lang-accordion">
            <div v-if="isProfileDropdownOpen" class="lang-dropdown-card" style="width: 220px; right: 0;">
              <div class="lang-options-list">
                <button v-if="isUserCreator" class="lang-option-item" @click="switchToCreatorProfile">
                  <span class="flag-wrapper" style="border: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </span>
                  <span class="lang-name">{{ currentLang === 'id' ? 'Beralih ke Profil Creator' : 'Switch to Creator Profile' }}</span>
                </button>
                <button class="lang-option-item" @click="handleLogout" style="color: #D32F2F;">
                  <span class="flag-wrapper" style="border: none; color: #D32F2F;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>
                  <span class="lang-name">{{ currentLang === 'id' ? 'Keluar' : 'Logout' }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Mobile Hamburger Menu Icon -->
        <button class="action-btn hamburger-btn" @click="isMobileMenuOpen = true" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar Drawer -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-sidebar-overlay" @click="isMobileMenuOpen = false"></div>
    </Transition>
    
    <Transition name="slide-right">
      <div v-if="isMobileMenuOpen" class="mobile-sidebar">
        <div class="mobile-sidebar-header">
          <span class="logo-text">Berean.id</span>
          <button class="close-sidebar-btn" @click="isMobileMenuOpen = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="mobile-sidebar-content">
          <ul class="mobile-nav-list">
            <li><a href="#" :class="{ active: activeSection === 'home' }" @click.prevent="navigateToSection('home'); isMobileMenuOpen = false;">{{ getMenuLabel('home') }}</a></li>
            <li><a href="#" :class="{ active: activeSection === 'product' }" @click.prevent="navigateToSection('product'); isMobileMenuOpen = false;">{{ getMenuLabel('product') }}</a></li>
          </ul>
          
          <div class="mobile-sidebar-actions">
            <!-- Language Selection -->
            <div class="mobile-lang-section">
              <h4>{{ currentLang === 'id' ? 'Bahasa' : 'Language' }}</h4>
              <div class="mobile-lang-options">
                <button 
                  v-for="lang in languages" 
                  :key="lang.code"
                  class="mobile-lang-btn"
                  :class="{ active: currentLang === lang.code }"
                  @click="selectLanguage(lang.code)"
                >
                  <span v-html="lang.flagSvg" class="flag-wrapper"></span>
                  {{ lang.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Functional Slide-down Search Bar with suggestions panel -->
    <Transition name="search-slide">
      <div v-if="isSearchOpen" class="search-bar-dropdown">
        <div class="search-panel">
          <!-- Input row -->
          <div class="search-input-row">
            <div class="shop-search-bar">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                :placeholder="currentLang === 'id' ? 'Cari merchandise favoritmu...' : 'Search your favorite merch...'"
                class="shop-search-input"
                @keyup.enter="handleSearchEnter"
              />
              <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <button type="button" class="search-submit-btn" @click="handleSearchEnter" aria-label="Cari">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="search-submit-label">{{ currentLang === 'id' ? 'Cari' : 'Search' }}</span>
            </button>
          </div>

          <!-- Suggestions -->
          <div class="search-suggestion-body">
            <h4 class="suggestion-heading">{{ currentLang === 'id' ? 'Banyak Dicari' : 'Most Searched' }}</h4>
            <div class="suggestion-chips">
              <button
                v-for="term in popularSearches"
                :key="term"
                type="button"
                class="suggestion-chip"
                @click="applySuggestion(term)"
              >
                <svg class="chip-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>{{ term }}</span>
              </button>
            </div>

            <h4 class="suggestion-heading">{{ currentLang === 'id' ? 'Produk Populer' : 'Popular Products' }}</h4>
            <div v-if="suggestionProducts.length" class="suggestion-products">
              <div
                v-for="p in suggestionProducts"
                :key="p.id"
                class="product-card"
                @click="selectSuggestionProduct(p)"
              >
                <div class="product-image-container">
                  <div class="badges-container">
                    <div v-if="p.is_promo || discountPercent(p) > 0" class="status-badge status-promo">
                      {{ p.promo_title || 'PROMO' }}
                    </div>
                    <div v-if="p.is_preorder" class="status-badge">PRE-ORDER</div>
                  </div>
                  <div v-if="discountPercent(p) > 0" class="discount-badge">-{{ discountPercent(p) }}%</div>
                  <img :src="p.image" :alt="p.title" class="product-image primary-img" />
                  <img v-if="p.thumbnails && p.thumbnails[1]" :src="p.thumbnails[1]" :alt="p.title + ' hover'" class="product-image secondary-img" />
                  <div class="product-card-shine" aria-hidden="true"></div>
                </div>

                <div class="product-info">
                  <h3 class="product-title">{{ p.title }}</h3>
                  <div class="product-price-row">
                    <template v-if="discountPercent(p) > 0">
                      <span class="product-price is-discount">{{ formatPrice(discountedPrice(p)) }}</span>
                      <span class="product-original-price">{{ formatPrice(p.original_price || p.price) }}</span>
                    </template>
                    <template v-else>
                      <span class="product-price">{{ formatPrice(p.price || p.original_price) }}</span>
                    </template>
                  </div>
                  <div v-if="p.rating" class="product-meta">
                    <span class="meta-rating">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                      {{ p.rating.toFixed(1) }}
                    </span>
                    <span class="meta-dot">•</span>
                    <span>{{ formatSold(p.total_sold) }} Sold</span>
                  </div>
                  <div v-if="p.store_name" class="product-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span class="product-location-text">{{ p.store_name }}</span>
                  </div>
                </div>

                <div class="card-divider"></div>

                <div class="card-creator-section" @click.stop="goToCreator(p)">
                  <div class="creator-avatar-wrapper">
                    <img :src="p.creator?.image_url || '/logo/logo.webp'" :alt="p.creator?.name" class="creator-avatar" />
                  </div>
                  <div class="creator-info">
                    <span class="creator-label">Provided by</span>
                    <div class="creator-name-wrapper">
                      <span class="creator-name">{{ p.creator?.name || 'Loading...' }}</span>
                      <svg v-if="p.creator?.is_verified == 1" width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" stroke="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="suggestion-empty">
              {{ currentLang === 'id' ? 'Memuat produk...' : 'Loading products...' }}
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Sleek Toast message -->
    <div class="toast" :class="{ 'active': toastActive }">
      {{ toastMessage }}
    </div>

  </header>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { isCartOpen, totalItems, searchQuery, currentLang, currentPage, isSearchOpen, isMobileMenuOpen, triggerProfile, isLoggedIn, openProduct, activeCreatorSlug, DEFAULT_PICKUP_CARD_LABEL } from '../store/cart.js';

const isLangDropdownOpen = ref(false);
const searchInput = ref(null);

const activeSection = ref('home');

// Scroll observer removed with the collections section — home nav stays active on the homepage.
const updateActiveSectionOnScroll = () => {
  if (currentPage.value === 'shop' || currentPage.value === 'checkout' || currentPage.value === 'payment') {
    if (activeSection.value !== 'product') activeSection.value = 'shop';
    return;
  }
  if (currentPage.value !== 'home') {
    activeSection.value = '';
    return;
  }
  activeSection.value = 'home';
};

// Handle navigation clicks dynamically
const navigateToSection = (section) => {
  if (section === 'shop') {
    currentPage.value = 'shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeSection.value = 'shop';
  } else if (section === 'product') {
    currentPage.value = 'shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeSection.value = 'product';
  } else if (section === 'event') {
    currentPage.value = 'event';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeSection.value = 'event';
  } else if (section === 'home') {
    if (currentPage.value !== 'home') {
      currentPage.value = 'home';
      nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    activeSection.value = 'home';
  } else if (section === 'about' || section === 'faq') {
    const scrollToFooter = () => {
      const footerEl = document.querySelector('.site-footer');
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      }
    };
    if (currentPage.value !== 'home') {
      currentPage.value = 'home';
      setTimeout(scrollToFooter, 150);
    } else {
      scrollToFooter();
    }
    activeSection.value = section;
  }
};

watch(currentPage, (val) => {
  if (val === 'shop' || val === 'checkout' || val === 'payment') {
    if (activeSection.value !== 'product') activeSection.value = 'shop';
  } else if (val === 'event' || val === 'event-detail' || val === 'event-checkout') {
    activeSection.value = 'event';
  } else if (val === 'home') {
    // Check scroll after state transition
    nextTick(() => {
      updateActiveSectionOnScroll();
    });
  } else {
    activeSection.value = '';
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });
  // Initial check
  updateActiveSectionOnScroll();
  fetchSearchProducts();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSectionOnScroll);
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
});

watch(triggerProfile, (newVal) => {
  if (newVal) {
    openProfileToast();
    triggerProfile.value = false;
  }
});

const toastActive = ref(false);
const toastMessage = ref('');

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (isSearchOpen.value) {
    isLangDropdownOpen.value = false;
    nextTick(() => {
      if (searchInput.value) searchInput.value.focus();
    });
  }
};

const handleSearchClick = () => {
  if (currentPage.value === 'home') {
    toggleSearch();
  } else {
    currentPage.value = 'shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleSearchEnter = () => {
  if (searchQuery.value.trim() !== '') {
    currentPage.value = 'shop';
    isSearchOpen.value = false;
  }
};

// ===== Search suggestions: most-searched chips + popular product cards =====
const suggestionProducts = ref([]);

const popularSearches = computed(() => {
  const terms = {
    id: ['Kaos Oversize', 'Hoodie', 'Tote Bag', 'Topi', 'Jaket', 'Sticker Pack'],
    en: ['Oversize Tee', 'Hoodie', 'Tote Bag', 'Cap', 'Jacket', 'Sticker Pack'],
  };
  return terms[currentLang.value] || terms.id;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('Rp', 'Rp ');
};

const formatSold = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}rb+`;
  return `${n || 0}+`;
};

const discountPercent = (p) => {
  const base = Number(p?.original_price || p?.price) || 0;
  const discPrice = Number(p?.promo_price) || 0;
  if (base && discPrice && discPrice < base) {
    return Math.round(((base - discPrice) / base) * 100);
  }
  const d = Number(p?.discount) || 0;
  if (d > 0 && d <= 100 && base) return Math.round(d);
  return 0;
};

const discountedPrice = (p) => {
  const discPrice = Number(p?.promo_price) || 0;
  const base = Number(p?.original_price || p?.price) || 0;
  if (base && discPrice && discPrice < base) return discPrice;
  const d = Number(p?.discount) || 0;
  if (d > 0 && d <= 100 && base) return Math.round(base * (1 - d / 100));
  return base;
};

const fetchSearchProducts = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/creator-maping-product/berean.id?page=1`);
    const json = await response.json();
    const data = Array.isArray(json.products?.data) ? json.products.data : [];
    const affiliate = json.affiliate_creators?.[0] || null;

    suggestionProducts.value = data
      .filter(p => p.product_status_id == 2)
      .slice(0, 12)
      .map(p => {
        const varians = p.varians || p.product_varian;
        let price = parseInt(p.price);
        if (price === 0 && varians && varians.length > 0) price = parseInt(varians[0].price);
        const images = p.images || p.product_image;
        return {
          id: p.id,
          slug: p.slug,
          title: p.product_name,
          price,
          original_price: price,
          promo_price: p.promo_price ? parseInt(p.promo_price) : null,
          discount: p.discount,
          is_promo: p.is_promo == 1,
          promo_title: p.promo_title || 'PROMO',
          is_preorder: p.is_preorder == 1,
          image: images?.[0]?.image_url || '/slider/slider1.png',
          thumbnails: (images && images.length > 0) ? images.map(img => img.image_url) : ['/slider/slider1.png'],
          colors: ['cream'],
          rating: p.average_star ? parseFloat(String(p.average_star).replace(',', '.')) : null,
          total_sold: p.total_sold || 0,
          store_name: DEFAULT_PICKUP_CARD_LABEL,
          creator: {
            slug: p.creator?.slug_url || p.creator?.slug || affiliate?.slug_url || affiliate?.slug,
            name: p.creator?.name || affiliate?.name || 'bereanid',
            is_verified: p.creator?.is_verified ?? (affiliate ? 1 : undefined),
            image_url: p.creator?.image_url || affiliate?.image_url || '/logo/logo.webp',
            creator_title: affiliate?.creator_title || 'Official Store',
          },
        };
      });
  } catch (error) {
    console.error('Failed to fetch search suggestions:', error);
  }
};

const applySuggestion = (term) => {
  searchQuery.value = term;
  currentPage.value = 'shop';
  isSearchOpen.value = false;
};

const selectSuggestionProduct = (product) => {
  openProduct(product);
  isSearchOpen.value = false;
};

const goToCreator = (product) => {
  if (product?.creator?.slug) activeCreatorSlug.value = product.creator.slug;
  isSearchOpen.value = false;
  currentPage.value = 'creator';
};

const closeSearch = () => {
  isSearchOpen.value = false;
};

// Kunci scroll halaman selama panel search terbuka
watch(isSearchOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
  document.documentElement.style.overflow = open ? 'hidden' : '';
});

// Tutup panel search saat halaman berganti (agar kunci scroll tidak tersangkut)
watch(currentPage, () => {
  isSearchOpen.value = false;
});

const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
  if (isLangDropdownOpen.value) {
    isSearchOpen.value = false;
  }
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2000);
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const isProfileDropdownOpen = ref(false);

const isUserCreator = computed(() => {
  return localStorage.getItem('is_creator') === 'true';
});

const handleProfileClick = () => {
  if (isLoggedIn.value) {
    if (currentPage.value === 'dashboard-user') {
      isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
      isLangDropdownOpen.value = false;
      isSearchOpen.value = false;
    } else {
      currentPage.value = 'dashboard-user';
      isProfileDropdownOpen.value = false;
    }
  } else {
    currentPage.value = 'login';
  }
};

const openProfileToast = handleProfileClick;

const switchToCreatorProfile = () => {
  currentPage.value = 'profile';
  isProfileDropdownOpen.value = false;
};

const handleLogout = () => {
  isProfileDropdownOpen.value = false;
  triggerToast(currentLang.value === 'id' ? 'Berhasil keluar. Mengarahkan...' : 'Logout successful. Redirecting...');
  isLoggedIn.value = false;
  localStorage.removeItem('token');
  setTimeout(() => {
    currentPage.value = 'home';
  }, 1200);
};

const openCart = () => {
  isCartOpen.value = true;
};

// Flags definition
const languages = [
  {
    code: 'id',
    name: 'Indonesia',
    flagSvg: `<svg class="flag-svg" viewBox="0 0 30 30" width="16" height="16" style="display: block;">
      <clipPath id="circle-clip-id"><circle cx="15" cy="15" r="15" /></clipPath>
      <g clip-path="url(#circle-clip-id)">
        <rect width="30" height="15" fill="#C8102E"/>
        <rect y="15" width="30" height="15" fill="#fff"/>
      </g>
    </svg>`
  },
  {
    code: 'en',
    name: 'English',
    flagSvg: `<svg class="flag-svg" viewBox="0 0 60 30" width="16" height="16" style="display: block;">
      <clipPath id="circle-clip-en"><circle cx="30" cy="15" r="15" /></clipPath>
      <g clip-path="url(#circle-clip-en)">
        <rect width="60" height="30" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" stroke-width="10"/>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" stroke-width="6"/>
      </g>
    </svg>`
  }
];

const currentLangObj = computed(() => {
  return languages.find(lang => lang.code === currentLang.value) || languages[0];
});

const selectLanguage = (code) => {
  currentLang.value = code;
  isLangDropdownOpen.value = false;
  const msg = code === 'id' 
    ? 'Bahasa diubah ke Indonesia' 
    : 'Language changed to English';
  triggerToast(msg);
};

// Simple translations dictionary for header
const menuTranslations = {
  id: {
    home: 'Beranda',
    shop: 'Merchandise',
    product: 'Product',
    collections: 'Koleksi',
    event: 'Event',
    about: 'Tentang',
    faq: 'FAQ'
  },
  en: {
    home: 'Home',
    shop: 'Merchandise',
    product: 'Product',
    collections: 'Collections',
    event: 'Event',
    about: 'About',
    faq: 'FAQ'
  }
};

const getMenuLabel = (key) => {
  return menuTranslations[currentLang.value]?.[key] || menuTranslations.id[key];
};
</script>

<style scoped>
.site-header {
  width: 100%;
  background-color: var(--color-bg-light);
  border-bottom: 1px solid rgba(59, 35, 20, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  margin-right: 1rem;
}

.main-nav ul {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;
}

.main-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-item {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-mocca-dark);
  opacity: 0.85;
  padding: 0.25rem 0;
  position: relative;
  letter-spacing: 0.02em;
  transition: opacity 0.25s ease;
}

.nav-item:hover {
  opacity: 1;
}

.nav-item.active {
  opacity: 1;
  font-weight: 600;
}

/* Elegant premium sliding underline */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-mocca-dark);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-item:hover::after,
.nav-item.active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  color: var(--color-mocca-dark);
  opacity: 0.85;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.25rem;
  transition: var(--transition-smooth);
  background: none;
  border: none;
  cursor: pointer;
}

.action-btn:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.action-btn.search-active,
.action-btn.profile-active {
  color: var(--color-mocca-dark);
  opacity: 1;
  transform: scale(1.05);
}

.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -6px;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-size: 0.65rem;
  font-family: var(--font-body);
  font-weight: 600;
  min-width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
}

/* Search bar slidedown styling */
.search-bar-dropdown {
  background-color: var(--color-bg-light);
  border-top: 1px solid var(--color-mocca-border);
  padding: 0.85rem 3rem;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.search-panel {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  border: 1px solid var(--color-mocca-border);
  border-radius: 14px;
  background-color: var(--color-bg-light);
  padding: 1rem 1.15rem 1.35rem;
  box-shadow: 0 12px 30px rgba(47, 78, 62, 0.06);
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.15rem;
}

.shop-search-bar {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--color-mocca-dark);
}

.shop-search-input {
  width: 100%;
  padding: 0.85rem 3rem 0.85rem 3.5rem;
  border: 1.5px solid var(--color-mocca-dark);
  border-radius: 25px;
  background-color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: var(--transition-smooth);
}

.shop-search-input:focus {
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.08);
}

.search-submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 25px;
  padding: 0.85rem 1.75rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.search-submit-btn:hover {
  filter: brightness(0.92);
}

.clear-search-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-mocca-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  transition: var(--transition-smooth);
}

.clear-search-btn:hover {
  color: var(--color-mocca-dark);
}

/* Suggestions: headings, chips, product cards */
.suggestion-heading {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0 0 0.75rem;
}

.suggestion-heading + .suggestion-heading {
  margin-top: 1.25rem;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.35rem;
}

.suggestion-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.suggestion-chip:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
}

.chip-search-icon {
  flex-shrink: 0;
}

/* ===== Backdrop: blokir scroll/sentuhan halaman selama panel search terbuka ===== */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: rgba(47, 78, 62, 0.28);
  backdrop-filter: blur(2px);
  touch-action: none;
  overscroll-behavior: contain;
}

/* ===== Product populer: scroll horizontal (desktop) ===== */
.suggestion-products {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.75rem;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: rgba(47, 78, 62, 0.25) transparent;
}

.suggestion-products::-webkit-scrollbar {
  height: 6px;
}

.suggestion-products::-webkit-scrollbar-thumb {
  background: rgba(47, 78, 62, 0.25);
  border-radius: 999px;
}

.suggestion-products::-webkit-scrollbar-track {
  background: transparent;
}

/* ===== Card produk: identik dengan .product-card ShopSection ===== */
.product-card {
  background: none;
  border: none;
  overflow: visible;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  height: auto;
  cursor: pointer;
  min-width: 0;
  flex: 0 0 190px;
  scroll-snap-align: start;
}

.product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-card-shine {
  position: absolute;
  top: -10%;
  bottom: -10%;
  left: 0;
  width: 55%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 255, 255, 0.25) 35%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.25) 65%,
    transparent 100%
  );
  transform: translateX(-180%) skewX(-12deg);
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
  pointer-events: none;
}

.product-card:hover .product-card-shine {
  transform: translateX(280%) skewX(-12deg);
}

.product-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.product-image.secondary-img {
  opacity: 0;
}

.badges-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 3;
  align-items: flex-start;
}

.status-badge {
  background-color: #111;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem 0.3rem 0.6rem;
  border-radius: 0 0 8px 0;
}

.status-promo {
  background-color: #c94b4b;
}

.discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  background-color: #d32f2f;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(211, 47, 47, 0.35);
}

.product-info {
  padding: 0.35rem 0.25rem 0.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.1rem;
}

.product-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  line-height: 1.25;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  margin-top: 0.05rem;
}

.product-price {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
  margin: 0;
}

.product-price.is-discount {
  color: #d32f2f;
}

.product-original-price {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 400;
  color: #9a9a9a;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-top: 0.15rem;
}

.meta-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: #111;
  font-weight: 600;
}

.meta-rating svg {
  width: 13px;
  height: 13px;
  color: #f5a524;
}

.meta-dot {
  opacity: 0.5;
}

.product-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-top: 0.1rem;
  min-width: 0;
  overflow: hidden;
}

.product-location svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.product-location-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.card-divider {
  height: 1px;
  width: 100%;
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
  background-color: transparent;
  margin: 0.15rem 0 0;
}

.card-creator-section {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.25rem 0;
  background-color: transparent;
}

.creator-avatar-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.creator-info {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  min-width: 0;
}

.creator-label {
  font-family: var(--font-body);
  font-size: 0.55rem;
  color: var(--color-mocca-muted);
}

.creator-name-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.creator-name {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .product-image {
    transform: scale(1.06);
  }
  .product-card:hover .product-image.primary-img {
    opacity: 0;
  }
  .product-card:hover .product-image.secondary-img {
    opacity: 1;
  }
}

.suggestion-empty {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  margin: 0;
}

/* Transitions */
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-slide-enter-from,
.search-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Language Switcher Container & Dropdown */
.lang-switcher-container {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  border: 1px solid rgba(59, 35, 20, 0.15);
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  background-color: rgba(250, 246, 240, 0.5);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.lang-btn:hover {
  background-color: #FAF6F0;
  border-color: rgba(59, 35, 20, 0.25);
  transform: none;
}

.current-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(59, 35, 20, 0.1);
}

.lang-code {
  letter-spacing: 0.05em;
}

.chevron-icon {
  transition: transform 0.3s ease;
  color: var(--color-mocca-muted);
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.lang-dropdown-card {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  box-shadow: var(--shadow-premium);
  width: 160px;
  z-index: 1010;
  overflow: hidden;
  transform-origin: top right;
}

.lang-options-list {
  display: flex;
  flex-direction: column;
}

.lang-option-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  text-align: left;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.lang-option-item:hover {
  background-color: #FAF6F0;
}

.lang-option-item.active {
  font-weight: 600;
  background-color: rgba(250, 246, 240, 0.8);
}

.flag-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(59, 35, 20, 0.1);
}

.check-icon {
  margin-left: auto;
  color: #c88d55; /* Cozy Berean.id accent */
}

/* Accordion Transition */
.lang-accordion-enter-active,
.lang-accordion-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.lang-accordion-enter-from,
.lang-accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* Toast Notification Styling */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  padding: 0.85rem 1.75rem;
  border-radius: 30px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 8px 30px rgba(59, 35, 20, 0.2);
  z-index: 2000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}

.toast.active {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .header-container {
      padding: 1rem 3rem;
  }
  .main-nav ul {
    gap: 1.75rem;
  }
  .search-bar-dropdown {
    padding: 0.85rem 2rem;
  }
  .product-card {
    flex: 0 0 170px;
  }
}

.hamburger-btn {
  display: none;
}

/* Mobile Sidebar Styling */
.mobile-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(59, 35, 20, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 85vw;
  max-width: 320px;
  height: 100vh;
  background-color: var(--color-bg-light);
  box-shadow: -4px 0 24px rgba(59, 35, 20, 0.1);
  z-index: 2001;
  display: flex;
  flex-direction: column;
}

.mobile-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(59, 35, 20, 0.05);
}

.close-sidebar-btn {
  background: none;
  border: none;
  color: var(--color-mocca-dark);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-sidebar-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-nav-list a {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  text-decoration: none;
  opacity: 0.8;
}

.mobile-nav-list a.active {
  opacity: 1;
  font-weight: 600;
}

.mobile-sidebar-actions {
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(59, 35, 20, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-lang-section h4 {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.mobile-lang-options {
  display: flex;
  gap: 1rem;
}

.mobile-lang-btn {
  background: transparent;
  border: 1px solid rgba(59, 35, 20, 0.15);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.mobile-lang-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
}

.mobile-cart-full-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
}

.mobile-cart-badge {
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  border-radius: 50%;
  padding: 0.1rem 0.5rem;
  font-size: 0.75rem;
}

/* Sidebar Animations */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  
  .header-container {
      padding: 0.5rem 1.25rem;
  }
  
  .mobile-hidden {
    display: none !important;
  }
  
  .hamburger-btn {
    display: flex;
  }
  
  .logo-img {
      height: 48px;
      width: auto;
  }
  
  .logo-text {
    font-size: 1.75rem; /* Smaller logo on mobile */
  }
  
  .search-bar-dropdown {
    padding: 0.75rem 0.85rem;
    max-height: calc(100vh - 60px);
  }

  .search-panel {
    border-radius: 12px;
    padding: 0.85rem;
  }

  .search-input-row {
    gap: 0.5rem;
    margin-bottom: 0.9rem;
  }

  .shop-search-input {
    padding: 0.7rem 2.5rem 0.7rem 2.75rem;
    font-size: 0.88rem;
  }

  .search-icon {
    left: 1rem;
    width: 18px;
    height: 18px;
  }

  .search-submit-btn {
    width: 46px;
    height: 46px;
    padding: 0;
    border-radius: 50%;
  }

  .search-submit-label {
    display: none;
  }

  .suggestion-heading {
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
  }

  .suggestion-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0.5rem;
    padding-bottom: 0.35rem;
    margin-bottom: 1.1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .suggestion-chips::-webkit-scrollbar {
    display: none;
  }

  .suggestion-chip {
    font-size: 0.78rem;
    padding: 0.5rem 0.95rem;
    flex-shrink: 0;
  }

  /* Mobile: produk populer scroll vertikal (2 kolom, rapi) */
  .suggestion-products {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 46vh;
    gap: 0.9rem;
    padding-right: 0.25rem;
    padding-bottom: 0.5rem;
    scroll-snap-type: none;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  .product-card {
    flex: 0 0 auto;
    width: 100%;
  }
  
  .header-actions {
    gap: 0.5rem; /* Reduce gap on mobile */
  }
  
  .search-btn {
    display: none !important;
  }
}
</style>
