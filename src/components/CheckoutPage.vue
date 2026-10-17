<template>
  <div class="checkout-page-wrapper">
    <!-- Header spacing block -->
    <div class="checkout-container">
      
      <!-- Page Title -->
      <div class="checkout-title-section">
        <h1 class="checkout-main-title">Checkout</h1>
        <p class="checkout-subtitle">Pilih produk favoritmu dan selesaikan pembayaran.</p>
        <div class="title-divider">
        
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0" class="empty-checkout-state">
        <div class="empty-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-bag-icon">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h2 class="empty-checkout-title">Keranjang Belanja Anda Kosong</h2>
        <p class="empty-checkout-subtitle">Jelajahi koleksi merchandise official Berean.id dan temukan produk favoritmu!</p>
        <button class="shop-now-btn-checkout" @click="backToShop">
          Mulai Belanja
        </button>
      </div>

      <!-- Main Two-Column Layout -->
      <div v-else class="checkout-grid">
        <!-- Left Column: Shopping Cart Table -->
        <div class="left-column">
          <div class="cart-table-card">
            <!-- Table Header -->
            <div class="table-header">
              <div class="header-col col-product">Produk</div>
              <div class="header-col col-price">Harga</div>
              <div class="header-col col-qty">Jumlah</div>
              <!-- <div class="header-col col-subtotal">Subtotal</div> -->
              <div class="header-col col-action">Aksi</div>
            </div>

            <!-- Table Body Rows -->
            <div class="table-body">
              <div 
                v-for="item in items" 
                :key="item.id" 
                class="cart-row"
                :class="{ 'row-inactive': !item.checked || item.qty === 0 }"
              >
                <!-- Product Section (includes Checkbox, Thumbnail, Title & details) -->
                <div class="row-flex-wrap">
                  <div class="row-main-data">
                    <div class="product-selection">
                      <label class="custom-checkbox">
                        <input 
                          type="checkbox" 
                          v-model="item.checked"
                          @change="handleCheckboxChange(item)"
                        />
                        <span class="checkmark"></span>
                      </label>
                      <div class="product-thumbnail">
                        <img :src="item.image" :alt="item.name" />
                      </div>
                      <div class="product-meta">
                        <h3 class="product-name">{{ item.name }}</h3>
                        <div class="product-attributes">
                          <span class="attr-tag" v-if="item.color">Varian: {{ item.color }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Price -->
                    <div class="col-data col-price">
                      <span class="mobile-label">Harga</span>
                      <span class="price-val">{{ formatPrice(item.price) }}</span>
                    </div>

                    <!-- Qty Selector -->
                    <div class="col-data col-qty">
                      <span class="mobile-label">Jumlah</span>
                      <div class="qty-control">
                        <button class="qty-btn" @click="adjustQty(item, -1)" :disabled="item.qty === 0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <span class="qty-val">{{ item.qty }}</span>
                        <button class="qty-btn" @click="adjustQty(item, 1)">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                      </div>
                    </div>

                    <!-- Subtotal
                    <div class="col-data col-subtotal">
                      <span class="mobile-label">Subtotal</span>
                      <span class="subtotal-val font-semibold">{{ formatPrice(item.checked ? item.price * item.qty : 0) }}</span>
                    </div> -->

                    <!-- Trash Bin / Delete Action -->
                    <div class="col-data col-action">
                      <button class="delete-btn" @click="deleteItem(item)" aria-label="Hapus produk">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <!-- Table Footer: Select All Button -->
            <div class="table-footer">
              <button class="select-all-btn" @click="toggleSelectAll">
                <span class="checkbox-indicator" :class="{ checked: isAllSelected }">
                  <svg v-if="isAllSelected" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                Pilih Semua
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary & Trust Signals -->
        <div class="right-column">
          <!-- Summary Card -->
          <div class="summary-card">
            <h2 class="summary-title">Ringkasan Pesanan</h2>
            
            <!-- Products List inside checkout summary -->
            <div class="summary-products-list">
              <div 
                v-for="item in checkedProducts" 
                :key="`${item.id}-${item.color}`" 
                class="summary-prod-item"
              >
                <div class="prod-left">
                  <div class="prod-thumb">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  <div class="prod-info">
                    <h4 class="prod-name font-bold">{{ item.name }}</h4>
                    <span class="prod-meta" v-if="(item.size && item.size !== '-') || (item.color && item.color !== 'default')">Varian: {{ item.size && item.size !== '-' ? item.size : item.color }}</span>

                  </div>
                </div>
                
                <div class="prod-right text-right">
                  <span class="prod-price font-bold">{{ formatPrice(item.price) }}</span>
                  <span class="prod-qty">x {{ item.qty }}</span>
                </div>
              </div>
              <div v-if="checkedProducts.length === 0" class="empty-summary-text text-center py-4">
                Belum ada produk yang dipilih.
              </div>
            </div>

            <div class="summary-divider"></div>
            
            <div class="summary-rows">
              <div class="summary-row">
                <span class="row-label">Subtotal ({{ checkedItemsCount }} produk)</span>
                <span class="row-value">{{ formatPrice(subtotal) }}</span>
              </div>
            </div>
              


            <!-- Action Buttons moved to fixed bottom navbar -->
          </div>

          <!-- Trust Signals Card as Accordion -->
          <div class="trust-signals-card">
            <div 
              v-for="(tItem, index) in trustItems" 
              :key="tItem.id" 
              class="accordion-item"
              :class="{ active: activeAccordion === index }"
            >
              <button class="accordion-header" @click="toggleAccordion(index)" type="button">
                <div class="header-left">
                  <span v-html="tItem.icon" class="icon-wrapper"></span>
                  <span class="trust-text">{{ tItem.title }}</span>
                </div>
                <svg class="chevron-icon" :class="{ rotate: activeAccordion === index }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <div 
                class="accordion-body"
                :style="{ maxHeight: activeAccordion === index ? '120px' : '0px' }"
              >
                <p class="accordion-desc">{{ tItem.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Success Toast Overlay -->
    <Transition name="toast-fade">
      <div v-if="toastActive" class="payment-toast">
        <svg class="success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>

    <!-- Fixed Bottom Action Bar -->
    <div class="fixed-payment-actions">
      <div class="fixed-payment-actions-inner">
        <button class="back-to-cart-link-btn fixed-back-btn" @click="backToShop">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="back-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Toko
        </button>
        
        <button class="primary-checkout-btn font-bold fixed-pay-btn" @click="processPayment">
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { currentPage, cartItems, updateQuantity, removeFromCart, checkedCheckoutItems, DEFAULT_PICKUP_STORE } from '../store/cart.js';

// Trust accordion items configuration
const trustItems = ref([
  {
    id: 'payment',
    title: 'Pembayaran aman & terpercaya',
    icon: `<svg class="trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <polyline points="9 11 11 13 15 9"></polyline>
    </svg>`,
    desc: 'Kami mendukung berbagai metode pembayaran terverifikasi seperti Transfer Bank, E-Wallet, dan Kartu Kredit dengan enkripsi data SSL 256-bit yang sepenuhnya aman.'
  },
  {
    id: 'original',
    title: 'Garansi produk original',
    icon: `<svg class="trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>`,
    desc: 'Seluruh merchandise yang kami jual dijamin 100% official dari Berean.id. Dibuat dengan bahan katun premium dan standar cetak sablon berkualitas tinggi.'
  },
  {
    id: 'support',
    title: 'Customer service 24/7',
    icon: `<svg class="trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      <circle cx="9" cy="10" r="1"></circle>
      <circle cx="15" cy="10" r="1"></circle>
    </svg>`,
    desc: 'Layanan pelanggan kami siap melayani Anda kapan pun melalui WhatsApp atau Email untuk pertanyaan seputar detail produk, pengiriman, maupun penukaran.'
  }
]);

const activeAccordion = ref(0); // first item expanded by default

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

// Setup Checkout Items list synchronized with the global cart store
const items = ref([]);

watch(cartItems, (newCartItems) => {
  const updatedItems = [];
  newCartItems.forEach(cartItem => {
    // Find existing item in our local items to preserve custom fields like checked, note
    const existing = items.value.find(i => i.id === cartItem.id && i.color === cartItem.color);
    if (existing) {
      existing.qty = cartItem.quantity;
      existing.name = cartItem.title;
      existing.price = cartItem.price;
      existing.image = cartItem.image;
      existing.store_location = cartItem.store_location || DEFAULT_PICKUP_STORE;
      existing.variant_id = cartItem.variant_id || null;
      updatedItems.push(existing);
    } else {
      updatedItems.push({
        id: cartItem.id,
        name: cartItem.title,
        price: cartItem.price,
        qty: cartItem.quantity,
        color: cartItem.color || 'default',
        size: '-', // Default size
        checked: true,
        image: cartItem.image,
        note: '',
        notePlaceholder: 'Contoh: tolong dibungkus rapi',
        store_location: cartItem.store_location || DEFAULT_PICKUP_STORE,
        variant_id: cartItem.variant_id || null
      });
    }
  });
  items.value = updatedItems;
}, { immediate: true, deep: true });

const toastActive = ref(false);
const toastMessage = ref('');

// Computed values for prices
const subtotal = computed(() => {
  return items.value
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.price * item.qty, 0);
});

const totalPrice = computed(() => {
  return subtotal.value;
});

const checkedItemsCount = computed(() => {
  return items.value.filter(item => item.checked && item.qty > 0).length;
});

const checkedProducts = computed(() => {
  return items.value.filter(item => item.checked && item.qty > 0);
});

// Select All logic
const isAllSelected = computed(() => {
  const activeItems = items.value.filter(item => item.qty > 0);
  if (activeItems.length === 0) return false;
  return activeItems.every(item => item.checked);
});

const toggleSelectAll = () => {
  const allChecked = isAllSelected.value;
  items.value.forEach(item => {
    if (!allChecked) {
      item.checked = true;
      if (item.qty === 0) {
        updateQuantity(item.id, item.color, 1);
      }
    } else {
      item.checked = false;
    }
  });
};

// Quantity Adjusters
const adjustQty = (item, delta) => {
  updateQuantity(item.id, item.color, delta);
};

const handleCheckboxChange = (item) => {
  if (item.checked && item.qty === 0) {
    updateQuantity(item.id, item.color, 1);
  }
};

// Delete item
const deleteItem = (item) => {
  removeFromCart(item.id, item.color);
};

// Format Currency IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

// Navigation
const backToShop = () => {
  currentPage.value = 'shop';
};

const processPayment = () => {
  if (subtotal.value === 0) {
    showToast('Pilih setidaknya 1 produk untuk checkout!');
    return;
  }
  
  // Save checked items to the store for PaymentPage to read
  checkedCheckoutItems.value = items.value
    .filter(item => item.checked && item.qty > 0)
    .map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
      color: item.color,
      size: item.size || '-',
      image: item.image,
      note: item.note || '',
      store_location: item.store_location || DEFAULT_PICKUP_STORE,
      variant_id: item.variant_id || null
    }));

  showToast('Menghubungkan ke gerbang pembayaran aman...');
  setTimeout(() => {
    currentPage.value = 'payment';
  }, 1000);
};

const showToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2500);
};
</script>

<style scoped>
.checkout-page-wrapper {
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  padding: 1.5rem 0 4rem 0;
}

.checkout-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* Page Title area */
.checkout-title-section {
  text-align: center;
  margin-bottom: 1.75rem;
}

.checkout-main-title {
  font-family: var(--font-heading);
  font-size: 2.75rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
}

.checkout-subtitle {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-muted);
}

.title-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-mocca-border);
}

.star-diamond {
  color: #D9A05B; /* Cozy warm gold */
}

/* Layout Grid */
.checkout-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 1.25rem;
  align-items: start;
}

/* Left Column Cart Table styling */
.left-column {
  width: 100%;
}

.cart-table-card {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.03);
  overflow: hidden;
}

/* Table Header */
.table-header {
  display: grid;
  grid-template-columns: 4.5fr 1.5fr 1.5fr 1fr;
  background-color: #fff;
  border-bottom: 1px solid var(--color-mocca-border);
  padding: 0.85rem 1rem;
}

.header-col {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.col-price, .col-qty, .col-subtotal, .col-action {
  text-align: center;
}

/* Rows styling */
.table-body {
  display: flex;
  flex-direction: column;
}

.cart-row {
  border-bottom: 1px solid var(--color-mocca-border);
  padding: 0.9rem 1rem;
  transition: all 0.25s ease;
}

.cart-row:hover {
  background-color: #f8f8f8;
}

.row-inactive {
  opacity: 0.65;
}

.row-flex-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.row-main-data {
  display: grid;
  grid-template-columns: 4.5fr 1.5fr 1.5fr 1fr;
  align-items: center;
}

.product-selection {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Custom Checkbox */
.custom-checkbox {
  position: relative;
  width: 18px;
  height: 18px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #FFFFFF;
  border: 1.5px solid var(--color-mocca-border);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Product details */
.product-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--color-mocca-border);
  background-color: #fff;
  flex-shrink: 0;
}

.product-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.product-name {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.product-attributes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.attr-tag {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
  background-color: #f4f4f4;
  border: 1px solid var(--color-mocca-border);
  padding: 2px 8px;
  border-radius: 4px;
}

/* Price, Qty, Subtotal columns values */
.col-data {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-label {
  display: none; /* Desktop only */
}

.price-val, .subtotal-val {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-mocca-dark);
}

.subtotal-val {
  color: var(--color-mocca-dark);
  font-weight: 600;
}

/* Qty selector */
.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-mocca-border);
  border-radius: 4px;
  overflow: hidden;
  background-color: #FFFFFF;
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
  transition: background-color 0.2s ease;
}

