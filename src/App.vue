<template>
  <div class="site-container">
    <Header v-if="currentPage !== 'login'" />
    <main :class="{ 'no-padding': currentPage === 'login' }">
      <Transition name="fade" mode="out-in">
        <div v-if="currentPage === 'home'" key="home">
          <HeroSection />
          <FeaturesSection />
          <ShopSection />
          <EventSection v-if="false" />
        </div>
        <div v-else-if="currentPage === 'shop'" key="shop">
          <ShopPage />
        </div>
        <div v-else-if="currentPage === 'checkout'" key="checkout">
          <CheckoutPage />
        </div>
        <div v-else-if="currentPage === 'event-checkout'" key="event-checkout">
          <EventCheckoutPage />
        </div>
        <div v-else-if="currentPage === 'payment'" key="payment">
          <PaymentPage />
        </div>
        <div v-else-if="currentPage === 'profile'" key="profile">
          <ProfilePage />
        </div>
        <div v-else-if="currentPage === 'creator'" key="creator">
          <CreatorPage />
        </div>
        <div v-else-if="currentPage === 'event'" key="event">
          <EventPage />
        </div>
        <div v-else-if="currentPage === 'event-detail'" key="event-detail">
          <EventDetailPage />
        </div>
        <div v-else-if="currentPage === 'login'" key="login">
          <LoginPage />
        </div>
        <div v-else-if="currentPage === 'dashboard-user'" key="dashboard-user">
          <DashboardUserPage />
        </div>
        <div v-else-if="currentPage === 'info'" key="info">
          <InfoPage />
        </div>
      </Transition>
    </main>
    <Footer v-if="currentPage !== 'login' && currentPage !== 'payment' && currentPage !== 'checkout'" />
    <CartDrawer v-if="currentPage !== 'login'" />
    <BottomCartBar v-if="currentPage !== 'checkout' && currentPage !== 'event-checkout' && currentPage !== 'payment' && currentPage !== 'login' && currentPage !== 'profile' && currentPage !== 'dashboard-user' && currentPage !== 'event-detail'" />
    <MobileNavbar v-if="currentPage !== 'checkout' && currentPage !== 'event-checkout' && currentPage !== 'login' && currentPage !== 'payment'" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import HeroSection from './components/sections/HeroSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
import ShopSection from './components/sections/ShopSection.vue'
import EventSection from './components/sections/EventSection.vue'
import ShopPage from './components/ShopPage.vue'
import CreatorPage from './components/CreatorPage.vue'
import EventPage from './components/EventPage.vue'
import EventDetailPage from './components/EventDetailPage.vue'
import CheckoutPage from './components/CheckoutPage.vue'
import EventCheckoutPage from './components/EventCheckoutPage.vue'
import PaymentPage from './components/PaymentPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import DashboardUserPage from './components/DashboardUserPage.vue'
import LoginPage from './components/LoginPage.vue'
import InfoPage from './components/InfoPage.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'
import BottomCartBar from './components/BottomCartBar.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import { currentPage, totalItems, currentTheme } from './store/cart.js'
import { watch } from 'vue'

watch(currentTheme, (theme) => {
  if (theme === 'cream') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', theme);
  }
}, { immediate: true });
</script>

<style>
.site-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: clip;
}

main {
  flex-grow: 1;
  min-width: 0;
  width: 100%;
}

main.no-padding {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* Ensure global fonts are applied */
body {
  background-color: var(--color-bg-cream);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  overflow-x: clip;
  width: 100%;
}

/* Premium page transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  main {
    padding-top: 4.5rem; /* account for fixed header */
    padding-bottom: 5.5rem; /* account for fixed bottom nav or cart bar */
  }
  /* Event-detail page manages its own bottom spacing — no double padding */
  main:has(.event-detail-page) {
    padding-bottom: 0;
  }
}
</style>
