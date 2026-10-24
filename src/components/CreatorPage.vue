<template>
  <div class="creator-page-wrapper">

    <!-- ===== Cover Banner (full-bleed) ===== -->
    <div class="creator-cover-banner">
      <img :src="creatorData?.banner_url || '/banner/banner.webp'" alt="cover banner" class="cover-image" />
      <button class="cover-back-btn" @click="currentPage = 'home'" :aria-label="currentLang === 'id' ? 'Kembali' : 'Back'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Profile logo sits on top of the banner -->
      <div class="profile-logo-card">
        <img v-if="creatorData?.image_url" :src="creatorData.image_url" alt="logo" />
        <svg v-else class="creator-large-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#1C1C1C" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
          <path d="M52.5,28.5 C56.5,28.5 59.5,31.5 59.5,36.5 C59.5,43.5 51.5,53.5 44.5,60.5 C42.5,62.5 40.5,64.5 38.5,64.5 C36.5,64.5 35.5,62.5 35.5,59.5 C35.5,54.5 41.5,45.5 49.5,36.5 C54.5,30.5 51.5,26.5 44.5,32.5 C38.5,37.5 33.5,44.5 33.5,50.5 C33.5,58.5 40.5,66.5 49.5,66.5 C57.5,66.5 64.5,60.5 64.5,55.5 C64.5,53.5 62.5,53.5 61.5,55.5 C58.5,60.5 53.5,62.5 49.5,62.5 C44.5,62.5 40.5,58.5 40.5,53.5 C40.5,47.5 46.5,38.5 52.5,28.5 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </div>

    <div class="creator-page-container">

      <!-- ===== Identity + Actions ===== -->
      <div class="creator-header">
        <div class="creator-header-left">
          <h1 class="creator-name-bold">{{ creatorData?.name || 'Loading...' }}</h1>
          <span class="creator-member-since">{{ currentLang === 'id' ? 'Member sejak 2024' : 'Member since 2024' }}</span>
        </div>

        <div class="creator-header-right">
          <button class="btn-follow">Follow</button>
          <button class="btn-message">{{ currentLang === 'id' ? 'Kirim Pesan' : 'Pesan' }}</button>
        </div>
      </div>

      <!-- ===== Product Listing (always visible) ===== -->
      <div class="tab-panel">

      <!-- Filter & Category Bar -->
      <div class="filter-category-bar">
        <!-- Right Side Controls: Dropdown & Layout Toggles -->
        <div class="controls-right" style="margin-left: auto;">
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
            <div class="badges-container">
              <div v-if="product.isPreorder" class="status-badge">PRE-ORDER</div>
              <div v-else-if="product.isSoldOut" class="status-badge">{{ currentLang === 'id' ? 'HABIS' : 'SOLD OUT' }}</div>
            </div>
            <img :src="product.image" :alt="product.title" class="product-image primary-img" />
            <!-- Light sweep shine on hover (same as homepage) -->
            <div class="product-card-shine" aria-hidden="true"></div>
          </div>

          <!-- Product Details -->
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <div class="product-price-row">
              <span class="product-price">{{ formatPrice(product.price) }}</span>
            </div>
            <div v-if="product.rating" class="product-meta">
              <span class="meta-rating">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                {{ Number(product.rating).toFixed(1) }}
              </span>
              <span class="meta-dot">•</span>
              <span>{{ product.totalSold }} {{ currentLang === 'id' ? 'terjual' : 'sold' }}</span>
            </div>
            <div v-if="product.has_store_location" class="product-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="product-location-text">{{ product.has_store_location.store_name }}</span>
            </div>
          </div>

          <!-- Divider Line -->
          <div class="card-divider"></div>

          <!-- Creator Footer -->
          <div class="card-creator-section">
            <div class="creator-avatar-wrapper">
              <img :src="creatorData?.image_url || '/logo/logo.webp'" :alt="creatorData?.name" class="creator-avatar" />
            </div>
            <div class="creator-info">
              <span class="creator-label">{{ currentLang === 'id' ? 'Disediakan oleh' : 'Provided by' }}</span>
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

      <!-- Pagination -->
      <nav
        v-if="totalPages > 1 && filteredProducts.length > 0"
        class="pagination-container"
        aria-label="Pagination"
      >
        <button
          class="pagination-arrow"
          :disabled="currentPageNum <= 1 || isLoading"
          @click="goToPage(currentPageNum - 1)"
          aria-label="Halaman sebelumnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <template v-for="(p, idx) in paginationPages" :key="`${p}-${idx}`">
          <span v-if="p === '...'" class="pagination-ellipsis">&hellip;</span>
          <button
            v-else
            class="pagination-num"
            :class="{ active: p === currentPageNum }"
            :disabled="isLoading"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
        </template>

        <button
          class="pagination-arrow"
          :disabled="currentPageNum >= totalPages || isLoading"
          @click="goToPage(currentPageNum + 1)"
          aria-label="Halaman berikutnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </nav>

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
const totalPages = ref(1);

