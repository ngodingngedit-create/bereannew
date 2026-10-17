import { ref, computed, watch } from 'vue';

// Reactive state
export const cartItems = ref([]);
export const isCartOpen = ref(false);
export const searchQuery = ref('');
export const currentLang = ref('id');
const getInitialPage = () => {
  const path = window.location.pathname.replace(/^\/+/, '');
  return path || 'home';
};
export const currentPage = ref(getInitialPage());
export const activeCreatorSlug = ref('');
export const activeCategory = ref('all');
export const activeInfoPage = ref('aboutUs');

// Sync URL on state change
watch(currentPage, (newPage) => {
  const currentPath = window.location.pathname.replace(/^\/+/, '') || 'home';
  if (currentPath !== newPage) {
    const url = newPage === 'home' ? '/' : `/${newPage}`;
    window.history.pushState({ page: newPage }, '', url);
  }
});

// Sync state on browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname.replace(/^\/+/, '') || 'home';
  if (currentPage.value !== path) {
    currentPage.value = path;
  }
});
export const isSearchOpen = ref(false);
export const isMobileMenuOpen = ref(false);
export const triggerProfile = ref(false);
export const isLoggedIn = ref(false);
export const checkedCheckoutItems = ref([]);
export const currentTheme = ref('cream'); // 'cream' | 'sepia' | 'cocoa'
export const selectedEvent = ref(null);
export const selectedTicket = ref(null);
export const selectedProduct = ref(null);
export const productReturnPage = ref('home');
export const productFilter = ref('all');
export const openProduct = (product) => {
  selectedProduct.value = product;
  productReturnPage.value = currentPage.value;
  currentPage.value = 'product';
  window.scrollTo({ top: 0 });
};
export const ticketQuantity = ref(1);
export const selectedTickets = ref([]);

// Default pickup store for Berean (fallback when API has no store_location)
export const DEFAULT_PICKUP_STORE = {
  store_name: 'Berean book store',
  name: 'Berean book store',
  city: 'Menara Kuningan Lantai P1',
  address: 'Menara Kuningan Lantai P1',
};
export const DEFAULT_PICKUP_LABEL = 'Berean book store, Menara Kuningan Lantai P1';
export const DEFAULT_PICKUP_CARD_LABEL = 'Menara Kuningan Lantai P1';

// Format helper for ID
const getCartKey = (id, color) => `${id}-${color}`;

// Actions
export const addToCart = (product, color, quantity = 1) => {
  const key = getCartKey(product.id, color);
  const existingItem = cartItems.value.find(item => item.key === key);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    // Get title with localization fallbacks (ShopPage uses titleEn/titleId)
    const title = product.title || product.titleEn || product.titleId || 'Berean.id Official Merch';
    cartItems.value.push({
      key,
      id: product.id,
      title: title,
      price: product.price,
      image: product.image,
      color: color || 'default',
      quantity: quantity,
      variant_id: product.variant_id || null,
      store_location: product.has_store_location || DEFAULT_PICKUP_STORE, admin_fee: product.admin_fee || 0
    });
  }
};

export const updateQuantity = (productId, color, delta) => {
  const key = getCartKey(productId, color);
  const existingItem = cartItems.value.find(item => item.key === key);

  if (existingItem) {
    existingItem.quantity += delta;
    if (existingItem.quantity <= 0) {
      removeFromCart(productId, color);
    }
  }
};

export const removeFromCart = (productId, color) => {
  const key = getCartKey(productId, color);
  cartItems.value = cartItems.value.filter(item => item.key !== key);
};

export const getItemQuantity = (productId, color) => {
  const key = getCartKey(productId, color);
  const existingItem = cartItems.value.find(item => item.key === key);
  return existingItem ? existingItem.quantity : 0;
};

export const getProductTotalQuantity = (productId) => {
  return cartItems.value.filter(item => item.id === productId).reduce((sum, item) => sum + item.quantity, 0);
};

export const decreaseProductQuantity = (productId) => {
  // Find the first variant of this product in the cart
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    updateQuantity(item.id, item.color, -1);
  }
};

// Computed properties
export const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

export const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

export const clearCart = () => {
  cartItems.value = [];
};
