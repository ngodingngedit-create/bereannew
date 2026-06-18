<template>
  <Transition name="slide-up">
    <div v-if="!isMobileMenuOpen && (totalItems === 0 || currentPage === 'profile')" class="mobile-navbar">
      <div class="nav-items-container">
        <!-- Home / Beranda -->
        <button 
          class="nav-item" 
          :class="{ active: currentPage === 'home' && activeSection === 'home' }" 
          @click="navigateTo('home')"
          aria-label="Home"
        >
          <span class="active-indicator"></span>
          <img class="nav-icon" src="/mobileNavbar/home.png" alt="Home" width="28" height="28" />
          <span class="nav-label">{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</span>
        </button>

        <!-- Collections / Koleksi -->
        <button 
          class="nav-item" 
          :class="{ active: currentPage === 'home' && activeSection === 'collections' }" 
          @click="navigateTo('collections')"
          aria-label="Collections"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Koleksi' : 'Collections' }}</span>
        </button>

        <!-- Event -->
        <button 
          class="nav-item" 
          :class="{ active: currentPage === 'event' }" 
          @click="navigateTo('event')"
          aria-label="Event"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Event' : 'Event' }}</span>
        </button>

        <!-- Shop / Toko -->
        <button 
          class="nav-item" 
          :class="{ active: currentPage === 'shop' && !isSearchOpen }" 
          @click="navigateTo('shop')"
          aria-label="Shop"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Toko' : 'Shop' }}</span>
        </button>

        <!-- Search / Cari -->
        <button 
          class="nav-item" 
          :class="{ active: isSearchOpen }" 
          @click="toggleSearchInput"
          aria-label="Search"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Cari' : 'Search' }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { currentPage, currentLang, isSearchOpen, isCartOpen, totalItems, isMobileMenuOpen, triggerProfile } from '../store/cart.js';

const activeSection = ref('home');

const updateActiveSectionOnScroll = () => {
  if (currentPage.value === 'shop' || currentPage.value === 'checkout' || currentPage.value === 'payment') {
    activeSection.value = 'shop';
    return;
  }
  if (currentPage.value === 'event') {
    activeSection.value = 'event';
    return;
  }
  if (currentPage.value !== 'home') {
    activeSection.value = '';
    return;
  }
  
  const collectionsEl = document.querySelector('.collections-container');
  if (!collectionsEl) {
    activeSection.value = 'home';
    return;
  }
  
  const rect = collectionsEl.getBoundingClientRect();
  if (rect.top <= window.innerHeight * 0.45) {
    activeSection.value = 'collections';
  } else {
    activeSection.value = 'home';
  }
};

watch(currentPage, (val) => {
  if (val === 'shop' || val === 'checkout' || val === 'payment') {
    activeSection.value = 'shop';
  } else if (val === 'event') {
    activeSection.value = 'event';
  } else if (val === 'home') {
    nextTick(() => {
      updateActiveSectionOnScroll();
    });
  } else {
    activeSection.value = '';
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });
  updateActiveSectionOnScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSectionOnScroll);
});

const navigateTo = (page) => {
  if (page === 'collections') {
    const scrollToCollections = () => {
      const collectionsEl = document.querySelector('.collections-container');
      if (collectionsEl) {
        const yOffset = -90;
        const y = collectionsEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    if (currentPage.value !== 'home') {
      currentPage.value = 'home';
      setTimeout(scrollToCollections, 150);
    } else {
      scrollToCollections();
    }
    isSearchOpen.value = false;
    return;
  }

  currentPage.value = page;
  isSearchOpen.value = false;
};

const toggleSearchInput = () => {
  isSearchOpen.value = !isSearchOpen.value;
};
</script>

<style scoped>
.mobile-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-bg-light);
  border-top: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 28px 28px 0 0;
  box-shadow: 0 -12px 36px rgba(47, 78, 62, 0.16), 0 -3px 12px rgba(47, 78, 62, 0.08);
  z-index: 9998;
  padding: 0.45rem 0;
  padding-bottom: calc(0.45rem + env(safe-area-inset-bottom, 0px));
  display: none; /* Hidden on desktop */
}

.nav-items-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 0.5rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.35rem 0;
  color: var(--color-mocca-muted);
  cursor: pointer;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex: 1 1 0%;
  width: 0;
  min-width: 0;
}

.active-indicator {
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background-color: var(--color-mocca-dark);
  position: absolute;
  top: -0.65rem;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 4px rgba(47, 78, 62, 0.2);
}

.nav-item.active .active-indicator {
  transform: translateX(-50%) scaleX(1);
}

.nav-icon {
  color: var(--color-mocca-muted);
  transition: transform 0.25s ease, color 0.25s ease;
  margin-bottom: 0.25rem;
}

img.nav-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: inline-block;
}

.nav-item.active .nav-icon {
  color: var(--color-mocca-dark);
  transform: translateY(-1px) scale(1.05);
}

.nav-label {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 500;
  transition: color 0.25s ease, font-weight 0.25s ease;
}

.nav-item.active .nav-label {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.cart-icon-wrapper {
  position: relative;
  display: inline-block;
}

.cart-badge-count {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-radius: 50%;
  padding: 1px 5px;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 14px;
  text-align: center;
  border: 1px solid var(--color-bg-light);
}

/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@media (max-width: 768px) {
  .mobile-navbar {
    display: block;
  }
}
</style>
