<template>
  <div class="shop-page-wrapper">
    <!-- Header Spacing to sit perfectly below sticky header -->
    <div class="shop-page-container">
      <!-- Controls: Filters -->
      <div class="shop-controls">
        <!-- Category Filters (same underline style as homepage filter-bar) -->
        <nav class="category-filters" aria-label="Filter product">
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            class="filter-btn" 
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ currentLang === 'id' ? cat.nameId : cat.nameEn }}
          </button>
        </nav>
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

      <!-- Product Grid (same card as homepage) -->
      <div v-else class="shop-products-grid" :class="{ 'is-loading': isLoading }">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="handleCardClick(product)"
        >
          <div class="product-image-container">
            <div class="badges-container">
              <div v-if="product.is_promo || discountPercent(product) > 0" class="status-badge status-promo">
                {{ product.promo_title || 'PROMO' }}
              </div>
              <div v-if="product.is_preorder" class="status-badge">PRE-ORDER</div>
            </div>
            <div v-if="discountPercent(product) > 0" class="discount-badge">-{{ discountPercent(product) }}%</div>
            <img :src="product.image" :alt="product.titleEn" class="product-image" />
            <!-- Light sweep shine on hover (replaces the old View Details button) -->
            <div class="product-card-shine" aria-hidden="true"></div>
          </div>

          <div class="product-info">
            <h3 class="product-title">{{ getProductTitle(product) }}</h3>
            <div class="product-price-row">
              <template v-if="discountPercent(product) > 0">
                <span class="product-price is-discount">{{ formatPrice(discountedPrice(product)) }}</span>
                <span class="product-original-price">{{ formatPrice(product.original_price) }}</span>
              </template>
              <template v-else>
                <span class="product-price">{{ formatPrice(product.original_price) }}</span>
              </template>
            </div>
            <div v-if="product.rating" class="product-meta">
              <span class="meta-rating">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                {{ product.rating.toFixed(1) }}
              </span>
              <span class="meta-dot">•</span>
              <span>{{ formatSold(product.total_sold) }} Sold</span>
            </div>
            <div v-if="product.store_name" class="product-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ product.store_name }}
            </div>
          </div>

          <!-- Divider Line -->
          <div class="card-divider"></div>

          <!-- Creator Section -->
          <div class="card-creator-section" @click.stop="openCreator(product.creator)">
            <div class="creator-avatar-wrapper">
              <img :src="product.creator?.image_url || '/logo/logo.webp'" :alt="product.creator?.name" class="creator-avatar" />
            </div>
            <div class="creator-info">
              <span class="creator-label">Provided by</span>
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

      <!-- Pagination (bottom) -->
      <nav
        v-if="!isSearchMode && totalPages > 1 && filteredProducts.length > 0"
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
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { currentLang, searchQuery, currentPage, activeCreatorSlug, activeCategory, openProduct, DEFAULT_PICKUP_STORE, DEFAULT_PICKUP_CARD_LABEL } from '../store/cart.js';

const openCreator = (creator) => {
  if (creator) {
    activeCreatorSlug.value = creator.slug || creator.id || '';
  }
  currentPage.value = 'creator';
};

const categories = [
  { id: 'all', nameId: 'Semua', nameEn: 'All' },
  { id: 'apparel', nameId: 'Apparel', nameEn: 'Apparel' },
  { id: 'accessories', nameId: 'Aksesoris', nameEn: 'Accessories' },
  { id: 'home', nameId: 'Record store', nameEn: 'Record store' },
  { id: 'bundles', nameId: 'Bundling', nameEn: 'Bundles' }
];

const openModal = (product) => openProduct(product);

const handleCardClick = (product) => openModal(product);

// Reactive products list
const products = ref([]);
const currentPageNum = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);
const isSearchMode = ref(false);
let fetchSeq = 0;

const isImageFileUrl = (url) => !!url && /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(url);

const buildApiUrl = (page = 1, perPage = null) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
  const params = new URLSearchParams({ page: String(page) });
  if (perPage) params.set('per_page', String(perPage));
  return `${apiUrl}/api/creator-maping-product/berean.id?${params.toString()}`;
};

const fetchProductPages = async () => {
  const firstJson = await fetch(buildApiUrl(1, 100)).then(res => res.json());
  const lastPage = firstJson.products?.last_page || 1;
  let allData = firstJson.products?.data || [];

  if (lastPage > 1) {
    const restJson = await Promise.all(
      Array.from({ length: lastPage - 1 }, (_, i) => fetch(buildApiUrl(i + 2, 100)).then(res => res.json()))
    );
    restJson.forEach(json => {
      allData = allData.concat(json.products?.data || []);
    });
  }

  return { json: firstJson, data: allData };
};

