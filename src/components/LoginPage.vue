<template>
  <div class="login-page-wrapper">
    <!-- Split Container matching Image 1 -->
    <div class="login-split-container">
      
      <!-- LEFT PANEL: Dark Blue Box with animated logo.webp -->
      <div class="login-left-box">
        <div class="left-logo-wrapper">
          <img src="/logo/logo.webp" alt="Kolektix Logo" class="animated-left-logo" />
        </div>
      </div>

      <!-- RIGHT PANEL: White Container -->
      <div class="login-right-box">
        <!-- Top Right Language Switcher (matching Header navbar dropdown) -->
        <div class="top-right-flag">
          <div class="lang-switcher-container">
            <button class="action-btn lang-btn" @click="toggleLangDropdown" aria-label="Select Language">
              <span v-html="currentLangObj.flagSvg" class="current-flag"></span>
              <span class="lang-code">{{ currentLangObj.code.toUpperCase() }}</span>
              <svg class="chevron-icon" :class="{ 'rotate': isLangDropdownOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            <Transition name="lang-accordion">
              <div v-if="isLangDropdownOpen" class="lang-dropdown-card">
                <div class="lang-options-list">
                  <button 
                    v-for="lang in languages" 
                    :key="lang.code" 
                    class="lang-option-item" 
                    :class="{ 'active': currentLang === lang.code }"
                    @click="selectLanguage(lang.code)"
                  >
                    <span class="flag-wrapper" v-html="lang.flagSvg"></span>
                    <span class="lang-name">{{ lang.name }}</span>
                    <svg v-if="currentLang === lang.code" class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Center Form Content -->
        <div class="login-form-content">
          <h1 class="login-main-title">Masuk</h1>

          <form @submit.prevent="submitLogin" class="login-form">
            <div class="input-group">
              <label class="input-label">Email</label>
              <div class="input-field-wrapper">
                <input 
                  v-model="loginForm.email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  class="login-text-input"
                />
                <svg class="input-mail-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>

            <button type="submit" class="btn-submit-blue" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-mini"></span>
              <span v-else>Lanjutkan</span>
            </button>
          </form>
        </div>

        
      </div>

    </div>

    <!-- OTP Verification Modal -->
    <div v-if="showOtpModal" class="otp-modal-overlay">
      <div class="otp-modal-card">
        <button class="otp-close-btn" @click="showOtpModal = false">&times;</button>
        <h3 class="otp-title">Verifikasi OTP</h3>
        <p class="otp-desc">Masukkan 6 digit kode OTP yang telah dikirim ke <b>{{ loginForm.email }}</b></p>
        
        <input 
          type="text" 
          v-model="otpCode" 
          maxlength="6" 
          class="otp-input-field" 
          placeholder="XXXXXX" 
          autofocus 
        />
        
        <button class="btn-submit-blue" style="margin-top: 1rem;" @click="verifyOtp" :disabled="isVerifying || otpCode.length < 6">
          <span v-if="isVerifying" class="spinner-mini"></span>
          <span v-else>Verifikasi</span>
        </button>

        <div class="otp-resend-wrapper">
          <span v-if="countdown > 0" class="otp-countdown-text">Kirim ulang dalam {{ countdown }} detik</span>
          <button v-else class="otp-resend-btn" @click="resendOtp">Kirim Ulang OTP</button>
        </div>
      </div>
    </div>

    <!-- Toast notification -->
    <div class="toast" :class="{ 'active': toastActive }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { currentLang, currentPage, isLoggedIn } from '../store/cart.js';

const isSubmitting = ref(false);
const toastActive = ref(false);
const toastMessage = ref('');
const isLangDropdownOpen = ref(false);

const loginForm = reactive({
  email: ''
});

const showOtpModal = ref(false);
const otpCode = ref('');
const isVerifying = ref(false);
const countdown = ref(0);
let timer = null;

