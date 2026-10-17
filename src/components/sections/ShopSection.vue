<template>
  <section class="shop-section">
    <nav class="filter-bar" aria-label="Filter product">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="filter-btn"
        :class="{ active: productFilter === f.id }"
        @click="productFilter = f.id"
      >
        {{ currentLang === 'id' ? f.labelId : f.labelEn }}
      </button>
    </nav>
    <template v-for="(section, si) in sections" :key="section.titleKey">
      <div class="marquee-strip" aria-hidden="true">
        <div class="marquee-track">
          <span class="marquee-chunk">{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span class="marquee-chunk">{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ t('marqueeText') }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="shop-best-sellers" :class="{ 'section-alt': si % 2 === 1 && sections.length > 1 }">
      <div class="section-header">
        <div class="section-title-group">
          <div :ref="el => iconEls[section.titleKey] = el" class="section-title-icon" aria-hidden="true"></div>
          <h2 class="section-title">{{ t(section.titleKey) }}</h2>
        </div>
      </div>

      <div class="products-grid" :class="{ 'empty-grid': section.items.length === 0 }">
        <!-- Dynamic Product Cards -->
        <div v-for="(product, pi) in section.items" :key="si + '-' + pi + '-' + product.id" class="product-card" @click="handleCardClick(product)">
          <div class="product-image-container">
            <div class="badges-container">
              <div v-if="product.is_promo || discountPercent(product) > 0" class="status-badge status-promo">
                {{ product.promo_title || 'PROMO' }}
              </div>
              <div v-if="product.is_preorder" class="status-badge">PRE-ORDER</div>
            </div>
            <div v-if="discountPercent(product) > 0" class="discount-badge">-{{ discountPercent(product) }}%</div>
            <img :src="product.image" :alt="product.title" class="product-image" />
            <!-- Light sweep shine on hover (replaces the old View Details button) -->
            <div class="product-card-shine" aria-hidden="true"></div>
          </div>
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <div class="product-price-row">
              <template v-if="discountPercent(product) > 0">
                <span class="product-price is-discount">{{ formatPrice(discountedPrice(product)) }}</span>
                <span class="product-original-price">{{ formatPrice(product.original_price || product.price) }}</span>
              </template>
              <template v-else>
                <span class="product-price">{{ formatPrice(product.price || product.original_price) }}</span>
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
          <div class="card-creator-section" @click.stop="currentPage = 'creator'">
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

        <!-- Custom empty search state block -->
        <div v-if="section.items.length === 0" class="no-results-card">
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
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import lottie from 'lottie-web';
import { searchQuery, currentLang, currentPage, openProduct, productFilter, DEFAULT_PICKUP_STORE, DEFAULT_PICKUP_CARD_LABEL } from '../../store/cart.js';

const openModal = (product) => openProduct(product);

const handleCardClick = (product) => openModal(product);

const filters = [
  { id: 'all', labelId: 'Semua', labelEn: 'All' },
  { id: 'promo', labelId: 'Promo', labelEn: 'Promo' },
  { id: 'preorder', labelId: 'Pre-order', labelEn: 'Pre-order' },
];

// Reactive products list
const products = ref([]);

// Lightweight cards for the two non-primary sections (same catalog, shuffled)
const extraProducts = computed(() => {
  return products.value.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    original_price: p.original_price,
    promo_price: p.promo_price,
    discount: p.discount,
    is_promo: p.is_promo,
    promo_title: p.promo_title,
    image: p.image,
    is_preorder: false,
    rating: null,
    total_sold: 0,
    store_name: DEFAULT_PICKUP_CARD_LABEL,
    creator: p.creator,
  }));
});

// Fallback so the extra sections still render cards before the API resolves
const fallbackProducts = computed(() => {
  return extraProducts.value.length > 0 ? extraProducts.value : [
    { id: -1, title: 'Change Gray Reguler', price: 125000, image: '/slider/slider1.png', is_promo: false, is_preorder: false, rating: null, total_sold: 0, store_name: DEFAULT_PICKUP_CARD_LABEL, creator: { name: 'Berean.id', is_verified: 1, image_url: '/logo/logo.webp' } },
    { id: -2, title: 'Change Maroon Regular', price: 125000, image: '/slider/slider2.webp', is_promo: false, is_preorder: false, rating: null, total_sold: 0, store_name: DEFAULT_PICKUP_CARD_LABEL, creator: { name: 'Berean.id', is_verified: 1, image_url: '/logo/logo.webp' } },
    { id: -3, title: 'Change Still Blue Regular', price: 135000, image: '/slider/slider3.webp', is_promo: false, is_preorder: false, rating: null, total_sold: 0, store_name: DEFAULT_PICKUP_CARD_LABEL, creator: { name: 'Berean.id', is_verified: 1, image_url: '/logo/logo.webp' } },
    { id: -4, title: 'Change White Regular', price: 135000, image: '/slider/slider4.webp', is_promo: false, is_preorder: false, rating: null, total_sold: 0, store_name: DEFAULT_PICKUP_CARD_LABEL, creator: { name: 'Berean.id', is_verified: 1, image_url: '/logo/logo.webp' } },
  ];
});

