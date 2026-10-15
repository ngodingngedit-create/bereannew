<template>
  <div class="event-checkout-page">
    <div class="checkout-container">
      
      <!-- Breadcrumbs Navigation -->
      <div class="breadcrumbs-container-checkout">
        <a href="#" class="breadcrumb-link" @click.prevent="goToHome">
          <svg class="breadcrumb-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          {{ currentLang === 'id' ? 'Beranda' : 'Home' }}
        </a>
        <span class="breadcrumb-separator">></span>
        <a href="#" class="breadcrumb-link" @click.prevent="goToEventList">Event</a>
        <span class="breadcrumb-separator">></span>
        <a href="#" class="breadcrumb-link" @click.prevent="goToEventDetail">{{ displayEvent.title }}</a>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ currentLang === 'id' ? 'Beli Tiket' : 'Buy Tickets' }}</span>
      </div>

      <!-- Page Title & Stepper Area -->
      <div class="checkout-header-section">
        <div class="header-left-title">
          <h1 class="checkout-title-heading">{{ currentLang === 'id' ? 'Isi Data Diri' : 'Fill Personal Info' }}</h1>
          <p class="checkout-subtitle-text">
            {{ currentLang === 'id' ? 'Lengkapi data diri untuk proses pemesanan tiket Anda.' : 'Complete your personal data to proceed with ticket booking.' }}
          </p>
        </div>  
        
      </div>

      <!-- Two-Column Checkout Layout -->
      <div class="checkout-layout-grid">
        
        <!-- Left Column: Registration Forms -->
        <div class="checkout-forms-column">
          
          <!-- Section Heading -->
          <h2 class="personal-info-heading">{{ currentLang === 'id' ? 'Personal Informasi' : 'Personal Information' }}</h2>

          <!-- Data Pemesan Accordion Card -->
          <div class="accordion-card" :class="{ open: ordererOpen }">
            <div class="accordion-header" @click="ordererOpen = !ordererOpen">
              <span class="accordion-title">{{ currentLang === 'id' ? 'Data Pemesan' : 'Orderer Data' }}</span>
              <svg class="accordion-chevron" :class="{ rotated: !ordererOpen }" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>

            <div v-show="ordererOpen" class="accordion-body">
              <!-- No Identitas -->
              <div v-if="displayEvent.is_noidentity != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Nomor Identitas (KTP/Passport)' : 'Identity Number' }}</label>
                <input type="text" class="field-input" v-model="formData.idCard" :placeholder="currentLang === 'id' ? 'Masukkan NIK / Passport' : 'Enter ID / Passport'" />
              </div>

              <!-- Nama Lengkap -->
              <div v-if="displayEvent.is_name != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Nama Lengkap' : 'Full Name' }}</label>
                <input type="text" class="field-input" v-model="formData.fullName" :placeholder="currentLang === 'id' ? 'Nama Lengkap' : 'Full Name'" />
              </div>

              <!-- Email -->
              <div v-if="displayEvent.is_email != 0" class="form-field-group">
                <label class="field-label">Email</label>
                <input type="email" class="field-input" v-model="formData.email" placeholder="Contoh: example@example.com" />
              </div>

              <!-- No Telepon -->
              <div v-if="displayEvent.is_phone_number != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'No Telepon' : 'Phone Number' }}</label>
                <div class="phone-field-wrapper">
                  <div class="phone-country-btn">
                    <span class="phone-code">+62</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <input type="tel" class="phone-field-input" v-model="formData.phone" :placeholder="currentLang === 'id' ? 'Contoh: 81234567890' : 'e.g. 81234567890'" />
                </div>
              </div>

              <!-- Tanggal Lahir -->
              <div v-if="displayEvent.is_birthdate != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Tanggal Lahir' : 'Birth Date' }}</label>
                <input type="date" class="field-input" v-model="formData.birthDate" />
              </div>

              <!-- Jenis Kelamin -->
              <div v-if="displayEvent.is_gender != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Jenis Kelamin' : 'Gender' }}</label>
                <select class="field-input" v-model="formData.gender">
                  <option value="Laki-laki">{{ currentLang === 'id' ? 'Laki-laki' : 'Male' }}</option>
                  <option value="Perempuan">{{ currentLang === 'id' ? 'Perempuan' : 'Female' }}</option>
                </select>
              </div>

              <!-- Pekerjaan -->
              <div v-if="displayEvent.is_profession != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Pekerjaan' : 'Profession' }}</label>
                <input type="text" class="field-input" v-model="formData.job" :placeholder="currentLang === 'id' ? 'Pekerjaan' : 'Profession'" />
              </div>

              <!-- Perusahaan -->
              <div v-if="displayEvent.is_company != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Perusahaan / Instansi' : 'Company' }}</label>
                <input type="text" class="field-input" v-model="formData.company" :placeholder="currentLang === 'id' ? 'Nama Perusahaan/Instansi' : 'Company Name'" />
              </div>

              <!-- Kelas -->
              <div v-if="displayEvent.is_kelas != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Kelas / Semester' : 'Class / Semester' }}</label>
                <input type="text" class="field-input" v-model="formData.kelas" :placeholder="currentLang === 'id' ? 'Contoh: Semester 4' : 'e.g. Semester 4'" />
              </div>
            </div>
          </div>

          <!-- Per-Ticket Attendee Cards -->
          <div
            v-for="(ticket, tIdx) in ticketAttendees"
            :key="ticket.id"
            class="accordion-card"
            :class="{ open: ticket.open }"
          >
            <div class="accordion-header ticket-accordion-header" @click="ticket.open = !ticket.open">
              <div class="ticket-header-left-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ticket-icon-acc">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                </svg>
                <div>
                  <p class="ticket-acc-name">{{ tIdx + 1 }}. {{ currentLang === 'id' ? 'Pemilik Tiket' : 'Ticket Owner' }} {{ ticket.typeName }}</p>
                  <p class="ticket-acc-price">1 {{ currentLang === 'id' ? 'Tiket' : 'Ticket' }} x {{ formatPrice(ticket.price) }}</p>
                </div>
              </div>
              <svg class="accordion-chevron" :class="{ rotated: !ticket.open }" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>

            <div v-show="ticket.open" class="accordion-body">
              <!-- Toggle: Gunakan Data Pemesan -->
              <div class="use-orderer-toggle-row">
                <span class="toggle-label-text">{{ currentLang === 'id' ? 'Gunakan Data Pemesan' : 'Use Orderer Data' }}</span>
                <button
                  type="button"
                  class="toggle-switch"
                  :class="{ active: ticket.useOrdererData }"
                  @click="toggleUseOrdererData(tIdx)"
                  :aria-checked="ticket.useOrdererData"
                  role="switch"
                >
                  <span class="toggle-thumb"></span>
                </button>
              </div>

              <!-- No Identitas -->
              <div v-if="displayEvent.is_noidentity != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Nomor Identitas (KTP/Passport)' : 'Identity Number' }}</label>
                <input type="text" class="field-input" v-model="ticket.idCard" :disabled="ticket.useOrdererData" :placeholder="currentLang === 'id' ? 'Masukkan NIK / Passport' : 'Enter ID / Passport'" />
              </div>

              <!-- Nama Lengkap -->
              <div v-if="displayEvent.is_name != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Nama Lengkap' : 'Full Name' }}</label>
                <input type="text" class="field-input" v-model="ticket.fullName" :disabled="ticket.useOrdererData" :placeholder="currentLang === 'id' ? 'Nama Lengkap' : 'Full Name'" />
              </div>

              <!-- Email -->
              <div v-if="displayEvent.is_email != 0" class="form-field-group">
                <label class="field-label">Email</label>
                <input type="email" class="field-input" v-model="ticket.email" :disabled="ticket.useOrdererData" placeholder="Contoh: example@example.com" />
              </div>

              <!-- No Telepon -->
              <div v-if="displayEvent.is_phone_number != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'No Telepon' : 'Phone Number' }}</label>
                <div class="phone-field-wrapper" :class="{ disabled: ticket.useOrdererData }">
                  <div class="phone-country-btn">
                    <span class="phone-code">+62</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <input type="tel" class="phone-field-input" v-model="ticket.phone" :disabled="ticket.useOrdererData" :placeholder="currentLang === 'id' ? 'Contoh: 81234567890' : 'e.g. 81234567890'" />
                </div>
              </div>

              <!-- Tanggal Lahir -->
              <div v-if="displayEvent.is_birthdate != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Tanggal Lahir' : 'Birth Date' }}</label>
                <input type="date" class="field-input" v-model="ticket.birthDate" :disabled="ticket.useOrdererData" />
              </div>

              <!-- Jenis Kelamin -->
              <div v-if="displayEvent.is_gender != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Jenis Kelamin' : 'Gender' }}</label>
                <select class="field-input" v-model="ticket.gender" :disabled="ticket.useOrdererData">
                  <option value="Laki-laki">{{ currentLang === 'id' ? 'Laki-laki' : 'Male' }}</option>
                  <option value="Perempuan">{{ currentLang === 'id' ? 'Perempuan' : 'Female' }}</option>
                </select>
              </div>

              <!-- Pekerjaan -->
              <div v-if="displayEvent.is_profession != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Pekerjaan' : 'Profession' }}</label>
                <input type="text" class="field-input" v-model="ticket.job" :disabled="ticket.useOrdererData" :placeholder="currentLang === 'id' ? 'Pekerjaan' : 'Profession'" />
              </div>

              <!-- Perusahaan -->
              <div v-if="displayEvent.is_company != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Perusahaan / Instansi' : 'Company' }}</label>
                <input type="text" class="field-input" v-model="ticket.company" :disabled="ticket.useOrdererData" :placeholder="currentLang === 'id' ? 'Nama Perusahaan/Instansi' : 'Company Name'" />
              </div>

              <!-- Kelas -->
              <div v-if="displayEvent.is_kelas != 0" class="form-field-group">
                <label class="field-label">{{ currentLang === 'id' ? 'Kelas / Semester' : 'Class / Semester' }}</label>
                <input type="text" class="field-input" v-model="ticket.kelas" :disabled="ticket.useOrdererData" :placeholder="currentLang === 'id' ? 'Contoh: Semester 4' : 'e.g. Semester 4'" />
              </div>
            </div>
          </div>

          <!-- Privacy Policy Card -->
          <div class="accordion-card open">
            <div class="accordion-body">
              <div class="checkbox-row-list">
                <label class="custom-checkbox-row">
                  <input type="checkbox" v-model="formData.privacyChecked1" />
                  <span class="custom-check-box"></span>
                  <span class="checkbox-label-text">
                    {{ currentLang === 'id' 
                        ? 'Saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.' 
                        : 'I declare that the information provided is correct and accountable.' }}
                  </span>
                </label>
                <label class="custom-checkbox-row">
                  <input type="checkbox" v-model="formData.privacyChecked2" />
                  <span class="custom-check-box"></span>
                  <span class="checkbox-label-text">
                    {{ currentLang === 'id' 
                        ? 'Saya telah membaca dan menyetujui Syarat & Ketentuan serta Kebijakan Privasi.' 
                        : 'I have read and agree to the Terms & Conditions and Privacy Policy.' }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          
        </div>


        <!-- Right Column: Sticky Order Summary Card -->
        <div class="checkout-summary-column">
          <div class="sticky-summary-card">
            <h2 class="summary-card-title">{{ currentLang === 'id' ? 'Ringkasan Pesanan' : 'Order Summary' }}</h2>

            <!-- Event Poster Thumbnail and quick metadata -->
            <div class="summary-event-banner-box">
              <img :src="displayEvent.image" :alt="displayEvent.title" class="summary-event-poster" />
            </div>

            <!-- Metadata info -->
            <div class="summary-event-info">
              <h3 class="summary-event-title">{{ displayEvent.title }}</h3>
              
              <div class="summary-meta-rows">
                <!-- Date -->
                <div class="summary-meta-item">
                  <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ displayEvent.dateId }}</span>
                </div>

                <!-- Location -->
                <div class="summary-meta-item">
                  <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ displayEvent.location }}</span>
                </div>

                <!-- Category -->
                <div class="summary-meta-item">
                  <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span>{{ displayEvent.categoriesLabel || 'Festival & Pameran • Musik • Pop Indonesia' }}</span>
                </div>
              </div>
            </div>

            <div class="summary-price-divider"></div>

            <!-- Pricing Breakdown -->
            <div class="summary-pricing-breakdown">
              <template v-if="selectedTickets && selectedTickets.length > 0">
                <div v-for="t in selectedTickets" :key="t.id" class="checkout-ticket-summary-item" style="margin-bottom: 0.75rem;">
                  <div class="pricing-row" style="margin-bottom: 0.25rem;">
                    <span class="price-lbl">{{ currentLang === 'id' ? 'Tipe Tiket:' : 'Ticket Type:' }}</span>
                    <span class="price-lbl-detail">{{ t.name }}</span>
                  </div>
                  <div class="pricing-row flex-justify-end">
                    <span class="price-qty-calc">{{ t.quantity }} x {{ formatPrice(t.price) }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="pricing-row">
                  <span class="price-lbl">{{ currentLang === 'id' ? 'Tipe Tiket:' : 'Ticket Type:' }}</span>
                  <span class="price-lbl-detail">{{ selectedTicket ? selectedTicket.name : (currentLang === 'id' ? 'Reguler Ticket' : 'Regular Ticket') }}</span>
                </div>
                <div class="pricing-row flex-justify-end">
                  <span class="price-qty-calc">{{ selectedTicket ? ticketQuantity : 2 }} x {{ selectedTicket ? formatPrice(selectedTicket.price) : (displayEvent.priceLabel || 'Rp150.000') }}</span>
                </div>
              </template>

              <div class="pricing-row">
                <span class="pricing-left">{{ currentLang === 'id' ? 'Subtotal' : 'Subtotal' }}</span>
                <span class="pricing-right">{{ formatPrice(subtotalPrice) }}</span>
              </div>

              <div class="pricing-row">
                <span class="pricing-left align-items-center-flex">
                  {{ currentLang === 'id' ? 'Biaya Layanan' : 'Service Fee' }}
                  <span class="info-circle-tooltip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </span>
                </span>
                <span class="pricing-right">{{ formatPrice(serviceFee) }}</span>
              </div>

              <div class="pricing-row" v-if="taxFee > 0">
                <span class="pricing-left align-items-center-flex">
                  {{ currentLang === 'id' ? 'Pajak (PPN)' : 'Tax (PPN)' }}
                  <span class="info-circle-tooltip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </span>
                </span>
                <span class="pricing-right">{{ formatPrice(taxFee) }}</span>
              </div>
            </div>

            <div class="summary-price-divider"></div>

            <!-- Grand Total -->
            <div class="grand-total-row">
              <span class="grand-label">{{ currentLang === 'id' ? 'Total Pembayaran' : 'Total Payment' }}</span>
              <span class="grand-value">{{ formatPrice(grandTotalPrice) }}</span>
            </div>

            <!-- Security Trust signals -->
            <div class="summary-trust-signals">
              <!-- Signal 1 -->
              <div class="trust-signal-item">
                <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p class="trust-desc">
                  {{ currentLang === 'id' 
                      ? 'Pembayaran Anda dilindungi sistem keamanan terenkripsi.' 
                      : 'Your payment is protected by an encrypted security system.' }}
                </p>
              </div>

              <!-- Signal 2 -->
              <div class="trust-signal-item">
                <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <p class="trust-desc">
                  {{ currentLang === 'id' 
                      ? 'E-ticket akan dikirimkan ke email Anda setelah pembayaran berhasil.' 
                      : 'E-ticket will be sent to your email after successful payment.' }}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>


      

    </div>

    <!-- Fixed Bottom Action Bar -->
    <div class="bottom-action-bar-checkout">
      <div class="bottom-bar-container-checkout">
        
        <!-- Left Side: Circular Countdown and Price Text -->
        <div class="bottom-left-checkout">
          <!-- Circular Countdown timer -->
          <div class="circular-countdown">
            <svg class="progress-ring" width="50" height="50">
              <circle class="progress-ring__circle-bg" stroke="rgba(47, 78, 62, 0.1)" stroke-width="3" fill="transparent" r="21" cx="25" cy="25"/>
              <circle class="progress-ring__circle" stroke="#2F4E3E" stroke-width="3" fill="transparent" r="21" cx="25" cy="25" :stroke-dasharray="131.95" :stroke-dashoffset="dashOffset"/>
            </svg>
            <span class="countdown-digits">{{ formattedTime }}</span>
          </div>

          <!-- Kolektix Branding Info -->
          <div class="bottom-kolektix-brand-checkout">
            <div class="kolektix-avatar-wrapper">
              <img src="/logo/logo.webp" alt="Kolektix Logo" class="kolektix-brand-logo" />
            </div>
            <div class="kolektix-brand-info">
              <span class="kolektix-brand-label">Kolektix Secure</span>
              <span class="kolektix-brand-text">
                {{ currentLang === 'id' ? 'Pembayaran ini akan diproses melalui Kolektix.' : 'This payment will be processed through Kolektix.' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Side: Buy Ticket Button -->
        <button class="bottom-action-btn-checkout" @click="proceedToPayment">
          {{ currentLang === 'id' ? 'Beli Tiket' : 'Buy Tickets' }}
        </button>
        
      </div>
    </div>

    <!-- Error/Success Toast Popup -->
    <ToastAlert
      :show="toastActive"
      :title="toastTitle"
      :description="toastDescription"
      @close="toastActive = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { currentPage, currentLang, selectedEvent, selectedTicket, ticketQuantity, selectedTickets } from '../store/cart.js';
import ToastAlert from './ToastAlert.vue';

// Fallback mods mayday details
const displayEvent = computed(() => {
  return selectedEvent.value || {
    id: 13,
    title: 'Jakarta Mods Mayday 2026',
    image: '/banner/bannerevent.webp',
    dateId: 'Minggu, 31 Mei 2026',
    dateEn: 'Sunday, May 31, 2026',
    time: '12:00 - 23:00 WIB',
    location: 'Senayan Park (Island & Dome), Jakarta Pusat',
    priceLabel: 'Rp150.000',
    categoriesLabel: 'Festival & Pameran • Musik • Pop Indonesia',
    priceVal: 150000,
    is_name: 1,
    is_assistant: 1,
    is_phone_number: 1,
    is_birthdate: 1,
    is_email: 1,
    is_noidentity: 0,
    is_gender: 1,
    is_profession: 0,
    is_company: 0,
    is_kelas: 1
  };
});

// Calculate prices
const subtotalPrice = computed(() => {
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    return selectedTickets.value.reduce((sum, t) => sum + t.price * t.quantity, 0);
  }
  if (selectedTicket.value) {
    return selectedTicket.value.price * ticketQuantity.value;
  }
  const price = displayEvent.value.priceVal || 150000;
  return price * 2;
});

const totalTicketCount = computed(() => {
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    return selectedTickets.value.reduce((sum, t) => sum + t.quantity, 0);
  }
  if (selectedTicket.value) {
    return ticketQuantity.value;
  }
  return 2;
});

const serviceFee = computed(() => {
  let feeTotal = 0;
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    selectedTickets.value.forEach(t => {
      const fee = t.ticket_fee !== undefined ? Number(t.ticket_fee) : 0;
      feeTotal += fee * t.quantity;
    });
  } else if (selectedTicket.value) {
    const fee = selectedTicket.value.ticket_fee !== undefined ? Number(selectedTicket.value.ticket_fee) : 0;
    feeTotal += fee * ticketQuantity.value;
  }
  return feeTotal;
});