const fetchProducts = async (page = 1, { all = false } = {}) => {
  const seq = ++fetchSeq;
  isLoading.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    let json;
    let data;

    if (all) {
      const result = await fetchProductPages();
      json = result.json;
      data = result.data;
    } else {
      json = await fetch(`${apiUrl}/api/creator-maping-product/berean.id?page=${page}`).then(res => res.json());
      data = Array.isArray(json.products?.data) ? json.products.data : [];
    }

    if (seq !== fetchSeq) return;

    const pagination = json.products || {};
    const affiliate = json.affiliate_creators?.[0] || null;

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
        const storeLocation = p.store_location || p.pickup_store || p.has_store_location || DEFAULT_PICKUP_STORE;
        return {
          id: p.id,
          slug: p.slug,
          category: 'apparel', // Default category since API might not provide exact categories matching UI
          titleEn: p.product_name,
          titleId: p.product_name,
          price: finalPrice,
          original_price: price,
          promo_price: promoPrice,
          discount: p.discount,
          is_promo: isPromo,
          promo_title: promoTitle,
          variant_id: variantId,
          image: images?.[0]?.image_url || '/slider/slider1.png',
          colors: ['cream'],
          creator: { 
            id: p.creator?.id,
            slug: p.creator?.slug_url || p.creator?.slug || affiliate?.slug_url || affiliate?.slug,
            name: p.creator?.name || affiliate?.name || 'bereanid', 
            is_verified: p.creator?.is_verified ?? (affiliate ? 1 : undefined),
            image_url: isImageFileUrl(p.creator?.image_url) ? p.creator.image_url : (affiliate?.image_url || '/logo/logo.webp'),
            avatarInitial: (p.creator?.name || affiliate?.name)?.[0] || 'M',
            creator_title: affiliate?.creator_title || 'Official Store'
          },
          has_store_location: storeLocation || DEFAULT_PICKUP_STORE,
          store_name: DEFAULT_PICKUP_CARD_LABEL,
          rating: p.average_star ? parseFloat(String(p.average_star).replace(',', '.')) : null,
          total_sold: p.total_sold || 0,
          admin_fee: p.admin_fee || 0,
          is_preorder: checkPreorderActive(p)
        };
      });
    }

    if (all) {
      isSearchMode.value = true;
    } else {
      isSearchMode.value = false;
      currentPageNum.value = pagination.current_page || page;
      totalPages.value = pagination.last_page || 1;
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    if (seq === fetchSeq) isLoading.value = false;
  }
};