.qty-btn:hover:not(:disabled) {
  background-color: #f4f4f4;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-val {
  width: 24px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

/* Action button */
.delete-btn {
  background: none;
  border: none;
  color: var(--color-mocca-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  color: #C2410C;
  background-color: #FFF5F2;
}

/* Note Section */
.row-note-data {
  padding-left: 2.25rem;
}

.note-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.note-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
  flex-shrink: 0;
}

.note-input {
  flex-grow: 1;
  background-color: #f4f4f4;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.25s ease;
}

.note-input:focus {
  background-color: #fff;
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.05);
}

/* Select All Footer */
.table-footer {
  padding: 0.75rem 1rem;
  background-color: #fff;
  border-top: 1px solid var(--color-mocca-border);
}

.select-all-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  cursor: pointer;
}

.checkbox-indicator {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-mocca-border);
  border-radius: 4px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: all 0.2s ease;
}

.checkbox-indicator.checked {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

/* Right Column Order Summary styling */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

@media (min-width: 1025px) {
  .right-column {
    position: sticky;
    top: 7rem;
    align-self: start;
    z-index: 10;
  }
}

.summary-card {
  background-color: #fff;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.03);
}

.summary-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 1rem;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
}

.summary-row .row-label {
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
}

.summary-row .row-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.summary-divider {
  height: 1px;
  background-color: var(--color-mocca-border);
  margin: 0.5rem 0;
}

