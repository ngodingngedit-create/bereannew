<template>
  <Transition name="fade">
    <div v-if="isCartOpen" class="cart-backdrop" @click="closeCart">
      <!-- Drawer Panel -->
      <div class="cart-panel" @click.stop>
        <!-- Header -->
        <div class="cart-header">
          <div class="header-title-group">
            <h2 class="cart-title">Shopping Cart</h2>
            <span class="cart-badge">{{ totalItems }} items</span>
          </div>
          <button class="close-button" @click="closeCart" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="close-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Scrollable Content Area -->
        <div class="cart-content">
          <!-- Empty State -->
          <div v-if="cartItems.length === 0" class="empty-cart-state">
            <div class="empty-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-bag-icon">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3 class="empty-title">Your cart is empty</h3>
            <p class="empty-subtitle">Add beautiful merchandise to your everyday style.</p>
            <button class="shop-now-button" @click="closeCart">SHOP NOW</button>
          </div>

          <!-- Items List -->
          <div v-else class="cart-items-list">
            <div v-for="item in cartItems" :key="item.key" class="cart-item-card">
              <!-- Image Thumbnail -->
              <div class="item-img-container">
                <img :src="item.image" :alt="item.title" class="item-img" />
              </div>

              <!-- Product Details -->
              <div class="item-details">
                <div class="item-header-row">
                  <h4 class="item-title">{{ item.title }}</h4>
                  <!-- Trash Button per Card -->
                  <button class="trash-button" @click="removeItem(item.id, item.color)" title="Remove item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
                
                <!-- Swatch color indicator -->
                <div class="item-meta" v-if="item.color && item.color !== 'default' && item.color !== 'cream'">
                  <span class="meta-label">Varian:</span>
                  <span class="meta-value capitalize">{{ item.color }}</span>
                </div>

                <!-- Price and quantity selectors -->
                <div class="item-footer-row">
                  <span class="item-price">{{ formatPrice(item.price) }}</span>
                  
                  <div class="item-quantity-selector">
                    <button class="qty-btn" @click="changeQty(item.id, item.color, -1)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="qty-icon"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span class="qty-display">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="changeQty(item.id, item.color, 1)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="qty-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Footer Summary -->
        <div v-if="cartItems.length > 0" class="cart-footer">
          <div class="summary-subtotal-row">
            <span class="subtotal-label">Subtotal</span>
            <span class="subtotal-value">{{ formatPrice(totalPrice) }}</span>
          </div>
          <p class="footer-tax-text">Shipping & taxes calculated at checkout.</p>
          
          <button class="view-all-cart-button" @click="handleCheckout">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Interactive Toast Notification -->
  <Transition name="toast-fade">
    <div v-if="showToast" class="checkout-toast">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>Mengarahkan ke Halaman Checkout...</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { 
  cartItems, 
  isCartOpen, 
  totalItems, 
  totalPrice, 
  updateQuantity, 
  removeFromCart,
  currentPage
} from '../store/cart.js';

const showToast = ref(false);

const closeCart = () => {
  isCartOpen.value = false;
};

const changeQty = (productId, color, delta) => {
  updateQuantity(productId, color, delta);
};

const removeItem = (productId, color) => {
  removeFromCart(productId, color);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

const handleCheckout = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
    isCartOpen.value = false;
    currentPage.value = 'checkout';
  }, 1000);
};
</script>

<style scoped>
.cart-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(47, 78, 62, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
}

.cart-panel {
  width: 460px;
  max-width: 100%;
  height: 100%;
  background-color: var(--color-bg-light);
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(47, 78, 62, 0.15);
  animation: slideIn 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Header styles */
.cart-header {
  padding: 1.75rem 2rem;
  border-bottom: 1px solid var(--color-mocca-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title-group {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.cart-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
}

.cart-badge {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-mocca-dark);
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: var(--transition-smooth);
}

.close-button:hover {
  opacity: 1;
  background-color: rgba(47, 78, 62, 0.05);
}

.close-icon {
  width: 20px;
  height: 20px;
}

/* Content styles */
.cart-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem;
}

/* Empty state styles */
.empty-cart-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon-wrap {
  color: var(--color-mocca-muted);
  opacity: 0.4;
  margin-bottom: 1.5rem;
}

.empty-bag-icon {
  width: 72px;
  height: 72px;
}

.empty-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
}

.empty-subtitle {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
  max-width: 250px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.shop-now-button {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.shop-now-button:hover {
  background-color: #1C3026;
  transform: translateY(-1px);
}

/* Items List styles */
.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item-card {
  display: flex;
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
}

.item-img-container {
  width: 90px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--color-bg-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--color-mocca-border);
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
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.item-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  line-height: 1.3;
}

.trash-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-mocca-muted);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  transition: var(--transition-smooth);
}

.trash-button:hover {
  opacity: 1;
  color: #c94b4b; /* Soft premium red */
}

.trash-icon {
  width: 16px;
  height: 16px;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.meta-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.meta-value {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
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
  overflow: hidden;
  background-color: var(--color-bg-light);
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  opacity: 0.7;
  transition: var(--transition-smooth);
}

.qty-btn:hover {
  opacity: 1;
  background-color: rgba(47, 78, 62, 0.05);
}

.qty-icon {
  width: 12px;
  height: 12px;
}

.qty-display {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  width: 24px;
  text-align: center;
}

/* Sticky Footer Summary styles */
.cart-footer {
  padding: 2rem;
  border-top: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  display: flex;
  flex-direction: column;
}

.summary-subtotal-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.subtotal-label {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
}

.subtotal-value {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.footer-tax-text {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.view-all-cart-button {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 1.1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.12);
}

.view-all-cart-button:hover {
  background-color: #1C3026;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.2);
}

/* Toast styles */
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
  z-index: 10000;
}

.toast-check-icon {
  width: 18px;
  height: 18px;
  color: #92e0a9; /* Soft green */
}

/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .cart-panel,
.fade-leave-active .cart-panel {
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-enter-from .cart-panel {
  transform: translateX(100%);
}

.fade-leave-to .cart-panel {
  transform: translateX(100%);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
