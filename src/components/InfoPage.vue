<template>
  <div class="info-page-wrapper">
    <div class="info-page-container">
      <div class="info-header">
        <h1 class="info-title">{{ pageTitle }}</h1>
        <div class="title-divider-wrapper">
          <div class="divider-line"></div>
          <span class="divider-spark">✦</span>
          <div class="divider-line"></div>
        </div>
      </div>
      
      <div class="info-content-box">
        <!-- Render content based on activeInfoPage -->
        <div class="info-content" v-html="pageContent"></div>
      </div>
      
      <!-- Abstract Doodles for empty spaces -->
      <Doodle class="info-doodle doodle-left" />
      <Doodle class="info-doodle doodle-right" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { activeInfoPage, currentLang } from '../store/cart.js';
import Doodle from './Doodle.vue';

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hardcoded data matching the user request
const pagesData = {
  id: {
    aboutUs: {
      title: 'Tentang Kami',
      content: `
        <h3>Berean.id Official Merchandise</h3>
        <p>Berean.id adalah sebuah grup musik indie pop/jazz asal Indonesia yang dibentuk pada tahun 1999 di Bandung. Merchandise resmi ini dibuat secara khusus dengan cinta untuk para pendengar setia Berean.id (Swinging Friends) di seluruh penjuru dunia.</p>
        <p>Melalui website ini, Anda dapat menemukan koleksi-koleksi eksklusif mulai dari apparel, aksesoris, rilisan fisik, hingga kebutuhan harian yang mengusung nilai dan estetika khas Berean.id. Terima kasih telah mendukung perjalanan musik kami!</p>
      `
    },
    shipping: {
      title: 'Pengiriman',
      content: `
        <h3>Metode Pengiriman</h3>
        <p>Kami bekerja sama dengan berbagai layanan kurir terpercaya di Indonesia untuk memastikan pesanan Anda tiba dengan aman. Layanan yang tersedia saat ini meliputi:</p>
        <ul>
          <li><strong>JNE (Reguler, YES)</strong>: Jangkauan nasional terluas.</li>
          <li><strong>Sicepat (Reguler, BEST)</strong>: Pengiriman cepat untuk area perkotaan.</li>
          <li><strong>Anteraja</strong>: Ekspedisi andalan dengan tarif terjangkau.</li>
          <li><strong>Paxel</strong>: Spesialis pengiriman sameday dan next day untuk kota tertentu.</li>
        </ul>
        <p>Estimasi waktu pengiriman akan disesuaikan dengan kurir dan layanan yang Anda pilih pada saat checkout. Semua pesanan akan diproses maksimal 2x24 jam di hari kerja.</p>
      `
    },
    payment: {
      title: 'Pembayaran',
      content: `
        <h3>Metode Pembayaran</h3>
        <p>Untuk memudahkan proses transaksi Anda, kami menyediakan metode pembayaran berikut:</p>
        <ul>
          <li><strong>QRIS</strong>: Bayar dengan mudah menggunakan aplikasi e-wallet (Gopay, OVO, Dana, ShopeePay) atau mobile banking pilihan Anda. Proses verifikasi instan.</li>
          <li><strong>Cash (Tunai)</strong>: Tersedia khusus untuk transaksi pembelian secara langsung di booth/pop-up store event (POS).</li>
        </ul>
      `
    },
    refundReturn: {
      title: 'Refund & Return',
      content: `
        <h3>Kebijakan Pengembalian Dana dan Barang</h3>
        <p>Kami selalu memastikan setiap barang telah melewati proses pengecekan kualitas sebelum dikirim. Namun, jika Anda menerima barang yang cacat atau salah ukuran dari pihak kami, kami menerima pengembalian dengan syarat berikut:</p>
        <ul>
          <li>Laporan pengembalian dilakukan maksimal <strong>3 hari</strong> sejak barang diterima.</li>
          <li>Sertakan <strong>video unboxing</strong> yang jelas tanpa jeda dari awal membuka paket.</li>
          <li>Barang belum pernah dicuci, dipakai, dan tag masih terpasang utuh.</li>
        </ul>
        <p>Pengembalian dana (refund) akan diproses maksimal 7-14 hari kerja setelah barang retur sampai ke gudang kami dan diverifikasi.</p>
      `
    },
    faq: {
      title: 'FAQ (Tanya Jawab)',
      content: `
        <h3>Pertanyaan Seputar Website & Pesanan</h3>
        <p><strong>Q: Apakah barang selalu ready stock?</strong><br>A: Mayoritas barang kami ready stock, namun beberapa item koleksi khusus bersifat pre-order. Keterangan status stok ada di halaman produk.</p>
        <p><strong>Q: Berapa lama pesanan saya akan dikirim?</strong><br>A: Pesanan akan diproses 1-2 hari kerja. Lama pengiriman di jalan bergantung pada layanan kurir yang Anda pilih.</p>
        <p><strong>Q: Bisakah saya membatalkan pesanan?</strong><br>A: Pesanan yang sudah dibayar dan mendapatkan resi pengiriman tidak dapat dibatalkan.</p>
        <p><strong>Q: Apakah produk yang habis akan restock?</strong><br>A: Tergantung pada jenis produknya. Untuk koleksi terbatas (limited edition), kami biasanya tidak melakukan restock.</p>
      `
    },
    contactUs: {
      title: 'Hubungi Kami',
      content: `
        <h3>Customer Service</h3>
        <p>Jika Anda memiliki pertanyaan lebih lanjut, kendala pesanan, atau penawaran kerja sama, silakan hubungi kami melalui:</p>
        <ul>
          <li><strong>Email:</strong> berean.id@gmail.com</li>
          <li><strong>WA:</strong> +62 821 3224 4344</li>
        </ul>
      `
    },
    sizing: {
      title: 'Panduan Ukuran (Sizing)',
      content: `
        <h3>Panduan Ukuran T-Shirt & Apparel</h3>
        <p>Setiap produk dapat memiliki ukuran yang berbeda. Mohon periksa panduan ukuran pada halaman produk dan pastikan ukuran yang Anda pesan sudah sesuai sebelum melakukan checkout.</p>
      `
    },
    howToOrder: {
      title: 'Cara Order',
      content: `
        <h3>Cara Melakukan Pemesanan</h3>
        <ol>
          <li>Pilih produk favorit Anda dari halaman Toko.</li>
          <li>Tentukan varian (ukuran/warna) dan jumlah barang, lalu klik "Add to Cart" atau tombol keranjang.</li>
          <li>Buka keranjang belanja di pojok kanan atas, lalu klik "Checkout".</li>
          <li>Isi formulir data diri dan alamat pengiriman dengan lengkap dan benar.</li>
          <li>Pilih layanan kurir.</li>
          <li>Pilih metode pembayaran (QRIS) dan selesaikan pembayaran.</li>
          <li>Selesai! Anda akan menerima konfirmasi pesanan.</li>
        </ol>
      `
    },
    orderStatus: {
      title: 'Status Pesanan',
      content: `
        <h3>Melacak Pesanan</h3>
        <p>Anda dapat melihat status pesanan Anda dengan login ke akun Anda dan masuk ke halaman <strong>Profile</strong> -> <strong>Riwayat Transaksi</strong>. Nomor resi pengiriman akan otomatis ter-update di sana jika paket Anda sudah diserahkan ke pihak ekspedisi.</p>
      `
    },
    terms: {
      title: 'Syarat & Ketentuan',
      content: `
        <h3>Syarat dan Ketentuan Layanan</h3>
        <p>Dengan menggunakan situs ini, Anda setuju untuk terikat oleh syarat dan ketentuan kami. Harga produk dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Kami berhak membatalkan pesanan yang terindikasi adanya kecurangan atau manipulasi.</p>
      `
    },
    privacy: {
      title: 'Kebijakan Privasi',
      content: `
        <h3>Perlindungan Data Anda</h3>
        <p>Privasi Anda sangat penting bagi kami. Data pribadi yang Anda masukkan saat checkout seperti Nama, Alamat, dan Nomor Telepon hanya akan digunakan untuk keperluan pengiriman pesanan. Kami tidak akan menjual atau menyebarkan data pribadi Anda kepada pihak ketiga manapun di luar kepentingan pengiriman logistik.</p>
      `
    }
  },
  en: {
    aboutUs: { title: 'About Us', content: '<p>Berean.id Official Merchandise. Made with love for loyal listeners around the globe. Thank you for supporting our musical journey!</p>' },
    shipping: { title: 'Shipping', content: '<p>We support various local couriers including JNE, Sicepat, Anteraja, and Paxel. Orders are typically processed within 1-2 business days.</p>' },
    payment: { title: 'Payment', content: '<p>We accept QRIS for online payments (e-wallets and mobile banking) and Cash for in-person POS transactions.</p>' },
    refundReturn: { title: 'Refund & Return', content: '<p>Returns are accepted within 3 days of delivery for defective items. An unboxing video is required.</p>' },
    faq: { title: 'FAQ', content: '<p>Most items are ready stock. Limited editions may not restock once sold out. For order tracking, please check your profile page.</p>' },
    contactUs: { title: 'Contact Us', content: '<p>Email us at support@kolektix.com. We operate Mon-Fri, 09:00 - 17:00 WIB.</p>' },
    sizing: { title: 'Sizing', content: '<p>Standard Asian sizing. S: 48x68cm, M: 50x70cm, L: 52x72cm, XL: 54x74cm, XXL: 56x76cm. Tolerance 1-2cm.</p>' },
    howToOrder: { title: 'How to Order', content: '<p>Add items to cart, proceed to checkout, enter your shipping details, select a courier, and pay via QRIS.</p>' },
    orderStatus: { title: 'Order Status', content: '<p>Track your orders in the Transaction History section of your Profile page.</p>' },
    terms: { title: 'Terms & Conditions', content: '<p>By using this site, you agree to our terms. Prices are subject to change.</p>' },
    privacy: { title: 'Privacy Policy', content: '<p>Your personal data is strictly used for order fulfillment and will not be shared with third parties.</p>' }
  }
};