.total-row {
  align-items: baseline;
}

.total-row .row-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.total-price {
  font-size: 1.5rem !important;
  font-weight: 800 !important;
  color: var(--color-mocca-dark) !important;
}

/* Estimated Delivery Banner */
.estimate-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f7f7f7;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 0.9rem;
  margin-top: 1rem;
}

.truck-icon {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.banner-text {
  display: flex;
  flex-direction: column;
}

.banner-title {
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.banner-desc {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
}

/* Buttons */
.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.primary-checkout-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.15);
}

.primary-checkout-btn:hover {
  background-color: #55331C;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.2);
}

.back-to-shop-btn {
  background-color: #FFFFFF;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  width: 100%;
  padding: 0.85rem;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.back-to-shop-btn:hover {
  background-color: #f4f4f4;
  border-color: var(--color-mocca-dark);
}

.back-arrow {
  transition: transform 0.25s ease;
}

.back-to-shop-btn:hover .back-arrow {
  transform: translateX(-4px);
}

/* Trust Signals Card & Accordion styling */
.trust-signals-card {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.03);
}

.accordion-item {
  border-bottom: 1px solid rgba(47, 78, 62, 0.06);
  padding-bottom: 0.5rem;
}

.accordion-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 0.65rem 0;
  cursor: pointer;
  outline: none;
  color: var(--color-mocca-dark);
  text-align: left;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.trust-icon {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
  opacity: 0.85;
}

.trust-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.chevron-icon {
  color: var(--color-mocca-muted);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
  color: var(--color-mocca-dark);
}

.accordion-body {
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.accordion-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--color-mocca-muted);
  padding: 0.25rem 0.5rem 0.5rem 2.25rem;
  margin: 0;
}

/* Toast Message */
.payment-toast {
  position: fixed;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  padding: 0.85rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 10002;
}

.success-icon {
  color: #10B981;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .checkout-container {
    padding: 0 2rem;
  }
  .checkout-grid {
    grid-template-columns: 1.8fr 1fr;
    gap: 1rem;
  }
  .summary-card {
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .checkout-page-wrapper {
    padding: 0.85rem 0 2.5rem 0;
  }
  .checkout-container {
    padding: 0 1rem;
  }
  .checkout-title-section {
    margin-bottom: 1rem;
  }
  .checkout-main-title {
    font-size: clamp(1.5rem, 6.5vw, 1.85rem);
  }
  .checkout-subtitle {
    font-size: 0.82rem;
    padding: 0 0.5rem;
  }
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
  .right-column {
    gap: 0.75rem;
  }
  .summary-card {
    padding: 1rem;
  }
  .summary-title {
    font-size: 1.15rem;
    margin-bottom: 0.75rem;
  }
  .trust-signals-card {
    padding: 1rem;
  }
  .trust-text {
    font-size: 0.8rem;
  }
  .accordion-desc {
    padding: 0.25rem 0 0.5rem 0;
    font-size: 0.72rem;
  }
  .empty-checkout-state {
    padding: 2.5rem 1.25rem;
    margin: 1.5rem auto;
  }
  .empty-checkout-title {
    font-size: 1.35rem;
  }
  .empty-checkout-subtitle {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }
  
  /* Convert Table to Card List on mobile */
  .table-header {
    display: none; /* Hide header completely on mobile */
  }
  
  .cart-row {
    padding: 0.85rem;
  }
  
  .row-main-data {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
    position: relative;
    width: 100%;
  }
  
  .product-selection {
    width: 100%;
    padding-right: 2rem;
  }
  
  .product-thumbnail {
    width: 56px;
    height: 56px;
  }
  
  .product-name {
    font-size: 0.9rem;
    line-height: 1.3;
    word-break: break-word;
  }
  
  .col-data {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(47, 78, 62, 0.04);
    padding: 0.4rem 0;
  }
  
  .mobile-label {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-mocca-muted);
  }
  
  /* Absolute position delete button to the top-right corner */
  .col-action {
    position: absolute;
    top: -0.25rem;
    right: 0;
    width: auto;
    border-bottom: none;
    padding: 0;
  }
  
  .row-note-data {
    padding-left: 0;
    margin-top: 0.5rem;
    width: 100%;
  }
  
  .note-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
  
  .note-input {
    width: 100%;
  }
}

