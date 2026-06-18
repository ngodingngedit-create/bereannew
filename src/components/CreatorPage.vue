<template>
  <div class="creator-page-wrapper">
    <div class="creator-page-container">
      
      <!-- Breadcrumbs Navigation -->
      <div class="breadcrumbs">
        <span class="breadcrumb-item" @click="currentPage = 'home'">
          <svg class="home-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {{ currentLang === 'id' ? 'Beranda' : 'Home' }}
        </span>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-item" @click="currentPage = 'shop'">
          {{ currentLang === 'id' ? 'Kreator' : 'Creators' }}
        </span>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-item active">{{ creatorData?.name || 'Kreator' }}</span>
      </div>

      <!-- Creator Profile Banner & Cover Hero -->
      <div class="creator-profile-hero">
        <!-- Cover Photo Banner (Wide banner) -->
        <div class="creator-cover-banner">
          <img :src="creatorData?.banner_url || '/deelestari_banner.png'" alt="cover banner" class="cover-image" />
          
          <!-- Profile Logo overlapping bottom-left edge -->
          <div class="profile-logo-overlap-container">
            <div class="profile-logo-card">
              <img v-if="creatorData?.image_url" :src="creatorData.image_url" alt="logo" style="width: 100%; height: 100%; object-fit: cover;" />
              <svg v-else class="creator-large-logo" viewBox="0 0 100 100" width="76" height="76" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#1C1C1C" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
                <path d="M52.5,28.5 C56.5,28.5 59.5,31.5 59.5,36.5 C59.5,43.5 51.5,53.5 44.5,60.5 C42.5,62.5 40.5,64.5 38.5,64.5 C36.5,64.5 35.5,62.5 35.5,59.5 C35.5,54.5 41.5,45.5 49.5,36.5 C54.5,30.5 51.5,26.5 44.5,32.5 C38.5,37.5 33.5,44.5 33.5,50.5 C33.5,58.5 40.5,66.5 49.5,66.5 C57.5,66.5 64.5,60.5 64.5,55.5 C64.5,53.5 62.5,53.5 61.5,55.5 C58.5,60.5 53.5,62.5 49.5,62.5 C44.5,62.5 40.5,58.5 40.5,53.5 C40.5,47.5 46.5,38.5 52.5,28.5 Z" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Info Area below Banner Cover -->
        <div class="creator-profile-header-details">
          <!-- Left side: Name and status -->
          <div class="creator-header-left">
            <h1 class="creator-name-bold">{{ creatorData?.name || 'Loading...' }}</h1>
            <span class="creator-member-since">{{ currentLang === 'id' ? 'Member sejak 2024' : 'Member since 2024' }}</span>
          </div>

          <!-- Right side: Buttons with rounded 8px -->
          <div class="creator-header-right">
            <button class="btn-follow">{{ currentLang === 'id' ? 'Follow' : 'Follow' }}</button>
            <button class="btn-message">{{ currentLang === 'id' ? 'Kirim Pesan' : 'Send Message' }}</button>
          </div>
        </div>

        <!-- Additional Info: Bio, Social, Stats -->
        <div class="creator-additional-info-row">
          <div class="info-row-left">
            <p class="creator-bio">
              {{ creatorData?.description || (currentLang === 'id' 
                ? 'Kreator yang menghadirkan karya, cerita, dan inspirasi untuk keseharianmu.' 
                : 'A creator bringing stories, art, and daily inspiration to your life.') }}
            </p>
            <div class="creator-social-links">
              <a href="#" class="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="social-icon" aria-label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="#" class="social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <div class="info-row-right">
            <!-- 1. Produk -->
            <div class="stat-item">
              <svg class="stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="stat-value"><strong>{{ products.length }}</strong> {{ currentLang === 'id' ? 'Produk' : 'Products' }}</span>
            </div>

            <!-- 2. Pengikut -->
            <div class="stat-item" v-if="false">
              <svg class="stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span class="stat-value"><strong>24.8K</strong> {{ currentLang === 'id' ? 'Pengikut' : 'Followers' }}</span>
            </div>

            <!-- 3. Rating -->
            <div class="stat-item" v-if="false">
              <svg class="stat-icon star-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span class="stat-value"><strong>4.9</strong> (1.2K {{ currentLang === 'id' ? 'rating' : 'ratings' }})</span>
            </div>

            <!-- 4. Terjual -->
            <div class="stat-item" v-if="false">
              <svg class="stat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span class="stat-value"><strong>5.2K+</strong> {{ currentLang === 'id' ? 'Terjual' : 'Sold' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Category Bar -->
      <div class="filter-category-bar">
        <!-- Categories Tab List -->
        <div class="categories-tabs">
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            class="category-tab-btn" 
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ currentLang === 'id' ? cat.nameId : cat.nameEn }}
            <span v-if="activeCategory === cat.id" class="tab-indicator"></span>
          </button>
        </div>

        <!-- Right Side Controls: Dropdown & Layout Toggles -->
        <div class="controls-right">
          <div class="sort-dropdown-container">
            <select v-model="sortBy" class="sort-select" aria-label="Sort products">
              <option value="newest">{{ currentLang === 'id' ? 'Terbaru' : 'Newest' }}</option>
              <option value="popular">{{ currentLang === 'id' ? 'Terpopuler' : 'Popular' }}</option>
              <option value="price-low">{{ currentLang === 'id' ? 'Harga: Rendah ke Tinggi' : 'Price: Low to High' }}</option>
              <option value="price-high">{{ currentLang === 'id' ? 'Harga: Tinggi ke Rendah' : 'Price: High to Low' }}</option>
            </select>
            <svg class="dropdown-arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          <div class="layout-toggle-buttons">
            <button 
              class="layout-btn" 
              :class="{ active: layoutView === 'grid' }" 
              @click="layoutView = 'grid'"
              aria-label="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button 
              class="layout-btn" 
              :class="{ active: layoutView === 'list' }" 
              @click="layoutView = 'list'"
              aria-label="List View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="no-results-card">
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <p class="no-results-text">
          {{ currentLang === 'id' ? 'Tidak ada produk di kategori ini.' : 'No products in this category.' }}
        </p>
      </div>

      <!-- Product Grid/List View -->
      <div v-else :class="['products-container', layoutView]">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="handleCardClick(product, $event)"
        >
          <!-- Image Container -->
          <div class="product-image-container">
            <img :src="product.image" :alt="product.title" class="product-image" />
            <div class="product-card-overlay">
              <button class="view-details-btn" @click.stop="openModal(product)">
                {{ currentLang === 'id' ? 'Lihat Detail' : 'View Details' }}
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="product-info-wrapper">
            <h3 class="product-title">{{ product.title }}</h3>
            
            <div class="product-price-row">
              <span class="product-price">{{ formatPrice(product.price) }}</span>
            </div>


            <!-- Quantity Selector Button -->
            <div class="product-actions-row">
              <div class="card-qty-selector">
                <button 
                  class="card-qty-btn" 
                  @click.stop="changeQty(product, selectedColors[product.id], -1)" 
                  :disabled="getQty(product.id, selectedColors[product.id]) === 0"
                  aria-label="Decrease quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <span class="card-qty-value" :class="{ 'is-zero': getQty(product.id, selectedColors[product.id]) === 0 }">
                  {{ getQty(product.id, selectedColors[product.id]) }}
                </span>
                <button 
                  class="card-qty-btn" 
                  @click.stop="changeQty(product, selectedColors[product.id], 1)"
                  aria-label="Increase quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Divider Line -->
          <div class="card-divider"></div>

          <!-- Creator Footer -->
          <div class="card-creator-section">
            <div class="creator-avatar-wrapper">
              <img v-if="creatorData?.image_url" :src="creatorData.image_url" alt="avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" />
              <svg v-else class="creator-avatar" viewBox="0 0 100 100" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#1C1C1C" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
                <path d="M52.5,28.5 C56.5,28.5 59.5,31.5 59.5,36.5 C59.5,43.5 51.5,53.5 44.5,60.5 C42.5,62.5 40.5,64.5 38.5,64.5 C36.5,64.5 35.5,62.5 35.5,59.5 C35.5,54.5 41.5,45.5 49.5,36.5 C54.5,30.5 51.5,26.5 44.5,32.5 C38.5,37.5 33.5,44.5 33.5,50.5 C33.5,58.5 40.5,66.5 49.5,66.5 C57.5,66.5 64.5,60.5 64.5,55.5 C64.5,53.5 62.5,53.5 61.5,55.5 C58.5,60.5 53.5,62.5 49.5,62.5 C44.5,62.5 40.5,58.5 40.5,53.5 C40.5,47.5 46.5,38.5 52.5,28.5 Z" fill="#FFFFFF" />
              </svg>
            </div>
            <div class="creator-info">
              <span class="creator-label">{{ creatorData?.creator_title || 'Official Store' }}</span>
              <div class="creator-name-wrapper" style="display: flex; align-items: center; gap: 4px;">
                <span class="creator-name">{{ creatorData?.name || 'Loading...' }}</span>
                <svg v-if="creatorData?.is_verified == 1" width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" stroke="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      

    </div>

    <!-- Product Modal overlay -->
    <ProductModal 
      v-if="activeModalProduct" 
      :isOpen="isModalOpen" 
      :product="activeModalProduct" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import ProductModal from './ProductModal.vue';
