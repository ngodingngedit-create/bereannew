<template>
  <div class="footer-marquee" aria-hidden="true">
    <div class="footer-marquee-track">
      <span class="footer-marquee-chunk">{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="footer-marquee-chunk">{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    </div>
  </div>
  <footer class="site-footer">
    <div class="footer-container">
      <img src="/logo/logo.webp" alt="Berean.id" class="logo-img-footer" />
      <p class="copyright-text">&copy; 2024 Berean.id. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { currentLang } from '../store/cart.js';

const marqueeText = computed(() =>
  currentLang.value === 'en'
    ? 'Original Berean.id Products — Premium Quality — Fast Shipping'
    : 'Produk Original Berean.id — Kualitas Premium — Pengiriman Cepat'
);
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

.footer-marquee-track {
  display: inline-flex;
  animation: footer-marquee-slide 22s linear infinite;
  will-change: transform;
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
  background-color: #fff;
  border-top: 1px solid rgba(47, 78, 62, 0.08);
  padding: 2rem 0;
}

.footer-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo-img-footer {
  height: 64px;
  width: auto;
  object-fit: contain;
}

.copyright-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-mocca-muted);
  margin: 0;
  text-align: right;
}

@media (max-width: 1024px) {
  .footer-container {
    padding: 0 3rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1.5rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .copyright-text {
    text-align: center;
  }
}
</style>
