<template>
  <div class="payment-page-wrapper">
    <!-- Mobile-only timer below header (green bordered) -->
    <div class="mobile-timer-bar" aria-label="Batas waktu pembayaran">
      <svg viewBox="0 0 36 36" class="circular-chart">
        <path class="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path class="circle-progress"
          :stroke-dasharray="100"
          :stroke-dashoffset="paymentTimeProgress"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div class="timer-text">{{ formattedPaymentTime }}</div>
      <span class="mobile-timer-label">{{ currentLang === 'id' ? 'Sisa waktu pembayaran' : 'Payment time left' }}</span>
    </div>
    <div class="payment-container">
    
      <!-- Main Columns Grid Layout -->
      <div class="payment-grid">
        
        <!-- Left Column: Form Details -->
        <div class="left-column">
          
          <!-- 1. Data Diri Section -->
          <div class="form-card">
            <div class="card-inner-compact">
              <h2 class="section-title" style="margin-bottom: 0.25rem;">1. Data Diri</h2>
              <p style="font-size: 0.7rem; color: var(--color-mocca-muted); margin-bottom: 1.5rem; margin-top: 0; line-height: 1.4;">
                Email pemesan dapat digunakan untuk login dan melihat riwayat transaksi.
              </p>
              <div class="form-col-group">
                <div class="input-group">
                  <label class="field-label">Nama Lengkap</label>
                  <input type="text" v-model="profile.name" class="text-input" placeholder="Masukkan nama lengkap" />
                </div>
                <div class="input-group">
                  <label class="field-label">Email</label>
                  <input type="email" v-model="profile.email" class="text-input" placeholder="contoh@domain.com" />
                </div>
                <div class="input-group">
                  <label class="field-label">Nomor Telepon</label>
                  <div class="phone-input-grid">
                    <select class="select-input phone-prefix-select">
                      <option value="+62">+62</option>
                    </select>
                    <input type="tel" v-model="profile.phone" class="text-input" placeholder="812xxxx" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Alamat Pengiriman Section -->
          <div class="form-card">
            <div class="card-inner-compact">
              <div class="card-header-row mb-1-5" @click="isAlamatExpanded = !isAlamatExpanded" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <h2 class="section-title text-alamat-pengiriman" style="margin-bottom: 0;">2. Alamat Pengiriman</h2>
                <svg :style="{ transform: isAlamatExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'var(--color-mocca-dark)' }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              
              <div v-show="isAlamatExpanded">
              <!-- Address Stepper -->
              <div class="address-stepper">
                <div class="step-indicator" :class="{ active: addressStep >= 1 }">
                  <div class="step-circle">1</div>
                  <span class="step-label">Cari</span>
                </div>
                <div class="step-line" :class="{ active: addressStep >= 2 }"></div>
                <div class="step-indicator" :class="{ active: addressStep >= 2 }">
                  <div class="step-circle">2</div>
                  <span class="step-label">Pinpoint</span>
                </div>
                <div class="step-line" :class="{ active: addressStep >= 3 }"></div>
                <div class="step-indicator" :class="{ active: addressStep >= 3 }">
                  <div class="step-circle">3</div>
                  <span class="step-label">Detail</span>
                </div>
              </div>

              <!-- STEP 1: Autocomplete -->
              <div v-show="addressStep === 1" class="address-step-container">
                <div class="input-group mb-1-5">
                  <label class="field-label">Cari Lokasi</label>
                  <input type="text" ref="autocompleteInputRef" class="text-input" placeholder="Ketik nama jalan, gedung, atau area..." />
                </div>
                <button class="primary-checkout-btn" @click="proceedToMapPinpoint" :disabled="!selectedPlaceLocation">
                  Lanjut Pinpoint Peta
                </button>
              </div>

              <!-- STEP 2: Map Pinpoint -->
              <div v-show="addressStep === 2" class="address-step-container">
                <label class="field-label mb-0-5">Pinpoint Lokasi Anda</label>
                <div id="map-container" style="width: 100%; height: 320px; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid var(--color-mocca-border);"></div>
                
                <div style="display: flex; gap: 1rem;">
                  <button class="back-to-shop-btn" @click="addressStep = 1">Kembali</button>
                  <button class="primary-checkout-btn" @click="proceedToAddressDetail">Gunakan Lokasi Ini</button>
                </div>
              </div>

              <!-- STEP 3: Detail Alamat -->
              <div v-show="addressStep === 3" class="address-step-container">
                <div class="form-grid-2 mb-1-5">
                  <div class="input-group">
                    <label class="field-label">Label Alamat</label>
                    <input type="text" v-model="activeAddress.address_name" class="text-input" placeholder="Cth: Rumah" />
                  </div>
                  <div class="input-group">
                    <label class="field-label">Nama Penerima</label>
                    <input type="text" v-model="activeAddress.nama_penerima" class="text-input" />
                  </div>
                </div>

                <div class="input-group mb-1-5">
                  <label class="field-label">Nomor Telepon</label>
                  <div class="phone-input-grid">
                    <select class="select-input phone-prefix-select">
                      <option value="+62">+62</option>
                    </select>
                    <input type="text" v-model="activeAddress.phone" class="text-input" placeholder="8..." />
                  </div>
                </div>

                <div class="form-grid-2 mb-1-5">
                  <div class="input-group relative-dropdown">
                    <label class="field-label">Provinsi</label>
                    <div class="custom-select-container">
                      <div class="select-input custom-select-display combobox-wrapper" @click="openProvinceDropdown">
                        <input type="text" v-model="provinceInputValue" @focus="openProvinceDropdown" placeholder="Pilih Provinsi" class="combobox-input" />
                        <svg class="chevron-icon" :class="{ 'rotate': isProvinceDropdownOpen }" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      <div class="custom-dropdown-menu" v-if="isProvinceDropdownOpen">
                        <ul class="dropdown-list pt-0">
                          <li v-for="prov in filteredProvinces" :key="prov.id" @click="selectProvince(prov)" class="dropdown-item" :class="{ 'active': activeAddress.province_id === prov.id }">
                            {{ prov.name }}
                          </li>
                          <li v-if="filteredProvinces.length === 0" class="dropdown-empty">Provinsi tidak ditemukan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="input-group relative-dropdown">
                    <label class="field-label">Kota / Kabupaten</label>
                    <div class="custom-select-container" :class="{ 'disabled-select': !activeAddress.province_id }">
                      <div class="select-input custom-select-display combobox-wrapper" @click="activeAddress.province_id && openCityDropdown()">
                        <input type="text" v-model="cityInputValue" @focus="activeAddress.province_id && openCityDropdown()" placeholder="Pilih Kota / Kabupaten" class="combobox-input" :disabled="!activeAddress.province_id" />
                        <svg class="chevron-icon" :class="{ 'rotate': isCityDropdownOpen }" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      <div class="custom-dropdown-menu" v-if="isCityDropdownOpen">
                        <ul class="dropdown-list pt-0">
                          <li v-for="city in filteredCities" :key="city.id" @click="selectCity(city)" class="dropdown-item" :class="{ 'active': activeAddress.city_id === city.id }">
                            {{ city.name }}
                          </li>
                          <li v-if="filteredCities.length === 0" class="dropdown-empty">Kota tidak ditemukan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="input-group mb-1-5">
                  <label class="field-label">Kode Pos</label>
                  <input type="text" v-model="activeAddress.zip" class="text-input" />
                </div>

                <div class="input-group mb-1-5">
                  <label class="field-label">Alamat Lengkap</label>
                  <textarea v-model="activeAddress.street" rows="3" class="textarea-input"></textarea>
                </div>

                <div style="display: flex; gap: 1rem;">
                  <button class="back-to-shop-btn" @click="addressStep = 2">Ubah Pinpoint</button>
                  <button class="primary-checkout-btn" @click="saveAddressAndFetchShipping" :disabled="isFetchingShipping">
                    {{ isFetchingShipping ? 'Mencari...' : 'Pilih Metode Pengiriman' }}
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>

          <!-- 3. Metode Pengiriman Section -->
          <div class="form-card" v-if="isShippingReady">
            <div class="card-inner-compact">
              <div class="card-header-row mb-1-5" @click="isMetodeExpanded = !isMetodeExpanded" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <h2 class="section-title" style="margin-bottom: 0;">3. Metode Pengiriman</h2>
                <svg :style="{ transform: isMetodeExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'var(--color-mocca-dark)' }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              
              <div v-show="isMetodeExpanded">
              <!-- Courier shipping radio -->
              <div class="shipping-method-choice mb-1-5">
                <label class="shipping-radio-label">
                  <input type="radio" value="courier" v-model="shippingType" />
                  <span class="radio-box"></span>
                  <span class="radio-text font-bold">Kirim Melalui Kurir</span>
                </label>
              </div>

              <!-- Courier Options Card (Visible if shippingType === 'courier') -->
              <div v-if="shippingType === 'courier'" class="couriers-accordion-list mb-1-5">
                
                <!-- No Couriers Message -->
                <div v-if="Object.values(courierServices).every(arr => arr.length === 0)" class="no-couriers-alert">
                  Maaf, tidak ada layanan pengiriman yang tersedia untuk alamat pengiriman ini.
                </div>

                <!-- Dynamic Couriers -->
                <div v-for="(services, carrier) in courierServices" :key="carrier" class="courier-card" v-show="services && services.length > 0" :class="{ open: expandedCourier === carrier }">
                  <div class="courier-header" @click="toggleCourier(carrier)">
                    <div class="header-left-col">
                      <span class="courier-dot" :class="{ checked: selectedCourier === carrier }"></span>
                      <div class="courier-brand">
                        <span class="courier-title font-bold" style="text-transform: capitalize;">{{ services[0]?.originalName || carrier }}</span>
                      </div>
                    </div>
                    <div class="header-right-col">
                      <span class="courier-price-range">Mulai dari {{ formatPrice(services[0]?.price || 0) }}</span>
                      <svg class="chevron-arrow" :class="{ rotate: expandedCourier === carrier }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  <!-- Services List -->
                  <div class="courier-services-body" v-if="expandedCourier === carrier">
                    <h4 class="services-title">Layanan Pengiriman</h4>
                    <div class="services-grid">
                      <label 
                        v-for="service in services" 
                        :key="service.id" 
                        class="service-row" 
                        :class="{ selected: selectedCourier === carrier && selectedServiceId === service.id }"
                        @click="selectCourierService(carrier, service)"
                      >
                        <div class="service-left">
                          <input 
                            type="radio" 
                            :name="`${carrier}_service`" 
                            :checked="selectedCourier === carrier && selectedServiceId === service.id" 
                          />
                          <span class="service-radio-dot"></span>
                          <div class="service-meta">
                            <span class="service-name font-bold">{{ service.name }}</span>
                            <span class="service-desc">{{ service.desc }}</span>
                          </div>
                        </div>
                        <span class="service-price font-bold">{{ formatPrice(service.price) }}</span>
                      </label>
                    </div>
                  </div>
                </div>


              </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Order Summary (Sticky Sidebar) -->
        <div class="right-column">
          <div class="summary-card">
            <div class="card-inner-compact">
              <div class="summary-header-row">
                <h3 class="summary-title">Ringkasan Pesanan</h3>
              </div>
              
              <!-- Products List inside summary -->
              <div class="summary-products-list">
                <div 
                  v-for="item in visibleCartItems" 
                  :key="item.id" 
                  class="summary-prod-item editing-row"
                  :class="{ 'zero-qty': item.qty === 0 }"
                >
                  <div class="prod-left">
                    <div class="prod-thumb">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                    <div class="prod-info">
                      <h4 class="prod-name font-bold">{{ item.name }}</h4>
                      <span class="prod-meta" v-if="(item.size && item.size !== '-') || (item.color && item.color !== 'default')">Varian: {{ item.size && item.size !== '-' ? item.size : item.color }}</span>
                      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.2rem; margin-top: 6px;">
                        <span style="font-size: 0.65rem; color: var(--color-mocca-muted);">Dikirim dari :</span>
                        <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.7rem; color: var(--color-mocca-dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 10px; height: 10px; color: var(--color-mocca-dark); flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          <span style="font-weight: 700;">TOKOMOCCA</span>, DKI Jakarta
                        </div>
                      </div>
                      
                      <!-- Notes Input -->
                      <div class="summary-note-edit-wrapper mt-0-5">
                        <input 
                          type="text" 
                          v-model="item.note" 
                          class="summary-note-input" 
                          placeholder="Tambah catatan (opsional)..." 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div class="prod-right text-right">
                    <span class="prod-price font-bold">{{ formatPrice(item.price) }}</span>
                    
                    <!-- Quantity adjuster -->
                    <div class="summary-qty-adjuster mt-0-5">
                      <button class="sqty-btn minus" @click="adjustSummaryQty(item, -1)">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <span class="sqty-val font-bold">{{ item.qty }}</span>
                      <button class="sqty-btn plus" @click="adjustSummaryQty(item, 1)">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <button class="sqty-delete-btn" @click="deleteSummaryItem(item)" title="Hapus produk">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="visibleCartItems.length === 0" class="empty-summary-text text-center py-2">
                  Tidak ada produk di keranjang.
                </div>
              </div>

              <!-- Voucher Section -->
              <div class="voucher-wrapper">
                <label class="voucher-label">Voucher</label>
                <div class="voucher-input-row">
                  <input 
                    type="text" 
                    v-model="voucherCode" 
                    class="voucher-input" 
                    placeholder="Masukkan kode voucher"
                    :disabled="voucherApplied"
                  />
                  <button 
                    class="voucher-apply-btn" 
                    :class="{ applied: voucherApplied }"
                    @click="applyVoucherCode"
                    :disabled="isVerifyingVoucher || voucherApplied"
                  >
                    {{ isVerifyingVoucher ? 'Loading...' : (voucherApplied ? 'Gunakan ✓' : 'Gunakan') }}
                  </button>
                </div>
                <p class="voucher-success-text" v-if="voucherApplied">Voucher {{ activeVoucherData?.name }} berhasil digunakan! <span class="remove-btn" @click="removeVoucherCode">Hapus</span></p>
                <p v-if="voucherError" style="color: #E21E26; font-size: 0.7rem; margin-top: 0.5rem; font-weight: 500;">{{ voucherError }}</p>
              </div>

              <div class="summary-divider"></div>

              <!-- Cost Breakdowns -->
              <div class="summary-breakdowns">
                <div class="breakdown-row">
                  <span class="breakdown-label">Subtotal ({{ cartProductCount }} produk)</span>
                  <span class="breakdown-value">{{ formatPrice(cartSubtotalPrice) }}</span>
                </div>
                
                <!-- Admin Fee -->
                <div class="breakdown-row" v-if="cartAdminFee > 0">
                  <span class="breakdown-label">Biaya Layanan</span>
                  <span class="breakdown-value">{{ formatPrice(cartAdminFee) }}</span>
                </div>
                
                <!-- Shipping Cost -->
                <div class="breakdown-row" v-if="isShippingReady && shippingType === 'courier' && shippingPrice > 0">
                  <span class="breakdown-label">Ongkir ({{ activeCourierLabel }} - {{ activeServiceLabel }})</span>
                  <span class="breakdown-value">{{ formatPrice(shippingPrice) }}</span>
                </div>

                <!-- COD Cost -->
                <div class="breakdown-row" v-if="shippingType === 'cod'">
                  <span class="breakdown-label">Biaya COD</span>
                  <span class="breakdown-value">{{ formatPrice(15000) }}</span>
                </div>

                <!-- Voucher Discount -->
                <div class="breakdown-row discount" v-if="voucherApplied">
                  <span class="breakdown-label">Diskon Voucher ({{ activeVoucherData?.code }})</span>
                  <span class="breakdown-value" style="color: var(--color-mocca-dark); font-weight: 600;">- {{ formatPrice(voucherDiscount) }}</span>
                </div>

                <div class="summary-divider"></div>

                <!-- Total Payments -->
                <div class="breakdown-row total-row">
                  <span class="total-label font-semibold">Total Pembayaran</span>
                  <span class="total-value font-semibold text-coffee">{{ formatPrice(totalPaymentsPrice) }}</span>
                </div>
              </div>

              <!-- Shield Trust Notice -->
              <div class="security-notice">
                <svg class="shield-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div class="notice-desc-group">
                  <span class="notice-title font-bold">Pembayaran aman & terenkripsi</span>
                  <span class="notice-desc">Informasi pembayaran Anda dijaga kerahasiaannya dengan enkripsi tingkat tinggi.</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="summary-actions">
                <div class="terms-text text-center mt-0-75">
                  Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    
    <!-- Fixed Bottom Action Bar -->
    <div class="fixed-payment-actions">
      <div class="fixed-payment-actions-inner">
        <div class="fixed-left-group">
          <div class="payment-timer-wrapper">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle-progress"
                :stroke-dasharray="100"
                :stroke-dashoffset="paymentTimeProgress"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="timer-text">{{ formattedPaymentTime }}</div>
          </div>
          <button class="back-to-cart-link-btn fixed-back-btn" @click="backToCheckout">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="back-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Kembali
          </button>
        </div>
        
        <button class="primary-checkout-btn font-bold fixed-pay-btn" @click="submitOrder" :disabled="isSubmitting || !isFormComplete">
          <span v-if="isSubmitting" class="spinner"></span>
          <span v-else>Bayar Sekarang</span>
        </button>
      </div>
    </div>
    <!-- Payment Popup Iframe -->
    <Transition name="modal-fade">
      <div v-if="paymentPopupUrl" class="payment-popup-overlay">
        <div class="payment-popup-container">
          <div class="payment-popup-header">
            <span class="font-bold">Selesaikan Pembayaran</span>
            <button class="close-popup-btn" @click="closePaymentPopup">Tutup</button>
          </div>
          <iframe :src="paymentPopupUrl" class="payment-iframe" frameborder="0"></iframe>
        </div>
      </div>
    </Transition>

    <!-- Success Modal Transition -->
    <Transition name="modal-fade">
      <div v-if="showSuccessModal" class="success-modal-backdrop" @click="closeSuccessModal">
        <div class="success-modal-card" @click.stop>
          <div class="check-animation-circle">
            <svg class="success-checkmark-icon" viewBox="0 0 52 52">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          
          <h2 class="modal-title font-bold">Pembayaran Berhasil!</h2>
          <p class="modal-subtitle">Terima kasih atas pembelian Anda. Pesanan Anda telah diterima dan sedang diproses.</p>
          
          <div class="order-invoice-details">
            <div class="invoice-row">
              <span class="inv-label">Nomor Transaksi:</span>
              <span class="inv-value font-bold text-coffee">MC-{{ transactionId }}</span>
            </div>
            <div class="invoice-row">
              <span class="inv-label">Metode Pembayaran:</span>
              <span class="inv-value font-bold capitalize">Xendit</span>
            </div>
            <div class="invoice-row">
              <span class="inv-label">Total Dibayar:</span>
              <span class="inv-value font-bold text-coffee">{{ formatPrice(totalPaymentsPrice) }}</span>
            </div>
          </div>

          <button class="close-success-btn font-bold" @click="closeSuccessModal">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { currentPage, cartItems, clearCart, updateQuantity, removeFromCart, checkedCheckoutItems, currentLang } from '../store/cart.js';

// Timer Logic
const paymentTimeLeft = ref(15 * 60);
let paymentTimerInterval = null;

const startPaymentTimer = () => {
  paymentTimeLeft.value = 15 * 60;
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
  paymentTimerInterval = setInterval(() => {
    if (paymentTimeLeft.value > 0) {
      paymentTimeLeft.value--;
    } else {
      clearInterval(paymentTimerInterval);
      currentPage.value = 'home';
    }
  }, 1000);
};

onMounted(() => {
  startPaymentTimer();
});

onUnmounted(() => {
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
});

const formattedPaymentTime = computed(() => {
  const m = Math.floor(paymentTimeLeft.value / 60).toString().padStart(2, '0');
  const s = (paymentTimeLeft.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

const paymentTimeProgress = computed(() => {
  const total = 15 * 60;
  const progress = (paymentTimeLeft.value / total) * 100;
  return 100 - progress; // Decreases stroke-dashoffset to show depletion
});

// 1. Data Diri
const profile = ref({
  name: '',
  email: '',
  phone: ''
});

const isAlamatExpanded = ref(true);
const isMetodeExpanded = ref(true);

// 2. Alamat Pengiriman (Google Maps Flow)
const GOOGLE_MAPS_API_KEY = "AIzaSyBxZekg89Ut1U72fFpQldJAenvgTy197As";
const GOOGLE_MAPS_MAP_ID = "795838f77e7bb079c78f5aac";

const addressStep = ref(1);
const autocompleteInputRef = ref(null);
const selectedPlaceLocation = ref(null);
let mapInstance = null;
let markerInstance = null;
const isFetchingShipping = ref(false);
const isShippingReady = ref(false);

const activeAddress = ref({
  address_name: '',
  nama_penerima: '',
  phone: '',
  province_id: '',
  city_id: '',
  district: '',
  zip: '',
  street: '',
  latitude: '',
  longitude: ''
});

const provinces = ref([]);
const cities = ref([]);

const fetchProvinces = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/province`);
    const data = await response.json();
    let result = data.data || data;
    if (result && result.rajaongkir && result.rajaongkir.results) {
      result = result.rajaongkir.results;
    } else if (result && result.results) {
      result = result.results;
    }
    provinces.value = Array.isArray(result) ? result : [];
  } catch(e) {
    console.error('Failed to fetch provinces', e);
  }
};

const onProvinceChange = async () => {
  activeAddress.value.city_id = '';
  cities.value = [];
  if (activeAddress.value.province_id) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
      const response = await fetch(`${apiUrl}/api/city?province_id=${activeAddress.value.province_id}`);
      const data = await response.json();
      let result = data.data || data;
      if (result && result.rajaongkir && result.rajaongkir.results) {
        result = result.rajaongkir.results;
      } else if (result && result.results) {
        result = result.results;
      }
      cities.value = Array.isArray(result) ? result : [];
    } catch(e) {
      console.error('Failed to fetch cities', e);
    }
  }
};

const isProvinceDropdownOpen = ref(false);
const provinceInputValue = ref('');
const isCityDropdownOpen = ref(false);
const cityInputValue = ref('');

const filteredProvinces = computed(() => {
  if (!provinceInputValue.value) return provinces.value;
  const lowerCaseQuery = provinceInputValue.value.toLowerCase();
  
  const selectedProv = provinces.value.find(p => p.id === activeAddress.value.province_id);
  if (selectedProv && selectedProv.name.toLowerCase() === lowerCaseQuery) return provinces.value;
  
  return provinces.value.filter(prov => prov.name.toLowerCase().includes(lowerCaseQuery));
});

const filteredCities = computed(() => {
  if (!cityInputValue.value) return cities.value;
  const lowerCaseQuery = cityInputValue.value.toLowerCase();
  
  const selectedCity = cities.value.find(c => c.id === activeAddress.value.city_id);
  if (selectedCity && selectedCity.name.toLowerCase() === lowerCaseQuery) return cities.value;
  
  return cities.value.filter(city => city.name.toLowerCase().includes(lowerCaseQuery));
});

const openProvinceDropdown = () => {
  isProvinceDropdownOpen.value = true;
};

const openCityDropdown = () => {
  if (activeAddress.value.province_id) {
    isCityDropdownOpen.value = true;
  }
};

const selectProvince = (prov) => {
  activeAddress.value.province_id = prov.id;
  provinceInputValue.value = prov.name;
  isProvinceDropdownOpen.value = false;
  onProvinceChange();
};

const selectCity = (city) => {
  activeAddress.value.city_id = city.id;
  cityInputValue.value = city.name;
  isCityDropdownOpen.value = false;
};

// Reset values if user types but doesn't select
const resetInputsToSelected = () => {
  const prov = provinces.value.find(p => p.id === activeAddress.value.province_id);
  provinceInputValue.value = prov ? prov.name : '';
  
  const city = cities.value.find(c => c.id === activeAddress.value.city_id);
  cityInputValue.value = city ? city.name : '';
};

// Close dropdowns when clicking outside
const handleClickOutside = (e) => {
  const dropdowns = document.querySelectorAll('.custom-select-container');
  let clickedInside = false;
  dropdowns.forEach(el => {
    if (el.contains(e.target)) clickedInside = true;
  });
  if (!clickedInside) {
    if (isProvinceDropdownOpen.value || isCityDropdownOpen.value) {
      resetInputsToSelected();
    }
    isProvinceDropdownOpen.value = false;
    isCityDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  document.addEventListener('click', handleClickOutside);
  fetchProvinces();
  initGoogleMaps();
  if (checkedCheckoutItems.value && checkedCheckoutItems.value.length > 0) {
    activeCartItems.value = checkedCheckoutItems.value.map(item => ({ ...item }));
  } else {
    activeCartItems.value = [];
  }
});

const initGoogleMaps = () => {
  if (window.google && window.google.maps) {
    initAutocomplete();
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    initAutocomplete();
  };
  document.head.appendChild(script);
};

const initAutocomplete = () => {
  if (!autocompleteInputRef.value) return;
  const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.value, {
    types: ['geocode'],
    componentRestrictions: { country: 'id' }
  });
  
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      return;
    }
    selectedPlaceLocation.value = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    
    activeAddress.value.street = place.formatted_address || '';
    
    for (const component of place.address_components) {
      if (component.types.includes('postal_code')) {
        activeAddress.value.zip = component.long_name;
      }
    }
  });
};

const proceedToMapPinpoint = () => {
  addressStep.value = 2;
  setTimeout(() => {
    initMap();
  }, 100);
};

const initMap = () => {
  const mapElement = document.getElementById('map-container');
  if (!mapElement) return;
  
  const centerPos = selectedPlaceLocation.value || { lat: -6.200000, lng: 106.816666 };
  
  mapInstance = new window.google.maps.Map(mapElement, {
    center: centerPos,
    zoom: 15,
    mapId: GOOGLE_MAPS_MAP_ID,
    mapTypeControl: false,
    streetViewControl: false
  });

  markerInstance = new window.google.maps.Marker({
    position: centerPos,
    map: mapInstance,
    draggable: true,
    animation: window.google.maps.Animation.DROP,
  });

  markerInstance.addListener('dragend', () => {
    const position = markerInstance.getPosition();
    selectedPlaceLocation.value = {
      lat: position.lat(),
      lng: position.lng()
    };
  });
};

const proceedToAddressDetail = () => {
  addressStep.value = 3;
};

const saveAddressAndFetchShipping = async () => {
  if (!activeAddress.value.province_id || !activeAddress.value.city_id || !activeAddress.value.zip) {
    showToast('Mohon lengkapi Provinsi, Kota, dan Kode Pos.');
    return;
  }

  activeAddress.value.latitude = selectedPlaceLocation.value.lat;
  activeAddress.value.longitude = selectedPlaceLocation.value.lng;
  
  isFetchingShipping.value = true;
  shippingType.value = '';
  courierServices.value = {
    flat: [
      {
        id: 'flat_reguler',
        name: 'Reguler',
        desc: 'Estimasi 2-3 hari',
        price: 4000,
        originalName: 'Standar'
      }
    ]
  };
  shippingType.value = 'courier';
  selectedCourier.value = 'flat';
  expandedCourier.value = 'flat';
  selectedServiceId.value = 'flat_reguler';
  shippingPrice.value = 4000;
  isShippingReady.value = true;
  isFetchingShipping.value = false;
  showToast('Ongkos kirim Rp 4.000 diterapkan.');

  // ponytail: API cek-all-ongkir replaced by flat Rp 4.000. Reconnect API when dynamic rates return.
  if (false) {
  try {
    let totalWeight = 0;
    activeCartItems.value.forEach(item => {
      totalWeight += (item.weight || 400) * item.qty;
    });
    if (totalWeight === 0) totalWeight = 1000;
    
    const firstItem = activeCartItems.value[0] || {};
    const originStore = firstItem.store_location || {};

    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const payload = {
      origin_postal_code: originStore.postal_code || "",
      destination_postal_code: activeAddress.value.zip,
      origin_latitude: originStore.latitude || "",
      origin_longitude: originStore.longitude || "",
      destination_latitude: activeAddress.value.latitude,
      destination_longitude: activeAddress.value.longitude,
      weight: totalWeight
    };
    
    console.log("DEBUG: originStore from cart item", originStore);
    console.log("DEBUG: cek-all-ongkir payload", payload);
    
    const response = await fetch(`${apiUrl}/api/shipping/cek-all-ongkir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const resData = await response.json();
    const ratesData = resData.rates || resData.data || resData; 
    
    const newCourierServices = {};
    
    const processServiceArray = (arr) => {
      arr.forEach(cost => {
        const code = (cost.courier || '').toLowerCase();
        let carrierKey = code.replace(/[^a-z0-9]/g, '');
        if (carrierKey.includes('jnt') || carrierKey.includes('jt')) carrierKey = 'jnt';
        if (carrierKey.includes('pos')) carrierKey = 'pos';
        
        const serviceName = (cost.service || cost.type || '').toLowerCase();
        // Only allow 'Reguler', 'EZ', or 'Standard'
        if (!serviceName.includes('regul') && serviceName !== 'ez' && !serviceName.includes('standard')) {
          return;
        }

        if (!newCourierServices[carrierKey]) {
          newCourierServices[carrierKey] = [];
        }

        newCourierServices[carrierKey].push({
          id: cost.service || cost.type,
          name: cost.service || cost.type,
          desc: cost.etd ? `${cost.etd} hari` : 'Layanan',
          price: (parseInt(cost.price) || 0) + 4000,
          originalName: cost.courier
        });
      });
    };

    if (Array.isArray(ratesData)) {
      processServiceArray(ratesData);
    } else if (ratesData && typeof ratesData === 'object') {
      Object.values(ratesData).forEach(serviceArray => {
        if (Array.isArray(serviceArray)) {
          processServiceArray(serviceArray);
        }
      });
    }
    
    courierServices.value = newCourierServices;
    
    // Automatically select the first available courier
    for (const [carrier, services] of Object.entries(courierServices.value)) {
      if (services.length > 0) {
        shippingType.value = 'courier';
        selectedCourier.value = carrier;
        expandedCourier.value = carrier;
        selectedServiceId.value = services[0].id;
        shippingPrice.value = services[0].price;
        break;
      }
    }
    
    isShippingReady.value = true;
    showToast('Ongkos kirim berhasil dihitung!');
  } catch(e) {
    console.error('Failed to fetch shipping', e);
    showToast('Gagal memuat ongkos kirim. Silakan periksa kembali detail alamat.');
  } finally {
    isFetchingShipping.value = false;
  }
  }
};

// Initialize addresses & cart items (Moved above)

// 3. Metode Pengiriman
const shippingType = ref('courier'); // 'courier' or 'cod'
const selectedCourier = ref('jne');  // 'jne', 'jnt', 'sicepat', 'anteraja'
const expandedCourier = ref('jne');  // sub-accordion expander
const selectedServiceId = ref('next_day'); // default selected service

const courierServices = ref({});

const shippingPrice = ref(0); // flat tracking of shipping price

const toggleCourier = (carrier) => {
  expandedCourier.value = expandedCourier.value === carrier ? null : carrier;
  // If clicked header and not selected, automatically select first service of that courier
  if (selectedCourier.value !== carrier) {
    selectedCourier.value = carrier;
    const services = courierServices.value[carrier];
    if (services && services.length > 0) {
      selectedServiceId.value = services[0].id;
      shippingPrice.value = services[0].price;
    }
  }
};

const selectCourierService = (carrier, service) => {
  selectedCourier.value = carrier;
  selectedServiceId.value = service.id;
  shippingPrice.value = service.price;
};

// Courier text helpers
const activeCourierLabel = computed(() => {
  const services = courierServices.value[selectedCourier.value] || [];
  return services.length > 0 ? (services[0].originalName || selectedCourier.value) : 'Kurir';
});

const activeServiceLabel = computed(() => {
  const services = courierServices.value[selectedCourier.value] || [];
  const found = services.find(s => s.id === selectedServiceId.value);
  return found ? found.name : 'Regular';
});

// Notes
const notes = ref('');

// Right Column: Order Summary data
const activeCartItems = ref([]);

// Summary Calculations
const isEditingSummary = ref(false);

const visibleCartItems = computed(() => {
  if (isEditingSummary.value) {
    return activeCartItems.value;
  }
  return activeCartItems.value.filter(item => item.qty > 0);
});

const adjustSummaryQty = (item, delta) => {
  const oldQty = item.qty;
  item.qty = Math.max(0, item.qty + delta);
  const newQty = item.qty;
  const diff = newQty - oldQty;
  
  if (diff !== 0) {
    updateQuantity(item.id, item.color, diff);
  }
};

const deleteSummaryItem = (item) => {
  item.qty = 0;
  removeFromCart(item.id, item.color);
};

const cartProductCount = computed(() => {
  return activeCartItems.value.reduce((acc, curr) => acc + curr.qty, 0);
});

const cartSubtotalPrice = computed(() => {
  return activeCartItems.value.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
});

const cartAdminFee = computed(() => {
  return activeCartItems.value.reduce((acc, curr) => {
    const fee = curr.admin_fee !== undefined ? curr.admin_fee : 2000;
    return acc + (fee * curr.qty);
  }, 0);
});

// Voucher
const voucherCode = ref('');
const voucherApplied = ref(false);
const activeVoucherData = ref(null);
const isVerifyingVoucher = ref(false);
const voucherError = ref('');

const voucherDiscount = computed(() => {
  if (!voucherApplied.value || !activeVoucherData.value) return 0;
  
  const v = activeVoucherData.value;
  let discountValue = 0;
  
  if (v.is_percentage === 1 || v.type === 'percentage') {
    discountValue = Math.round(cartSubtotalPrice.value * (v.discount / 100));
  } else {
    discountValue = v.discount;
    if (v.is_multiply === 1) {
      discountValue = discountValue * cartProductCount.value;
    }
  }
  
  return Math.min(discountValue, cartSubtotalPrice.value);
});

const applyVoucherCode = async () => {
  if (!voucherCode.value.trim() || isVerifyingVoucher.value) return;
  
  isVerifyingVoucher.value = true;
  
  try {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const productId = activeCartItems.value.length > 0 ? (activeCartItems.value[0].product_id || activeCartItems.value[0].id) : '';
    
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/vouchers-merch/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        module_id: "2",
        product_id: productId ? productId.toString() : "",
        code: voucherCode.value.trim(),
        date: today
      })
    });
    
    const resData = await response.json();
    
    if (response.ok && (resData.status === 200 || resData.voucher)) {
      voucherApplied.value = true;
      activeVoucherData.value = resData.voucher;
      voucherError.value = '';
    } else {
      voucherApplied.value = false;
      activeVoucherData.value = null;
      voucherError.value = (resData.message && !resData.message.toLowerCase().includes('server')) ? resData.message : 'Kode voucher tidak valid.';
    }
  } catch (e) {
    console.error('Voucher verification failed:', e);
    voucherError.value = 'Kode voucher tidak valid.';
  } finally {
    isVerifyingVoucher.value = false;
  }
};