const sections = computed(() => {
  return [
    { titleKey: 'bestSellers', items: expandedItems(filteredProducts.value) },
    { titleKey: 'newArrivals', items: expandedItems(rotatedProducts(1)) },
    { titleKey: 'curatedPicks', items: expandedItems(rotatedProducts(2)) },
  ];
});

// Reactive active swatch selections
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
          title: p.product_name,
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
            name: p.creator?.name || 'My Diary Records', 
            is_verified: p.creator?.is_verified,
            image_url: p.creator?.image_url || '/logo/logo.webp',
            avatarInitial: p.creator?.name?.[0] || 'M',
            creator_title: 'Official Store'
          },
          has_store_location: p.has_store_location || DEFAULT_PICKUP_STORE,
          store_name: DEFAULT_PICKUP_CARD_LABEL,
          rating: p.average_star ? parseFloat(p.average_star) : null,
          total_review: p.total_review || 0,
          total_sold: p.total_sold || 0,
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

const bookAnim = {};
const iconEls = {};
const layouts = ['bestSellers', 'newArrivals', 'curatedPicks'];

onMounted(() => {
  fetchProducts();
  layouts.forEach((key) => {
    const el = iconEls[key];
    if (!el) return;
    bookAnim[key] = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/icon/Book.json',
    });
  });
});

onUnmounted(() => {
  Object.values(bookAnim).forEach(anim => anim?.destroy());
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

// Reactive search filtering (applies to the primary section)
const filteredProducts = computed(() => {
  let list = products.value;
  if (productFilter.value === 'promo') list = list.filter(p => p.is_promo);
  if (productFilter.value === 'preorder') list = list.filter(p => p.is_preorder);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(q));
  }
  return list;
});

// Extra sections: same catalog, different order so they don't look duplicated
const rotatedProducts = (offset) => {
  const base = fallbackProducts.value;
  if (base.length === 0) return base;
  const k = offset % base.length;
  return [...base.slice(k), ...base.slice(0, k)];
};

// Horizontal scroll needs more than 5 cards — repeat catalog so each row scrolls
const expandedItems = (list) => {
  if (!list || list.length === 0) return list;
  if (list.length > 5) return list;
  const out = [];
  let i = 0;
  while (out.length < 10) {
    out.push(list[i % list.length]);
    i++;
  }
  return out;
};