/* Empty state styling */
.empty-checkout-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 5rem 2rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.03);
  max-width: 600px;
  margin: 4rem auto;
}

.empty-icon-container {
  color: var(--color-mocca-muted);
  opacity: 0.4;
  margin-bottom: 1.5rem;
}

.empty-bag-icon {
  width: 80px;
  height: 80px;
}

.empty-checkout-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.75rem;
}

.empty-checkout-subtitle {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-muted);
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.shop-now-btn-checkout {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.95rem 2.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.15);
  transition: all 0.3s ease;
}

.shop-now-btn-checkout:hover {
  background-color: #55331C;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.2);
}

/* Products inside checkout summary card */
.summary-products-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
  max-height: 240px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Custom scrollbar for summary products list to fit scrapbook aesthetic */
.summary-products-list::-webkit-scrollbar {
  width: 5px;
}

.summary-products-list::-webkit-scrollbar-track {
  background: #f4f4f4;
  border-radius: 4px;
}

.summary-products-list::-webkit-scrollbar-thumb {
  background: var(--color-mocca-border);
  border-radius: 4px;
}

.summary-products-list::-webkit-scrollbar-thumb:hover {
  background: var(--color-mocca-dark);
}

.summary-prod-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dotted var(--color-mocca-border);
}

.summary-prod-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.prod-left {
  display: flex;
  gap: 0.6rem;
  flex-grow: 1;
}

.prod-thumb {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid var(--color-mocca-border);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.prod-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prod-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-align: left;
}

.prod-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0;
  line-height: 1.2;
}

.prod-meta {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.prod-note {
  font-size: 0.7rem;
  font-style: italic;
  color: var(--color-mocca-muted);
  background-color: #f4f4f4;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  display: inline-block;
  border-left: 2px solid var(--color-mocca-dark);
}

.prod-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  flex-shrink: 0;
}

.prod-price {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.prod-qty {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.empty-summary-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  font-style: italic;
  background-color: #f7f7f7;
  border-radius: 8px;
  border: 1px dashed var(--color-mocca-border);
}

.fixed-payment-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-bg-light);
  border-top: 1px solid var(--color-mocca-border);
  padding: 0.85rem 1rem;
  z-index: 1000;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

.fixed-payment-actions-inner {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.fixed-back-btn {
  margin-top: 0 !important;
  color: var(--color-mocca-dark) !important;
  font-weight: 600 !important;
  opacity: 1 !important;
  text-decoration: none !important;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
}
.fixed-back-btn:hover {
  opacity: 0.8 !important;
}

.fixed-pay-btn {
  margin-top: 0 !important;
  margin-left: auto !important;
  margin-right: 0 !important;
  max-width: 250px !important;
  padding: 0.75rem 1.5rem !important;
}

.checkout-page {
  padding-bottom: 80px; /* Add padding to prevent content being hidden behind the fixed bar */
}

@media (max-width: 768px) {
  .fixed-payment-actions {
    padding: 0.75rem 1rem;
    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
  }
  .fixed-payment-actions-inner {
    gap: 0.75rem;
  }
  .fixed-back-btn {
    font-size: 0.8rem !important;
  }
  .fixed-pay-btn {
    max-width: none !important;
    width: 100%;
    font-size: 0.85rem !important;
    padding: 0.7rem 1rem !important;
  }
  .checkout-page {
    padding-bottom: 110px;
  }
}
</style>