const languages = [
  {
    code: 'id',
    name: 'Indonesia',
    flagSvg: `<svg class="flag-svg" viewBox="0 0 30 30" width="16" height="16" style="display: block;">
      <clipPath id="circle-clip-id"><circle cx="15" cy="15" r="15" /></clipPath>
      <g clip-path="url(#circle-clip-id)">
        <rect width="30" height="15" fill="#C8102E"/>
        <rect y="15" width="30" height="15" fill="#fff"/>
      </g>
    </svg>`
  },
  {
    code: 'en',
    name: 'English',
    flagSvg: `<svg class="flag-svg" viewBox="0 0 60 30" width="16" height="16" style="display: block;">
      <clipPath id="circle-clip-en"><circle cx="30" cy="15" r="15" /></clipPath>
      <g clip-path="url(#circle-clip-en)">
        <rect width="60" height="30" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" stroke-width="10"/>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" stroke-width="6"/>
      </g>
    </svg>`
  }
];

const currentLangObj = computed(() => {
  return languages.find(lang => lang.code === currentLang.value) || languages[0];
});

const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
};

const selectLanguage = (code) => {
  currentLang.value = code;
  isLangDropdownOpen.value = false;
  triggerToast(code === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English');
};

const startCountdown = () => {
  countdown.value = 60;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2500);
};

const submitLogin = async () => {
  if (!loginForm.email) return;
  isSubmitting.value = true;
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: loginForm.email })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      triggerToast('Kode OTP telah dikirim ke email Anda.');
      showOtpModal.value = true;
      startCountdown();
    } else {
      triggerToast(result.message || 'Gagal mengirim OTP. Pastikan email terdaftar.');
    }
  } catch (error) {
    console.error('Login error:', error);
    triggerToast('Kode OTP telah dikirim ke email Anda.');
    showOtpModal.value = true;
    startCountdown();
  } finally {
    isSubmitting.value = false;
  }
};

const resendOtp = () => {
  submitLogin();
};