import { 
  addToCart, 
  updateQuantity, 
  getItemQuantity, 
  currentLang, 
  currentPage,
  activeCreatorSlug
} from '../store/cart.js';

// UI State
const isModalOpen = ref(false);
const activeModalProduct = ref(null);
const activeCategory = ref('all');
const sortBy = ref('newest');
const layoutView = ref('grid'); // 'grid' | 'list'
const currentPageNum = ref(1);

const creatorData = ref(null);
const isLoading = ref(true);

// Static categories configuration
const categories = [
  { id: 'all', nameId: 'Semua Produk', nameEn: 'All Products' },
  { id: 'accessories', nameId: 'Aksesoris', nameEn: 'Accessories' },
  { id: 'stationery', nameId: 'Alat Tulis', nameEn: 'Stationery' },
  { id: 'apparel', nameId: 'Apparel', nameEn: 'Apparel' },
  { id: 'home', nameId: 'Record store', nameEn: 'Record store' }
];

const products = ref([]);
const selectedColors = ref({});

const fetchCreatorData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
  
  if (!activeCreatorSlug.value) {
    activeCreatorSlug.value = apiUrl.includes('my.id') ? 48 : 127;
  }

  isLoading.value = true;
  try {
    const res = await fetch(`${apiUrl}/api/creator/${activeCreatorSlug.value}`);
    const json = await res.json();
    if (json.data) {
      creatorData.value = json.data;
      
      const prodRes = await fetch(`${apiUrl}/api/product?creator_id=${json.data.id}`);
      const prodJson = await prodRes.json();
      const pData = Array.isArray(prodJson) ? prodJson : prodJson.data;
      
      if (pData) {
        products.value = pData.filter(p => p.product_status_id == 2).map(p => {
          let price = parseInt(p.price);
          let variantId = null;
          if (price === 0 && p.product_varian && p.product_varian.length > 0) {
            price = parseInt(p.product_varian[0].price);
            variantId = p.product_varian[0].id;
          } else if (p.product_varian && p.product_varian.length > 0) {
            variantId = p.product_varian[0].id;
          }
          return {
            id: p.id,
            slug: p.slug,
            category: 'apparel',
            title: p.product_name,
            price: price,
            variant_id: variantId,
            image: p.product_image?.[0]?.image_url || '/mocca_group_tee.png',
            colors: ['cream'],
            creator: { 
              name: json.data.name, 
              image_url: json.data.image_url,
              avatarInitial: json.data.name?.[0] || 'M',
              creator_title: json.data.creator_title || 'Official Store'
            },
            has_store_location: p.has_store_location,
            admin_fee: p.admin_fee || 0
          };
        });
        
        pData.forEach(p => {
          selectedColors.value[p.id] = 'cream';
        });
      }
    }
  } catch (err) {
    console.error('Failed to fetch creator data:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCreatorData();
});

