<template>
  <section class="terms-faq-section">
    <!-- Looping text divider between best sellers and terms -->
    <div class="tf-marquee" aria-hidden="true">
      <div class="tf-marquee-track">
        <span class="tf-marquee-chunk">{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span class="tf-marquee-chunk">{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeTop }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      </div>
    </div>

    <div class="tf-container">
      <!-- Section Ketentuan -->
      <div class="tf-block">
        <div class="tf-header">
          <div ref="clipboardEl" class="tf-icon-lottie" aria-hidden="true"></div>
          <h2 class="tf-title">{{ currentLang === 'id' ? 'Ketentuan Layanan & Pemesanan' : 'Terms & Conditions' }}</h2>
        </div>
        <div class="tf-cards-grid">
          <div v-for="(item, idx) in termsList" :key="idx" class="tf-card">
            <div class="tf-card-num">0{{ idx + 1 }}</div>
            <h3 class="tf-card-title">{{ currentLang === 'id' ? item.titleId : item.titleEn }}</h3>
            <p class="tf-card-desc">{{ currentLang === 'id' ? item.descId : item.descEn }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Looping text divider between terms and FAQ -->
    <div class="tf-marquee" aria-hidden="true">
      <div class="tf-marquee-track">
        <span class="tf-marquee-chunk">{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span class="tf-marquee-chunk">{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ marqueeText }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      </div>
    </div>

    <div class="tf-container">
      <!-- Section FAQ -->
      <div class="tf-block faq-block">
        <div class="tf-header">
          <div class="tf-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h2 class="tf-title">{{ currentLang === 'id' ? 'FAQ' : 'Frequently Asked Questions' }}</h2>
        </div>
        <div class="faq-list">
          <div 
            v-for="(faq, idx) in faqList" 
            :key="idx" 
            class="faq-item"
            :class="{ active: openFaq === idx }"
            @click="toggleFaq(idx)"
          >
            <div class="faq-question-row">
              <span class="faq-q-text">{{ currentLang === 'id' ? faq.qId : faq.qEn }}</span>
              <div class="faq-chevron">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div v-show="openFaq === idx" class="faq-answer-row">
              <p>{{ currentLang === 'id' ? faq.aId : faq.aEn }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import lottie from 'lottie-web';
import { currentLang } from '../../store/cart.js';

const clipboardEl = ref(null);
let clipboardAnim = null;

onMounted(() => {
  if (clipboardEl.value) {
    clipboardAnim = lottie.loadAnimation({
      container: clipboardEl.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/icon/Clipboard.json',
    });
  }
});

onUnmounted(() => {
  clipboardAnim?.destroy();
});

const marqueeText = computed(() =>
  currentLang.value === 'id'
    ? 'Produk Original Berean.id — Ketentuan Jelas — Layanan Terpercaya'
    : 'Original Berean.id Products — Clear Terms — Trusted Service'
);

const marqueeTop = computed(() =>
  currentLang.value === 'id'
    ? 'Paling Laris — Produk Original — Kualitas Premium'
    : 'Best Sellers — Original Products — Premium Quality'
);

const openFaq = ref(0);
const toggleFaq = (idx) => {
  openFaq.value = openFaq.value === idx ? null : idx;
};

const termsList = [
  {
    titleId: 'Keaslian & Kualitas Produk',
    titleEn: 'Product Authenticity & Quality',
    descId: 'Seluruh merchandise dan produk official Berean.id dijamin 100% original dengan standar kontrol kualitas premium.',
    descEn: 'All official Berean.id merchandise and products are guaranteed 100% original with premium quality control standards.'
  },
  {
    titleId: 'Proses Pengiriman',
    titleEn: 'Shipping & Delivery',
    descId: 'Pesanan dikemas dengan aman dan dikirim sesuai jadwal operasional kurir partner terpercaya.',
    descEn: 'Orders are securely packed and shipped according to trusted courier operational schedules.'
  },
  {
    titleId: 'Kebijakan Pengembalian',
    titleEn: 'Return Policy',
    descId: 'Pengembalian atau penukaran dapat dilakukan jika produk cacat produksi dengan menyertakan video unboxing lengkap.',
    descEn: 'Returns or exchanges are accepted for manufacturing defects upon providing a complete unboxing video.'
  }
];

const faqList = [
  {
    qId: 'Bagaimana cara melakukan pemesanan produk di Berean.id?',
    qEn: 'How do I place an order on Berean.id?',
    aId: 'Anda dapat memilih produk yang diinginkan pada katalog, pilih varian/ukuran, lalu klik "Beli Sekarang" atau tambahkan ke keranjang belanja untuk melanjutkan ke halaman pembayaran.',
    aEn: 'You can select your desired product from the catalog, choose the variant/size, and click "Buy Now" or add it to cart to proceed to checkout.'
  },
  {
    qId: 'Apakah produk Pre-Order dapat digabungkan dengan produk ready stock?',
    qEn: 'Can Pre-Order items be combined with ready stock items?',
    aId: 'Disarankan untuk melakukan pemesanan terpisah agar produk ready stock dapat dikirimkan terlebih dahulu tanpa menunggu masa produksi Pre-Order selesai.',
    aEn: 'It is recommended to place separate orders so that ready stock items can be shipped immediately without waiting for Pre-Order production.'
  },
  {
    qId: 'Metode pembayaran apa saja yang tersedia?',
    qEn: 'What payment methods are available?',
    aId: 'Kami menyediakan berbagai metode pembayaran aman termasuk transfer bank, virtual account, e-wallet, dan QRIS.',
    aEn: 'We offer various secure payment methods including bank transfers, virtual accounts, e-wallets, and QRIS.'
  },
  {
    qId: 'Bagaimana cara melacak status pengiriman pesanan saya?',
    qEn: 'How can I track my order shipping status?',
    aId: 'Nomor resi pengiriman akan otomatis diperbarui di akun Anda atau dikirimkan melalui sistem setelah pesanan Anda diserahkan ke pihak kurir.',
    aEn: 'The shipping tracking number will automatically update in your account or be sent via the system once handed to the courier.'
  }
];
</script>

<style scoped>
.terms-faq-section {
  width: 100%;
  background-color: #FFFFFF;
  padding: 0 1.25rem 4rem;
  border-top: 1px solid var(--color-mocca-border);
}

.tf-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  padding-bottom: 0;
}

.tf-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Full-bleed green looping text divider */
.tf-marquee {
  width: calc(100% + 2.5rem);
  margin-left: -1.25rem;
  margin-right: -1.25rem;
  margin-top: 3.5rem;
  margin-bottom: 0;
  background-color: var(--color-mocca-dark);
  border-top: 1px solid var(--color-mocca-dark);
  border-bottom: 1px solid var(--color-mocca-dark);
  overflow: hidden;
  white-space: nowrap;
}

.tf-marquee-track {
  display: inline-flex;
  animation: tf-marquee-slide 22s linear infinite;
  will-change: transform;
}

.tf-marquee-chunk {
  display: inline-block;
  padding: 0.55rem 0;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
}

@keyframes tf-marquee-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.tf-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.tf-icon-lottie {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

/* FAQ icon: plain, no border/background */
.tf-icon {
  width: 42px;
  height: 42px;
  color: var(--color-mocca-dark);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.tf-icon svg {
  width: 30px;
  height: 30px;
}

.tf-title {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.tf-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.tf-card {
  background: #fff;
  border: 1px solid var(--color-mocca-border);
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
}

.tf-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(47, 78, 62, 0.08);
}

.tf-card-num {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  letter-spacing: 0.1em;
}

.tf-card-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  line-height: 1.35;
}

.tf-card-desc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
}

.faq-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: start;
}

.faq-item {
  background: #fff;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.faq-item:hover {
  border-color: var(--color-mocca-muted);
}

.faq-item.active {
  border-color: var(--color-mocca-dark);
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.05);
}

.faq-question-row {
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.faq-q-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.faq-chevron {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  color: var(--color-mocca-dark);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.faq-item.active .faq-chevron {
  transform: rotate(180deg);
}

.faq-chevron svg {
  width: 16px;
  height: 16px;
}

.faq-answer-row {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid rgba(0,0,0,0.04);
  animation: fadeIn 0.3s ease;
}

.faq-answer-row p {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: #555;
  line-height: 1.6;
  margin-top: 0.75rem;
}

@media (max-width: 1024px) {
  .tf-cards-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .faq-list {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 768px) {
  .terms-faq-section {
    padding: 0 0.75rem 1rem;
  }
  .tf-marquee {
    width: calc(100% + 1.5rem);
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: 2.5rem;
  }
  .tf-container {
    padding-top: 2.5rem;
  }
  .tf-card {
    padding: 1.25rem;
  }
  .faq-question-row {
    padding: 1rem;
  }
  .faq-answer-row {
    padding: 0 1rem 1rem;
  }
}
</style>
