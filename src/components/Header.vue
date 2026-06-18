<template>
  <header class="site-header">
    <div class="header-container">
      <!-- Left: Logo -->
      <div class="logo">
        <img src="/berean-black.png" alt="Logo" class="logo-img" />

      </div>

      <!-- Center: Menu -->
      <nav class="main-nav mobile-hidden">
        <ul>
          <li><a href="#" class="nav-item" :class="{ active: activeSection === 'home' }" @click.prevent="navigateToSection('home')">{{ getMenuLabel('home') }}</a></li>
          <li><a href="#" class="nav-item" :class="{ active: activeSection === 'collections' }" @click.prevent="navigateToSection('collections')">{{ getMenuLabel('collections') }}</a></li>
          <li v-if="false"><a href="#" class="nav-item" :class="{ active: activeSection === 'event' }" @click.prevent="navigateToSection('event')">{{ getMenuLabel('event') }}</a></li>
          <li><a href="#" class="nav-item" :class="{ active: activeSection === 'product' }" @click.prevent="navigateToSection('product')">{{ getMenuLabel('product') }}</a></li>
          <li><a href="#" class="nav-item" :class="{ active: activeSection === 'shop' }" @click.prevent="navigateToSection('shop')">{{ getMenuLabel('shop') }}</a></li>
        </ul>
      </nav>

      <!-- Right: Action Icons -->
      <div class="header-actions">
        <!-- Search Icon (Hidden on Shop Page since it has its own search bar, and hidden on mobile) -->
        <button v-if="currentPage !== 'shop'" class="action-btn mobile-hidden" @click="toggleSearch" :class="{ 'search-active': isSearchOpen }" aria-label="Search">
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
            <li><a href="#" :class="{ active: activeSection === 'collections' }" @click.prevent="navigateToSection('collections'); isMobileMenuOpen = false;">{{ getMenuLabel('collections') }}</a></li>
            <li v-if="false"><a href="#" :class="{ active: activeSection === 'event' }" @click.prevent="navigateToSection('event'); isMobileMenuOpen = false;">{{ getMenuLabel('event') }}</a></li>
            <li><a href="#" :class="{ active: activeSection === 'product' }" @click.prevent="navigateToSection('product'); isMobileMenuOpen = false;">{{ getMenuLabel('product') }}</a></li>
            <li><a href="#" :class="{ active: activeSection === 'shop' }" @click.prevent="navigateToSection('shop'); isMobileMenuOpen = false;">{{ getMenuLabel('shop') }}</a></li>
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

    <!-- Functional Slide-down Search Bar -->
    <Transition name="search-slide">
      <div v-if="isSearchOpen && currentPage !== 'shop'" class="search-bar-dropdown">
        <div class="shop-search-bar">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            :placeholder="currentLang === 'id' ? 'Cari merchandise...' : 'Search merchandise...'"
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
import { isCartOpen, totalItems, searchQuery, currentLang, currentPage, isSearchOpen, isMobileMenuOpen, triggerProfile, isLoggedIn } from '../store/cart.js';

const isLangDropdownOpen = ref(false);
const searchInput = ref(null);

const activeSection = ref('home');

// Scroll observer to update active section based on scroll position of .collections-container
const updateActiveSectionOnScroll = () => {
  if (currentPage.value === 'shop' || currentPage.value === 'checkout' || currentPage.value === 'payment') {
    if (activeSection.value !== 'product') activeSection.value = 'shop';
    return;
  }
  if (currentPage.value !== 'home') {
    activeSection.value = '';
    return;
  }
  
  const collectionsEl = document.querySelector('.collections-container');
  if (!collectionsEl) {
    activeSection.value = 'home';
    return;
  }
  
  const rect = collectionsEl.getBoundingClientRect();
  // If the top of the collections section is scrolled above 45% of viewport height, mark collections active
  if (rect.top <= window.innerHeight * 0.45) {
    activeSection.value = 'collections';
  } else {
    activeSection.value = 'home';
  }
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
  } else if (section === 'collections') {
    const scrollToCollections = () => {
      const collectionsEl = document.querySelector('.collections-container');
      if (collectionsEl) {
        const yOffset = -90; // sticky header padding
        const y = collectionsEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    if (currentPage.value !== 'home') {
      currentPage.value = 'home';
      setTimeout(scrollToCollections, 150); // wait for homepage to mount and transitions
    } else {
      scrollToCollections();
    }
    activeSection.value = 'collections';
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
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSectionOnScroll);
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

const handleSearchEnter = () => {
  if (searchQuery.value.trim() !== '') {
    currentPage.value = 'shop';
    isSearchOpen.value = false;
  }
};

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
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  height: 35px;
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

.nav-item {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-mocca-dark);
  opacity: 0.85;
  padding: 0.5rem 0;
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
  gap: 1.5rem;
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
  background-color: #FAF6F0; /* Soft warm cream */
  border-top: 1px solid rgba(59, 35, 20, 0.06);
  border-bottom: 1px solid rgba(59, 35, 20, 0.08);
  padding: 0.85rem 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shop-search-bar {
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--color-mocca-muted);
}

.shop-search-input {
  width: 100%;
  padding: 0.85rem 3rem 0.85rem 3.5rem;
  border: 1px solid rgba(59, 35, 20, 0.15);
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
  box-shadow: 0 0 0 3px rgba(59, 35, 20, 0.05);
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
    padding: 0.85rem 3rem;
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
      padding: 1rem 1.25rem;
  }
  
  .mobile-hidden {
    display: none !important;
  }
  
  .hamburger-btn {
    display: flex;
  }
  
  .logo-img {
      height: 28px;
      width: auto;
  }
  
  .logo-text {
    font-size: 1.75rem; /* Smaller logo on mobile */
  }
  
  .search-bar-dropdown {
    padding: 0.75rem 1.25rem;
  }
  
  .header-actions {
    gap: 0.5rem; /* Reduce gap on mobile */
  }
  
  .search-btn {
    display: none !important;
  }
}
</style>