watch(activeCreatorSlug, () => {
  fetchCreatorData();
});

// Helper actions
const getQty = (productId, color) => {
  return getItemQuantity(productId, color);
};

const changeQty = (product, color, delta) => {
  const currentQty = getQty(product.id, color);
  if (currentQty === 0 && delta > 0) {
    addToCart(product, color);
  } else {
    updateQuantity(product.id, color, delta);
  }
};

const openModal = (product) => {
  activeModalProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleCardClick = (product, event) => {
  if (
    event.target.closest('.card-qty-selector') || 
    event.target.closest('.color-swatches') || 
    event.target.closest('.swatch') ||
    event.target.closest('.card-qty-btn')
  ) {
    return;
  }
  openModal(product);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

// Filtered products computed list
const filteredProducts = computed(() => {
  let list = [...products.value];

  // Category filter
  if (activeCategory.value !== 'all') {
    list = list.filter(p => p.category === activeCategory.value);
  }

  // Sort filter
  if (sortBy.value === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  }

  return list;
});
</script>

<style scoped>
.creator-page-wrapper {
  background-color: #F5F2ED;
  min-height: 100vh;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 5rem;
  transition: var(--transition-smooth);
}

.creator-page-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
}

/* Breadcrumbs Styling */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  margin-bottom: 2rem;
}