const pageTitle = computed(() => {
  const langData = pagesData[currentLang.value] || pagesData.id;
  return langData[activeInfoPage.value]?.title || 'Information';
});

const pageContent = computed(() => {
  const langData = pagesData[currentLang.value] || pagesData.id;
  return langData[activeInfoPage.value]?.content || '<p>Page content is currently being updated. Please check back later.</p>';
});

</script>

<style scoped>
.info-page-wrapper {
  width: 100%;
  min-height: 100vh;
  padding-top: 4rem;
  padding-bottom: 8rem;
  background: linear-gradient(135deg, 
    rgba(245, 242, 237, 0.96) 0%, 
    rgba(245, 242, 237, 0.85) 40%, 
    rgba(245, 242, 237, 0.4) 100%
  ), url('/mocca_collage.png') no-repeat;
  background-position: right top;
  background-size: cover;
  background-attachment: fixed;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
}

.info-page-container {
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 2.5rem 3.5rem;
  background-color: var(--color-bg-light);
  border-radius: 12px;
  border: 1px solid rgba(47, 78, 62, 0.08);
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.02);
  position: relative;
  overflow: hidden;
}

.info-doodle {
  position: absolute;
  width: 180px;
  height: 180px;
  color: var(--color-mocca-dark);
  opacity: 0.04;
  z-index: 0;
  pointer-events: none;
}

