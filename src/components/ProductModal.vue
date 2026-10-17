<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-backdrop" :class="{ 'is-inline': inline }" @click="!inline && close()">
      <div class="modal-container" @click.stop>
        <!-- Close button top-right -->
        <button v-if="!inline" class="close-modal-btn" @click="close" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="close-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="modal-main-content">
          <!-- Left Columns: Images Section -->
          <div class="modal-images-column">
            <!-- 1. Vertical Thumbnail Column -->
            <div class="thumbnails-sidebar">
              <button 
                v-for="(thumb, idx) in productData.thumbnails" 
                :key="idx" 
                :class="['thumb-btn', { active: activeImageIndex === idx }]"
                @click="activeImageIndex = idx"
              >
                <img :src="thumb" :alt="`${productTitle} thumb ${idx}`" class="thumb-img" />
              </button>
              <button class="size-chart-side-btn" @click="activeTab = 'size-chart'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ruler-icon"><rect x="2" y="8" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="11"></line><line x1="10" y1="8" x2="10" y2="11"></line><line x1="14" y1="8" x2="14" y2="11"></line><line x1="18" y1="8" x2="18" y2="11"></line></svg>
                <span>Size Chart</span>
              </button>
            </div>

            <!-- 2. Main Product Display frame -->
            <div class="main-display-frame" style="position: relative;">
              <button :class="['wishlist-btn-image', { active: isWishlisted }]" @click.stop="toggleWishlist">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.8" class="heart-icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>
              <img :src="productData.thumbnails[activeImageIndex]" :alt="productTitle" class="main-display-img" />
            </div>
          </div>

          <!-- Right Column: Info Panel -->
          <div class="modal-info-column">
            <!-- Title Header -->
            <div class="info-header">
              <div style="display: flex; align-items: flex-start; gap: 0.5rem; flex-direction: column;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; align-self: flex-start;">
                  <div v-if="isPromoActive" class="promo-badge" style="background-color: #c94b4b; color: #fff; font-family: var(--font-body); font-size: 0.65rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                    {{ promoTitle }}
                  </div>
                  <div v-if="activeProductItem && activeProductItem.is_preorder" class="preorder-badge" style="background-color: var(--color-mocca-dark); color: #fff; font-family: var(--font-body); font-size: 0.65rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                    PREORDER
                  </div>
                </div>
                <h2 class="info-title">{{ productTitle }}</h2>
              </div>
              
              <!-- Product Tabs -->
              <div class="product-tabs">
                <button class="tab-btn" :class="{ active: activeTab === 'description' }" @click="activeTab = 'description'">Deskripsi</button>
                <button class="tab-btn" :class="{ active: activeTab === 'size-chart' }" @click="activeTab = 'size-chart'">Size Chart</button>
                <button class="tab-btn" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Ulasan</button>
              </div>
            </div>

            <!-- Description Tab -->
            <div v-show="activeTab === 'description'" class="tab-content">
              <div class="product-description" v-html="productData.description"></div>
              
              <div class="feature-bar">
                <template v-for="(feat, idx) in productData.features" :key="idx">
                  <div v-if="feat.label === 'Official Merchandise Berean.id'" class="feature-item" style="gap: 0.4rem;">
                    <img :src="productData.creator?.image_url || '/logo_mocca.png'" alt="creator" class="creator-avatar" style="width: 24px; height: 24px; flex-shrink: 0;" />
                    <div class="creator-name-wrap" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0;">
                      <span class="feature-label" style="font-size: 0.65rem; color: var(--color-mocca-muted);">{{ productData.creator?.creator_title || 'Official Store' }}</span>
                      <div style="display: flex; align-items: center; gap: 0.2rem;">
                        <span class="feature-label" style="font-weight: 700; color: var(--color-mocca-dark);">{{ productData.creator?.name || 'Berean.id' }}</span>
                        <svg v-if="productData.creator?.is_verified == 1 || productData.creator?.is_verified === true || !productData.creator || productData.creator?.name === 'Berean.id'" width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6" stroke="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div v-else class="feature-item">
                    <div class="feature-icon" v-html="feat.icon"></div>
                    <span class="feature-label">{{ feat.label }}</span>
                  </div>
                </template>
              </div>
            </div>

            <!-- Size Chart Tab -->
            <div v-show="activeTab === 'size-chart'" class="tab-content">
              <div v-if="productData?.product_size_chart && productData.product_size_chart.length > 0" class="size-chart-container">
                <div v-for="chart in productData.product_size_chart" :key="chart.id" class="size-chart-img-wrapper" style="margin-bottom: 1rem;">
                  <img :src="chart.image_url" :alt="chart.name || 'Size Chart'" class="size-chart-img" style="width: 100%; border-radius: 8px;" />
                </div>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-show="activeTab === 'reviews'" class="tab-content">
              <div class="reviews-empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <p>Belum ada ulasan untuk produk ini.</p>
              </div>
            </div>

            <!-- Size selection -->
            <div class="selection-section">
              <span class="selection-title">Varian</span>
              <div class="selection-options sizes-row">
                <button 
                  v-for="sz in productData.sizes" 
                  :key="sz"
                  :class="['size-selector-btn', { active: selectedSize === sz }]"
                  @click="selectedSize = sz"
                >
                  {{ sz }}
                </button>
              </div>
              <!-- Stock Info -->
              <div v-if="productData.variants" class="stock-indicator">
                <span v-if="isCurrentSoldOut" class="stock-badge sold-out">Stok Habis</span>
                <span v-else class="stock-badge available">
                  {{ currentStockCount !== null ? `Sisa stok: ${currentStockCount}` : 'Tersedia' }}
                </span>
              </div>

              <!-- Store Location Info -->
              <div v-if="storeLocationInfo" class="store-location-info-simple" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                <span style="font-size: 0.7rem; color: var(--color-mocca-muted);">Dikirim dari :</span>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; color: var(--color-mocca-dark);"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span style="font-weight: 700; text-transform: uppercase;">{{ storeLocationDisplay }}</span>
                </div>
              </div>
            </div>

            <!-- Price and Quantity add to cart action panel -->
            <div class="checkout-control-section">
              <div class="modal-price-row">
                <span class="price-label">Price</span>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px;">
                  <span class="price-val">{{ formatPrice(originalPrice) }}</span>
                  <span v-if="isPromoActive" class="price-original" style="text-decoration: line-through; color: #c94b4b; font-size: 0.7rem; font-weight: 500;">{{ formatPrice(promoPrice) }}</span>
                </div>
              </div>

              <div class="actions-row">
                <div class="modal-qty-adjuster">
                  <button class="adjust-btn" @click="changeModalQty(-1)" :disabled="qty === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="adj-icon"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span class="qty-num">{{ qty }}</span>
                  <button class="adjust-btn" @click="changeModalQty(1)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="adj-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>

                <div class="cta-buttons-row">
                  <button class="add-to-cart-outline-btn" @click="handleAddToCart" :disabled="isCurrentSoldOut" aria-label="Add to cart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="bag-icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <span class="add-cart-label">+ Cart</span>
                  </button>
                  <button class="buy-now-solid-btn" @click="handleBuyNow" :disabled="isCurrentSoldOut">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related product cards (same card as beranda & shop page) -->
        <div class="related-products">
          <h3 class="related-title">{{ currentLang === 'id' ? 'Produk Terkait' : 'Related Products' }}</h3>
          <div class="related-grid">
            <div
              v-for="rp in expandedRelated"
              :key="rp._key"
              class="product-card related-product-card"
              @click="openRelated(rp)"
            >
              <div class="product-image-container">
                <div class="badges-container">
                  <div v-if="rp.is_promo || discountPercent(rp) > 0" class="status-badge status-promo">{{ rp.promo_title || 'PROMO' }}</div>
                  <div v-if="rp.is_preorder" class="status-badge">PRE-ORDER</div>
                </div>
                <div v-if="discountPercent(rp) > 0" class="discount-badge">-{{ discountPercent(rp) }}%</div>
                <img :src="rp.image" :alt="rp.title" class="product-image" />
                <div class="product-card-shine" aria-hidden="true"></div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ rp.title }}</h3>
                <div class="product-price-row">
                  <template v-if="discountPercent(rp) > 0">
                    <span class="product-price is-discount">{{ formatPrice(discountedPrice(rp)) }}</span>
                    <span class="product-original-price">{{ formatPrice(rp.original_price || rp.price) }}</span>
                  </template>
                  <template v-else>
                    <span class="product-price">{{ formatPrice(rp.original_price || rp.price) }}</span>
                  </template>
                </div>
                <div v-if="rp.rating" class="product-meta">
                  <span class="meta-rating">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                    {{ rp.rating.toFixed(1) }}
                  </span>
                  <span class="meta-dot">•</span>
                  <span>{{ formatSold(rp.total_sold) }} Sold</span>
                </div>
                <div class="product-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {{ rp.store_name }}
                </div>
              </div>
              <div class="card-divider"></div>
              <div class="card-creator-section">
                <div class="creator-avatar-wrapper">
                  <img :src="rp.creator?.image_url || '/logo/logo.webp'" :alt="rp.creator?.name" class="creator-avatar" />
                </div>
                <div class="creator-info">
                  <span class="creator-label">Provided by</span>
                  <div class="creator-name-wrapper" style="display: flex; align-items: center; gap: 4px;">
                    <span class="creator-name">{{ rp.creator?.name || 'Berean.id' }}</span>
                    <svg v-if="rp.creator?.is_verified == 1" width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Interactive toast -->
  <Transition name="toast-fade">
    <div v-if="toastActive" class="checkout-toast">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>{{ toastMessage }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { addToCart, updateQuantity, getItemQuantity, currentPage, currentLang, checkedCheckoutItems, DEFAULT_PICKUP_STORE, DEFAULT_PICKUP_LABEL, DEFAULT_PICKUP_CARD_LABEL, openProduct } from '../store/cart.js';

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  product: { type: Object, default: () => ({}) },
  inline: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const productTitle = computed(() => {
  if (!props.product) return '';
  return props.product.title || (currentLang.value === 'id' ? props.product.titleId : props.product.titleEn) || '';
});

const activeImageIndex = ref(0);
const selectedColor = ref('');
const selectedSize = ref('');
const qty = ref(1);
const isWishlisted = ref(false);
const activeTab = ref('description');
const toastActive = ref(false);
const toastMessage = ref('');

// Product specifications metadata
const productsMetadata = {
  tee: {
    description: 'Kaos premium berbahan cotton combed lembut dengan ilustrasi eksklusif Berean.id. Nyaman dipakai harian dengan desain minimalis yang hangat dan timeless.',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
    thumbnails: [
      '/mocca_group_tee.png', 
      '/mocca_col_apparel.png', 
      '/mocca_group_tee.png', 
      '/mocca_group_tee.png'
    ],
    features: [
      { label: '100% Cotton Combed 24s', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 2a4 4 0 0 0-4 4c0 .8.2 1.5.7 2.1L3.2 13.5a1.5 1.5 0 0 0 0 2.1l1.4 1.4a1.5 1.5 0 0 0 2.1 0l5.3-5.5c.6.5 1.3.7 2.1.7a4 4 0 0 0 4-4 4 4 0 0 0-4-4z"/></svg>' },
      { label: 'Regular Fit Unisex', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M20.37 4.65a2 2 0 0 0-1.87-1.35H5.5a2 2 0 0 0-1.87 1.35L2 10.65v8.7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.7z"/></svg>' },
      { label: 'Sablon Premium', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15l-3.08-3.08a2 2 0 0 0-2.83 0L9 18"></path></svg>' },
      { label: 'Comfortable & Breathable', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M2 22c5.5-5.5 6-12 6-12s6.5-.5 12 5.5m0-13.5c-5.5 5.5-6 12-6 12s-6.5.5-12-5.5"/></svg>' }
    ]
  },
  tote: {
    description: 'Tote bag kanvas premium dengan sablon logo Berean.id. Cocok untuk membawa perlengkapan harian Anda secara stylish dan ramah lingkungan.',
    sizes: ['One Size'],
    defaultSize: 'One Size',
    thumbnails: [
      '/mocca_tote_bag.png', 
      '/mocca_col_accessories.png', 
      '/mocca_tote_bag.png', 
      '/mocca_tote_bag.png'
    ],
    features: [
      { label: 'Premium Canvas 12oz', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>' },
      { label: 'Spacious Compartment', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>' },
      { label: 'Sablon Plastisol', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"/></svg>' },
      { label: 'Durable & Water Resistant', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
    ]
  },
  mug: {
    description: 'Cangkir enamel klasik tahan panas dengan aksen rim hitam elegan. Sempurna menemani waktu minum kopi hangat sambil mendengarkan alunan lagu Berean.id.',
    sizes: ['350ml'],
    defaultSize: '350ml',
    thumbnails: [
      '/mocca_enamel_mug.png', 
      '/mocca_col_everyday.png', 
      '/mocca_enamel_mug.png', 
      '/mocca_enamel_mug.png'
    ],
    features: [
      { label: 'High Quality Enamel', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M17 8h1a4 4 0 1 1 0 8h-1M5 8h12v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/></svg>' },
      { label: 'Heat Resistant', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>' },
      { label: 'Classic Vintage Rim', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse></svg>' },
      { label: 'Eco-Friendly & Safe', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
    ]
  },
  cap: {
    description: 'Topi baseball bergaya kasual dengan bordir logo Berean.id di bagian depan. Dilengkapi pengatur ukuran logam kuningan premium di belakang.',
    sizes: ['Adjustable'],
    defaultSize: 'Adjustable',
    thumbnails: [
      '/mocca_logo_cap.png', 
      '/mocca_col_accessories.png', 
      '/mocca_logo_cap.png', 
      '/mocca_logo_cap.png'
    ],
    features: [
      { label: '100% Cotton Twill', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>' },
      { label: 'Adjustable Brass Strap', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="9"></circle><path d="M12 17v-5"/></svg>' },
      { label: 'High-Density Embroidery', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>' },
      { label: 'UV Protection Visor', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>' }
    ]
  }
};

const fetchedProductDetails = ref(null);
const isLoadingDetails = ref(false);

// Compute dynamic metadata based on product id or fetched data
const productData = computed(() => {
  if (fetchedProductDetails.value) {
    const d = fetchedProductDetails.value;
    
    const variants = d.productVarian || d.product_varian || [];
    const sizes = [...new Set(variants.map(v => v.varian_name).filter(Boolean))];
    const defaultSize = sizes.length > 0 ? sizes[0] : 'One Size';
    const thumbnails = d.product_image && d.product_image.length > 0 
      ? d.product_image.map(img => img.image_url) 
      : (props.product?.image ? [props.product.image] : ['/mocca_group_tee.png']);

    const plainDesc = d.description || 'Official merchandise Berean.id.';

    return {
      description: plainDesc,
      sizes: sizes.length > 0 ? sizes : ['One Size'],
      defaultSize: defaultSize,
      thumbnails: thumbnails,
      variants: variants,
      product_size_chart: d.product_size_chart || [],
      creator: d.creator ? { ...d.creator, creator_title: props.product?.creator?.creator_title } : props.product?.creator,
      features: [
        { label: 'Official Merchandise Berean.id', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"/></svg>' }
      ]
    };
  }
  
  const meta = productsMetadata[props.product?.id] || productsMetadata.tee;
  return {
    ...meta,
    creator: props.product?.creator || null,
    thumbnails: props.product?.image ? [props.product.image] : meta.thumbnails
  };
});

const currentVariant = computed(() => {
  if (productData.value && productData.value.variants) {
    return productData.value.variants.find(v => v.varian_name === selectedSize.value);
  }
  return null;
});

const currentStockCount = computed(() => {
  if (currentVariant.value) {
    if (currentVariant.value.stock_summary && currentVariant.value.stock_summary.sisa_stock !== undefined) {
      return currentVariant.value.stock_summary.sisa_stock;
    }
    if (currentVariant.value.stock !== undefined) {
      return currentVariant.value.stock;
    }
    if (currentVariant.value.sisa_stock !== undefined) {
      return currentVariant.value.sisa_stock;
    }
  }
  
  if (fetchedProductDetails.value) {
    if (fetchedProductDetails.value.stock_summary && fetchedProductDetails.value.stock_summary.sisa_stock !== undefined) {
      return fetchedProductDetails.value.stock_summary.sisa_stock;
    }
    if (fetchedProductDetails.value.sisa_stock !== undefined) {
      return fetchedProductDetails.value.sisa_stock;
    }
  }

  if (props.product) {
    if (props.product.stock_summary && props.product.stock_summary.sisa_stock !== undefined) {
      return props.product.stock_summary.sisa_stock;
    }
    if (props.product.sisa_stock !== undefined) {
      return props.product.sisa_stock;
    }
    if (props.product.stock !== undefined) {
      return props.product.stock;
    }
  }
  return null;
});

const storeLocationDisplay = computed(() => {
  return DEFAULT_PICKUP_LABEL;
});
const storeLocationInfo = computed(() => {
  return fetchedProductDetails.value?.has_store_location || props.product?.has_store_location || DEFAULT_PICKUP_STORE;
});

// Related products: same source as shop/beranda, mapped to card shape — one horizontal line, 5 visible, rest scrolls
const relatedRaw = ref([]);
const relatedProducts = computed(() => {
  const list = relatedRaw.value.filter(r => r.id !== props.product?.id).slice(0, 5);
  if (list.length > 0) return list;
  // fallback: show current product as card if API empty
  if (!props.product?.id) return [];
  return [{
    id: props.product.id,
    slug: props.product.slug,
    title: productTitle.value || 'Berean.id Official Merch',
    price: props.product.price || props.product.original_price || 0,
    original_price: props.product.original_price || props.product.price || 0,
    promo_price: props.product.promo_price || null,
    discount: props.product.discount || 0,
    is_promo: !!props.product.is_promo,
    promo_title: props.product.promo_title || 'PROMO',
    image: props.product.image || '/slider/slider1.png',
    is_preorder: !!props.product.is_preorder,
    rating: props.product.rating || null,
    total_sold: props.product.total_sold || 0,
    store_name: DEFAULT_PICKUP_CARD_LABEL,
    creator: props.product.creator || { name: 'Berean.id', is_verified: 1, image_url: '/logo/logo.webp' },
    has_store_location: props.product.has_store_location || DEFAULT_PICKUP_STORE,
    variant_id: props.product.variant_id || null,
  }];
});
const fetchRelated = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const res = await fetch(`${apiUrl}/api/creator-maping-product/berean.id?page=1`);
    const json = await res.json();
    const data = json.products?.data || json.data || [];
    const mapped = data.filter(p => p.product_status_id == 2).map(p => {
      const price = parseInt(p.price || p.varians?.[0]?.price || 0);
      const images = p.images || p.product_image;
      return {
        id: p.id,
        slug: p.slug,
        title: p.product_name,
        price,
        original_price: price,
        promo_price: p.promo_price ? parseInt(p.promo_price) : null,
        discount: p.discount || 0,
        is_promo: p.is_promo == 1,
        promo_title: p.promo_title || 'PROMO',
        image: images?.[0]?.image_url || '/slider/slider1.png',
        is_preorder: p.is_preorder == 1,
        rating: p.average_star ? parseFloat(String(p.average_star).replace(',', '.')) : null,
        total_sold: p.total_sold || 0,
        store_name: DEFAULT_PICKUP_CARD_LABEL,
        creator: { name: p.creator?.name || 'Berean.id', is_verified: p.creator?.is_verified ?? 1, image_url: p.creator?.image_url || '/logo/logo.webp' },
        has_store_location: p.has_store_location || p.store_location || DEFAULT_PICKUP_STORE,
        variant_id: p.varians?.[0]?.id || p.product_varian?.[0]?.id || null,
        raw: p,
      };
    });
    relatedRaw.value = mapped;
  } catch (_) {}
};
const expandedRelated = computed(() => {
  const base = relatedProducts.value;
  if (base.length === 0) return [];
  if (base.length > 5) return base.map((r, i) => ({ ...r, _key: `${r.id}-${i}` }));
  const out = [];
  let i = 0;
  while (out.length < 10) {
    const src = base[i % base.length];
    out.push({ ...src, _key: `${src.id}-${out.length}` });
    i++;
  }
  return out;
});
const openRelated = (rp) => {
  const src = rp.raw || rp;
  // map to shape expected by openProduct / ProductModal
  const mapped = {
    id: rp.id,
    slug: rp.slug,
    title: rp.title,
    titleEn: rp.title,
    titleId: rp.title,
    price: rp.price,
    original_price: rp.original_price,
    promo_price: rp.promo_price,
    discount: rp.discount,
    is_promo: rp.is_promo,
    promo_title: rp.promo_title,
    image: rp.image,
    is_preorder: rp.is_preorder,
    rating: rp.rating,
    total_sold: rp.total_sold,
    store_name: rp.store_name,
    creator: rp.creator,
    has_store_location: rp.has_store_location,
    variant_id: rp.variant_id,
  };
  // if modal is inline (page product), navigate via openProduct; else just switch product inside modal
  if (props.inline) {
    openProduct(mapped);
  } else {
    // update modal product in place
    fetchedProductDetails.value = null;
    activeImageIndex.value = 0;
    // trigger parent to swap product by emitting? fallback: open as new page
    openProduct(mapped);
  }
};
const formatSold = (n) => {
  if (!n) return '0';
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}rb+`;
  return `${n}+`;
};
const discountPercent = (p) => {
  const base = Number(p?.original_price) || 0;
  const discPrice = Number(p?.promo_price) || 0;
  if (base && discPrice && discPrice < base) return Math.round(((base - discPrice) / base) * 100);
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

const checkPromoActive = (item, fallbackItem = null) => {
  let targetItem = null;

  // Variant specifically defines promo behavior
  if (item && item.is_promo !== undefined) {
    if (item.is_promo != 1) return false;
    targetItem = item;
  } else if (fallbackItem && fallbackItem.is_promo == 1) {
    targetItem = fallbackItem;
  }

  if (!targetItem) return false;
  
  const startDate = targetItem.promo_start_date || null;
  const startTime = targetItem.promo_start_time || null;
  const endDate = targetItem.promo_end_date || null;
  const endTime = targetItem.promo_end_time || null;
  
  if (!startDate && !startTime) return true;
  
  const now = new Date();
  const cleanStartDate = startDate ? startDate.split(' ')[0] : now.toISOString().split('T')[0];
  const cleanEndDate = endDate ? endDate.split(' ')[0] : '2099-12-31';
  const startStr = `${cleanStartDate}T${startTime || '00:00:00'}`;
  const endStr = `${cleanEndDate}T${endTime || '23:59:59'}`;
  return now >= new Date(startStr) && now <= new Date(endStr);
};

const activeProductItem = computed(() => {
  return fetchedProductDetails.value || props.product || null;
});

const isPromoActive = computed(() => {
  return checkPromoActive(currentVariant.value, activeProductItem.value);
});

const promoTitle = computed(() => {
  if (currentVariant.value && currentVariant.value.is_promo == 1 && currentVariant.value.promo_title) return currentVariant.value.promo_title;
  if (activeProductItem.value && activeProductItem.value.is_promo == 1 && activeProductItem.value.promo_title) return activeProductItem.value.promo_title;
  return 'PROMO';
});

const originalPrice = computed(() => {
  if (currentVariant.value) {
    return parseInt(currentVariant.value.price || 0);
  }
  return parseInt(props.product.original_price || props.product.price || 0);
});

const promoPrice = computed(() => {
  if (isPromoActive.value) {
    let pPrice = null;
    if (currentVariant.value && currentVariant.value.is_promo == 1 && currentVariant.value.promo_price) {
      pPrice = parseInt(currentVariant.value.promo_price);
    } else if (activeProductItem.value && activeProductItem.value.is_promo == 1 && activeProductItem.value.promo_price) {
      pPrice = parseInt(activeProductItem.value.promo_price);
    }
    if (pPrice !== null && !isNaN(pPrice)) return pPrice;
  }
  return null;
});

const activePrice = computed(() => {
  return originalPrice.value;
});

const isCurrentSoldOut = computed(() => {
  if (currentVariant.value) {
    return currentVariant.value.is_soldout === 1 || currentStockCount.value === 0;
  }
  return false;
});

watch(isCurrentSoldOut, (soldOut) => {
  if (soldOut) {
    qty.value = 0;
  } else if (qty.value === 0) {
    qty.value = 1;
  }
});

// Watch for product data changes to reset selected size if needed
watch(productData, (newMeta) => {
  if (!selectedSize.value || !newMeta.sizes.includes(selectedSize.value)) {
    selectedSize.value = newMeta.defaultSize;
  }
});

// Watch for product changes to reset selectors and fetch details
watch(() => props.product, async (newVal) => {
  if (newVal && newVal.id) {
    activeImageIndex.value = 0;
    selectedColor.value = newVal.colors ? newVal.colors[0] : 'cream';
    isWishlisted.value = false;
    fetchedProductDetails.value = null;
    qty.value = getItemQuantity(newVal.id, selectedColor.value) || 1;
    fetchRelated();

    if (newVal.slug) {
      isLoadingDetails.value = true;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
        const response = await fetch(`${apiUrl}/api/product/${newVal.slug}`);
        const resJson = await response.json();
        if (resJson.data) {
          fetchedProductDetails.value = resJson.data;
          // Ensure default variant is selected immediately after fetch
          const variants = resJson.data.productVarian || resJson.data.product_varian || [];
          if (variants.length > 0) {
            selectedSize.value = variants[0].varian_name;
          } else {
            selectedSize.value = 'One Size';
          }
        }
      } catch(e) {
        console.error('Failed to fetch product details', e);
      } finally {
        isLoadingDetails.value = false;
      }
    } else {
      const meta = productData.value;
      selectedSize.value = meta.defaultSize;
    }
  }
}, { immediate: true });
onMounted(fetchRelated);

// Watch selected color changes to update quantity to match current cart count
watch(selectedColor, (newColor) => {
  if (props.product && props.product.id && newColor) {
    qty.value = getItemQuantity(props.product.id, newColor) || 1;
  }
});

const close = () => {
  emit('close');
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
  triggerToast(isWishlisted.value ? 'Added to wishlist!' : 'Removed from wishlist.');
};

const changeModalQty = (delta) => {
  if (isCurrentSoldOut.value) return;
  qty.value = Math.max(0, qty.value + delta); // Allow quantity down to 0!
};

const handleAddToCart = () => {
  const variantId = currentVariant.value ? currentVariant.value.id : (props.product.variant_id || null);
  const p = {
    id: props.product.id,
    title: productTitle.value,
    price: activePrice.value,
    image: props.product.image,
    variant_id: variantId,
    has_store_location: fetchedProductDetails.value?.has_store_location || props.product?.has_store_location || DEFAULT_PICKUP_STORE, admin_fee: fetchedProductDetails.value?.admin_fee || props.product?.admin_fee || 0
  };
  
  const variantVal = selectedSize.value || '-';
  
  // Calculate difference between desired quantity and current cart count
  const currentCartQty = getItemQuantity(p.id, variantVal);
  const diff = qty.value - currentCartQty;
  
  if (currentCartQty === 0 && qty.value > 0) {
    addToCart(p, variantVal, qty.value);
  } else if (diff !== 0) {
    updateQuantity(p.id, variantVal, diff);
  }
  
  if (qty.value === 0) {
    triggerToast('Item removed from Cart');
  } else {
    triggerToast(`Cart updated to ${qty.value} item(s)!`);
  }
  
  setTimeout(() => {
    close();
  }, 800);
};

const handleBuyNow = () => {
  if (isCurrentSoldOut.value) return;
  
  const productPrice = props.product.price || 0;
  const currentPrice = activePrice.value;
  const variantId = currentVariant.value ? currentVariant.value.id : (props.product.variant_id || null);

  const storeLocation = fetchedProductDetails.value?.has_store_location || props.product?.has_store_location || DEFAULT_PICKUP_STORE;

  checkedCheckoutItems.value = [{
    id: props.product.id,
    name: productTitle.value,
    price: currentPrice,
    qty: Math.max(1, qty.value),
    color: selectedColor.value,
    size: selectedSize.value || '-',
    image: props.product.image,
    note: '',
    variant_id: variantId,
    store_location: storeLocation,
    admin_fee: fetchedProductDetails.value?.admin_fee || props.product?.admin_fee || 0
  }];
  
  triggerToast(currentLang.value === 'id' ? 'Mengarahkan ke halaman checkout...' : 'Directing to checkout page...');
  setTimeout(() => {
    close();
    currentPage.value = 'payment';
  }, 800);
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2000);
};

const formatPrice = (price) => {
  if (!price) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 10, 10, 0.55);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-container {
  background-color: var(--color-bg-light);
  width: 960px;
  max-width: 95vw;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalScaleUp 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid var(--color-mocca-border);
}

@keyframes modalScaleUp {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-modal-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-mocca-dark);
  opacity: 0.6;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
  z-index: 10;
}

.close-modal-btn:hover {
  opacity: 1;
  background-color: rgba(47, 78, 62, 0.05);
}

.close-icon {
  width: 20px;
  height: 20px;
}

/* Modal Inner Columns */
.modal-main-content {
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 480px;
  overflow: hidden;
}

/* Left Image Column */
.modal-images-column {
  width: 52%;
  padding: 2.5rem;
  display: flex;
  gap: 1.25rem;
  background-color: #fff;
  border-right: 1px solid var(--color-mocca-border);
  overflow-y: auto;
}

/* 1. Thumbnails column */
.thumbnails-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
}

.thumb-btn {
  width: 68px;
  height: 68px;
  border-radius: 6px;
  overflow: hidden;
  border: 1.5px solid transparent;
  background-color: var(--color-bg-light);
  cursor: pointer;
  padding: 0;
  transition: var(--transition-smooth);
}

.thumb-btn.active,
.thumb-btn:hover {
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.size-chart-side-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  padding: 0.6rem 0;
  background-color: transparent;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-chart-side-btn:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.size-chart-side-btn .ruler-icon {
  width: 18px;
  height: 18px;
}

/* 2. Main Frame display */
.main-display-frame {
  flex-grow: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
}

.main-display-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

/* Right Info Column */
.modal-info-column {
  width: 48%;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.info-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.info-tag {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-mocca-muted);
}

.info-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
}

.info-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.rating-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.star-icon {
  width: 16px;
  height: 16px;
  color: #D9A05B; /* Cozy warm gold */
}

.rating-val {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.reviews-count {
  font-weight: 400;
  color: var(--color-mocca-muted);
}

.wishlist-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.wishlist-btn:hover,
.wishlist-btn.active {
  color: #c94b4b; /* Hot warm red */
}

.heart-icon {
  width: 16px;
  height: 16px;
}

.product-description {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.6;
  color: #55443a;
  margin-bottom: 0.85rem;
}

:deep(.product-description h2),
:deep(.product-description h3) {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

:deep(.product-description p) {
  margin-bottom: 0.5rem;
}

:deep(.product-description ul) {
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Size Chart */
.size-chart-container {
  margin-bottom: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-mocca-dark);
}

.table-scroll-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background-color: var(--color-bg-light);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.size-chart-title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-bg-light);
  background-color: var(--color-mocca-dark);
  padding: 0.65rem 1rem;
  margin: 0;
  text-align: center;
  letter-spacing: 0.05em;
}

.size-chart-img-wrapper {
  width: 100%;
  background-color: var(--color-bg-light);
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-mocca-border);
}

.size-chart-img {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.size-chart-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 0.8rem;
  text-align: center;
  background-color: var(--color-bg-light);
}

.size-chart-table th {
  background-color: #FAF6F0;
  color: var(--color-mocca-dark);
  font-weight: 700;
  padding: 0.65rem;
  border-bottom: 1px solid var(--color-mocca-border);
  border-right: 1px solid var(--color-mocca-border);
}

.size-chart-table th:last-child {
  border-right: none;
}

.size-chart-table td {
  padding: 0.6rem;
  border-bottom: 1px solid var(--color-mocca-border);
  border-right: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-weight: 500;
}

.size-chart-table td:last-child {
  border-right: none;
}

.size-chart-table tr:last-child td {
  border-bottom: none;
}

.size-chart-table tr:nth-child(even) {
  background-color: #FAF6F0;
}

/* Feature grid */
.feature-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #FAF6F0; /* Soft warm cream */
  border-radius: 8px;
  margin-bottom: 0.85rem;
  border: 1px solid var(--color-mocca-border);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-icon {
  color: var(--color-mocca-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

:deep(.f-icon) {
  width: 18px;
  height: 18px;
}

.feature-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
}

/* Selections options */
.selection-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.selection-title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.selection-options {
  display: flex;
  gap: 0.75rem;
}

.color-swatch-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  border: 1.5px solid rgba(0,0,0,0.06);
  position: relative;
  transition: var(--transition-smooth);
}

.color-swatch-circle:hover {
  transform: scale(1.1);
}

.color-swatch-circle.active::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 1.5px solid var(--color-mocca-dark);
  border-radius: 50%;
}

.circle-cream { background-color: #FAF6F0; }
.circle-black { background-color: #1C3026; }
.circle-green { background-color: #2E4A3E; }
.circle-beige { background-color: #D9C5B2; }

.sizes-row {
  display: flex;
  gap: 0.5rem;
}

.store-location-info {
  margin-top: 0.5rem;
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.75rem;
}

.store-location-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.4rem;
}

.store-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.store-icon {
  width: 14px;
  height: 14px;
  color: var(--color-mocca-muted);
}

.store-address {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
  padding-left: 1.3rem;
}

.size-selector-btn {
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.size-selector-btn:hover {
  border-color: var(--color-mocca-dark);
}

.size-selector-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.stock-indicator {
  margin-top: 0.5rem;
}

.stock-badge {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.stock-badge.sold-out {
  background-color: #FEE2E2;
  color: #B91C1C;
}

.stock-badge.available {
  background-color: #D1FAE5;
  color: #065F46;
}

/* Control & Checkout sections */
.checkout-control-section {
  border-top: 1px solid rgba(47, 78, 62, 0.08);
  padding-top: 1rem;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.price-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

.price-val {
  font-family: var(--font-body);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.actions-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.modal-qty-adjuster {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--color-bg-light);
  height: 44px;
}

.adjust-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  opacity: 0.7;
  transition: var(--transition-smooth);
}

.adjust-btn:hover:not(:disabled) {
  opacity: 1;
  background-color: rgba(47, 78, 62, 0.05);
}

.adjust-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.adj-icon {
  width: 12px;
  height: 12px;
}

.qty-num {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  width: 28px;
  text-align: center;
}

.add-to-cart-outline-btn {
  background: none;
  border: 1.5px solid var(--color-mocca-dark);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0 1.5rem;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition-smooth);
  flex-grow: 1;
  justify-content: center;
}

.add-to-cart-outline-btn:hover:not(:disabled) {
  background-color: rgba(47, 78, 62, 0.04);
}

.add-to-cart-outline-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: var(--color-mocca-muted);
  color: var(--color-mocca-muted);
}

.bag-icon {
  width: 16px;
  height: 16px;
}

.buy-now-solid-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0 1.5rem;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  flex-grow: 1;
  transition: var(--transition-smooth);
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.15);
}

.buy-now-solid-btn:hover:not(:disabled) {
  background-color: #1C3026;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.2);
}

.buy-now-solid-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
  background-color: var(--color-mocca-muted);
}

/* Related product cards — reuse main product-card look, 5 per row */
.related-products {
  border-top: 1px solid var(--color-mocca-border);
  background-color: #fff;
  padding: 1.5rem 2.5rem 2rem;
}

.related-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0 0 1rem;
}

.related-grid {
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(47,78,62,0.25) transparent;
}
.related-grid::-webkit-scrollbar { height: 6px; }
.related-grid::-webkit-scrollbar-thumb { background: rgba(47,78,62,0.25); border-radius: 999px; }
.related-grid::-webkit-scrollbar-track { background: transparent; }
.related-grid .product-card {
  cursor: pointer;
  flex: 0 0 calc((100% - 4 * 0.85rem) / 5);
  scroll-snap-align: start;
  min-width: 0;
}
.related-product-card .product-title {
  font-size: 0.85rem;
  min-height: 2.2rem;
}
.related-product-card .product-price {
  font-size: 0.85rem;
}
@media (max-width: 1200px) {
  .related-grid .product-card { flex-basis: calc((100% - 3 * 0.85rem) / 4); }
}
@media (max-width: 1024px) {
  .related-grid .product-card { flex-basis: calc((100% - 2 * 0.85rem) / 3); }
}
@media (max-width: 768px) {
  .related-grid { gap: 0.65rem; scroll-snap-type: x mandatory; }
  .related-grid .product-card { flex: 0 0 100%; }
}
@media (max-width: 480px) {
  .related-grid .product-card { flex: 0 0 100%; }
}
/* Card chrome reused from shop sections — ensure related cards match */
.related-grid .product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.related-grid .product-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
}
.related-grid .badges-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 3;
  align-items: flex-start;
}
.related-grid .status-badge {
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
.related-grid .status-promo { background-color: #c94b4b; }
.related-grid .discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  background-color: #d32f2f;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(211,47,47,0.35);
}
.related-grid .product-card-shine {
  position: absolute;
  top: -10%;
  bottom: -10%;
  left: 0;
  width: 55%;
  background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.25) 65%, transparent 100%);
  transform: translateX(-180%) skewX(-12deg);
  transition: transform 0.8s cubic-bezier(0.25,0.8,0.25,1);
  z-index: 2;
  pointer-events: none;
}
.related-grid .product-card:hover .product-card-shine { transform: translateX(280%) skewX(-12deg); }
@media (hover: hover) and (pointer: fine) {
  .related-grid .product-card:hover .product-image { transform: scale(1.06); }
}
.related-grid .product-info {
  padding: 0.35rem 0.25rem 0.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.1rem;
}
.related-grid .product-title {
  font-family: var(--font-body);
  font-weight: 700;
  color: #111;
  line-height: 1.25;
  margin: 0;
}
.related-grid .product-price-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  margin-top: 0.05rem;
}
.related-grid .product-price {
  font-family: var(--font-body);
  font-weight: 700;
  color: #111;
  white-space: nowrap;
  margin: 0;
}
.related-grid .product-price.is-discount { color: #d32f2f; }
.related-grid .product-original-price {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 400;
  color: #9a9a9a;
  text-decoration: line-through;
}
.related-grid .product-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-top: 0.15rem;
}
.related-grid .meta-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: #111;
  font-weight: 600;
}
.related-grid .meta-rating svg { width: 13px; height: 13px; color: #f5a524; }
.related-grid .meta-dot { opacity: 0.5; }
.related-grid .product-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-top: 0.1rem;
}
.related-grid .product-location svg { width: 13px; height: 13px; flex-shrink: 0; }
.related-grid .card-divider {
  height: 1px;
  width: 100%;
  border-top: 1px dashed rgba(0,0,0,0.12);
  background: transparent;
  margin: 0.15rem 0 0;
}
.related-grid .card-creator-section {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.25rem 0;
  background: transparent;
}
.related-grid .creator-avatar-wrapper { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.related-grid .creator-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; display: block; }
.related-grid .creator-info { display: flex; flex-direction: column; line-height: 1.25; }
.related-grid .creator-label { font-family: var(--font-body); font-size: 0.55rem; color: var(--color-mocca-muted); }
.related-grid .creator-name { font-family: var(--font-body); font-size: 0.85rem; font-weight: 700; color: var(--color-mocca-dark); }

/* Toast */
.checkout-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(47, 78, 62, 0.25);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 11000;
}

.toast-check-icon {
  width: 18px;
  height: 18px;
  color: #92e0a9;
}

/* Custom Added Styles for Tabs and New Layout */
.product-tabs {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.25rem;
  border-bottom: 1px solid var(--color-mocca-border);
}
.tab-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
  padding: 0.5rem 0;
  cursor: pointer;
  position: relative;
  transition: var(--transition-smooth);
}
.tab-btn:hover {
  color: var(--color-mocca-dark);
}
.tab-btn.active {
  color: var(--color-mocca-dark);
  font-weight: 700;
}
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-mocca-dark);
}
.tab-content {
  padding-top: 1.5rem;
  animation: fadeIn 0.3s ease;
}

.creator-info-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-bg-cream);
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
  margin-bottom: 1.5rem;
}
.creator-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(47, 78, 62, 0.1);
}
.creator-name-wrap {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.creator-name {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.wishlist-btn-image {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: var(--transition-smooth);
  z-index: 10;
  color: var(--color-mocca-muted);
}
.wishlist-btn-image:hover {
  transform: scale(1.05);
}
.wishlist-btn-image.active {
  color: #ef4444;
}

.cta-buttons-row {
  display: flex;
  gap: 0.75rem;
  flex-grow: 1;
}

.no-size-chart {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
  text-align: center;
  padding: 2rem 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed var(--color-mocca-border);
}

.reviews-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed var(--color-mocca-border);
}
.reviews-empty-state .empty-icon {
  width: 48px;
  height: 48px;
  color: #d1d5db;
  margin-bottom: 1rem;
}
.reviews-empty-state p {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-muted);
}

.store-location-info-simple {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  font-weight: 500;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: var(--color-bg-cream);
  border-radius: 6px;
  border: 1px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
}

.modal-fade-enter-from .modal-container {
  transform: scale(0.96) translateY(10px);
}

.modal-fade-leave-to .modal-container {
  transform: scale(0.96) translateY(10px);
}

/* Inline page mode (product detail as page, not popup) */
.modal-backdrop.is-inline {
  position: static;
  background: none;
  backdrop-filter: none;
  display: block;
  padding: 1.25rem 3rem 4rem;
  max-width: 1600px;
  margin: 0 auto;
}
.modal-backdrop.is-inline .modal-container {
  width: 100%;
  max-width: none;
  max-height: none;
  box-shadow: none;
  animation: none;
  border: none;
  overflow: visible;
  background: none;
}
.modal-backdrop.is-inline .modal-main-content {
  min-height: auto;
  height: auto;
  overflow: visible;
  background: none;
}

/* RESPONSIVE SCALING DESIGN */
@media (max-width: 991px) {
  .modal-container {
    max-height: 95vh;
  }
  .modal-main-content {
    flex-direction: column;
    min-height: auto;
  }
  .modal-images-column {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-mocca-border);
    padding: 1.75rem;
  }
  .modal-info-column {
    width: 100%;
    max-height: 380px;
    padding: 1.75rem;
  }
  .related-products {
    padding: 1.25rem 1.75rem 1.75rem;
  }
  .related-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }
}

@media (max-width: 768px) {
  .modal-backdrop {
    align-items: flex-end;
    padding: 0;
  }
  .modal-container {
    width: 100%;
    max-height: 90vh;
    border-radius: 24px 24px 0 0;
    overflow: visible; /* allow close button to be visible outside */
    border: none;
    animation: slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .close-modal-btn {
    top: -3.5rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.15);
    color: #fff;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .modal-main-content {
    flex-direction: column;
    height: 90vh;
    overflow-y: auto;
    border-radius: 24px 24px 0 0;
    background-color: var(--color-bg-light);
  }
  .modal-images-column {
    padding: 0;
    width: 100%;
    flex-direction: column;
    border: none;
    flex-shrink: 0;
    gap: 0.75rem;
  }
  .main-display-frame {
    width: 100%;
    height: auto;
    min-height: 300px;
    aspect-ratio: 1 / 1;
    border-radius: 24px 24px 0 0;
    border: none;
    background-color: var(--color-bg-light);
    order: -1;
  }
  .main-display-img {
    object-fit: contain;
    padding: 1rem;
  }
  .thumbnails-sidebar {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    padding: 0 1rem 1rem 1rem;
    gap: 0.5rem;
    align-items: center;
    -webkit-overflow-scrolling: touch;
  }
  .thumbnails-sidebar::-webkit-scrollbar {
    display: none;
  }
  .thumbnails-sidebar .thumb-btn {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
  }
  .size-chart-side-btn {
    flex-direction: row;
    width: auto;
    padding: 0.5rem 0.75rem;
    flex-shrink: 0;
  }
  .modal-info-column {
    max-height: none;
    overflow-y: visible;
    padding: 1.25rem 1rem 1.5rem;
  }
  .info-header {
    gap: 0.35rem;
    margin-bottom: 0.65rem;
  }
  .info-meta-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .size-chart-container {
    width: 100%;
    margin-top: 1rem;
  }
  .related-products {
    padding: 0.85rem 1rem 0.75rem;
  }
  .related-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .related-grid {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
  }
  .related-grid::-webkit-scrollbar {
    display: none;
  }
  .related-card {
    flex: 0 0 44%;
    min-width: 132px;
    max-width: 200px;
    scroll-snap-align: start;
  }
  .related-name {
    font-size: 0.75rem;
    line-height: 1.3;
    min-height: 1.95rem;
  }
  .info-title {
    font-size: clamp(1.15rem, 5vw, 1.35rem);
    line-height: 1.25;
  }
  .product-description {
    font-size: 0.8rem;
    line-height: 1.55;
    word-break: break-word;
  }
  .tab-btn {
    font-size: 0.8rem;
    padding: 0.6rem 0.75rem;
  }
  .selection-options {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .sizes-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .feature-bar {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    padding: 0.65rem 0.75rem;
  }
  .feature-label {
    font-size: 0.7rem;
  }
  .actions-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
  }
  .modal-qty-adjuster {
    width: 100%;
    height: 44px;
    background-color: #fff;
    color: var(--color-mocca-dark);
    border: 1px solid var(--color-mocca-border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: stretch;
  }
  .modal-qty-adjuster .adjust-btn {
    color: var(--color-mocca-dark);
    width: 44px;
    flex-shrink: 0;
    opacity: 1;
  }
  .modal-qty-adjuster .adjust-btn:first-child {
    border-right: 1px solid var(--color-mocca-border);
  }
  .modal-qty-adjuster .adjust-btn:last-child {
    border-left: 1px solid var(--color-mocca-border);
  }
  .modal-qty-adjuster .qty-num {
    color: var(--color-mocca-dark);
    font-size: 0.9rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cta-buttons-row {
    display: flex;
    gap: 0.6rem;
    align-items: stretch;
  }
  .add-to-cart-outline-btn {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    border-radius: 10px;
  }
  .add-to-cart-outline-btn .add-cart-label {
    display: none;
  }
  .add-to-cart-outline-btn .bag-icon {
    width: 18px;
    height: 18px;
  }
  .buy-now-solid-btn {
    width: auto;
    flex: 1;
    height: 44px;
    border-radius: 10px;
  }
  .modal-backdrop.is-inline {
    padding: 0.85rem 1rem 2.5rem;
  }
  .modal-backdrop.is-inline .modal-main-content {
    flex-direction: column;
    border: 1px solid var(--color-mocca-border);
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
  }
  .modal-backdrop.is-inline .modal-images-column {
    border-right: none;
    border-bottom: 1px solid var(--color-mocca-border);
    padding: 1rem;
    gap: 0.75rem;
  }
  .modal-backdrop.is-inline .modal-info-column {
    padding: 1.25rem 1rem 1.5rem;
  }
  .modal-backdrop.is-inline .related-products {
    padding: 1rem 1rem 1.25rem;
  }
}

@media (max-width: 480px) {
  .modal-info-column {
    padding: 1rem 0.85rem 1.25rem;
  }
  .main-display-frame {
    min-height: 260px;
  }
  .thumbnails-sidebar .thumb-btn {
    width: 56px;
    height: 56px;
  }
  .product-tabs {
    gap: 1rem;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .product-tabs::-webkit-scrollbar {
    display: none;
  }
  .tab-btn {
    flex-shrink: 0;
  }
  .table-scroll-wrapper {
    margin: 0 -0.25rem;
  }
  .related-products {
    padding: 0.85rem 0.85rem 1.1rem;
  }
  .checkout-toast {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }
}

@keyframes slideUpModal {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