const fetchCreatorData = async (page = 1) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';

  isLoading.value = true;
  try {
    const res = await fetch(`${apiUrl}/api/creator-maping-product/berean.id?page=${page}`);
    const json = await res.json();
    const pagination = json.products || {};
    const affiliate = json.affiliate_creators?.[0] || null;
    const pData = Array.isArray(pagination.data) ? pagination.data : [];

    creatorData.value = affiliate ?? pData[0]?.creator ?? null;

    products.value = pData
      .filter(p => p.product_status_id == 2)
      .map(p => {
        const variants = p.varians || p.product_varian || [];
        let price = parseFloat(p.price) || 0;
        if (price === 0 && variants.length > 0) {
          price = parseFloat(variants[0].price) || 0;
        }
        const images = p.images || p.product_image || [];
        return {
          id: p.id,
          slug: p.slug,
          category: 'apparel',
          title: p.product_name,
          description: p.description,
          sku: p.sku,
          price,
          variant_id: variants[0]?.id ?? null,
          variants: variants.map(v => ({
            id: v.id,
            name: v.varian_name,
            price: parseFloat(v.price) || 0,
            stock: v.stock_qty,
            soldOut: v.is_soldout == 1,
          })),
          image: images[0]?.image_url || '/mocca_group_tee.png',
          colors: ['cream'],
          creator: {
            name: p.creator?.name,
            image_url: p.creator?.image_url,
            avatarInitial: p.creator?.name?.[0] || 'M',
            creator_title: 'Official Store',
          },
          totalSold: p.total_sold || 0,
          rating: p.average_star ? parseFloat(String(p.average_star).replace(',', '.')) : null,
          totalReview: p.total_review || 0,
          isSoldOut: p.is_soldout == 1,
          isPreorder: p.is_preorder == 1,
          has_store_location: p.store_location || p.pickup_store || p.has_store_location,
          admin_fee: parseFloat(p.admin_fee) || 0,
        };
      });

    currentPageNum.value = pagination.current_page || page;
    totalPages.value = pagination.last_page || 1;

    selectedColors.value = Object.fromEntries(products.value.map(p => [p.id, 'cream']));
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
  fetchCreatorData(1);
});

const goToPage = (page) => {
  if (isLoading.value) return;
  if (page < 1 || page > totalPages.value || page === currentPageNum.value) return;
  fetchCreatorData(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const paginationPages = computed(() => {
  const total = totalPages.value;
  const current = currentPageNum.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
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

const totalSold = computed(() => products.value.reduce((sum, p) => sum + p.totalSold, 0));
</script>

<style scoped>
.creator-page-wrapper {
  background-color: var(--color-bg-cream);
  min-height: 100vh;
  width: 100%;
  padding-bottom: 5rem;
  transition: var(--transition-smooth);
}

/* Full-bleed cover banner */
.creator-cover-banner {
  position: relative;
  width: 100%;
  height: 280px;
  background-color: var(--color-mocca-border);
  overflow: hidden;
}

.creator-cover-banner .cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-back-btn {
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.92);
  color: var(--color-mocca-dark);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: var(--transition-smooth);
  z-index: 6;
}

.cover-back-btn:hover {
  background-color: #FFFFFF;
  transform: translateX(-2px);
}

.creator-page-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Logo card sits on top of the banner */
.profile-logo-card {
  position: absolute;
  left: 3rem;
  bottom: 0.75rem;
  z-index: 5;
  background-color: #FFFFFF;
  border: 3px solid #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  overflow: hidden;
}

.profile-logo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creator-large-logo {
  width: 100%;
  height: 100%;
}


/* Product meta: rating, sold, variants, status */
.product-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-top: 0.4rem;
}

.variant-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.6rem;
}

.variant-chip {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(47, 78, 62, 0.2);
  border-radius: 6px;
  color: var(--color-mocca-dark);
}

.variant-chip.is-soldout {
  opacity: 0.4;
  text-decoration: line-through;
}

.product-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.6rem;
}

