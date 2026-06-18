<template>
  <Transition name="slide-up">
    <div v-if="totalItems > 0" class="bottom-cart-bar">
      <div class="bottom-bar-container">
        <!-- Left: Total info -->
        <div class="cart-info-left">
          <div class="price-info">
            <span class="price-label">
              {{ currentLang === 'id' ? `Total ${totalItems} produk` : `Total ${totalItems} product${totalItems > 1 ? 's' : ''}` }}
            </span>
            <span class="total-price-text">{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>

        <!-- Right: Buy Now -->
        <div class="cart-info-right">
          <button class="expand-sheet-btn" @click="isDetailSheetOpen = !isDetailSheetOpen">
            <svg v-if="!isDetailSheetOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="buy-now-btn" @click="openCart">
            {{ currentLang === 'id' ? 'Beli Sekarang' : 'Buy Now' }}
          </button>
        </div>
      </div>

      <!-- Detail Bottom Sheet -->
      <Transition name="fade">
        <div v-if="isDetailSheetOpen" class="sheet-overlay" @click="isDetailSheetOpen = false"></div>
      </Transition>
      <Transition name="slide-up-sheet">
        <div v-if="isDetailSheetOpen" class="detail-bottom-sheet">
          <div class="sheet-header">
            <h3>{{ currentLang === 'id' ? 'Detail Keranjang' : 'Cart Details' }}</h3>
            <button class="close-sheet-btn" @click="isDetailSheetOpen = false">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="sheet-content">
            <div class="cart-items-list">
              <div v-for="item in cartItems" :key="item.key" class="cart-item-card">
                <div class="item-img-container">
                  <img :src="item.image" :alt="item.title" class="item-img" />
                </div>
                <div class="item-details">
                  <div class="item-header-row">
                    <h4 class="item-title">{{ item.title }}</h4>
                    <button class="trash-button" @click="removeFromCart(item.id, item.color)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                  <div class="item-meta">
                    <span class="meta-value capitalize">{{ item.color }}</span>
                  </div>
                  <div class="item-footer-row">
                    <span class="item-price">{{ formatPrice(item.price) }}</span>
                    <div class="item-quantity-selector">
                      <button class="qty-btn" @click="updateQuantity(item.id, item.color, -1)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <span class="qty-display">{{ item.quantity }}</span>
                      <button class="qty-btn" @click="updateQuantity(item.id, item.color, 1)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { cartItems, totalItems, totalPrice, isCartOpen, currentLang, updateQuantity, removeFromCart, currentPage } from '../store/cart.js';

const isDetailSheetOpen = ref(false);

const openCart = () => {
  isDetailSheetOpen.value = false;
  currentPage.value = 'checkout';
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
.bottom-cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-bg-light);
  border-top: 1px solid rgba(47, 78, 62, 0.1);
  box-shadow: 0 -4px 20px rgba(47, 78, 62, 0.08);
  z-index: 1000;
  padding: 0.45rem 0;
}

.bottom-bar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-info-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-info-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.price-info {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-bottom: 0.15rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  position: relative;
  
}

.total-price-text {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
   position: relative;
  

}

.buy-now-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 0.9rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
}

.buy-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.2);
  background-color: #55331C;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.buy-now-btn:hover .arrow-icon {
  transform: translateX(4px);
}

.expand-sheet-btn {
  background: none;
  border: none;
  color: var(--color-mocca-dark);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.expand-sheet-btn:hover {
  transform: translateY(-2px);
}

/* Detail Link */
.price-label-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.detail-link {
  display: none; /* Hidden on desktop by default */
  background: none;
  border: none;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  opacity: 0.8;
}

.detail-link:hover {
  opacity: 1;
}

/* Detail Bottom Sheet */
.sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(47, 78, 62, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10000;
}

.detail-bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 85vh;
  background-color: var(--color-bg-light);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -10px 40px rgba(47, 78, 62, 0.15);
}

.sheet-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sheet-header h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.close-sheet-btn {
  background: none;
  border: none;
  color: var(--color-mocca-dark);
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.6;
}

.close-sheet-btn:hover {
  opacity: 1;
}

.sheet-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item-card {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
}

.item-img-container {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-bg-cream);
  border: 1px solid var(--color-mocca-border);
  flex-shrink: 0;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.item-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.item-title {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0;
}

.trash-button {
  background: none;
  border: none;
  color: var(--color-mocca-muted);
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.7;
}

.item-meta {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-bottom: 0.5rem;
}

.item-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.item-price {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.item-quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-mocca-border);
  border-radius: 4px;
  background-color: var(--color-bg-light);
}

.qty-btn {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  cursor: pointer;
}

.qty-display {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  width: 20px;
  text-align: center;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-sheet-enter-active,
.slide-up-sheet-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-sheet-enter-from,
.slide-up-sheet-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-info-right {
    width: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .bottom-cart-bar {
    padding: 0.25rem 0;
    padding-bottom: calc(0.25rem + env(safe-area-inset-bottom, 0px));
    z-index: 9999;
    display: block;
    position: fixed;
    bottom: 0;
  }
  .bottom-bar-container {
    padding: 0 1.25rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .cart-info-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    flex: 1;
  }
  .price-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
  }
  .price-label, .total-price-text, .buy-now-btn {
    position: static;
    left: 0;
    right: 0;
  }
  .price-label {
    margin-bottom: 0;
    white-space: nowrap;
    font-size: 0.58rem;
  }
  .detail-link {
    display: inline-block;
    position: static;
    left: 0;
    right: 0;
    font-size: 0.62rem;
  }
  .total-price-text {
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .buy-now-btn {
    flex: 1;
    justify-content: center;
    padding: 0.55rem 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
  }
}
</style>