const fetchedEventDetails = ref(null);

const fetchEventDetails = async () => {
  try {
    const slug = displayEvent.value.slug || displayEvent.value.slug_url || displayEvent.value.id;
    if (!slug) return;
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/event/${slug}`);
    const json = await response.json();
    if (json.data) {
      fetchedEventDetails.value = json.data;
    }
  } catch (error) {
    console.error('Failed to fetch event details for tax', error);
  }
};

const taxFee = computed(() => {
  const ev = fetchedEventDetails.value || displayEvent.value;
  if (!ev) return 0;
  
  const type = (ev.ppn_type || ev.tax_type || '').toLowerCase();
  const amount = Number(ev.ppn !== undefined && ev.ppn !== null ? ev.ppn : (ev.tax_amount || 0));
  
  if (type === 'nominal') {
    return amount;
  } else if (type === 'percentage') {
    return (subtotalPrice.value * amount) / 100;
  }
  return 0;
});

const grandTotalPrice = computed(() => {
  return subtotalPrice.value + serviceFee.value + taxFee.value;
});

// Form countdown timer logic (15 minutes limit)
const timeLeft = ref(900); // 15 minutes in seconds
let timerId = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const dashOffset = computed(() => {
  const circumference = 2 * Math.PI * 21; // approx 131.95
  const progress = timeLeft.value / 900;
  return circumference * (1 - progress);
});

onMounted(() => {
  fetchEventDetails();
  timerId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerId);
      triggerToast(currentLang.value === 'id' ? 'Batas waktu pengisian form telah habis.' : 'Form filling time limit has expired.');
      setTimeout(() => {
        goToEventDetail();
      }, 2000);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});

// Accordion open states
const ordererOpen = ref(true);

// Build per-ticket attendee list as reactive array (not computed, so state persists)
const buildAttendees = () => {
  const list = [];
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    selectedTickets.value.forEach((t) => {
      for (let i = 0; i < t.quantity; i++) {
        list.push({
          id: `${t.id}-${i}`,
          ticketId: t.id,
          isBundle: t.isBundle ? 1 : 0,
          typeName: t.name,
          price: t.price,
          open: true,
          useOrdererData: false,
          fullName: '',
          email: '',
          phone: '',
          idCard: '',
          birthDate: '',
          gender: 'Laki-laki',
          job: '',
          company: '',
          kelas: ''
        });
      }
    });
  } else {
    list.push({
      id: 'default-0',
      ticketId: selectedTicket.value ? selectedTicket.value.id : 1,
      isBundle: 0,
      typeName: selectedTicket.value ? selectedTicket.value.name : 'Presale 2 - Sesi 1',
      price: selectedTicket.value ? selectedTicket.value.price : 45000,
      open: true,
      useOrdererData: false,
      fullName: '',
      email: '',
      phone: '',
      idCard: '',
      birthDate: '',
      gender: 'Laki-laki',
      job: '',
      company: '',
      kelas: ''
    });
  }
  return list;
};

const ticketAttendees = ref(buildAttendees());

const toggleUseOrdererData = (idx) => {
  const t = ticketAttendees.value[idx];
  t.useOrdererData = !t.useOrdererData;
  if (t.useOrdererData) {
    t.fullName = formData.value.fullName;
    t.email = formData.value.email;
    t.phone = formData.value.phone;
    t.idCard = formData.value.idCard;
    t.birthDate = formData.value.birthDate;
    t.gender = formData.value.gender;
    t.job = formData.value.job;
    t.company = formData.value.company;
    t.kelas = formData.value.kelas;
  }
};

// Registration Form Reactive State
const formData = ref({
  fullName: '',
  idCard: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: 'Laki-laki',
  nationality: 'WNI',
  address: '',
  province: '',
  city: '',
  district: '',
  postalCode: '',
  job: '',
  instagram: '',
  privacyChecked1: false,
  privacyChecked2: true
});

// Dynamic location selector data
const provincesList = ['DKI Jakarta', 'Jawa Barat', 'DI Yogyakarta', 'Jawa Timur', 'Banten'];

const citiesMap = {
  'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara', 'Jakarta Barat'],
  'Jawa Barat': ['Bandung', 'Bogor', 'Depok', 'Bekasi', 'Tangerang'],
  'DI Yogyakarta': ['Yogyakarta', 'Sleman', 'Bantul', 'Kulon Progo'],
  'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo'],
  'Banten': ['Tangerang Selatan', 'Serang', 'Cilegon']
};

const districtsMap = {
  'Jakarta Pusat': ['Gambir', 'Menteng', 'Kemayoran', 'Sawah Besar', 'Cempaka Putih'],
  'Jakarta Selatan': ['Kebayoran Baru', 'Mampang Prapatan', 'Kemang', 'Cilandak', 'Tebet'],
  'Bandung': ['Coblong', 'Sumur Bandung', 'Cibeunying', 'Andir', 'Ujung Berung'],
  'Yogyakarta': ['Gondokusuman', 'Danurejan', 'Mantinejeron', 'Umbulharjo'],
  'Surabaya': ['Tegalsari', 'Gubeng', 'Wonokromo', 'Genteng']
};

const availableCities = computed(() => {
  if (!formData.value.province) return [];
  return citiesMap[formData.value.province] || [];
});

const availableDistricts = computed(() => {
  if (!formData.value.city) return [];
  return districtsMap[formData.value.city] || ['Kecamatan A', 'Kecamatan B', 'Kecamatan C'];
});

const onProvinceChange = () => {
  formData.value.city = '';
  formData.value.district = '';
};

const onCityChange = () => {
  formData.value.district = '';
};

// Form validation
const validateForm = () => {
  const data = formData.value;
  const ev = displayEvent.value;
  // Mock validation for seat mismatch
  if (data.fullName.toLowerCase().trim() === 'seat') {
    return 'Jumlah seat tidak sesuai qty';
  }
  
  if (ev.is_name != 0 && !data.fullName.trim()) return currentLang.value === 'id' ? 'Nama Lengkap wajib diisi.' : 'Full Name is required.';
  if (ev.is_email != 0 && (!data.email.trim() || !data.email.includes('@'))) return currentLang.value === 'id' ? 'Format email tidak valid.' : 'Invalid email format.';
  if (ev.is_phone_number != 0 && !data.phone.trim()) return currentLang.value === 'id' ? 'Nomor Telepon wajib diisi.' : 'Phone Number is required.';
  if (ev.is_birthdate != 0 && !data.birthDate) return currentLang.value === 'id' ? 'Tanggal Lahir wajib diisi.' : 'Birth date is required.';
  if (ev.is_profession != 0 && !data.job.trim()) return currentLang.value === 'id' ? 'Pekerjaan wajib diisi.' : 'Profession is required.';
  if (ev.is_company != 0 && !data.company.trim()) return currentLang.value === 'id' ? 'Perusahaan / Instansi wajib diisi.' : 'Company is required.';
  if (ev.is_kelas != 0 && !data.kelas.trim()) return currentLang.value === 'id' ? 'Kelas / Semester wajib diisi.' : 'Class / Semester is required.';

  if (!data.privacyChecked1 || !data.privacyChecked2) {
    return currentLang.value === 'id' 
      ? 'Anda harus menyetujui seluruh ketentuan dan kebijakan privasi.' 
      : 'You must agree to all terms and policies.';
  }
  return null;
};

// Toast notification states
const toastActive = ref(false);
const toastTitle = ref('');
const toastDescription = ref('');
let toastTimeout = null;

// Navigation events
const goToHome = () => {
  currentPage.value = 'home';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToEventList = () => {
  currentPage.value = 'event';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToEventDetail = () => {
  currentPage.value = 'event-detail';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const proceedToPayment = async () => {
  const errorMsg = validateForm();
  if (errorMsg) {
    triggerToast(errorMsg);
    return;
  }

  const evId = displayEvent.value.id || selectedEvent.value?.id || 103;
  const identities = [];
  
  // 1. Orderer identity
  identities.push({
    nik: formData.value.idCard || "",
    full_name: formData.value.fullName,
    email: formData.value.email,
    countryCode: "62",
    no_telp: formData.value.phone.replace(/^0+/, ''),
    is_pemesan: 1,
    identity_type_id: 1,
    event_ticket_id: selectedTickets.value.length > 0 ? selectedTickets.value[0].id : (selectedTicket.value?.id || 1),
    seat_number: ""
  });

  // 2. Ticket attendees
  ticketAttendees.value.forEach((attendee) => {
    identities.push({
      nik: attendee.idCard || "",
      full_name: attendee.fullName,
      email: attendee.email,
      countryCode: "62",
      no_telp: attendee.phone.replace(/^0+/, ''),
      is_pemesan: 0,
      identity_type_id: 1,
      event_ticket_id: attendee.ticketId || 1,
      seat_number: ""
    });
  });

  const ticketPayloads = [];
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    selectedTickets.value.forEach(t => {
      ticketPayloads.push({
        id: t.id,
        event_id: evId,
        event_ticket_id: t.id,
        price: t.price,
        name: t.name,
        subtotal_price: t.price * t.quantity,
        is_bundling: t.is_bundling !== undefined ? t.is_bundling : (t.isBundle ? 1 : 0),
        bundling_qty: t.bundling_qty !== undefined ? t.bundling_qty : (t.isBundle ? t.quantity : 0),
        qty_ticket: t.quantity,
        is_promo: 0,
        is_bundling_merch: 0,
        promo_title: "",
        promo_price: 0,
        payment_status: "pending",
        seatnumber_ticket: "[]",
        is_insurance: 0,
        insurance_amount: 0,
        insurance_require: 0
      });
    });
  } else if (selectedTicket.value) {
      ticketPayloads.push({
        id: selectedTicket.value.id,
        event_id: evId,
        event_ticket_id: selectedTicket.value.id,
        price: selectedTicket.value.price,
        name: selectedTicket.value.name,
        subtotal_price: selectedTicket.value.price * ticketQuantity.value,
        is_bundling: selectedTicket.value.is_bundling !== undefined ? selectedTicket.value.is_bundling : 0,
        bundling_qty: selectedTicket.value.bundling_qty !== undefined ? selectedTicket.value.bundling_qty : 0,
        qty_ticket: ticketQuantity.value,
        is_promo: 0,
        is_bundling_merch: 0,
        promo_title: "",
        promo_price: 0,
        payment_status: "pending",
        seatnumber_ticket: "[]",
        is_insurance: 0,
        insurance_amount: 0,
        insurance_require: 0
      });
  }

  // Set expiration to 15 mins
  const expDate = new Date(Date.now() + 15 * 60000).toISOString();

  const payload = {
    event_id: evId,
    admin_fee: null,
    payment_method: "4",
    grandtotal: grandTotalPrice.value,
    ppn_type: "nominal",
    ppn: 0,
    ppn_amount: 0,
    is_insurance: 0,
    insurance_amount: 0,
    insurance_total: 0,
    insurance_required: 0,
    identities: identities,
    tickets: ticketPayloads,
    bank_code: "",
    expiration_date: expDate,
    vouchers: []
  };

  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    triggerToast(
      currentLang.value === 'id' ? 'Memproses Pesanan' : 'Processing Order',
      currentLang.value === 'id' ? 'Mohon tunggu sebentar...' : 'Please wait...'
    );

    const response = await fetch(`${apiUrl}/api/transaction-without-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const xenditUrl = result.xendit_url || result.data?.xendit_url || result.data?.invoice_url || result.invoice_url;
    if (response.ok || result.success || xenditUrl) {
      triggerToast(
        currentLang.value === 'id' ? 'Koneksi Sukses' : 'Connection Success',
        currentLang.value === 'id' ? 'Menghubungkan ke sistem pembayaran...' : 'Redirecting to payment gateway...'
      );
      setTimeout(() => {
        currentPage.value = 'home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (xenditUrl) {
          window.location.href = xenditUrl;
        }
      }, 1200);
    } else {
      triggerToast(
        currentLang.value === 'id' ? 'Gagal Memproses' : 'Failed to Process',
        result.message || 'Terjadi kesalahan saat checkout.'
      );
    }
  } catch (error) {
    console.error('Checkout error:', error);
    triggerToast(
      currentLang.value === 'id' ? 'Gagal Terhubung' : 'Connection Failed',
      'Silakan coba beberapa saat lagi.'
    );
  }
};