const removeVoucherCode = () => {
  voucherApplied.value = false;
  activeVoucherData.value = null;
  voucherCode.value = '';
  voucherError.value = '';
};

// Total Payments calculation
const totalPaymentsPrice = computed(() => {
  let total = cartSubtotalPrice.value;
  total += cartAdminFee.value;
  total += shippingPrice.value;
  
  if (voucherApplied.value) {
    total -= voucherDiscount.value;
  }
  return total;
});

// Stepper back link
const backToCheckout = () => {
  currentPage.value = 'checkout';
};

// Submit Order / Bayar Sekarang handler
const isSubmitting = ref(false);
  const paymentPopupUrl = ref("");
  const closePaymentPopup = () => { paymentPopupUrl.value = ""; };
const showSuccessModal = ref(false);
const transactionId = ref('');

const isFormComplete = computed(() => {
  if (!profile.value.name || !profile.value.email || !profile.value.phone) return false;
  if (!activeAddress.value.province_id || !activeAddress.value.city_id || !activeAddress.value.zip || !activeAddress.value.street || !activeAddress.value.nama_penerima || !activeAddress.value.phone) return false;
  if (!isShippingReady.value || !shippingType.value) return false;
  if (shippingType.value === 'courier') {
    if (!selectedCourier.value || !selectedServiceId.value || shippingPrice.value <= 0) return false;
  }
  return true;
});

