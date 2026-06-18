<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Left Column: Brand, Description, & Socials -->
      <div class="footer-brand">
        <img src="/berean-black.png" alt="Logo" class="logo-img-footer" />
        <p class="footer-description">{{ t('description') }}</p>
        <div class="social-links">
          <!-- Instagram -->
          <a href="#" class="social-icon" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <!-- Spotify -->
          <a href="#" class="social-icon" aria-label="Spotify">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 11.5c2.5-1.5 5.5-1.5 8 0"></path>
              <path d="M9 14c2-1 4-1 6 0"></path>
              <path d="M7.5 9c3-2 6-2 9 0"></path>
            </svg>
          </a>
          <!-- YouTube -->
          <a href="#" class="social-icon" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>

      <!-- Right Columns: Four Columns of Links -->
      <div class="footer-links-grid">
        <!-- Col 1: Toko -->
        <div class="footer-col">
          <h4 class="footer-col-title">{{ t('toko') }}</h4>
          <ul class="footer-list">
            <li><a href="#" class="footer-link" @click.prevent="goToShop('all')">{{ t('allProducts') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToShop('apparel')">{{ t('apparel') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToShop('accessories')">{{ t('accessories') }}</a></li>
          </ul>
        </div>

        <!-- Col 2: Informasi -->
        <div class="footer-col">
          <h4 class="footer-col-title">{{ t('informasi') }}</h4>
          <ul class="footer-list">
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('aboutUs')">{{ t('aboutUs') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('shipping')">{{ t('shipping') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('payment')">{{ t('payment') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('refundReturn')">{{ t('refundReturn') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('faq')">FAQ</a></li>
          </ul>
        </div>

        <!-- Col 3: Bantuan -->
        <div class="footer-col">
          <h4 class="footer-col-title">{{ t('bantuan') }}</h4>
          <ul class="footer-list">
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('contactUs')">{{ t('contactUs') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('sizing')">{{ t('sizing') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('howToOrder')">{{ t('howToOrder') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('orderStatus')">{{ t('orderStatus') }}</a></li>
          </ul>
        </div>

        <!-- Col 4: Legal -->
        <div class="footer-col">
          <h4 class="footer-col-title">Legal</h4>
          <ul class="footer-list">
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('terms')">{{ t('terms') }}</a></li>
            <li><a href="#" class="footer-link" @click.prevent="goToInfo('privacy')">{{ t('privacy') }}</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom copyright row -->
    <div class="footer-bottom">
      <div class="footer-bottom-container">
        <p class="copyright-text">&copy; 2024 Berean.id. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { currentLang, currentPage, activeCategory, activeInfoPage } from '../store/cart.js';

const goToShop = (category) => {
  activeCategory.value = category;
  currentPage.value = 'shop';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToInfo = (pageId) => {
  activeInfoPage.value = pageId;
  currentPage.value = 'info';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const footerTranslations = {
  id: {
    description: 'Official merchandise dari Berean.id. Dibuat dengan cinta untuk para pendengar setia.',
    toko: 'Merchandise',
    allProducts: 'Semua Produk',
    apparel: 'Apparel',
    accessories: 'Accessories',
    homeLiving: 'Home & Living',
    bundles: 'Bundles',
    informasi: 'Informasi',
    aboutUs: 'Tentang Kami',
    shipping: 'Pengiriman',
    payment: 'Pembayaran',
    refundReturn: 'Refund & Return',
    bantuan: 'Bantuan',
    contactUs: 'Hubungi Kami',
    sizing: 'Ukuran',
    howToOrder: 'Cara Order',
    orderStatus: 'Status Pesanan',
    terms: 'Syarat & Ketentuan',
    privacy: 'Kebijakan Privasi'
  },
  en: {
    description: 'Official merchandise from Berean.id. Made with love for loyal listeners.',
    toko: 'Shop',
    allProducts: 'All Products',
    apparel: 'Apparel',
    accessories: 'Accessories',
    homeLiving: 'Home & Living',
    bundles: 'Bundles',
    informasi: 'Information',
    aboutUs: 'About Us',
    shipping: 'Shipping',
    payment: 'Payment',
    refundReturn: 'Refund & Return',
    bantuan: 'Help',
    contactUs: 'Contact Us',
    sizing: 'Sizing',
    howToOrder: 'How to Order',
    orderStatus: 'Order Status',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy'
  }
};

const t = (key) => {
  return footerTranslations[currentLang.value]?.[key] || footerTranslations.id[key];
};
</script>

<style scoped>
.logo-img-footer {
  height: 35px;
  width: auto;
  object-fit: contain;
  margin-bottom: 1rem;
  transition: var(--transition-smooth);
}

.site-footer {
  width: 100%;
  background-color: #FAF6F0; /* Soft warm cream background */
  border-top: 1px solid rgba(47, 78, 62, 0.08);
  padding: 4.5rem 0 0 0;
  transition: var(--transition-smooth);
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  max-width: 320px;
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 1rem;
}

.footer-description {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--color-mocca-dark);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(47, 78, 62, 0.15);
  color: var(--color-mocca-dark);
  transition: var(--transition-smooth);
}

.social-icon:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
  transform: translateY(-2px);
}

.footer-links-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 3.5rem;
}

.footer-col-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--color-mocca-dark);
  opacity: 0.75;
  transition: var(--transition-smooth);
}

.footer-link:hover {
  opacity: 1;
  color: var(--color-mocca-dark);
  text-decoration: underline;
  padding-left: 2px;
}

.footer-bottom {
  border-top: 1px solid rgba(47, 78, 62, 0.06);
  margin-top: 4.5rem;
  padding: 1.75rem 0;
  background-color: rgba(47, 78, 62, 0.02);
}

.footer-bottom-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6rem;
  display: flex;
  justify-content: flex-start;
}

.copyright-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-mocca-muted);
}

/* Responsiveness */
@media (max-width: 1024px) {
  .footer-container {
    padding: 0 3rem;
    flex-direction: column;
    gap: 3rem;
  }
  .footer-links-grid {
    width: 100%;
    gap: 2rem;
  }
  .footer-bottom-container {
    padding: 0 3rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1.5rem;
  }
  .footer-links-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
  .footer-bottom-container {
    padding: 0 1.5rem;
  }
}
</style>
