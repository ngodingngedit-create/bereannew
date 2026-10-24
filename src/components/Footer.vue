<template>
  <div class="footer-marquee" aria-hidden="true">
    <div class="footer-marquee-track">
      <span class="footer-marquee-chunk">{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="footer-marquee-chunk">{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    </div>
  </div>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <img src="/logo/logo.webp" alt="Berean.id" class="logo-img-footer" />
        <p class="brand-desc">Official merchandise dan koleksi buku rohani Berean.id.</p>
        <div class="social-icons">
          <a href="https://www.instagram.com/bereanbooks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>

      <div class="footer-links-columns">
        <div class="footer-col">
          <h4 class="footer-col-title">Informasi & Bantuan</h4>
          <ul>
            <li><a href="#" @click.prevent="navigateToInfo('faq')">FAQ</a></li>
            <li><a href="#" @click.prevent="navigateToInfo('terms')">Syarat & Ketentuan</a></li>
            <li><a href="#" @click.prevent="navigateToInfo('order')">Cara Order</a></li>
            <li><a href="#" @click.prevent="navigateToInfo('status')">Status Pesanan</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { currentLang, currentPage, activeInfoPage } from '../store/cart.js';

const marqueeText = computed(() =>
  currentLang.value === 'en'
    ? 'Official Berean.id Products — Premium Quality — Fast Shipping'
    : 'Produk Resmi Berean.id — Kualitas Premium — Pengiriman Cepat'
);

const navigateTo = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navigateToInfo = (infoKey) => {
  activeInfoPage.value = infoKey;
  currentPage.value = 'info';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.footer-marquee {
  width: 100%;
  background-color: var(--color-mocca-dark);
  border-top: 1px solid var(--color-mocca-dark);
  border-bottom: 1px solid var(--color-mocca-dark);
  overflow: hidden;
  white-space: nowrap;
}

.footer-marquee-chunk {
  display: inline-block;
  padding: 0.55rem 0;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
}

@keyframes footer-marquee-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .footer-marquee-track {
    animation: none;
  }
}

.site-footer {
  width: 100%;
  background-color: var(--color-bg-cream);
  border-top: 1px solid var(--color-mocca-border);
  padding: 4rem 0 3rem 0;
}

.footer-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
}

.footer-brand {
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logo-img-footer {
  height: 96px;
  width: auto;
  object-fit: contain;
}

.brand-desc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  line-height: 1.5;
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  background: transparent;
  transition: all 0.2s ease;
}

.social-icon:hover {
  background-color: var(--color-mocca-dark);
  color: #fff;
  border-color: var(--color-mocca-dark);
}

.footer-links-columns {
  display: flex;
  gap: 6rem;
  margin-right: 8rem;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-col-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-col ul li a {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-col ul li a:hover {
  color: var(--color-mocca-dark);
}

@media (max-width: 1024px) {
  .footer-container {
    padding: 0 2rem;
    flex-direction: column;
    gap: 3rem;
  }
  .footer-links-columns {
    flex-wrap: wrap;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1.5rem;
  }
  .footer-links-columns {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