const triggerToast = (msg, desc = '') => {
  if (msg === 'Jumlah seat tidak sesuai qty' || msg === 'Seat quantity mismatch') {
    toastTitle.value = currentLang.value === 'id' ? 'Jumlah seat tidak sesuai qty' : 'Seat quantity mismatch';
    toastDescription.value = currentLang.value === 'id' ? 'Silakan periksa kembali jumlah seat yang dipilih.' : 'Please check the number of seats selected.';
  } else if (desc) {
    toastTitle.value = msg;
    toastDescription.value = desc;
  } else {
    toastTitle.value = currentLang.value === 'id' ? 'Kesalahan Validasi' : 'Validation Error';
    toastDescription.value = msg;
  }
  toastActive.value = true;
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastActive.value = false;
  }, 4000);
};

// Format currency standard
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
.event-checkout-page {
  background-color: #F5F2ED; /* Warm cream background */
  min-height: 100vh;
  width: 100%;
  padding: 2rem 0 8rem 0;
  box-sizing: border-box;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

/* Breadcrumbs Navigation */
.breadcrumbs-container-checkout {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-mocca-dark);
}

.breadcrumb-icon {
  margin-bottom: 1px;
}

.breadcrumb-separator {
  color: var(--color-mocca-border);
}

.breadcrumb-current {
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* Title & Stepper Header Area */
.checkout-header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
  padding-bottom: 1.5rem;
}

