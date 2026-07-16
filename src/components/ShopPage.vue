<template>
  <div class="shop-page-wrapper">
    <!-- Header Spacing to sit perfectly below sticky header -->
    <div class="shop-page-container">
      <!-- Controls: Filters & Search -->
      <div class="shop-controls">
        <!-- Category Filters -->
        <div class="category-filters">
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            class="filter-btn" 
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ currentLang === 'id' ? cat.nameId : cat.nameEn }}
          </button>
        </div>

        <!-- Search Bar -->
        <div class="shop-search-bar" :class="{ 'mobile-visible': isSearchOpen }">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            v-model="localSearchQuery" 
            type="text" 
            :placeholder="currentLang === 'id' ? 'Cari merchandise...' : 'Search merchandise...'" 
            class="shop-search-input"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="no-results-card">
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <p class="no-results-text">{{ currentLang === 'id' ? 'Tidak ada produk yang cocok.' : 'No products match.' }}</p>
      </div>

      <!-- Product Grid (4x3 Grid layout on desktop) -->
      <div v-else class="shop-products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="handleCardClick(product, $event)"
        >
          <!-- Product image container -->
          <div class="product-image-container">
            <div class="badges-container" style="position: absolute; top: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 3; align-items: flex-start;">
              <div v-if="product.is_promo" class="promo-badge" style="background-color: #c94b4b; color: #fff; font-family: var(--font-body); font-size: 0.65rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                {{ product.promo_title || 'PROMO' }}
              </div>
              <div v-if="product.is_preorder" class="preorder-badge" style="position: static;">PREORDER</div>
            </div>
            <img :src="product.image" :alt="product.titleEn" class="product-image" />
            <!-- Centered View Details Overlay Button -->
            <div class="product-card-overlay">
              <button class="view-details-btn" @click.stop="openModal(product)">
                {{ t('viewDetails') }}
              </button>
            </div>
          </div>

          <!-- Product Details Info Row -->
          <div class="product-info-wrapper">
            <!-- Name -->
            <h3 class="product-title">{{ getProductTitle(product) }}</h3>
            
            <!-- Price (aligned right, below name) -->
            <div class="product-price-row" style="flex-direction: column; align-items: flex-end; gap: 2px;">
              <span class="product-price">{{ formatPrice(product.original_price) }}</span>
              <span v-if="product.is_promo" class="product-original-price" style="text-decoration: line-through; color: #c94b4b; font-size: 0.7rem; font-weight: 500;">{{ formatPrice(product.promo_price) }}</span>
            </div>
            

            <!-- Compact Quantity Selector (aligned right, below colors) -->
            <div class="product-actions-row">
              <div class="card-qty-selector">
                <button 
                  class="card-qty-btn" 
                  @click.stop="changeQty(product, selectedColors[product.id], -1)" 
                  :disabled="getProductTotal(product.id) === 0"
                  aria-label="Decrease quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="card-qty-value" :class="{ 'is-zero': getProductTotal(product.id) === 0 }">
                  {{ getProductTotal(product.id) }}
                </span>
                <button 
                  class="card-qty-btn" 
                  @click.stop="changeQty(product, selectedColors[product.id], 1)"
                  aria-label="Increase quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Divider Line -->
          <div class="card-divider"></div>

          <!-- Creator Section -->
          <div class="card-creator-section" @click.stop="openCreator(product.creator)">
            <div class="creator-avatar-wrapper">
              <img :src="product.creator?.image_url || '/logo_mocca.png'" :alt="product.creator?.name" class="creator-avatar" />
            </div>
            <div class="creator-info">
              <span class="creator-label">{{ product.creator?.creator_title || 'Official Store' }}</span>
              <div class="creator-name-wrapper" style="display: flex; align-items: center; gap: 4px;">
                <span class="creator-name">{{ product.creator?.name || 'Loading...' }}</span>
                <svg v-if="product.creator?.is_verified == 1" width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" stroke="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Modal Window Overlay -->
    <ProductModal 
      v-if="activeModalProduct" 
      :isOpen="isModalOpen" 
      :product="activeModalProduct" 
      @close="closeModal" 
    />
  </div>
  <VariantSelectModal 
      v-if="activeVariantProduct" 
      :isOpen="isVariantModalOpen" 
      :product="activeVariantProduct" 
      @close="closeVariantModal" 
    />
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import ProductModal from './ProductModal.vue';
import VariantSelectModal from './VariantSelectModal.vue';
import { addToCart, updateQuantity, getItemQuantity, getProductTotalQuantity, decreaseProductQuantity, currentLang, isSearchOpen, searchQuery, currentPage, activeCreatorSlug, activeCategory } from '../store/cart.js';