.badge {
  font-size: 0.68rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(47, 78, 62, 0.08);
  color: var(--color-mocca-dark);
}

.badge-soldout {
  background: #f3e3e1;
  color: #8a2e24;
}

.badge-preorder {
  background: #e7efe9;
  color: var(--color-mocca-dark);
}


.creator-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.creator-header-left {
  display: flex;
  flex-direction: column;
}

.creator-header-left .creator-name-bold {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  line-height: 1.15;
  margin-bottom: 0.2rem;
}

.creator-header-left .creator-member-since {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-mocca-muted);
}

.creator-header-right {
  display: flex;
  gap: 0.6rem;
  flex-shrink: 0;
}

/* Follow Button: Filled Berean.id Dark */
.creator-header-right .btn-follow {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-radius: 999px;
  padding: 0.45rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
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
  border-radius: 999px;
  padding: 0.45rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.creator-header-right .btn-message:hover {
  background-color: rgba(142, 125, 115, 0.08);
  border-color: var(--color-mocca-dark);
  transform: translateY(-2px);
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

/* Products Container Grid View — 6 per row, same as homepage */
.products-container.grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 3.5rem;
}

/* Products Container List View */
.products-container.list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

/* Product Card — identical to homepage ShopSection card */
.product-card {
  background: none;
  border: none;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: auto;
  min-width: 0;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.product-card:hover {
  transform: none;
  border-color: transparent;
  box-shadow: none;
}

/* Grid Layout overrides */
.grid .product-image-container {
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

/* Shine sweep on hover — slides in and out smoothly */
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

/* Badges on the image (top-left) */
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

.list .product-info {
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

/* Product image (matching homepage) */
.product-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .product-image {
    transform: scale(1.06);
  }
}

/* Product Info (matching homepage card style) */
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

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  user-select: none;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .creator-page-container {
    padding: 0 3rem;
  }
}

@media (max-width: 1024px) {
  .products-container.grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .creator-page-wrapper {
    padding-bottom: 4rem;
  }

  .creator-page-container {
    padding: 0 1.25rem;
  }

  .creator-cover-banner {
    height: auto; /* no crop on mobile: let the full banner show */
  }

  .creator-cover-banner .cover-image {
    height: auto;
    object-fit: contain;
  }

  .cover-back-btn {
    top: 0.85rem;
    left: 0.85rem;
    width: 36px;
    height: 36px;
  }

  .profile-logo-card {
    left: 1rem;
    bottom: 0.4rem;
    width: 64px;
    height: 64px;
    border-width: 3px;
    border-radius: 10px;
  }

  .creator-header {
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .creator-header-left {
    flex: 1 1 auto;
    min-width: 0;
  }

  .creator-header-left .creator-name-bold {
    font-size: 1.35rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .creator-header-left .creator-member-since {
    font-size: 0.75rem;
  }



  .creator-header-right {
    gap: 0.4rem;
  }

  .creator-header-right button {
    flex: none;
    padding: 0.35rem 0.85rem;
    font-size: 0.72rem;
    white-space: nowrap;
  }

  .filter-category-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding-bottom: 1rem;
  }



  .controls-right {
    display: none !important;
  }

  .products-container.grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 columns, same as homepage mobile */
    gap: 0.85rem;
  }

  /* List view on Mobile overrides to normal grid card stacking */
  .list .product-card {
    flex-direction: column;
  }

  .list .product-image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .list .product-info {
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