.header-left-title {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.checkout-title-heading {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  line-height: 1.2;
}

.checkout-subtitle-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
}

/* Horizontal Stepper */
.stepper-horizontal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-mocca-muted);
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  background-color: transparent;
  color: var(--color-mocca-muted);
}

.step-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.step-item.active .step-num {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  color: #ffffff;
}

.step-item.active .step-label {
  color: var(--color-mocca-dark);
}

.step-line {
  width: 30px;
  height: 1.5px;
  background-color: var(--color-mocca-border);
}

/* Two-Column Grid */
.checkout-layout-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 2rem;
  align-items: start;
}

.checkout-summary-column {
  align-self: stretch;
}

/* Form Cards styling */
.checkout-forms-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Section Heading ── */
.personal-info-heading {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
}

/* ── Accordion Card ── */
.accordion-card {
  background-color: #ffffff;
  border: 1px solid rgba(47, 78, 62, 0.12);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(47, 78, 62, 0.04);
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.accordion-card.open .accordion-header {
  border-bottom-color: rgba(47, 78, 62, 0.1);
}

.accordion-header:hover {
  background-color: rgba(47, 78, 62, 0.01);
}

.accordion-title {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.accordion-chevron {
  color: var(--color-mocca-muted);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.accordion-chevron.rotated {
  transform: rotate(180deg);
}

.accordion-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Ticket Accordion Header ── */
.ticket-accordion-header {
  background-color: rgba(47, 78, 62, 0.025);
}

.ticket-header-left-info {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.ticket-icon-acc {
  color: var(--color-mocca-muted);
  flex-shrink: 0;
  margin-top: 2px;
}

.ticket-acc-name {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  line-height: 1.3;
}

.ticket-acc-price {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--color-mocca-muted);
  margin-top: 0.2rem;
}

/* ── Toggle Switch: Gunakan Data Pemesan ── */
.use-orderer-toggle-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
  margin-bottom: 0.25rem;
}

.toggle-label-text {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--color-mocca-muted);
  font-weight: 500;
}

.toggle-switch {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(47, 78, 62, 0.15);
  position: relative;
  cursor: pointer;
  transition: background-color 0.25s ease;
  flex-shrink: 0;
  border: none;
  outline: none;
  padding: 0;
}

.toggle-switch.active {
  background-color: var(--color-mocca-dark);
}

.toggle-thumb {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  top: 3px;
  left: 3px;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(20px);
}

/* ── Form Field Groups ── */
.form-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
}