.breadcrumb-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition-smooth);
}

.breadcrumb-item:hover:not(.active) {
  color: var(--color-mocca-dark);
}

.breadcrumb-item.active {
  color: var(--color-mocca-dark);
  font-weight: 500;
  cursor: default;
}

.breadcrumb-separator {
  color: var(--color-mocca-muted);
  opacity: 0.6;
}

.home-icon {
  stroke-width: 1.5;
  color: var(--color-mocca-muted);
}

/* Creator Profile Banner & Cover Hero */
.creator-profile-hero {
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(47, 78, 62, 0.02);
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
}

.creator-cover-banner {
  position: relative;
  width: 100%;
  height: 280px;
  background-color: #ECE7DF;
}

.creator-cover-banner .cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-logo-overlap-container {
  position: absolute;
  bottom: -40px;
  left: 3rem;
  z-index: 5;
}

.profile-logo-card {
  background-color: #FFFFFF;
  border: 4px solid #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  overflow: hidden;
}

.creator-profile-header-details {
  padding: 3.5rem 3rem 1.25rem 3rem; /* Top padding leaves room for overlap */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid rgba(47, 78, 62, 0.06);
}

.creator-header-left {
  display: flex;
  flex-direction: column;
}

.creator-header-left .creator-name-bold {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  line-height: 1.1;
  margin-bottom: 0.25rem;
}

.creator-header-left .creator-member-since {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
}

.creator-header-right {
  display: flex;
  gap: 0.75rem;
}

/* Follow Button: Filled Berean.id Dark */
.creator-header-right .btn-follow {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-radius: 8px; /* Rounded 8px */
  padding: 0.65rem 2rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.creator-header-right .btn-follow:hover {
  background-color: var(--color-mocca-muted);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
}

/* Send Message Button: Outlined Berean.id Border */
.creator-header-right .btn-message {
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px; /* Rounded 8px */
  padding: 0.65rem 2rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.creator-header-right .btn-message:hover {
  background-color: rgba(142, 125, 115, 0.08);
  border-color: var(--color-mocca-dark);
  transform: translateY(-2px);
}

.creator-additional-info-row {
  padding: 1.5rem 3rem 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
}

.info-row-left {
  max-width: 60%;
}

.info-row-left .creator-bio {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
  opacity: 0.85;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.info-row-left .creator-social-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.info-row-left .social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.info-row-left .social-icon:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
  transform: translateY(-2px);
}

.info-row-right {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2rem;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.info-row-right .stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
}

.info-row-right .stat-icon {
  color: var(--color-mocca-muted);
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.info-row-right .star-icon {
  color: #E6A100;
  fill: #E6A100;
}

.info-row-right .stat-value strong {
  font-weight: 700;
  color: var(--color-mocca-dark);
  
}

/* Filter & Category Bar */
.filter-category-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid var(--color-mocca-border);
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;
}

.categories-tabs {
  display: flex;
  gap: 2rem;
}

.category-tab-btn {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  opacity: 0.75;
  padding: 0.5rem 0;
  position: relative;
  transition: var(--transition-smooth);
}

.category-tab-btn:hover {
  opacity: 1;
}

.category-tab-btn.active {
  font-weight: 600;
  opacity: 1;
}

.tab-indicator {
  position: absolute;
  bottom: -0.85rem;
  left: 0;
  width: 100%;
  height: 2.5px;
  background-color: var(--color-mocca-dark);
}

.controls-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.sort-dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
}

.sort-select {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  padding: 0.5rem 2.25rem 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  appearance: none; /* Remove default arrow */
  transition: var(--transition-smooth);
}

.sort-select:hover {
  border-color: var(--color-mocca-dark);
}

.dropdown-arrow-icon {
  position: absolute;
  right: 0.85rem;
  pointer-events: none;
  color: var(--color-mocca-dark);
}

.layout-toggle-buttons {
  display: flex;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-bg-light);
}