.doodle-left {
  bottom: -40px;
  left: -40px;
  transform: rotate(-15deg);
}

.doodle-right {
  top: -20px;
  right: -50px;
  transform: rotate(45deg);
}

.info-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.info-title {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.title-divider-wrapper {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 250px;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(47, 78, 62, 0.15);
}

.divider-spark {
  font-size: 1rem;
  color: rgba(47, 78, 62, 0.4);
  transform: translateY(-1px);
}

.info-content-box {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

/* Base styles for rendered HTML content */
.info-content :deep(h3) {
  font-family: var(--font-body);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.info-content :deep(h3:first-child) {
  margin-top: 0;
}

.info-content :deep(p) {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-mocca-dark);
  opacity: 0.85;
  margin-bottom: 1.2rem;
}

.info-content :deep(ul), .info-content :deep(ol) {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-mocca-dark);
  opacity: 0.85;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.info-content :deep(li) {
  margin-bottom: 0.5rem;
}

.info-content :deep(strong) {
  font-weight: 600;
  color: var(--color-mocca-dark);
  opacity: 1;
}

@media (max-width: 1024px) {
  .info-page-wrapper {
    padding-top: 3.5rem;
    padding-bottom: 6rem;
    background-position: 85% top;
  }
  .info-page-container {
    max-width: calc(100% - 4rem);
    margin: auto;
    padding: 2.5rem 2.5rem;
  }
}

@media (max-width: 820px) {
  .info-page-wrapper {
    padding-top: 2.5rem;
    padding-bottom: 5rem;
    background-position: 75% top;
  }
  .info-page-container {
    max-width: calc(100% - 3rem);
    margin: auto;
    padding: 2rem 2rem;
  }
  .info-title {
    font-size: 2.4rem;
  }
}

@media (max-width: 600px) {
  .info-page-wrapper {
    padding-top: 2rem;
    padding-bottom: 4rem;
    background-position: 65% top;
  }
  .info-page-container {
    max-width: calc(100% - 2rem);
    margin: auto;
    padding: 1.5rem 1.25rem;
  }
  .info-title {
    font-size: 2rem;
  }
  .info-content :deep(h3) {
    font-size: 1.2rem;
  }
  .info-content :deep(p), .info-content :deep(ul), .info-content :deep(ol) {
    font-size: 0.9rem;
  }
  .info-doodle {
    display: none;
  }
}
</style>