const goToPage = (page) => {
  if (isLoading.value || isSearchMode.value) return;
  if (page < 1 || page > totalPages.value || page === currentPageNum.value) return;
  fetchProducts(page);
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

onMounted(() => {
  if (searchQuery.value && searchQuery.value.trim()) {
    fetchProducts(1, { all: true });
  } else {
    fetchProducts(1);
  }
});

watch(searchQuery, (q) => {
  const hasQuery = !!(q && q.trim());
  if (hasQuery && !isSearchMode.value) {
    fetchProducts(1, { all: true });
  } else if (!hasQuery && isSearchMode.value) {
    fetchProducts(currentPageNum.value);
  }
});

const filteredProducts = computed(() => {
  let result = products.value;
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
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

const discountPercent = (p) => {
  const base = Number(p?.original_price) || 0;
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
  const base = Number(p?.original_price) || 0;
  if (base && discPrice && discPrice < base) return discPrice;
  const d = Number(p?.discount) || 0;
  if (d > 0 && d <= 100 && base) return Math.round(base * (1 - d / 100));
  return base;
};

const formatSold = (n) => {
  if (!n) return '0';
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}rb+`;
  return `${n}+`;
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
  background-color: #fff; /* Pure white background */
  width: 100%;
  min-height: 100vh;
  transition: var(--transition-smooth);
}

.shop-page-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 1.25rem 3rem 6rem 3rem;
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

/* Controls: filter-bar (same underline style as homepage) */
.shop-controls {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* divider between filtering and cards */
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  position: relative;
  padding: 0.4rem 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-muted);
  transition: color 200ms ease;
}

.filter-btn::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--color-mocca-dark);
  transform: scaleX(0);
  transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

.filter-btn.active {
  color: var(--color-mocca-dark);
  font-weight: 600;
}

.filter-btn.active::after {
  transform: scaleX(1);
}

.filter-btn:focus-visible {
  outline: 2px solid var(--color-mocca-dark);
  outline-offset: 3px;
}

/* Empty State */
.no-results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background-color: #fff;
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
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.85rem;
}

/* Same card look as homepage */
.product-card {
  background: none;
  border: none;
  border-radius: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  cursor: pointer;
  transition: var(--transition-smooth);
  box-shadow: none;
}

.product-card:hover {
  transform: none;
  box-shadow: none;
}

/* High-quality lifestyle photography showcase */
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

.product-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
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

.preorder-badge {
  position: static;
  background-color: #111;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 3;
  letter-spacing: 0.5px;
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .product-image {
    transform: scale(1.06);
  }
}

/* Hover shine sweep (replaces the old View Details button) */
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

/* Card details — same as homepage */
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
  min-height: 2.4rem; /* Two lines reserved so every card has the same height */
}

/* Price below title */
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

/* Creator & Divider Section styling */
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
}

.creator-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  display: block;
  flex-shrink: 0;
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

.creator-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Meta + location — same as homepage */
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
}

.product-location svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .product-image {
    transform: scale(1.06);
  }
}


/* Loading state while switching pages */
.shop-products-grid.is-loading {
  opacity: 0.45;
  pointer-events: none;
  transition: opacity 150ms ease;
}

/* Pagination (bottom) */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
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
  background-color: #fff;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.pagination-arrow svg {
  width: 16px;
  height: 16px;
}

.pagination-arrow:hover:not(:disabled),
.pagination-num:hover:not(.active):not(:disabled) {
  border-color: var(--color-mocca-dark);
  background-color: rgba(232, 226, 217, 0.25);
}

.pagination-arrow:disabled,
.pagination-num:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-num.active {
  background-color: var(--color-mocca-dark);
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

/* Responsive adjustments */
@media (max-width: 1200px) {
  .shop-page-container {
    padding: 1.25rem 2rem 4rem 2rem;
  }
  .shop-products-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)); /* 4 Columns */
    gap: 1rem;
  }
}

@media (max-width: 1024px) {
  .shop-products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 Columns */
    gap: 1rem;
  }
  .shop-controls {
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
  }
  .category-filters {
    justify-content: flex-start;
    gap: 1.25rem;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.25rem;
  }
  .filter-btn {
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .shop-page-container {
    padding: 1rem 1.25rem 3rem 1.25rem;
  }
  .shop-controls {
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    position: sticky;
    top: 64px;
    z-index: 500;
    background-color: #fff;
    padding-top: 0.5rem;
  }
  .category-filters {
    gap: 1.25rem;
  }
  .filter-btn {
    font-size: 0.85rem;
  }
  .shop-products-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.85rem;
    overflow: visible;
    padding-bottom: 0;
  }
  .shop-products-grid::-webkit-scrollbar {
    display: none;
  }
  .shop-products-grid .product-card {
    flex: none;
    scroll-snap-align: unset;
  }
  .product-info {
    padding: 0.45rem 0.15rem 0.25rem;
    gap: 0.15rem;
  }

  .product-title {
    font-size: 0.95rem;
    line-height: 1.3;
    min-height: unset;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    font-size: 0.95rem;
  }

  .product-original-price {
    font-size: 0.75rem;
  }

  .product-meta,
  .product-location {
    font-size: 0.72rem;
  }
  .discount-badge {
    font-size: 0.62rem;
    padding: 0.2rem 0.4rem;
    top: 6px;
    right: 6px;
  }
  .status-badge {
    font-size: 0.6rem;
    padding: 0.25rem 0.55rem 0.25rem 0.5rem;
  }
  .card-divider {
    margin: 0.12rem 0 0;
  }
  .card-creator-section {
    gap: 0.4rem;
    padding: 0.2rem 0.1rem 0;
    background-color: transparent;
  }
  .creator-avatar {
    width: 28px;
    height: 28px;
  }
  .creator-label {
    font-size: 0.45rem;
  }
  .creator-name {
    font-size: 0.8rem;
  }
  .creator-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .shop-page-container {
    padding: 0.85rem 1rem 3rem 1rem;
  }
  .shop-main-title {
    font-size: 2rem;
  }
  .shop-title-section {
    margin-bottom: 1.25rem;
  }
  .shop-controls {
    margin-bottom: 1rem;
    padding-bottom: 0.85rem;
    position: sticky;
    top: 64px;
    z-index: 500;
    background-color: #fff;
    padding-top: 0.5rem;
  }
  .shop-products-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
    overflow: visible;
    padding-bottom: 0;
  }
  .shop-products-grid::-webkit-scrollbar {
    display: none;
  }
  .shop-products-grid .product-card {
    flex: none;
    scroll-snap-align: unset;
  }
  .product-title {
    font-size: 0.9rem;
    line-height: 1.3;
    min-height: unset;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-price {
    font-size: 0.9rem;
  }
  .creator-name {
    font-size: 0.75rem;
  }
  .filter-btn {
    flex-shrink: 0;
    font-size: 0.8rem;
    white-space: nowrap;
  }
}
</style>