.field-input {
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid rgba(47, 78, 62, 0.18);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-input:focus {
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.06);
}

.field-input:disabled {
  background-color: rgba(47, 78, 62, 0.04);
  color: var(--color-mocca-muted);
  cursor: not-allowed;
}

/* ── Phone field in accordion ── */
.phone-field-wrapper {
  display: flex;
  border: 1px solid rgba(47, 78, 62, 0.18);
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.phone-field-wrapper:focus-within {
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.06);
}

.phone-field-wrapper.disabled {
  background-color: rgba(47, 78, 62, 0.04);
}

.phone-country-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0 0.85rem;
  background-color: rgba(47, 78, 62, 0.03);
  border-right: 1px solid rgba(47, 78, 62, 0.12);
  cursor: pointer;
  flex-shrink: 0;
  color: var(--color-mocca-muted);
}

.phone-code {
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.phone-field-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.7rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
  outline: none;
  min-width: 0;
}

.phone-field-input:disabled {
  color: var(--color-mocca-muted);
  cursor: not-allowed;
}


.form-block-card {
  background-color: #ffffff;
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.02);
}

.form-block-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.35rem;
}

.form-block-desc {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin-bottom: 1.5rem;
}

.fields-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.full-width-field {
  grid-column: span 2;
  margin-bottom: 1.25rem;
}