const submitOrder = async () => {
  if (!activeAddress.value.province_id || !shippingType.value) {
    showToast('Mohon lengkapi alamat pengiriman dan metode pengiriman.');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    
    // Admin fee is now computed in cartAdminFee
    const totalAdminFee = cartAdminFee.value;
    const productsPayload = activeCartItems.value.filter(item => item.qty > 0).map(item => {
      const itemAdminFee = item.admin_fee !== undefined ? item.admin_fee : 2000;
      return {
        product_id: item.id,
        qty: item.qty,
        price: item.price,
        weight: item.weight || 400,
        admin_fee: itemAdminFee,
        order_notes: item.note || "",
        variant_id: item.variant_id || null
      };
    });
    
    // First item for delivery flags
    const firstItem = activeCartItems.value[0] || {};
    const originStore = firstItem.store_location || {};
    const is_pickup_instore = firstItem.is_pickup_instore || 0;
    const is_delivery = firstItem.is_delivery !== undefined ? firstItem.is_delivery : 1;
    
    let courierPayload = null;
    if (shippingType.value === 'courier') {
      const selectedCourierName = Object.keys(courierServices.value).find(c => 
        courierServices.value[c].some(s => s.id === selectedServiceId.value)
      ) || 'jne';
      
      courierPayload = {
        main: activeCourierLabel.value,
        type: activeServiceLabel.value,
        courier_company: selectedCourierName,
        courier_type: selectedServiceId.value,
        origin_contact_name: originStore.store_name || originStore.name || "",
        origin_contact_phone: originStore.phone_number || originStore.phone || "",
        origin_address: originStore.full_address || originStore.address || "",
        origin_postal_code: originStore.postal_code || "",
        destination_postal_code: activeAddress.value.zip,
        origin_latitude: originStore.latitude || "",
        origin_longitude: originStore.longitude || "",
        destination_latitude: activeAddress.value.latitude,
        destination_longitude: activeAddress.value.longitude,
        name: profile.value.name,
        phone: profile.value.phone,
        address: activeAddress.value.street,
        weight: productsPayload.reduce((acc, p) => acc + (p.weight * p.qty), 0),
        price: shippingPrice.value
      };
    }
    
    const addressPayload = {
      user_id: null,
      is_main_address: 1,
      province_id: activeAddress.value.province_id,
      city_id: activeAddress.value.city_id,
      address_detail: activeAddress.value.street,
      address_name: activeAddress.value.address_name || "Shipping Address",
      zipcode: activeAddress.value.zip,
      latitude: String(activeAddress.value.latitude),
      longitude: String(activeAddress.value.longitude),
      nama_penerima: activeAddress.value.nama_penerima || profile.value.name,
      phone: activeAddress.value.phone || profile.value.phone,
      is_active: 1
    };

    const payload = {
      user_id: null,
      name_pemesan: profile.value.name,
      email_pemesan: profile.value.email,
      phone_pemesan: profile.value.phone,
      creator_id: null,
      total_price: cartSubtotalPrice.value,
      grandtotal: totalPaymentsPrice.value,
      admin_fee: totalAdminFee,
      discount: voucherApplied.value ? voucherDiscount.value : 0,
      vouchers: voucherApplied.value && activeVoucherData.value ? [{
        voucher_id: activeVoucherData.value.id || activeVoucherData.value.voucher_id,
        voucher_code: activeVoucherData.value.code || activeVoucherData.value.voucher_code,
        voucher_amount: String(voucherDiscount.value)
      }] : [],
      product: productsPayload,
      is_pickup_instore: is_pickup_instore,
      is_delivery: is_delivery,
      payment_method: "xendit",
      payment_method_id: 4,
      courier: courierPayload,
      address: addressPayload,
      success_redirect_url: window.location.origin + "/merch-invoice/{invoice_merch}",
      failure_redirect_url: window.location.origin + "/checkout",
      is_microsite: 1,
      microsite_url: window.location.origin
    };

    const response = await fetch(`${apiUrl}/api/order-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
        
      const findXenditUrl = (obj) => {
        if (!obj || typeof obj !== 'object') return null;
        if (obj.xendit_url) return obj.xendit_url;
        if (obj.invoice_url) return obj.invoice_url;
        for (const key in obj) {
          const found = findXenditUrl(obj[key]);
          if (found) return found;
        }
        return null;
      };
      const xenditUrl = findXenditUrl(result);
      if (result.success || result.status === 'success' || result.status === true || xenditUrl) {
        if (xenditUrl) {
          window.location.href = xenditUrl;
        } else {
        transactionId.value = result.data?.invoice_number || Math.floor(100000 + Math.random() * 900000).toString();
        showSuccessModal.value = true;
      }
    } else {
      showToast(result.message || 'Gagal memproses pesanan.');
    }
  } catch(e) {
    console.error('Order error:', e);
    showToast('Terjadi kesalahan pada server saat membuat pesanan.');
  } finally {
    isSubmitting.value = false;
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  clearCart();
  checkedCheckoutItems.value = [];
  currentPage.value = 'shop';
};

// Currency Formatter
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
/* Colors & Global Typography defaults */
.payment-page-wrapper {
  background-color: #fff;
  min-height: 100vh;
  padding: 1.5rem 0 4rem 0;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.payment-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* Stepper Steppers styling */
.stepper-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

/* Address Stepper Styles */
.address-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 1rem;
}
.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}
.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FAF9F6;
  border: 2px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--color-mocca-muted);
  transition: all 0.3s ease;
}
.step-indicator.active .step-circle {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  color: white;
}
.step-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
}
.step-indicator.active .step-label {
  color: var(--color-mocca-dark);
}
.step-line {
  flex: 1;
  height: 2px;
  background-color: var(--color-mocca-border);
  margin: 0 10px;
  position: relative;
  top: -10px;
  transition: all 0.3s ease;
}
.step-line.active {
  background-color: var(--color-mocca-dark);
}

.stepper-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #FFFFFF;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  border: 1px solid var(--color-mocca-border);
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.02);
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.step-item.done {
  color: var(--color-mocca-dark);
}

.step-item.active {
  color: #FFFFFF;
  font-weight: 700;
}

.step-badge {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  transition: all 0.25s ease;
}

.step-item.done .step-badge {
  background-color: #E6DFD5;
  border-color: #D9D2C5;
  color: var(--color-mocca-dark);
}

.step-item.active .step-badge {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  color: #FFFFFF;
}

.step-text {
  font-family: var(--font-body);
}

.step-item.active .step-text {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.step-line {
  width: 40px;
  height: 1px;
  background-color: var(--color-mocca-border);
}

.step-line.active {
  background-color: var(--color-mocca-dark);
}

/* Two-Column Grid */
.payment-grid {
  display: grid;
  grid-template-columns: 2fr 1.15fr;
  gap: 0.5rem;
  align-items: start;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Cards layout styles */
.form-card {
  background-color: #fff;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.02);
  width: 100%;
  max-width: none;
  margin-left: 0;
  margin-right: 0;
  box-sizing: border-box;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header-row .section-title {
  margin-bottom: 0;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Form controls and inputs */
.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
}

.form-col-group {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
}

.text-input {
  width: 100%;
  box-sizing: border-box;
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.2s ease;
}

.text-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.05);
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 1.25rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--color-mocca-muted);
  pointer-events: none;
}

.select-input {
  width: 100%;
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.select-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
}

.textarea-input {
  width: 100%;
  box-sizing: border-box;
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  resize: vertical;
  transition: all 0.2s ease;
}

.textarea-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
}

.add-address-btn {
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-address-btn:hover {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border-color: var(--color-mocca-dark);
}

/* Custom Checkbox Label */
.primary-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.85rem;
}

.primary-checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-mocca-border);
  border-radius: 4px;
  background-color: #FFFFFF;
  position: relative;
  transition: all 0.2s ease;
}

.primary-checkbox-label input:checked ~ .checkbox-box {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

.checkbox-box::after {
  content: "";
  position: absolute;
  display: none;
  left: 4.5px;
  top: 1.5px;
  width: 4px;
  height: 8px;
  border: solid #FFFFFF;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.primary-checkbox-label input:checked ~ .checkbox-box::after {
  display: block;
}

.checkbox-text {
  font-weight: 500;
  color: var(--color-mocca-muted);
}

/* Shipping choices radios */
.shipping-method-choice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FCFAF7;
  border: 1px solid var(--color-mocca-border);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
}

.shipping-radio-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.shipping-radio-label input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-box {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-mocca-border);
  border-radius: 50%;
  background-color: #FFFFFF;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
}

.shipping-radio-label input:checked ~ .radio-box {
  border-color: var(--color-mocca-dark);
}

.radio-box::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
}

.shipping-radio-label input:checked ~ .radio-box::after {
  display: block;
}

.radio-text {
  font-size: 0.9rem;
  color: var(--color-mocca-dark);
}

/* Couriers Sub-Accordion options */
.couriers-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.courier-card {
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FFFFFF;
  transition: all 0.25s ease;
}

.courier-card.open {
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.03);
  border-color: var(--color-mocca-dark);
}

.courier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 1.5rem;
  cursor: pointer;
}

.header-left-col {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.courier-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid var(--color-mocca-border);
  transition: all 0.2s ease;
}

.courier-dot.checked {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  transform: scale(1.2);
}

.courier-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.jne-logo {
  display: inline-flex;
  font-weight: 800;
  font-style: italic;
  font-size: 0.95rem;
}

.jne-logo .blue-text {
  color: #0E4E9E;
}

.jne-logo .red-text {
  color: #E21E26;
  font-size: 0.6rem;
  align-self: flex-end;
  margin-bottom: 2px;
  margin-left: 1px;
}

.jnt-logo {
  color: #ED1B24;
}

.sicepat-logo {
  color: #E4222E;
}

.anteraja-logo {
  color: #EA0B8C;
}

.courier-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.header-right-col {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.courier-price-range {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.chevron-arrow {
  color: var(--color-mocca-muted);
  transition: transform 0.25s ease;
}

.chevron-arrow.rotate {
  transform: rotate(180deg);
}

/* Expanded courier services body */
.courier-services-body {
  background-color: #FCFAF7;
  border-top: 1px solid var(--color-mocca-border);
  padding: 1.25rem 1.5rem;
}

.services-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.services-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.service-row:hover {
  background-color: #FCFAF7;
  border-color: var(--color-mocca-dark);
}

.service-row.selected {
  border-color: var(--color-mocca-dark);
  background-color: #FAF7F2;
  box-shadow: 0 2px 8px rgba(47, 78, 62, 0.03);
}

.service-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.service-left input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.service-radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--color-mocca-border);
  background-color: #FFFFFF;
  display: inline-block;
  position: relative;
}

.service-row.selected .service-radio-dot {
  border-color: var(--color-mocca-dark);
}

.service-radio-dot::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
}

.service-row.selected .service-radio-dot::after {
  display: block;
}

.service-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.service-name {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.service-desc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.service-price {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.cod-label-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cod-sub-desc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.cod-flat-price {
  font-size: 0.9rem;
}

/* 4. Payment Methods lists */
.payment-methods-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pay-method-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-mocca-border);
  border-radius: 10px;
  padding: 1.15rem 1.5rem;
  cursor: pointer;
  background-color: #FFFFFF;
  transition: all 0.2s ease;
}

.pay-method-row:hover {
  background-color: #FCFAF7;
}

.pay-method-row.active {
  border-color: var(--color-mocca-dark);
  background-color: #FAF7F2;
  box-shadow: 0 2px 10px rgba(47, 78, 62, 0.03);
}

.pay-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-grow: 1;
}

.pay-left input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pay-radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--color-mocca-border);
  background-color: #FFFFFF;
  position: relative;
  flex-shrink: 0;
}

.pay-method-row.active .pay-radio-dot {
  border-color: var(--color-mocca-dark);
}

.pay-radio-dot::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
}

.pay-method-row.active .pay-radio-dot::after {
  display: block;
}

.pay-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pay-icon {
  color: var(--color-mocca-dark);
  opacity: 0.8;
  flex-shrink: 0;
}

.pay-text-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pay-title {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.pay-desc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.pay-va-badge {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.pay-right-logos {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wallet-logo {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.wallet-logo.ovo {
  background-color: #FAF4FF;
  color: #4C2A86;
  border: 1px solid #E8D3FF;
}

.wallet-logo.gopay {
  background-color: #E8F4F9;
  color: #0081A7;
  border: 1px solid #C5E4EF;
}

.wallet-logo.dana {
  background-color: #E5F3FF;
  color: #118EEA;
  border: 1px solid #BCDFFF;
}

.cc-logo {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.cc-logo.visa {
  background-color: #F0F4FF;
  color: #0E4595;
  border: 1px solid #CAD8FF;
}

.cc-logo.mc {
  background-color: #FFF5F2;
  color: #FF5F00;
  border: 1px solid #FFD9CC;
}

.qris-brand {
  font-size: 0.8rem;
  color: #0A3254;
  border: 1.5px solid #0A3254;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

/* Notes section styles */
.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.char-count.limit {
  color: #C2410C;
  font-weight: 700;
}

/* Right Column Order Summary styling */
.right-column {
  width: 100%;
}

.summary-card {
  background-color: #fff;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(47, 78, 62, 0.02);
}

@media (min-width: 1025px) {
  .right-column {
    position: sticky;
    top: 7rem;
    align-self: start;
    z-index: 10;
  }
}

.summary-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.summary-header-row .summary-title {
  margin-bottom: 0;
}

.summary-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.edit-summary-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
}

.edit-summary-btn:hover {
  color: var(--color-mocca-dark);
}

/* Products inside summary */
.summary-products-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-prod-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.prod-left {
  display: flex;
  gap: 0.75rem;
  flex-grow: 1;
}

.prod-thumb {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #FCFAF7;
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
  flex: 1;
  min-width: 0;
}

.prod-name {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.prod-meta {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.prod-note {
  font-size: 0.7rem;
  font-style: italic;
  color: var(--color-mocca-muted);
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
  color: var(--color-mocca-dark);
}

.prod-qty {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

/* Inline editing inside summary styling */
.summary-prod-item.editing-row {
  background-color: #FCFAF7;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px dashed var(--color-mocca-border);
  transition: all 0.2s ease;
}

.summary-prod-item.zero-qty {
  opacity: 0.45;
}

.summary-note-edit-wrapper {
  width: 100%;
}

.summary-note-input {
  width: 100%;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.35rem 0.6rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.2s ease;
}

.summary-note-input:focus {
  border-color: var(--color-mocca-dark);
}

.summary-qty-adjuster {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.sqty-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--color-mocca-border);
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.sqty-btn:hover {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border-color: var(--color-mocca-dark);
}

.sqty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sqty-val {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  min-width: 12px;
  text-align: center;
}

.sqty-delete-btn {
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.sqty-delete-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.edit-summary-btn.editing {
  color: var(--color-mocca-dark);
  background-color: rgba(47, 78, 62, 0.08);
  border-radius: 4px;
  padding: 0.25rem 0.65rem;
}

.font-semibold {
  font-weight: 600 !important;
}

.empty-summary-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

/* Voucher */
.voucher-wrapper {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  background-color: #FCFAF7;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
}

.voucher-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.45rem;
  display: block;
}

.voucher-input-row {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.voucher-input {
  flex-grow: 1;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.45rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  outline: none;
}

.voucher-apply-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 0.45rem 1rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.voucher-apply-btn:hover {
  background-color: #55331C;
}

.voucher-apply-btn.applied {
  background-color: var(--color-mocca-dark);
}

.voucher-tip {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  margin: 0.45rem 0 0 0;
}

.code-text {
  color: var(--color-mocca-dark);
}

.voucher-success-text {
  font-size: 0.7rem;
  color: var(--color-mocca-dark);
  font-weight: 600;
  margin: 0.45rem 0 0 0;
}

.voucher-success-text .remove-btn {
  color: #EF4444;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.5rem;
}

.summary-divider {
  height: 1px;
  background-color: var(--color-mocca-border);
  margin: 1.25rem 0;
}

.summary-breakdowns {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-body);
}

.breakdown-label {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
}

.breakdown-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.breakdown-row.discount .breakdown-label {
  color: #C2410C;
  font-weight: 600;
}

.breakdown-row.discount .breakdown-value {
  color: #C2410C;
}

.total-row {
  align-items: baseline;
}

.total-label {
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
}

.total-value {
  font-size: 1.35rem;
}

.text-coffee {
  color: var(--color-mocca-dark);
}

/* Security Notice */
.security-notice {
  margin-top: 1.5rem;
  background-color: #FCFAF7;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
}

.shield-icon {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.notice-desc-group {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.notice-title {
  font-size: 0.75rem;
  color: var(--color-mocca-dark);
}

.notice-desc {
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
}

/* Payment Timer */
.payment-timer-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
}

/* Mobile-only timer bar below sticky header */
.mobile-timer-bar {
  display: none;
}

.circular-chart {
  width: 24px;
  height: 24px;
  transform: rotate(-90deg); /* Start at top */
}

.circle-bg {
  fill: none;
  stroke: rgba(140, 115, 85, 0.15);
  stroke-width: 3.8;
}

.circle-progress {
  fill: none;
  stroke: var(--color-mocca-dark);
  stroke-width: 3.8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}

.timer-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  font-variant-numeric: tabular-nums;
}

/* Actions */
.summary-actions {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
}

.primary-checkout-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 1rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.12);
}

.primary-checkout-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.18);
}

.primary-checkout-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.terms-text {
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
}

.back-to-cart-link-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  cursor: pointer;
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
  align-self: center;
}

.back-to-cart-link-btn:hover {
  color: var(--color-mocca-dark);
}

.back-icon {
  transition: transform 0.2s ease;
}

.back-to-cart-link-btn:hover .back-icon {
  transform: translateX(-3px);
}

/* Spinner Loader */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin-anim 0.8s linear infinite;
}

@keyframes spin-anim {
  to { transform: rotate(360deg); }
}

/* Invoice details */
.order-invoice-details {
  background-color: #FCFAF7;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 1.25rem;
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.invoice-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.inv-label {
  color: var(--color-mocca-muted);
}

.inv-value {
  color: var(--color-mocca-dark);
}

/* Success Modal Backdrop */
.success-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(47, 78, 62, 0.4);
  backdrop-filter: blur(4px);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.success-modal-card {
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid var(--color-mocca-border);
  padding: 3rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 15px 50px rgba(47, 78, 62, 0.15);
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-mocca-dark);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  line-height: 1.5;
  margin-top: 0;
  margin-bottom: 1.75rem;
}

.close-success-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 0.9rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.1);
}

.close-success-btn:hover {
  background-color: #55331C;
}

/* Checkmark Success Icon Animation styling */
.check-animation-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #10B981;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #10B981;
  animation: fill-check 0.4s ease-in-out 0.4s forwards, scale-check 0.3s ease-in-out 0.9s both;
}

.success-checkmark-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #10B981;
  stroke-miterlimit: 10;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-linecap: round;
  stroke: #10B981;
  fill: none;
  animation: stroke-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke-linecap: round;
  stroke: #10B981;
  animation: stroke-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke-circle {
  100% { stroke-dashoffset: 0; }
}

@keyframes stroke-check {
  100% { stroke-dashoffset: 0; }
}

@keyframes fill-check {
  100% { box-shadow: inset 0px 0px 0px 36px #E6FBF3; }
}

@keyframes scale-check {
  0%, 100% { transform: none; }
  50% { transform: scale3d(1.1, 1.1, 1); }
}

/* Margins helpers */
.mb-0 { margin-bottom: 0; }
.mb-0-5 { margin-bottom: 0.5rem; }
.mb-1-5 { margin-bottom: 1.5rem; }
.mt-0-5 { margin-top: 0.5rem; }
.mt-0-75 { margin-top: 0.75rem; }

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive viewports overrides */
@media (max-width: 1024px) {
  .payment-container {
    padding: 0 2rem;
  }
  
  .payment-grid {
    grid-template-columns: 1.5fr 1.1fr;
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .payment-page-wrapper {
    padding: 1rem 0 5rem 0;
    width: 100%;
    max-width: 100%;
    overflow-x: visible;
    box-sizing: border-box;
  }
  
  .payment-container {
    padding: 0.25rem 1rem 0 1rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  .stepper-section {
    margin-bottom: 1.75rem;
  }
  
  .stepper-wrapper {
    padding: 0.65rem 1.25rem;
    gap: 0.5rem;
  }
  
  .step-text {
    display: none; /* Hide stepper text labels on mobile to save space */
  }
  
  .step-line {
    width: 25px;
  }
  
  .payment-grid {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
  
  .form-grid-3, .form-grid-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-card {
    padding: 1rem;
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box !important;
  }
  
  .courier-header {
    padding: 0.85rem;
  }
  
  .pay-method-row {
    padding: 0.85rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .pay-right-logos {
    padding-left: 2.25rem;
  }
  
  .summary-card {
    padding: 1rem;
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box !important;
  }
  
  .success-modal-card {
    padding: 2rem 1.5rem;
  }

  .voucher-apply-btn {
    padding: 0.35rem 0.75rem !important; /* Smaller size for mobile */
    font-size: 0.72rem !important;
  }

  /* Compact Card styles */
  .card-inner-compact {
    font-size: 0.8rem;
  }
  
  .card-inner-compact .section-title {
    font-size: 1.05rem !important;
    margin-bottom: 0.85rem !important;
  }
  
  .card-inner-compact .field-label {
    font-size: 0.7rem !important;
    margin-bottom: 0.25rem !important;
  }
  
  .card-inner-compact .text-input,
  .card-inner-compact .select-input,
  .card-inner-compact .textarea-input {
    padding: 0.5rem 0.65rem !important;
    font-size: 0.75rem !important;
    height: auto !important;
    border-radius: 6px !important;
  }
  
  .card-inner-compact .input-group {
    margin-bottom: 0.75rem !important;
  }

  /* Alamat Pengiriman specifically */
  .card-inner-compact .text-alamat-pengiriman {
    font-size: 0.95rem !important;
  }
  
  .card-inner-compact .btn-tambah-alamat {
    font-size: 0.65rem !important;
    padding: 0.25rem 0.5rem !important;
    border-radius: 4px !important;
    height: auto !important;
    line-height: 1.2 !important;
  }

  /* Courier/Payments lists spacing */
  .card-inner-compact .courier-header {
    padding: 0.75rem !important;
  }
  
  .card-inner-compact .pay-method-row {
    padding: 0.75rem !important;
  }
  
  .card-inner-compact .shipping-method-choice {
    padding: 0.65rem 0.85rem !important;
  }

  /* Summary Prod lists */
  .card-inner-compact .summary-prod-item {
    padding: 0.5rem 0 !important;
    gap: 0.5rem !important;
    flex-direction: column !important;
    align-items: stretch !important;
  }
  
  .card-inner-compact .prod-left {
    width: 100% !important;
  }
  
  .card-inner-compact .prod-right {
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    margin-top: 0.25rem !important;
  }
  
  .card-inner-compact .summary-qty-adjuster {
    margin-top: 0 !important;
  }
  
  .card-inner-compact .prod-name {
    font-size: 0.78rem !important;
  }
  
  .card-inner-compact .prod-meta {
    font-size: 0.65rem !important;
  }
  
  .card-inner-compact .prod-price {
    font-size: 0.78rem !important;
  }
  
  .card-inner-compact .total-label {
    font-size: 0.85rem !important;
  }
  
  .card-inner-compact .total-value {
    font-size: 1.1rem !important;
  }
  
  .card-inner-compact .primary-checkout-btn {
    padding: 0.75rem !important;
    font-size: 0.85rem !important;
  }
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

.fixed-left-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: auto;
  padding-left: 0;
  min-width: 0;
}

.fixed-back-btn {
  margin-top: 0 !important;
  color: var(--color-mocca-dark) !important;
  font-weight: 600 !important;
  opacity: 1 !important;
  text-decoration: none !important;
}

.fixed-pay-btn {
  margin-top: 0 !important;
  margin-left: auto;
  margin-right: 0;
  max-width: 280px !important;
  flex-shrink: 0;
}

.payment-page-wrapper {
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
  .fixed-left-group {
    gap: 0.75rem;
  }
  .fixed-back-btn {
    font-size: 0.8rem !important;
  }
  .fixed-pay-btn {
    max-width: 170px !important;
    font-size: 0.85rem !important;
    padding: 0.6rem 1rem !important;
  }
  .payment-page-wrapper {
    padding-top: 0.5rem;
    padding-bottom: 100px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
  }
  /* Mobile timer attached under header + sticky, full green border */
  .mobile-timer-bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    position: sticky;
    top: 64px;
    z-index: 900;
    margin: 0;
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 1.5px solid var(--color-mocca-dark);
    border-radius: 0;
    box-shadow: 0 2px 10px rgba(47, 78, 62, 0.06);
  }
  .mobile-timer-bar .circular-chart {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
  .mobile-timer-bar .timer-text {
    font-size: 0.85rem;
  }
  .mobile-timer-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--color-mocca-dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fixed-left-group .payment-timer-wrapper {
    display: none;
  }
  .fixed-left-group {
    gap: 0;
  }
}
.payment-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(47, 78, 62, 0.7);
  backdrop-filter: blur(5px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.payment-popup-container {
  width: 100%;
  max-width: 800px;
  height: 90vh;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.payment-popup-header {
  padding: 1.25rem 1.5rem;
  background-color: var(--color-bg-light);
  border-bottom: 1px solid var(--color-mocca-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-mocca-dark);
}

.close-popup-btn {
  background: none;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-popup-btn:hover {
  background-color: var(--color-mocca-border);
  color: var(--color-mocca-dark);
}

.payment-iframe {
  width: 100%;
  flex: 1;
  border: none;
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .payment-popup-container {
    height: 95vh;
    max-width: 100%;
    border-radius: 12px;
  }
}

.phone-input-grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem;
}
.phone-prefix-select {
  padding: 0.8rem 0.5rem;
  text-align: center;
}

/* Custom Select Dropdown */
.relative-dropdown {
  position: relative;
}

.custom-select-container {
  position: relative;
  width: 100%;
}

.custom-select-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  user-select: none;
  padding-right: 1rem !important; /* Override native select 2.5rem right padding for the icon */
}

.custom-select-container.disabled-select .custom-select-display {
  background-color: var(--color-bg-cream);
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.7;
}

.chevron-icon {
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 0.5rem;
  color: var(--color-mocca-muted);
}
.chevron-icon.rotate {
  transform: rotate(180deg);
}

.custom-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.combobox-wrapper {
  cursor: text;
}

.combobox-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 0.85rem; /* Match exactly with native text-input */
  font-family: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  line-height: normal;
}

.combobox-input:disabled {
  cursor: not-allowed;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex-grow: 1;
}

.dropdown-item {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--color-mocca-light);
}

.dropdown-item.active {
  background-color: var(--color-coffee);
  color: #fff;
  font-weight: bold;
}

.dropdown-empty {
  padding: 12px 16px;
  color: #6b7280;
  text-align: center;
  font-style: italic;
  font-size: 0.9rem;
}

</style>