const formatSold = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}rb+`;
  return `${n}+`;
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

const resetSearch = () => {
  searchQuery.value = '';
};

// Translations dictionary
const shopTranslations = {
  id: {
    bestSellers: 'Paling Laris',
    newArrivals: 'Produk Baru',
    curatedPicks: 'Pilihan Pilihan',
    viewAll: 'Lihat semua produk',
    viewDetails: 'Lihat Detail',
    marqueeText: 'Produk Original Berean.id — Kualitas Premium — Pengiriman Cepat',
    noProducts: 'Tidak ada produk yang cocok dengan pencarian Anda.'
  },
  en: {
    bestSellers: 'Shop Best Sellers',
    newArrivals: 'New Arrivals',
    curatedPicks: 'Curated Picks',
    viewAll: 'View all products',
    viewDetails: 'View Details',
    marqueeText: 'Original Berean.id Products — Premium Quality — Fast Shipping',
    noProducts: 'No products match your search.'
  }
};

const t = (key) => {
  return shopTranslations[currentLang.value]?.[key] || shopTranslations.id[key];
};
</script>

<style scoped>
.shop-section {
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
  transition: var(--transition-smooth);
}

/* Homepage filter hidden — filtering lives on the product page */
.filter-bar {
  display: none !important;
}

/* Green looping text divider between sections */
.marquee-strip {
  width: 100%;
  background-color: var(--color-mocca-dark);
  border-top: 1px solid var(--color-mocca-dark);
  border-bottom: 1px solid var(--color-mocca-dark);
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-flex;
  animation: marquee-slide 22s linear infinite;
  will-change: transform;
}

.marquee-chunk {
  display: inline-block;
  padding: 0.55rem 0;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
}

@keyframes marquee-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Part 1: Shop Best Sellers styling */
.shop-best-sellers {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 0.75rem 3rem 2rem 3rem; /* Tight to title above */
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.75rem;
}

.section-title-group {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.9rem);
}

.section-title-icon {
  width: clamp(40px, 4vw, 64px);
  height: clamp(40px, 4vw, 64px);
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 600;
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
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  padding-bottom: 0.5rem;
  margin: 0 -0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(47, 78, 62, 0.25) transparent;
}

.products-grid::-webkit-scrollbar {
  height: 6px;
}
.products-grid::-webkit-scrollbar-thumb {
  background: rgba(47, 78, 62, 0.25);
  border-radius: 999px;
}
.products-grid::-webkit-scrollbar-track {
  background: transparent;
}

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
  flex: 0 0 calc((100% - 4rem) / 5); /* 5 cards visible on desktop, rest scrolls */
  scroll-snap-align: start;
}

.product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1; /* Fixed square, independent of image natural size */
  height: auto;
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Clip the shine sweep inside the card image */
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

/* Part 2 removed — collections replaced by two extra product sections */
.section-alt {
  background-color: #fff;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .shop-best-sellers {
    padding: 0.75rem 2rem 2rem 2rem;
  }
  .product-card {
    flex-basis: calc((100% - 3rem) / 4); /* 4 cards visible, rest scrolls */
  }
  .section-header {
    margin-bottom: 0.75rem;
  }
}

@media (max-width: 1024px) {
  .product-card {
    flex-basis: calc((100% - 2rem) / 3); /* 3 cards visible, rest scrolls */
  }

  .section-header {
    margin-bottom: 0.65rem;
  }

  .section-title {
    font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  }
}

@media (max-width: 768px) {
  .shop-best-sellers {
    padding: 0.75rem 1.25rem 1.75rem 1.25rem;
  }
  .section-alt {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .section-title-icon {
    width: 36px;
    height: 36px;
  }

  .section-header {
    margin-bottom: 0.6rem;
    align-items: center;
  }
  .section-title {
    font-size: clamp(1.05rem, 4.5vw, 1.35rem);
    white-space: normal;
    line-height: 1.25;
  }

  .products-grid {
    gap: 0.85rem;
    scroll-snap-type: x mandatory;
  }

  .product-card {
    flex: 0 0 100%; /* 1 card visible on mobile, rest scrolls horizontally */
    scroll-snap-align: start;
  }

  .marquee-chunk {
    font-size: 0.7rem;
    padding: 0.45rem 0;
  }

  .product-image-container {
    border-radius: 10px;
  }

  .product-image {
    border-radius: 10px;
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

  .product-info {
    padding: 0.45rem 0.15rem 0.25rem;
    gap: 0.15rem;
  }

  .product-title {
    font-size: 0.95rem;
    line-height: 1.3;
    min-height: 2.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

  .card-divider {
    margin: 0.2rem 0 0;
  }

  .card-creator-section {
    gap: 0.45rem;
    padding: 0.25rem 0.15rem 0;
  }
  .creator-avatar {
    width: 30px;
    height: 30px;
  }
  .creator-label {
      font-size: 0.5rem;
  }
  .creator-name {
      font-size: 0.82rem;
  }

  .no-results-card {
    padding: 2.5rem 1.25rem;
  }
}

@media (max-width: 480px) {
  .shop-best-sellers {
    padding: 0.6rem 1rem 1.5rem 1rem;
  }

  .section-alt {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .section-header {
    margin-bottom: 0.5rem;
  }

  .products-grid {
    gap: 0.65rem;
    scroll-snap-type: x mandatory;
  }

  .product-card {
    flex: 0 0 100%; /* 1 card visible on small phones, rest scrolls horizontally */
  }

  .product-title {
    font-size: 0.9rem;
    min-height: 2.2rem;
  }

  .product-price {
    font-size: 0.9rem;
  }

  .creator-name {
    font-size: 0.78rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  .product-card-shine {
    transition: none;
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
  background-color: #fff; /* Pure white */
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