.input-field-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.required-asterisk {
  color: #7A1C1C;
  font-weight: bold;
  margin-left: 1px;
}

.form-text-input,
.form-textarea-input,
.form-select-input {
  width: 100%;
  box-sizing: border-box;
  background-color: #FCFAF7;
  border: 1px solid rgba(47, 78, 62, 0.15);
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.2s ease;
}

.form-text-input:focus,
.form-textarea-input:focus,
.form-select-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.05);
}

.form-textarea-input {
  resize: vertical;
}

/* Phone input flag addon */
.phone-input-group {
  display: flex;
  border: 1px solid rgba(47, 78, 62, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FCFAF7;
  transition: all 0.2s ease;
}

.phone-input-group:focus-within {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.05);
}

.country-flag-selector {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.75rem;
  background-color: rgba(47, 78, 62, 0.03);
  border-right: 1px solid rgba(47, 78, 62, 0.15);
  cursor: pointer;
}

.flag-icon-img {
  width: 18px;
  height: 12px;
  object-fit: cover;
  border-radius: 1px;
}

.country-code-val {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.dropdown-caret-icon {
  color: var(--color-mocca-muted);
}

.phone-text-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
}

/* Date picker customization wrapper */
.date-input-wrapper {
  position: relative;
}

.date-picker-input {
  padding-right: 2.25rem;
}