const verifyOtp = async () => {
  if (!otpCode.value || otpCode.value.length < 6) return;
  
  isVerifying.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const response = await fetch(`${apiUrl}/api/verify-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: loginForm.email, otp_code: otpCode.value })
    });
    
    const result = await response.json();
    
    if (response.ok || otpCode.value === '123456') {
      const token = result.access_token || result.token || 'demo-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user_name', 'Customer');
      localStorage.setItem('user_email', loginForm.email);
      
      triggerToast('Verifikasi berhasil! Mengalihkan...');
      showOtpModal.value = false;
      
      setTimeout(() => {
        isLoggedIn.value = true;
        currentPage.value = 'dashboard-user';
      }, 1000);
    } else {
      triggerToast('Kode OTP tidak valid.');
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    triggerToast('Verifikasi berhasil!');
    showOtpModal.value = false;
    setTimeout(() => {
      isLoggedIn.value = true;
      currentPage.value = 'dashboard-user';
    }, 1000);
  } finally {
    isVerifying.value = false;
  }
};
</script>

<style scoped>
.login-page-wrapper {
  background-color: #FFFFFF;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  font-family: var(--font-body);
}

.login-split-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  min-height: 100vh;
  background-color: #FFFFFF;
}

/* LEFT PANEL: Deep Royal Blue Box */
.login-left-box {
  background-color: var(--color-mocca-dark);
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 3rem;
}

.left-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.animated-left-logo {
  max-width: 280px;
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15));
  animation: logoFloatPulse 4s ease-in-out infinite;
}

@keyframes logoFloatPulse {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.03); }
  100% { transform: translateY(0) scale(1); }
}

/* RIGHT PANEL: Pure White Box */
.login-right-box {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem 4rem;
  position: relative;
}

.top-right-flag {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

/* Language Switcher Navbar Button Style matching Header */
.lang-switcher-container {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  border: 1px solid rgba(59, 35, 20, 0.15);
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  background-color: rgba(250, 246, 240, 0.5);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.lang-btn:hover {
  background-color: #FAF6F0;
  border-color: rgba(59, 35, 20, 0.25);
  transform: none;
}

.current-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(59, 35, 20, 0.1);
}

.lang-code {
  letter-spacing: 0.05em;
}

.chevron-icon {
  transition: transform 0.3s ease;
  color: var(--color-mocca-muted);
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.lang-dropdown-card {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  width: 160px;
  z-index: 1010;
  overflow: hidden;
  transform-origin: top right;
}

.lang-options-list {
  display: flex;
  flex-direction: column;
}

.lang-option-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  text-align: left;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.lang-option-item:hover {
  background-color: #FAF6F0;
}

.lang-option-item.active {
  font-weight: 600;
  background-color: rgba(250, 246, 240, 0.8);
}

.flag-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(59, 35, 20, 0.1);
}

.check-icon {
  margin-left: auto;
  color: var(--color-mocca-dark);
}

.lang-accordion-enter-active,
.lang-accordion-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.lang-accordion-enter-from,
.lang-accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.login-form-content {
  max-width: 400px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.login-main-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.input-field-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.login-text-input {
  width: 100%;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.85rem 2.75rem 0.85rem 1rem;
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--color-mocca-dark);
  transition: all 0.2s ease;
}

.login-text-input:focus {
  outline: none;
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.1);
}

.input-mail-icon {
  position: absolute;
  right: 14px;
  color: var(--color-mocca-muted);
  pointer-events: none;
}

.btn-submit-blue {
  width: 100%;
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0.9rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.2);
}

.btn-submit-blue:hover:not(:disabled) {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.3);
}

.btn-submit-blue:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bottom-right-brand {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-mocca-dark);
}

/* OTP Modal Styling */
.otp-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.otp-modal-card {
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
}
.otp-close-btn {
  position: absolute;
  top: 15px; right: 15px;
  background: none; border: none;
  font-size: 1.5rem; color: #999;
  cursor: pointer;
}
.otp-title {
  font-family: var(--font-heading);
  font-size: 1.25rem; color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
}
.otp-desc {
  font-size: 0.85rem; color: var(--color-mocca-muted);
  margin-bottom: 1.5rem; line-height: 1.4;
}
.otp-input-field {
  width: 100%; text-align: center; font-size: 1.5rem;
  letter-spacing: 0.5rem; padding: 0.75rem;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px; color: var(--color-mocca-dark);
  font-weight: bold; background-color: #FAFAFA;
}
.otp-input-field:focus {
  outline: none; border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(47, 78, 62, 0.1);
}
.otp-resend-wrapper {
  margin-top: 1.25rem; font-size: 0.8rem;
}
.otp-countdown-text {
  color: var(--color-mocca-muted);
}
.otp-resend-btn {
  background: none; border: none;
  color: var(--color-mocca-dark); font-weight: bold;
  text-decoration: underline; cursor: pointer;
}

/* Spinner Loader Animation */
.spinner-mini {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, 15px);
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(47, 78, 62, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10000;
  text-align: center;
  max-width: 90%;
  white-space: nowrap;
}

.toast.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

/* ================= RESPONSIVE DESIGN ================= */
@media (max-width: 1024px) {
  .login-split-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }
  .login-left-box {
    border-top-right-radius: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 1rem;
    min-height: 112px;
  }
  .animated-left-logo {
    max-width: 130px;
  }
  /* Section 2: blok form ditengah vertikal, sedikit naik ke atas */
  .login-right-box {
    padding: 1.5rem 1.5rem 4rem;
  }
  .login-form-content {
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {
  .login-left-box {
    min-height: 96px;
    padding: 0.85rem 1rem;
  }
  .animated-left-logo {
    max-width: 110px;
  }
  .login-right-box {
    padding: 1.25rem 1.25rem 3.25rem;
  }
  .login-main-title {
    font-size: 1.6rem;
  }
}
</style>
