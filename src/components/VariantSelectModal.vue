<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-backdrop" @click="close">
      <div class="quick-add-modal" @click.stop>
        <!-- Close button top-right -->
        <button class="close-modal-btn" @click="close" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="close-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="modal-content-wrapper">
          <h2 class="modal-title">{{ currentLang === 'id' ? 'Pilih Varian' : 'Select Variant' }}</h2>
          
          <!-- Product Summary -->
          <div class="product-summary" v-if="product">
            <img :src="product.image" :alt="productTitle" class="summary-img" />
            <div class="summary-details" style="display: flex; flex-direction: column; align-items: flex-start;">
              <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start; margin-bottom: 4px;">
                <div v-if="isPromoActive" class="promo-badge" style="background-color: #c94b4b; color: #fff; font-family: var(--font-body); font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                  {{ promoTitle }}
                </div>
                <div v-if="activeProductItem && activeProductItem.is_preorder" class="preorder-badge" style="background-color: var(--color-mocca-dark); color: #fff; font-family: var(--font-body); font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                  PREORDER
                </div>
              </div>
              <h3 class="summary-title" style="margin-bottom: 2px;">{{ productTitle }}</h3>
              <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
                <p class="summary-price">{{ formatPrice(originalPrice) }}</p>
                <span v-if="isPromoActive" style="text-decoration: line-through; color: #c94b4b; font-size: 0.7rem; font-weight: 500;">{{ formatPrice(promoPrice) }}</span>
              </div>
            </div>
          </div>

          <div v-if="isLoadingDetails" class="loading-state">
            <div class="spinner"></div>
            <p>{{ currentLang === 'id' ? 'Memuat varian...' : 'Loading variants...' }}</p>
          </div>
          
          <div v-else class="variants-section">
            <div class="variant-group">
              <h4 class="variant-title">{{ currentLang === 'id' ? 'Pilih Varian' : 'Select Variant' }}</h4>
              <div class="size-selector">
                <button 
                  v-for="v in availableVariantsWithStock" 
                  :key="v.name" 
                  class="size-btn" 
                  :class="{ active: selectedSize === v.name, 'sold-out': v.soldOut }"
                  @click="!v.soldOut ? selectedSize = v.name : null"
                  :disabled="v.soldOut"
                >
                  {{ v.name }}
                </button>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="variant-group">
              <h4 class="variant-title">{{ currentLang === 'id' ? 'Kuantitas' : 'Quantity' }}</h4>
              <div class="qty-control">
                <button class="qty-btn" @click="decrementQty" :disabled="qty <= 1">-</button>
                <span class="qty-value">{{ qty }}</span>
                <button class="qty-btn" @click="incrementQty">+</button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button class="add-cart-btn" :class="{ 'disabled-btn': isCurrentSelectedSoldOut }" @click="handleAddToCart" :disabled="isCurrentSelectedSoldOut">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>{{ isCurrentSelectedSoldOut ? (currentLang === 'id' ? 'Stok Habis' : 'Out of Stock') : (currentLang === 'id' ? 'Tambah ke Keranjang' : 'Add to Cart') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Toast Notification -->
  <Transition name="toast-slide">
    <div v-if="toastActive" class="toast-notification">
      {{ toastMessage }}
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { currentLang, addToCart, getItemQuantity, updateQuantity } from '../store/cart.js';

const props = defineProps({
  isOpen: Boolean,
  product: Object
});

const emit = defineEmits(['close']);

const fetchedProductDetails = ref(null);
const isLoadingDetails = ref(false);
const selectedSize = ref('');
const selectedColor = ref('cream');
const qty = ref(1);

const toastActive = ref(false);
const toastMessage = ref('');

const productTitle = computed(() => {
  if (!props.product) return '';
  return currentLang.value === 'id' ? props.product.titleId : props.product.titleEn;
});

const availableVariants = computed(() => {
  if (fetchedProductDetails.value) {
    const variants = fetchedProductDetails.value.productVarian || fetchedProductDetails.value.product_varian || [];
    const uniqueVariants = [];
    const seenNames = new Set();
    for (const v of variants) {
      if (!seenNames.has(v.varian_name)) {
        seenNames.add(v.varian_name);
        uniqueVariants.push(v);
      }
    }
    return uniqueVariants;
  }
  return [];
});

const availableVariantsWithStock = computed(() => {
  if (availableVariants.value.length > 0) {
    return availableVariants.value.map(v => {
      // Force sold out if is_soldout is 1 or stock is empty
      const isSoldOut = v.is_soldout === 1 || v.is_soldout === true || (v.stock_summary && v.stock_summary.sisa_stock <= 0) || v.stock === 0;
      return {
        ...v,
        name: v.varian_name,
        soldOut: isSoldOut
      };
    });
  }
  
  const isProductSoldOut = props.product && (props.product.is_soldout === 1 || props.product.stock === 0);
  return [{ name: 'One Size', soldOut: isProductSoldOut }];
});

const isCurrentSelectedSoldOut = computed(() => {
  const selected = availableVariantsWithStock.value.find(v => v.name === selectedSize.value);
  return selected ? selected.soldOut : false;
});

const currentVariant = computed(() => {
  if (!selectedSize.value || availableVariants.value.length === 0) return null;
  return availableVariants.value.find(v => v.varian_name === selectedSize.value) || null;
});

const checkPromoActive = (item, fallbackItem = null) => {
  if (!item && !fallbackItem) return false;
  const isPromo = (item && item.is_promo == 1) || (fallbackItem && fallbackItem.is_promo == 1);
  if (!isPromo) return false;
  
  const startDate = (item && item.promo_start_date) || (fallbackItem && fallbackItem.promo_start_date) || null;
  const startTime = (item && item.promo_start_time) || (fallbackItem && fallbackItem.promo_start_time) || null;
  const endDate = (item && item.promo_end_date) || (fallbackItem && fallbackItem.promo_end_date) || null;
  const endTime = (item && item.promo_end_time) || (fallbackItem && fallbackItem.promo_end_time) || null;
  
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
  if (currentVariant.value && currentVariant.value.promo_title) return currentVariant.value.promo_title;
  if (activeProductItem.value && activeProductItem.value.promo_title) return activeProductItem.value.promo_title;
  return 'PROMO';
});

const originalPrice = computed(() => {
  if (currentVariant.value) {
    return parseInt(currentVariant.value.price || 0);
  }
  return parseInt(props.product?.original_price || props.product?.price || 0);
});

const promoPrice = computed(() => {
  if (isPromoActive.value) {
    let pPrice = null;
    if (currentVariant.value && currentVariant.value.promo_price) {
      pPrice = parseInt(currentVariant.value.promo_price);
    } else if (activeProductItem.value && activeProductItem.value.promo_price) {
      pPrice = parseInt(activeProductItem.value.promo_price);
    }
    if (pPrice !== null && !isNaN(pPrice)) return pPrice;
  }
  return null;
});

const currentPrice = computed(() => {
  return originalPrice.value;
});

// Watch for product changes to reset selectors and fetch details
watch(() => props.isOpen, async (newVal) => {
  if (newVal && props.product && props.product.id) {
    selectedColor.value = props.product.colors ? props.product.colors[0] : 'cream';
    fetchedProductDetails.value = null;
    qty.value = 1; // Default to adding 1
    selectedSize.value = '';

    if (props.product.slug) {
      isLoadingDetails.value = true;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
        const response = await fetch(`${apiUrl}/api/product/${props.product.slug}`);
        const resJson = await response.json();
        if (resJson.data) {
          fetchedProductDetails.value = resJson.data;
          const variants = resJson.data.productVarian || resJson.data.product_varian || [];
          if (variants.length > 0) {
            const firstAvailable = variants.find(v => v.is_soldout !== 1 && (!v.stock_summary || v.stock_summary.sisa_stock > 0) && v.stock !== 0);
            selectedSize.value = firstAvailable ? firstAvailable.varian_name : variants[0].varian_name;
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
      selectedSize.value = 'One Size';
    }
  }
}, { immediate: true });

const incrementQty = () => { qty.value++; };
const decrementQty = () => { if (qty.value > 1) qty.value--; };

const formatPrice = (price) => {
  if (!price) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2000);
};

const close = () => {
  emit('close');
};

const handleAddToCart = () => {
  if (!props.product) return;
  
  const variantId = currentVariant.value ? currentVariant.value.id : (props.product.variant_id || null);
  
  const p = {
    ...props.product,
    price: currentPrice.value,
    image: props.product.image,
    variant_id: variantId,
    has_store_location: fetchedProductDetails.value?.has_store_location || props.product?.has_store_location || null,
    admin_fee: fetchedProductDetails.value?.admin_fee || props.product?.admin_fee || 0
  };
  
  const variantVal = selectedSize.value || '-';
  
  // Directly add the selected qty of the selected variant to cart
  addToCart(p, variantVal, qty.value);
  
  triggerToast(currentLang.value === 'id' ? `Berhasil ditambah ke keranjang!` : `Added to cart successfully!`);
  
  setTimeout(() => {
    close();
  }, 600);
};

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(47, 78, 62, 0.4);
  backdrop-filter: blur(4px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.quick-add-modal {
  background-color: var(--color-bg-light);
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(47, 78, 62, 0.15);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: var(--color-mocca-dark);
  transition: all 0.2s ease;
}

.close-modal-btn:hover {
  background: var(--color-mocca-dark);
  color: #fff;
}

.modal-content-wrapper {
  padding: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.product-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-mocca-border);
}

.summary-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
  background: #f5f5f5;
}

.summary-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin-bottom: 0.25rem;
}