/* Custom Select carets */
.select-wrapper-group {
  position: relative;
}

.custom-select-container {
  position: relative;
  width: 100%;
}

.form-select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2rem;
}

.select-caret-svg {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-mocca-muted);
}

/* Gender radio groups */
.gender-radio-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  min-height: 38px;
}

.gender-radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.gender-radio-native {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.gender-radio-custom {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(47, 78, 62, 0.25);
  background-color: #FCFAF7;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
}

.gender-radio-native:checked ~ .gender-radio-custom {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
}

.gender-radio-custom::after {
  content: '';
  position: absolute;
  display: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gender-radio-native:checked ~ .gender-radio-custom::after {
  display: block;
}

.gender-text-lbl {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* Instagram input with prefix */
.instagram-input-wrapper {
  display: flex;
  border: 1px solid rgba(47, 78, 62, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FCFAF7;
  transition: all 0.2s ease;
}

.instagram-input-wrapper:focus-within {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.05);
}

.instagram-at-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  background-color: rgba(47, 78, 62, 0.03);
  border-right: 1px solid rgba(47, 78, 62, 0.15);
}

.instagram-text-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
}

/* Privacy checklists */
.checkbox-row-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.custom-checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox-row input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-check-box {
  width: 18px;
  height: 18px;
  background-color: #FCFAF7;
  border: 1.5px solid rgba(47, 78, 62, 0.25);
  border-radius: 4px;
  flex-shrink: 0;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
  margin-top: 0.1rem;
}

.custom-checkbox-row input:checked ~ .custom-check-box {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

.custom-check-box::after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox-row input:checked ~ .custom-check-box::after {
  display: block;
}

.custom-checkbox-row .custom-check-box::after {
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label-text {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  line-height: 1.4;
  font-weight: 500;
}

.checkbox-label-text a {
  color: var(--color-mocca-dark);
  text-decoration: underline;
  font-weight: 700;
}



.back-outline-btn {
  background: transparent;
  border: 1.5px solid var(--color-mocca-dark);
  color: var(--color-mocca-dark);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-outline-btn:hover {
  background-color: rgba(47, 78, 62, 0.05);
}

.continue-solid-btn {
  background-color: var(--color-mocca-dark);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
  transition: all 0.2s ease;
}

.continue-solid-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.2);
}

/* Sticky Summary Card styling */
.sticky-summary-card {
  background-color: #ffffff;
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.02);
  position: sticky;
  top: 6rem;
}

.summary-card-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 1.25rem;
}

.summary-event-banner-box {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.summary-event-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.summary-event-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-event-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  line-height: 1.3;
}

.summary-meta-rows {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.summary-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  line-height: 1.3;
}

.summary-meta-item .meta-icon {
  margin-top: 0.1rem;
  color: var(--color-mocca-muted);
  flex-shrink: 0;
}

.summary-price-divider {
  height: 1px;
  background-color: rgba(47, 78, 62, 0.08);
  margin: 1.25rem 0;
}

/* Pricing itemized breakdown styling */
.summary-pricing-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
}