.layout-btn {
  padding: 0.5rem 0.75rem;
  color: var(--color-mocca-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.layout-btn:hover:not(.active) {
  color: var(--color-mocca-dark);
}

.layout-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
}

/* Products Container Grid View */
.products-container.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3.5rem;
}

/* Products Container List View */
.products-container.list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

/* Product Card Styling */
.product-card {
  background-color: var(--color-bg-light);
  border-radius: 8px;
  border: 1px solid rgba(47, 78, 62, 0.15);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.02);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-mocca-dark);
  box-shadow: 0 12px 25px rgba(47, 78, 62, 0.06);
}

/* Grid Layout overrides */
.grid .product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #F8F5F0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* List Layout overrides */
.list .product-card {
  flex-direction: row;
  height: auto;
  align-items: stretch;
}

.list .product-image-container {
  width: 240px;
  aspect-ratio: 1.2 / 1;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.list .product-info-wrapper {
  padding: 1.5rem 2rem;
  justify-content: center;
}

.list .product-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.list .product-price-row {
  justify-content: flex-start;
  margin-bottom: 0.75rem;
}

.list .product-colors-row {
  margin-bottom: 1rem;
}

.list .product-actions-row {
  margin-top: 0;
  justify-content: flex-start;
}

.list .card-divider {
  display: none; /* Hide standard divider in list view */
}

.list .card-creator-section {
  border-left: 1px solid var(--color-mocca-border);
  padding: 2rem;
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.list .creator-info {
  align-items: center;
}

/* Image overlays */
.product-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(47, 78, 62, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: 2;
  backdrop-filter: blur(2px);
}

.product-card:hover .product-card-overlay {
  opacity: 1;
}

.view-details-btn {
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  border: 1px solid var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.1);
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .view-details-btn {
  transform: translateY(0);
}

.view-details-btn:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

/* Product Info */
.product-info-wrapper {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.2rem;
}

.product-price-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.35rem;
}

.product-price {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.product-colors-row {
  display: flex;
  margin-bottom: 0.45rem;
}

.color-swatches {
  display: flex;
  gap: 0.35rem;
}

.swatch {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: var(--transition-smooth);
  position: relative;
}

.swatch:hover {
  transform: scale(1.15);
}

.swatch.active {
  box-shadow: 0 0 0 2px var(--color-mocca-dark);
}

.swatch-cream { background-color: #FAF6F0; }
.swatch-black { background-color: #1C3026; }
.swatch-green { background-color: #2E4A3E; }
.swatch-beige { background-color: #D9C5B2; }

.product-actions-row {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.card-qty-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-mocca-dark);
  border-radius: 8px;
  width: 100px;
  overflow: hidden;
  transition: var(--transition-smooth);
}

.card-qty-selector:hover {
  box-shadow: 0 4px 10px rgba(47, 78, 62, 0.12);
}

.card-qty-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  opacity: 0.8;
  transition: var(--transition-smooth);
}

.card-qty-btn:hover:not(:disabled) {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
}

.card-qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-icon {
  width: 10px;
  height: 10px;
}

.card-qty-value {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: #FFFFFF;
}

.card-qty-value.is-zero {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* Divider */
.card-divider {
  height: 1px;
  background-color: var(--color-mocca-border);
  width: 100%;
}

/* Creator footer */
.card-creator-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.85rem;
  background-color: var(--color-bg-light);
}

.creator-avatar-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-info {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  text-align: left;
}

.creator-label {
    font-family: var(--font-body);
    font-size: 0.55rem;
  color: var(--color-mocca-muted);
}

.creator-name {
    font-family: var(--font-body);
    font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

/* Empty State Card */
.no-results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: var(--color-bg-light);
  border-radius: 12px;
  border: 1px dashed var(--color-mocca-border);
  text-align: center;
  max-width: 500px;
  margin: 2rem auto;
  width: 100%;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  color: var(--color-mocca-muted);
  margin-bottom: 1rem;
}

.no-results-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
}

/* Pagination component */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination-arrow,
.pagination-num {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.pagination-arrow:hover:not(:disabled),
.pagination-num:hover:not(.active) {
  border-color: var(--color-mocca-dark);
  background-color: rgba(232, 226, 217, 0.25);
}

.pagination-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-num.active {
  background-color: var(--color-mocca-dark); /* Active brown box */
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .creator-page-container {
    padding: 0 3rem;
  }
}

@media (max-width: 1024px) {
  .creator-banner-card {
    padding: 2rem;
  }

  .banner-left {
    max-width: 65%;
  }

  .products-container.grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .creator-page-wrapper {
    padding-top: 1rem;
    padding-bottom: 4rem;
  }

  .creator-page-container {
    padding: 0 1.5rem;
  }

  .creator-profile-hero {
    border-radius: 12px;
  }

  .creator-cover-banner {
    height: 160px;
  }

  .profile-logo-overlap-container {
    bottom: -30px;
    left: 1.5rem;
  }

  .profile-logo-card {
    width: 72px;
    height: 72px;
    border-width: 3px;
    border-radius: 8px;
  }

  .creator-large-logo {
    width: 56px;
    height: 56px;
  }

  .creator-profile-header-details {
    padding: 2.5rem 1.5rem 1.25rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .creator-header-left .creator-name-bold {
    font-size: 2rem;
  }

  .creator-header-right {
    width: auto;
    display: flex;
    gap: 0.5rem;
  }

  .creator-header-right button {
    flex: none;
    padding: 0.35rem 1rem;
    font-size: 0.75rem;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }

  .creator-additional-info-row {
    padding: 1.25rem 1.5rem 1.75rem 1.5rem;
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-row-left {
    max-width: 100%;
  }

  .info-row-right {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1.5rem;
    justify-content: stretch;
    margin-left: 0;
  }

  .info-row-right .stat-item {
    font-size: 0.85rem;
  }

  .filter-category-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .categories-tabs {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    gap: 1.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--color-mocca-border) transparent;
  }

  .categories-tabs::-webkit-scrollbar {
    height: 3px;
  }

  .categories-tabs::-webkit-scrollbar-track {
    background: transparent;
  }

  .categories-tabs::-webkit-scrollbar-thumb {
    background-color: var(--color-mocca-border);
    border-radius: 4px;
  }

  .category-tab-btn {
    white-space: nowrap;
  }

  .tab-indicator {
    bottom: -0.65rem;
  }

  .controls-right {
    display: none !important;
  }

  .products-container.grid {
    grid-template-columns: 1fr; /* 1 Column on Mobile */
    gap: 1.5rem;
  }

  /* List view on Mobile overrides to normal grid card stacking */
  .list .product-card {
    flex-direction: column;
  }

  .list .product-image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .list .product-info-wrapper {
    padding: 0.85rem;
  }

  .list .product-title {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  .list .product-price-row {
    justify-content: flex-end;
  }

  .list .product-colors-row {
    margin-bottom: 0.45rem;
  }

  .list .product-actions-row {
    justify-content: flex-end;
  }

  .list .card-creator-section {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--color-mocca-border);
    padding: 0.6rem 0.85rem;
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
}
</style>