.summary-price {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-brand);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
  color: var(--color-mocca-muted);
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(47, 78, 62, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-mocca-dark);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.variant-group {
  margin-bottom: 1.5rem;
}

.variant-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin-bottom: 0.75rem;
}

.size-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.size-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-btn:hover {
  border-color: var(--color-mocca-dark);
}

.size-btn.active {
  background-color: var(--color-mocca-dark);
  color: #fff;
  border-color: var(--color-mocca-dark);
}

.size-btn.sold-out {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #f5f5f5;
  text-decoration: line-through;
  border-color: var(--color-mocca-border);
  color: var(--color-mocca-muted);
}

.qty-control {
  display: flex;
  align-items: center;
  width: max-content;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: var(--color-mocca-dark);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.qty-btn:hover:not(:disabled) {
  background-color: rgba(47, 78, 62, 0.05);
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-value {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
}

.add-cart-btn {
  width: 100%;
  padding: 0.85rem;
  background-color: #8c8c8c;
  color: var(--color-bg-light);
  border: none;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
  margin-top: 1rem;
}

.add-cart-btn:hover:not(:disabled) {
  background-color: #A03820;
  transform: translateY(-2px);
}

.add-cart-btn:disabled, .add-cart-btn.disabled-btn {
  background-color: #d1d1d1;
  color: #7a7a7a;
  cursor: not-allowed;
  transform: none;
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

.modal-fade-enter-active .quick-add-modal {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-leave-active .quick-add-modal {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from .quick-add-modal {
  transform: translateY(20px) scale(0.95);
}

.modal-fade-leave-to .quick-add-modal {
  transform: translateY(20px) scale(0.95);
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.toast-notification {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-mocca-dark);
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  z-index: 4000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  pointer-events: none;
  white-space: nowrap;
}
</style>