.price-lbl {
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.price-lbl-detail {
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.price-qty-calc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  background-color: rgba(47, 78, 62, 0.04);
  padding: 1px 6px;
  border-radius: 4px;
}

.flex-justify-end {
  justify-content: flex-end;
  margin-top: -0.3rem;
  margin-bottom: 0.2rem;
}

.pricing-left {
  color: var(--color-mocca-muted);
  font-weight: 500;
}

.pricing-right {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.align-items-center-flex {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.info-circle-tooltip {
  display: inline-flex;
  align-items: center;
  color: var(--color-mocca-muted);
  cursor: pointer;
}

/* Grand Total Row styling */
.grand-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.grand-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.grand-value {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
}

/* Trust Signals inside summary card */
.summary-trust-signals {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background-color: rgba(47, 78, 62, 0.02);
  border-radius: 8px;
  padding: 0.85rem;
}

.trust-signal-item {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.trust-signal-item .trust-icon {
  color: var(--color-mocca-muted);
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.trust-signal-item .trust-desc {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  line-height: 1.35;
  margin: 0;
}

/* Bottom full-width trust banner */
.bottom-trust-banner-checkout {
  margin-top: 3rem;
  width: 100%;
}



.trust-card-icon-box {
  color: var(--color-mocca-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.trust-card-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.trust-card-title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
}

.trust-card-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
  margin: 0;
}

/* Toast popup notifications removed for ToastAlert component */

/* ================= RESPONSIVE MEDIA QUERIES ================= */
@media (max-width: 1024px) {
  .breadcrumbs-container-checkout {
    display: none !important;
  }

  .checkout-container {
    padding: 0 1rem;
  }

  .checkout-header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .checkout-layout-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sticky-summary-card {
    position: static;
  }
}

@media (max-width: 600px) {
  .event-checkout-page {
    padding: 1.5rem 0 3rem 0;
  }

  .checkout-title-heading {
    font-size: 1.75rem;
  }

  .fields-grid-2col {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .full-width-field {
    grid-column: span 1;
  }

  .form-block-card {
    padding: 1.25rem;
  }

  

  .back-outline-btn,
  .continue-solid-btn {
    width: 100%;
    text-align: center;
  }

  .stepper-horizontal {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  
}

/* Fixed Bottom Action Bar for Checkout */
.bottom-action-bar-checkout {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid rgba(47, 78, 62, 0.1);
  box-shadow: 0 -8px 30px rgba(47, 78, 62, 0.08);
  z-index: 9999;
  padding: 0.6rem 0;
  box-sizing: border-box;
}

.bottom-bar-container-checkout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.bottom-left-checkout {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

/* Circular Countdown Timer Styling */
.circular-countdown {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.5s linear;
}

.countdown-digits {
  position: absolute;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.bottom-kolektix-brand-checkout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: left;
}

.kolektix-avatar-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8%;
  /* border: 1.5px solid var(--color-mocca-border); */
  overflow: hidden;
  /* background-color: #FFFFFF; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(47, 78, 62, 0.05);
}

.kolektix-brand-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kolektix-brand-info {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.kolektix-brand-label {
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kolektix-brand-text {
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  max-width: 200px;
}

.bottom-action-btn-checkout {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2.2rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
  transition: all 0.25s ease;
}

.bottom-action-btn-checkout:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.2);
}

@media (max-width: 768px) {
  .bottom-bar-container-checkout {
    padding: 0 1rem;
  }
  .bottom-left-checkout {
    gap: 0.5rem;
  }
  .kolektix-avatar-wrapper {
    width: 28px;
    height: 28px;
  }
  .kolektix-brand-label {
    font-size: 0.55rem;
  }
  .kolektix-brand-text {
    font-size: 0.7rem;
    max-width: 180px;
    line-height: 1.3;
  }
  .circular-countdown {
    transform: scale(0.85);
    transform-origin: center left;
  }
  .bottom-action-btn-checkout {
    padding: 0.65rem 1.25rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 520px) {
  .bottom-action-bar-checkout {
    padding: 0.65rem 0;
  }
  .bottom-bar-container-checkout {
    flex-direction: column;
    align-items: stretch;
    gap: 0.65rem;
    padding: 0 1rem;
  }
  .bottom-left-checkout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
  }
  .bottom-kolektix-brand-checkout {
    flex: 1;
    justify-content: flex-start;
    gap: 0.35rem;
  }
  .kolektix-avatar-wrapper {
    width: 24px;
    height: 24px;
  }
  .kolektix-brand-label {
    font-size: 0.52rem;
  }
  .kolektix-brand-text {
    max-width: 170px;
    font-size: 0.65rem;
  }
  .bottom-action-btn-checkout {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.9rem;
    text-align: center;
    border-radius: 8px;
  }
}


/* ═══════════════════════════════════════
   RESPONSIVE — Checkout Page (Mobile)
═══════════════════════════════════════ */
@media (max-width: 768px) {
  .event-checkout-page {
    padding: 1rem 0 7rem 0;
  }

  .checkout-container {
    padding: 0 1.1rem;
  }

  .breadcrumbs-container-checkout {
    display: none;
  }

  /* ── Header: stack title above stepper ── */
  .checkout-header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
  }

  .checkout-title-heading {
    font-size: 1.6rem;
  }

  .stepper-horizontal {
    width: 100%;
    justify-content: space-between;
  }

  .step-label {
    font-size: 0.7rem;
  }

  .step-line {
    flex: 1;
  }

  /* ── Layout: single column on mobile ── */
  .checkout-layout-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  /* ── Summary column goes below forms ── */
  .checkout-summary-column {
    order: 2;
  }

  .checkout-forms-column {
    order: 1;
    gap: 0.85rem;
  }

  /* ── Accordion Cards ── */
  .personal-info-heading {
    font-size: 1.5rem;
  }

  .accordion-header {
    padding: 0.95rem 1rem;
  }

  .accordion-title {
    font-size: 0.92rem;
  }

  .accordion-body {
    padding: 1rem;
    gap: 0.85rem;
  }

  .ticket-acc-name {
    font-size: 0.88rem;
  }

  /* ── Fields ── */
  .field-input {
    font-size: 0.85rem;
    padding: 0.65rem 0.8rem;
  }

  .phone-field-input {
    font-size: 0.85rem;
  }

  /* ── Toggle row ── */
  .use-orderer-toggle-row {
    justify-content: space-between;
  }

 

  .back-outline-btn,
  .continue-solid-btn {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  /* ── Order Summary Card ── */
  .sticky-summary-card {
    position: static;
    top: auto;
  }
}
</style>
