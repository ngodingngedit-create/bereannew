<template>
  <section class="shop-section">
    <!-- Part 1: Shop Best Sellers -->
    <div class="shop-best-sellers">
      <div class="section-header">
        <h2 class="section-title">{{ t('bestSellers') }}</h2>
        <a href="#" class="view-all-link" @click.prevent="currentPage = 'shop'">
          {{ t('viewAll') }} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>

      <div class="products-grid" :class="{ 'empty-grid': filteredProducts.length === 0 }">
        <!-- Dynamic Product Cards -->
        <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="handleCardClick(product, $event)">
          <div class="product-image-container">
            <div class="badges-container" style="position: absolute; top: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 3; align-items: flex-start;">
              <div v-if="product.is_promo" class="promo-badge" style="background-color: #c94b4b; color: #fff; font-family: var(--font-body); font-size: 0.65rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                {{ product.promo_title || 'PROMO' }}
              </div>
              <div v-if="product.is_preorder" class="preorder-badge" style="position: static;">PREORDER</div>
            </div>
            <img :src="product.image" :alt="product.title" class="product-image" />
            <!-- Centered View Details Overlay Button -->
            <div class="product-card-overlay">
              <button class="view-details-btn" @click.stop="openModal(product)">
                {{ t('viewDetails') }}
              </button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            
            <!-- Price Row (underneath title, aligned to the right) -->
            <div class="product-price-row" style="flex-direction: column; align-items: flex-end; gap: 2px;">
              <span class="product-price">{{ formatPrice(product.original_price) }}</span>
              <span v-if="product.is_promo" class="product-original-price" style="text-decoration: line-through; color: #c94b4b; font-size: 0.7rem; font-weight: 500;">{{ formatPrice(product.promo_price) }}</span>
            </div>


            <!-- Interactive Quantity Selector -->
            <div class="product-actions">
              <div class="card-qty-selector">
                <button 
                  class="card-qty-btn" 
                  @click="changeQty(product, selectedColors[product.id], -1)" 
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
                  @click="changeQty(product, selectedColors[product.id], 1)"
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
          <div class="card-creator-section" @click.stop="currentPage = 'creator'">
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

        <!-- Custom empty search state block -->
        <div v-if="filteredProducts.length === 0" class="no-results-card">
          <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <p class="no-results-text">{{ t('noProducts') }}</p>
          <button class="reset-search-btn" @click="resetSearch">
            {{ currentLang === 'id' ? 'Reset Pencarian' : 'Reset Search' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Part 2: Collections Section -->
    <div class="collections-container">
      <div class="collections-layout">
        <!-- Left: Text & CTA -->
        <div class="collections-text-col">
          <h2 class="collections-title">{{ t('collections') }}</h2>
          <p class="collections-subtitle">{{ t('collectionsSub') }}</p>
          <button class="collections-cta-button" @click="currentPage = 'shop'">{{ t('exploreBtn') }}</button>
        </div>

        <!-- Right: 3 Landscape Thumbnails -->
        <div class="collections-grid">
          <!-- Item 1: Apparel -->
          <div class="collection-thumbnail-card">
            <div class="thumbnail-image-wrapper">
              <img src="/apparel.png" alt="Berean.id Apparel Curated Flat Lay" class="thumbnail-image" />
            </div>
            <h4 class="thumbnail-title">{{ currentLang === 'id' ? 'Apparel' : 'Apparel' }}</h4>
          </div>

          <!-- Item 2: Accessories -->
          <div class="collection-thumbnail-card">
            <div class="thumbnail-image-wrapper">
              <img src="/aksesoris.png" alt="Berean.id Accessories Curated Flat Lay" class="thumbnail-image" style="padding: 1.5rem; object-fit: contain;" />
            </div>
            <h4 class="thumbnail-title">{{ currentLang === 'id' ? 'Aksesoris' : 'Accessories' }}</h4>
          </div>

          <!-- Item 3: Everyday Items -->
          <div class="collection-thumbnail-card">
            <div class="thumbnail-image-wrapper">
              <img src="/record_store.png" alt="Berean.id Everyday Items Curated Flat Lay" class="thumbnail-image" />
            </div>
            <h4 class="thumbnail-title">{{ currentLang === 'id' ? 'Record store' : 'Record store' }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Product Detail Modal Window -->
    <ProductModal 
      v-if="activeModalProduct" 
      :isOpen="isModalOpen" 
      :product="activeModalProduct" 
      @close="closeModal" 
    />
  </section>
  <VariantSelectModal 
      v-if="activeVariantProduct" 
      :isOpen="isVariantModalOpen" 
      :product="activeVariantProduct" 
      @close="closeVariantModal" 
    />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductModal from '../ProductModal.vue';
import VariantSelectModal from '../VariantSelectModal.vue';
import { addToCart, updateQuantity, getItemQuantity, getProductTotalQuantity, decreaseProductQuantity,
  searchQuery,
  currentLang,
  currentPage
} from '../../store/cart.js';

// Modal trigger states
const activeModalProduct = ref(null);
const isModalOpen = ref(false);

const openModal = (product) => {
  activeModalProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleCardClick = (product, event) => {
  // Ignore clicks on swatches or quantity controls so they remain fully interactive
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

// Reactive active swatch selections
const selectedColors = ref({});

const fetchProducts = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/creator-maping-product/tokomocca.id`);
    const json = await response.json();
    const data = json.products?.data || (Array.isArray(json) ? json : json.data);
    
    const affiliateCreators = json.affiliate_creators || [];
    
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
        const currentCreator = affiliateCreators.find(c => c.id === p.creator?.id) || {};
        return {
          id: p.id,
          slug: p.slug,
          title: p.product_name,
          price: finalPrice,
          original_price: price,
          promo_price: promoPrice,
          is_promo: isPromo,
          promo_title: promoTitle,
          variant_id: variantId,
          image: images?.[0]?.image_url || '/mocca_group_tee.png',
          colors: ['cream'],
          creator: { 
            name: p.creator?.name || 'My Diary Records', 
            is_verified: p.creator?.is_verified,
            image_url: currentCreator.image_url || p.creator?.image_url || '/logo_mocca.png',
            avatarInitial: p.creator?.name?.[0] || 'M',
            creator_title: currentCreator.creator_title || 'Official Store'
          },
          has_store_location: p.has_store_location,
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

// Helper actions
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

// Reactive search filtering
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter(p => p.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const resetSearch = () => {
  searchQuery.value = '';
};

// Translations dictionary
const shopTranslations = {
  id: {
    bestSellers: 'Paling Laris',
    viewAll: 'Lihat semua produk',
    viewDetails: 'Lihat Detail',
    collections: 'Koleksi',
    collectionsSub: 'Jelajahi koleksi pilihan kami yang dirancang untuk setiap pencinta Berean.id.',
    exploreBtn: 'JELAJAHI KOLEKSI',
    noProducts: 'Tidak ada produk yang cocok dengan pencarian Anda.'
  },
  en: {
    bestSellers: 'Shop Best Sellers',
    viewAll: 'View all products',
    viewDetails: 'View Details',
    collections: 'Collections',
    collectionsSub: 'Explore our curated collections designed for every Berean.id lovers.',
    exploreBtn: 'EXPLORE COLLECTIONS',
    noProducts: 'No products match your search.'
  }
};

const t = (key) => {
  return shopTranslations[currentLang.value]?.[key] || shopTranslations.id[key];
};
</script>

<style scoped>
.shop-section {
  background-color: var(--color-bg-shop);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: var(--transition-smooth);
}

/* Part 1: Shop Best Sellers styling */
.shop-best-sellers {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 6rem 3rem 6rem; /* Softened bottom padding */
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 500;
  color: var(--color-mocca-dark);
}

.view-all-link {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition-smooth);
  border-bottom: 1.5px solid transparent;
  padding-bottom: 2px;
}

.view-all-link:hover {
  border-bottom-color: var(--color-mocca-dark);
}

.view-all-link:hover .arrow-icon {
  transform: translateX(4px);
}

.arrow-icon {
  width: 16px;
  height: 16px;
  transition: var(--transition-smooth);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 Columns on desktop */
  gap: 2rem;
}

.product-card {
  background-color: var(--color-bg-light);
  border-radius: 8px;
  border: 1px solid rgba(47, 78, 62, 0.15); /* Thin brown outline */
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.02);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-mocca-dark); /* Highlight outline on hover */
  box-shadow: 0 12px 30px rgba(47, 78, 62, 0.08);
}

.product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1; /* Beautiful square card image */
  overflow: hidden;
  background-color: var(--color-bg-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Position relative for hover overlay */
}

/* Premium Hover View Details Overlay */
.product-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(47, 78, 62, 0.35); /* Soft premium warm brown overlay */
  display: flex;
  align-items: center;
    justify-content: center;
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
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.6rem 1.1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.15);
  transform: translateY(8px);
  transition: var(--transition-smooth);
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

.product-info {
  padding: 1rem 1.25rem 0.85rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  line-height: 1.35;
  margin: 0 0 0.25rem 0;
  min-height: 2.4rem; /* Ensures title-heavy cards stay perfectly aligned */
}

.product-price-row {
  display: flex;
  justify-content: flex-end; /* Price aligned right underneath title */
  width: 100%;
  margin-bottom: 0.35rem;
}

.product-price {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600; /* semi-bold */
  color: var(--color-mocca-dark); /* Solid brown for premium contrast */
  white-space: nowrap;
  margin: 0;
}

.color-swatches-row {
  display: flex;
  justify-content: flex-start; /* Swatches left below price */
  width: 100%;
  margin-bottom: 0.5rem;
}

.color-swatches {
  display: flex;
  gap: 0.5rem;
}

.swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.06);
  position: relative;
  transition: var(--transition-smooth);
}

.swatch:hover {
  transform: scale(1.15);
}

.swatch.active::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 1px solid var(--color-mocca-dark);
  border-radius: 50%;
}

.swatch-cream {
  background-color: #FAF6F0;
}

.swatch-black {
  background-color: #1C3026;
}

.swatch-green {
  background-color: #2E4A3E;
}

.swatch-beige {
  background-color: #D9C5B2;
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
  padding: 0.6rem 1.25rem;
  background-color: var(--color-bg-light);
}

.creator-avatar-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

.product-actions {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end; /* Align quantity selector to the right */
}

.card-qty-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-mocca-dark); /* Solid brown background */
  border-radius: 8px;
  width: 120px; /* Highly compact, shorter button! */
  overflow: hidden;
  transition: var(--transition-smooth);
}

.card-qty-selector:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(47, 78, 62, 0.15);
}

.card-qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px; /* Smaller size! */
  height: 32px; /* Smaller size! */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF; /* Cream/white icons */
  opacity: 0.8;
  transition: var(--transition-smooth);
}

.card-qty-btn:hover:not(:disabled) {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12); /* Softer white highlight hover overlay */
}

.card-qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-icon {
  width: 12px; /* Smaller icon! */
  height: 12px; /* Smaller icon! */
}

.card-qty-value {
  font-family: var(--font-body);
  font-size: 0.85rem; /* Sized down! */
  font-weight: 700;
  color: #FFFFFF; /* Solid white text */
  transition: var(--transition-smooth);
}

.card-qty-value.is-zero {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* Part 2: Collections styling */
.collections-container {
  width: 100%;
  background-color: #FAF6F0; /* Elegant warm cream background */
  border-top: 1px solid var(--color-mocca-border);
  border-bottom: 1px solid var(--color-mocca-border);
}

.collections-layout {
  max-width: 1440px;
  margin: 0 auto;
  padding: 6rem 6rem;
  display: grid;
  grid-template-columns: 1fr 2.5fr; /* Text on left, 3 landscape thumbs on right */
  gap: 4rem;
  align-items: center;
}

.collections-text-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.collections-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 1rem;
  line-height: 1.15;
}

.collections-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-mocca-dark);
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.5;
  max-width: 320px;
}

.collections-cta-button {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 1.1rem 2.2rem;
  border-radius: 4px;
  border: none;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.12);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.collections-cta-button:hover {
  background-color: #1C3026;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.2);
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.collection-thumbnail-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
}

.thumbnail-image-wrapper {
  width: 100%;
  aspect-ratio: 1.4 / 1; /* Beautiful landscape thumbnail aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.04);
  background-color: var(--color-bg-cream);
  transition: var(--transition-smooth);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.collection-thumbnail-card:hover .thumbnail-image-wrapper {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(47, 78, 62, 0.08);
}

.collection-thumbnail-card:hover .thumbnail-image {
  transform: scale(1.05);
}

.thumbnail-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  text-align: left;
  transition: var(--transition-smooth);
}

.collection-thumbnail-card:hover .thumbnail-title {
  color: var(--color-mocca-muted);
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .shop-best-sellers {
    padding: 5rem 4rem 2.5rem 4rem;
  }
  .collections-layout {
    padding: 5rem 4rem;
    gap: 3rem;
  }
}

@media (max-width: 1024px) {
  .product-card-overlay {
    display: none !important; /* Touch viewport disables hover overlay */
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2x2 Grid on tablets */
    gap: 1.5rem;
  }

  .collections-layout {
    grid-template-columns: 1fr; /* Stack layout on tablet/mobile */
    gap: 3rem;
  }

  .collections-text-col {
    align-items: center;
    text-align: center;
  }

  .collections-subtitle {
    max-width: 480px;
  }

  .collections-grid {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .shop-best-sellers {
    padding: 4rem 2rem 2rem 2rem;
  }
  .collections-layout {
    padding: 4rem 2rem;
  }

  .section-header {
    margin-bottom: 1.5rem;
    align-items: center;
  }
  .section-title {
    font-size: 1.15rem;
    white-space: nowrap;
  }
  .view-all-link {
    font-size: 0.72rem;
    white-space: nowrap;
  }
  .view-all-link .arrow-icon {
    width: 12px;
    height: 12px;
  }

  .products-grid {
    grid-template-columns: 1fr; /* 1 column on mobile */
    gap: 1.5rem;
  }

  .collections-grid {
    grid-template-columns: 1fr; /* Stack collection items on mobile */
    gap: 2rem;
  }

  .thumbnail-image-wrapper {
    aspect-ratio: 1.6 / 1; /* Wider on mobile */
  }

  .card-creator-section {
    padding: 0.85rem 1rem;
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
}

/* Empty search results block */
.products-grid.empty-grid {
  display: block;
  width: 100%;
}

.no-results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #FAF6F0; /* Soft warm cream */
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
  margin-bottom: 1.5rem;
}

.reset-search-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.1);
  transition: var(--transition-smooth);
}

.reset-search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(47, 78, 62, 0.15);
}
</style>