const isModalOpen = ref(false);
const activeModalProduct = ref(null);

const localSearchQuery = ref(searchQuery.value);

const openCreator = (creator) => {
  if (creator) {
    activeCreatorSlug.value = creator.slug || creator.id || '';
  }
  currentPage.value = 'creator';
};

watch(searchQuery, (newVal) => {
  localSearchQuery.value = newVal;
});

watch(localSearchQuery, (newVal) => {
  searchQuery.value = newVal;
});

const categories = [
  { id: 'all', nameId: 'Semua', nameEn: 'All' },
  { id: 'apparel', nameId: 'Apparel', nameEn: 'Apparel' },
  { id: 'accessories', nameId: 'Aksesoris', nameEn: 'Accessories' },
  { id: 'home', nameId: 'Record store', nameEn: 'Record store' },
  { id: 'bundles', nameId: 'Bundling', nameEn: 'Bundles' }
];

const openModal = (product) => {
  activeModalProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleCardClick = (product, event) => {
  // Prevent modal opening when clicking on quantity selector or swatches
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

// Reactive products list
const products = ref([]);

// Swatch selection state for each item
const selectedColors = ref({});

const fetchProducts = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/product?creator_id=187`);
    const json = await response.json();
    const data = json.data || (Array.isArray(json) ? json : null);
    
    if (data) {
      const checkPreorderActive = (p) => {
        if (p.is_preorder == 0) return false;
        if (!p.preorder_date_start) return p.is_preorder == 1;
        const now = new Date();
        const cleanStartDate = p.preorder_date_start.split(' ')[0];
        const cleanEndDate = p.preorder_date_end ? p.preorder_date_end.split(' ')[0] : '2099-12-31';
        const startStr = `${cleanStartDate}T${p.preorder_start_time || '00:00:00'}`;
        const endStr = `${cleanEndDate}T${p.preorder_end_time || '23:59:59'}`;
        return now >= new Date(startStr) && now <= new Date(endStr);
      };

      const checkPromoActive = (item, fallbackItem = null) => {
        const isPromo = item.is_promo == 1 || (fallbackItem && fallbackItem.is_promo == 1);
        if (!isPromo) return false;
        
        const startDate = item.promo_start_date || (fallbackItem && fallbackItem.promo_start_date) || null;
        const startTime = item.promo_start_time || (fallbackItem && fallbackItem.promo_start_time) || null;
        const endDate = item.promo_end_date || (fallbackItem && fallbackItem.promo_end_date) || null;
        const endTime = item.promo_end_time || (fallbackItem && fallbackItem.promo_end_time) || null;
        
        if (!startDate && !startTime) return true;
        
        const now = new Date();
        const cleanStartDate = startDate ? startDate.split(' ')[0] : now.toISOString().split('T')[0];
        const cleanEndDate = endDate ? endDate.split(' ')[0] : '2099-12-31';
        const startStr = `${cleanStartDate}T${startTime || '00:00:00'}`;
        const endStr = `${cleanEndDate}T${endTime || '23:59:59'}`;
        return now >= new Date(startStr) && now <= new Date(endStr);
      };

      products.value = data.filter(p => p.product_status_id == 2).map(p => {
        let price = parseInt(p.price);
        let variantId = null;
        let varians = p.varians || p.product_varian;
        let activeVarian = null;

        if (price === 0 && varians && varians.length > 0) {
          price = parseInt(varians[0].price);
          variantId = varians[0].id;
          activeVarian = varians[0];
        } else if (varians && varians.length > 0) {
          variantId = varians[0].id;
          activeVarian = varians[0];
        }
        
        let isPromo = false;
        let promoPrice = null;
        let promoTitle = null;

        if (checkPromoActive(p)) {
          isPromo = true;
          promoPrice = parseInt(p.promo_price || price);
          promoTitle = p.promo_title || 'PROMO';
        }

        let finalPrice = price;
        
        let images = p.images || p.product_image;
        return {
          id: p.id,
          slug: p.slug,
          category: 'apparel', // Default category since API might not provide exact categories matching UI
          titleEn: p.product_name,
          titleId: p.product_name,
          price: finalPrice,
          original_price: price,
          promo_price: promoPrice,
          is_promo: isPromo,
          promo_title: promoTitle,
          variant_id: variantId,
          image: images?.[0]?.image_url || '/mocca_group_tee.png',
          colors: ['cream'],
          creator: { 
            id: p.creator?.id,
            slug: p.creator?.slug_url || p.creator?.slug,
            name: p.creator?.name || 'My Diary Records', 
            is_verified: p.creator?.is_verified,
            image_url: p.creator?.image_url || '/logo_mocca.png',
            avatarInitial: p.creator?.name?.[0] || 'M',
            creator_title: 'Official Store'
          },
          has_store_location: p.has_store_location,
          admin_fee: p.admin_fee || 0,
          is_preorder: checkPreorderActive(p)
        };
      });
      
      data.forEach(p => {
        selectedColors.value[p.id] = 'cream';
      });
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() => {
  let result = products.value;
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value);
  }
  if (localSearchQuery.value) {
    const q = localSearchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.titleEn.toLowerCase().includes(q) || 
      p.titleId.toLowerCase().includes(q)
    );
  }
  return result;
});

const getProductTitle = (product) => {
  return currentLang.value === 'id' ? product.titleId : product.titleEn;
};

// Quantity handlers
const getProductTotal = (productId) => { return getProductTotalQuantity(productId); };

const isVariantModalOpen = ref(false);
const activeVariantProduct = ref(null);

const openVariantModal = (product) => {
  activeVariantProduct.value = product;
  isVariantModalOpen.value = true;
};

const closeVariantModal = () => {
  isVariantModalOpen.value = false;
};

const changeQty = (product, color, delta) => {
  if (delta > 0) {
    openVariantModal(product);
  } else {
    decreaseProductQuantity(product.id);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

// Translates for shop view
const translations = {
  id: {
    shopTitle: 'Toko',
    viewDetails: 'Lihat Detail',
  },
  en: {
    shopTitle: 'Shop',
    viewDetails: 'View Details',
  }
};

const t = (key) => {
  return translations[currentLang.value]?.[key] || translations.id[key];
};
</script>

<style scoped>
.shop-page-wrapper {
  background-color: #F5F2ED; /* Warm minimalist cream backdrop */
  width: 100%;
  min-height: 100vh;
  transition: var(--transition-smooth);
}

.shop-page-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 3rem 4rem 6rem 4rem;
  }

/* Beautiful Title styling in elegant serif typography */
.shop-title-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  text-align: center;
}

.shop-main-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.title-divider-wrapper {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 320px;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(47, 78, 62, 0.15);
}

.divider-spark {
  font-size: 1rem;
  color: rgba(47, 78, 62, 0.4);
  transform: translateY(-1px);
}

/* Controls: Filters & Search */
.shop-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1.5rem;
}

.category-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1 1 auto;
}

.filter-btn {
  background: transparent;
  border: 1px solid rgba(47, 78, 62, 0.15);
  border-radius: 8px;
  padding: 0.45rem 1.35rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.filter-btn:hover {
  border-color: var(--color-mocca-dark);
}

.filter-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.shop-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;
  flex: 1 1 250px;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--color-mocca-muted);
}

.shop-search-input {
  width: 100%;
  padding: 0.85rem 1.25rem 0.85rem 3rem;
  border: 1px solid rgba(47, 78, 62, 0.15);
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
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.05);
}

/* Empty State */
.no-results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background-color: var(--color-bg-light);
  border-radius: 12px;
  border: 1px dashed var(--color-mocca-border);
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
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

/* Grid Layout: 4 Columns on Desktop */
.shop-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.85rem; /* Slightly tighter gap for smaller cards */
}

/* Clean, thin outline product card */
.product-card {
  background-color: var(--color-bg-light);
  border: 1px solid rgba(47, 78, 62, 0.12); /* Thin chocolate outline */
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.02);
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-mocca-dark); /* Accent brown outline on hover */
  box-shadow: 0 12px 30px rgba(47, 78, 62, 0.06);
}

/* High-quality lifestyle photography showcase */
.product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #FAF8F5;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(47, 78, 62, 0.06);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.preorder-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: var(--color-mocca-dark);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 3;
  letter-spacing: 0.5px;
}

.product-card:hover .product-image {
  transform: scale(1.04);
}

/* Hover Details Overlay Button */
.product-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 78, 62, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
    justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: 2;
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
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.1);
  transform: translateY(10px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .view-details-btn {
  transform: translateY(0);
}

.view-details-btn:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
}

/* Card details styling - customized for 4 column smaller layout */
.product-info-wrapper {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-family: var(--font-body);
  font-size: 0.9rem; /* Smaller font for smaller card */
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.2rem;
}

/* Price below title, right aligned */
.product-price-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.35rem;
}

.product-price {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600; /* Semi-bold */
  color: var(--color-mocca-dark);
}

/* Colors left aligned */
.product-colors-row {
  display: flex;
  margin-bottom: 0.45rem;
}

.color-swatches {
  display: flex;
  gap: 0.35rem;
}

.swatch {
  width: 14px;
  height: 14px;
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

/* Creator & Divider Section styling */
.card-divider {
  height: 1px;
  background-color: var(--color-mocca-border);
  width: 100%;
}

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
}

.creator-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-mocca-border);
  display: block;
}

.creator-info {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
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

/* Qty button below colors, right aligned */
.product-actions-row {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

/* Swatch Color Hex codes */
.swatch-cream { background-color: #FDFBF7; }
.swatch-black { background-color: #212121; }
.swatch-green { background-color: #2D4C3A; }
.swatch-beige { background-color: #E6DCD2; }

/* Quantity Selector Component */
.card-qty-selector {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-mocca-dark);
  height: 32px; /* Slightly taller for better touch target */
}

.card-qty-btn {
  background: none;
  border: none;
  padding: 0 0.65rem;
  height: 100%;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  cursor: pointer;
  opacity: 0.8;
  transition: var(--transition-smooth);
}

.card-qty-btn:hover:not(:disabled) {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12);
}

.card-qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-icon {
  width: 12px;
  height: 12px;
}

.card-qty-value {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: #FFFFFF;
  min-width: 1.5rem;
  text-align: center;
  transition: color 0.3s ease;
}

.card-qty-value.is-zero {
  color: rgba(255, 255, 255, 0.6);
}


/* Responsive adjustments */
@media (max-width: 1200px) {
  .shop-products-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 Columns */
  }
}

@media (max-width: 900px) {
  .shop-products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 Columns */
  }
  .product-card-overlay {
    display: none !important; /* Mobile disables hover details overlay */
  }
  .shop-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .category-filters {
    justify-content: center;
    flex: none;
  }
  .shop-search-bar {
    max-width: 100%;
    flex: none;
  }
}

@media (max-width: 768px) {
  .shop-search-bar {
    display: none;
  }
  .shop-search-bar.mobile-visible {
    display: flex;
  }
  .card-creator-section {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  .creator-avatar {
    width: 30px;
    height: 30px;
  }
  .creator-label {
    font-size: 0.45rem;
  }
  .creator-name {
    font-size: 0.85rem;
  }
  .creator-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .shop-page-container {
    padding: 2.25rem 1.25rem 4rem 1.25rem;
  }
  .shop-main-title {
    font-size: 2.2rem;
  }
  .shop-title-section {
    margin-bottom: 1.5rem;
  }
  .shop-controls {
    margin-bottom: 2rem;
    gap: 1rem;
    align-items: center;
  }
  .category-filters {
    right: 0;
    width: 100vw;
    margin-left: -1.25rem;
    padding: 0 1.25rem;
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
  }
  .category-filters::-webkit-scrollbar {
    display: none;
  }
  .filter-btn {
    padding: 0.35rem 1rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .shop-search-bar {
    max-width: 90%;
    margin: 0 auto;
  }
  .shop-products-grid {
    grid-template-columns: 1fr; /* 1 Column */
  }
}
</style>
