<template>
  <div class="login-page-wrapper">
    <div class="login-main-container">
      <!-- ================= LEFT PANEL: BRANDING & ART ================= -->
      <div class="login-left-panel">
        <div class="branding-header">
          <h1 class="mocca-logo" @click="goToHome">Berean.id</h1>
        </div>

        <div class="branding-content">
          <h2 class="branding-title">
            {{ currentLang === 'id' ? 'Selamat datang di Berean.id' : 'Welcome to Berean.id' }}
          </h2>
          <p class="branding-subtext">
            {{ currentLang === 'id' 
              ? 'Masuk atau daftar akun untuk menikmati pengalaman berbelanja merch favoritmu dengan lebih mudah.' 
              : 'Sign in or register to enjoy a seamless shopping experience for your favorite cozy merch.' 
            }}
          </p>

          <!-- Beautiful Custom Outline Illustration -->
          <div class="art-illustration-box">
            <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" class="group-sitting-svg">
              <!-- Framed picture on the wall -->
              <rect x="50" y="50" width="45" height="60" rx="3" fill="none" stroke="#55331C" stroke-width="1.8" />
              <rect x="53" y="53" width="39" height="54" rx="1" fill="none" stroke="#55331C" stroke-width="1.2" />
              <text x="72" y="80" font-size="8" font-family="var(--font-heading)" fill="#55331C" text-anchor="middle" font-weight="bold">MoCCA</text>
              <circle cx="63" cy="95" r="3" fill="none" stroke="#55331C" stroke-width="1" />
              <circle cx="71" cy="94" r="3" fill="none" stroke="#55331C" stroke-width="1" />
              <circle cx="79" cy="95" r="3" fill="none" stroke="#55331C" stroke-width="1" />
              
              <!-- Floating shelf next to it -->
              <line x1="220" y1="110" x2="310" y2="110" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M230 110 L233 93 L245 93 L248 110 Z" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M239 93 C236 85, 233 80, 235 75 C237 80, 240 85, 239 93 Z" fill="none" stroke="#55331C" stroke-width="1.5" />
              <path d="M239 93 C242 85, 246 81, 245 76 C242 81, 239 86, 239 93 Z" fill="none" stroke="#55331C" stroke-width="1.5" />
              <!-- Coffee cup -->
              <path d="M265 110 L265 98 L277 98 L277 110 Z" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M277 101 C281 101, 281 107, 277 107" fill="none" stroke="#55331C" stroke-width="1.8" />
              
              <!-- Potted plant on the floor (left) -->
              <path d="M48 310 L52 265 L76 265 L80 310 Z" fill="none" stroke="#55331C" stroke-width="2" />
              <path d="M64 265 C64 220, 40 210, 30 200 C50 215, 60 235, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M64 265 C64 220, 88 210, 98 200 C78 215, 68 235, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M64 265 C55 235, 30 240, 20 250 C40 250, 50 255, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M64 265 C73 235, 98 240, 108 250 C88 250, 78 255, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />

              <!-- Sofa -->
              <path d="M110 240 L110 190 A 10 10 0 0 1 120 180 L290 180 A 10 10 0 0 1 300 190 L300 240" fill="none" stroke="#55331C" stroke-width="2" />
              <rect x="100" y="240" width="210" height="25" rx="5" fill="none" stroke="#55331C" stroke-width="2" />
              <path d="M100 240 L100 205 A 8 8 0 0 1 108 197 L115 197 C120 205, 120 230, 115 240" fill="none" stroke="#55331C" stroke-width="2" />
              <path d="M310 240 L310 205 A 8 8 0 0 0 302 197 L295 197 C290 205, 290 230, 295 240" fill="none" stroke="#55331C" stroke-width="2" />
              <!-- Legs -->
              <line x1="120" y1="265" x2="115" y2="295" stroke="#55331C" stroke-width="2.2" stroke-linecap="round" />
              <line x1="290" y1="265" x2="295" y2="295" stroke="#55331C" stroke-width="2.2" stroke-linecap="round" />
              <line x1="150" y1="265" x2="150" y2="280" stroke="#55331C" stroke-width="1.2" />
              <line x1="260" y1="265" x2="260" y2="280" stroke="#55331C" stroke-width="1.2" />

              <!-- 4 People Sitting on Sofa -->
              <!-- Person 1 (Far Left, Male) -->
              <circle cx="150" cy="165" r="10" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M150 175 C140 185, 135 200, 130 220 L135 250" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M150 175 C155 185, 160 200, 160 215 L158 245" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M130 220 L115 228" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M135 250 L130 290 L122 292" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M158 245 L162 285 L170 287" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />

              <!-- Person 2 (Male 2) -->
              <circle cx="188" cy="158" r="9.5" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M188 167.5 C180 180, 178 200, 178 215" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M188 167.5 C195 180, 198 200, 198 220" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M180 185 C190 195, 205 195, 210 210" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M178 215 L175 255 L165 292" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M198 220 L202 258 L212 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />

              <!-- Person 3 (Female 1) -->
              <circle cx="225" cy="162" r="9" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M217 162 C217 152, 233 152, 233 162 C234 168, 230 172, 225 173" fill="none" stroke="#55331C" stroke-width="1.5" />
              <path d="M225 171 C220 182, 218 202, 218 218" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M225 171 C232 182, 235 202, 235 218" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M232 185 L242 205" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M218 218 L220 255 L222 285 L228 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M235 218 L238 255 L242 285 L248 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />

              <!-- Person 4 (Female 2) -->
              <circle cx="265" cy="160" r="9.2" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M256 160 C256 150, 274 150, 274 160 C274 175, 270 185, 272 195" fill="none" stroke="#55331C" stroke-width="1.5" />
              <path d="M265 169.2 C258 180, 256 200, 256 216" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M265 169.2 C272 180, 274 200, 274 216" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M272 185 L288 200" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M256 216 L254 252 L250 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M274 216 L278 252 L282 283 L288 284" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <!-- Left Panel Footer: Cozy Feature Column Badges -->
        <div class="branding-features">
          <!-- Col 1 -->
          <div class="feat-badge-col">
            <div class="feat-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div class="feat-text-box">
              <span class="feat-title">{{ currentLang === 'id' ? 'Belanja Aman' : 'Secure Shopping' }}</span>
              <span class="feat-desc">{{ currentLang === 'id' ? 'Transaksi aman dan terpercaya' : 'Safe and trusted checkout' }}</span>
            </div>
          </div>

          <!-- Col 2 -->
          <div class="feat-badge-col">
            <div class="feat-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <div class="feat-text-box">
              <span class="feat-title">{{ currentLang === 'id' ? 'Promo Eksklusif' : 'Exclusive Promos' }}</span>
              <span class="feat-desc">{{ currentLang === 'id' ? 'Dapatkan promo & voucher menarik' : 'Access amazing coupon deals' }}</span>
            </div>
          </div>

          <!-- Col 3 -->
          <div class="feat-badge-col">
            <div class="feat-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div class="feat-text-box">
              <span class="feat-title">{{ currentLang === 'id' ? 'Lacak Pesanan' : 'Order Tracking' }}</span>
              <span class="feat-desc">{{ currentLang === 'id' ? 'Pantau pesananmu dengan mudah' : 'Track your package location' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT PANEL: DYNAMIC CARD ================= -->
      <div class="login-right-panel">
        <div class="login-card-container">
          <div class="login-card-content">
            <div class="form-wrapper">
              <div class="form-header">
                <h3 class="form-title">
                  {{ currentLang === 'id' ? 'Selamat datang kembali!' : 'Welcome back!' }}
                </h3>
                <p class="form-subtext">
                  {{ currentLang === 'id' ? 'Masuk untuk melanjutkan ke akun Berean.id kamu.' : 'Sign in to access your Berean.id account.' }}
                </p>
              </div>

              <!-- Input forms -->
              <form @submit.prevent="submitLogin" class="auth-form-fields">
                <div class="form-input-group">
                  <label class="form-label">Email</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input 
                      v-model="loginForm.email"
                      type="email"
                      required
                      :placeholder="currentLang === 'id' ? 'Masukkan email kamu' : 'Enter your email'"
                      class="auth-input-field"
                    />
                  </div>
                </div>



                <button type="submit" class="btn-auth-submit font-bold" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-mini"></span>
                  <span v-else>{{ currentLang === 'id' ? 'Masuk' : 'Sign In' }}</span>
                </button>
              </form>
            </div>

            <!-- Kembali ke Beranda Button inside Card -->
            <div class="card-back-home-wrapper">
              <button type="button" class="btn-back-home" @click="goToHome">
                <svg class="back-arrow-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>{{ currentLang === 'id' ? 'Kembali ke Beranda' : 'Back to Home' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer legal disclaimer -->
        <div class="login-footer-text">
          <p>
            {{ currentLang === 'id' 
              ? 'Dengan masuk atau mendaftar, kamu menyetujui' 
              : 'By signing in or registering, you agree to Berean.id\'s' 
            }}
            <a href="#" class="legal-link">{{ currentLang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions' }}</a>
            {{ currentLang === 'id' ? 'dan' : 'and' }}
            <a href="#" class="legal-link">{{ currentLang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy' }}</a> 
            {{ currentLang === 'id' ? 'dari Berean.id.' : '.' }}
          </p>
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
        
        <button class="btn-auth-submit font-bold" style="margin-top: 1rem;" @click="verifyOtp" :disabled="isVerifying || otpCode.length < 6">
          <span v-if="isVerifying" class="spinner-mini"></span>
          <span v-else>Verifikasi</span>
        </button>

        <div class="otp-resend-wrapper">
          <span v-if="countdown > 0" class="otp-countdown-text">Kirim ulang dalam {{ countdown }} detik</span>
          <button v-else class="otp-resend-btn" @click="resendOtp">Kirim Ulang OTP</button>
        </div>
      </div>
    </div>

    <!-- Cozy Sleek Toast notifications -->
    <div class="toast" :class="{ 'active': toastActive }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { currentLang, currentPage, triggerProfile, isLoggedIn } from '../store/cart.js';

const isSubmitting = ref(false);

const toastActive = ref(false);
const toastMessage = ref('');

// Forms states
const loginForm = reactive({
  email: ''
});

// OTP States
const showOtpModal = ref(false);
const otpCode = ref('');
const isVerifying = ref(false);
const countdown = ref(0);
let timer = null;

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

const goToHome = () => {
  currentPage.value = 'home';
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
      body: JSON.stringify({
        email: loginForm.email
      })
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
    triggerToast('Terjadi kesalahan pada sistem saat mengirim OTP.');
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
      body: JSON.stringify({
        email: loginForm.email,
        otp_code: otpCode.value
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      const token = result.access_token || result.token || (result.data && (result.data.access_token || result.data.token)) || '';
      if (token) {
        localStorage.setItem('token', token);
      }
      const user = result.user || (result.data && result.data.user) || result.data;
      if (user) {
        localStorage.setItem('user_name', user.name || user.customer_name || 'User');
        localStorage.setItem('user_email', user.email || '');
        localStorage.setItem('is_creator', (user.is_creator === 1 || user.is_creator === true) ? 'true' : 'false');
      }
      
      triggerToast('Verifikasi berhasil! Mengalihkan...');
      showOtpModal.value = false;
      
      setTimeout(() => {
        isLoggedIn.value = true;
        currentPage.value = 'dashboard-user';
      }, 1000);
    } else {
      triggerToast(result.message || 'Kode OTP tidak valid atau kadaluarsa.');
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    triggerToast('Terjadi kesalahan saat memverifikasi OTP.');
  } finally {
    isVerifying.value = false;
  }
};
</script>

<style scoped>
/* ================= PAGE CONTAINER STYLING ================= */
.login-page-wrapper {
  background-color: #F5F2ED; /* Minimalist warm cream background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.card-back-home-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.15rem;
  width: 100%;
}

.btn-back-home {
  background-color: #FDFBF7;
  border: 1px solid rgba(61, 99, 80, 0.1);
  border-radius: 30px;
  padding: 0.5rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(61, 99, 80, 0.03);
  width: 100%;
}

.btn-back-home:hover {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(61, 99, 80, 0.12);
}

.btn-back-home:hover .back-arrow-icon {
  transform: translateX(-2px);
}

.back-arrow-icon {
  stroke-width: 2.5;
  transition: transform 0.25s ease;
}

/* ================= SPLIT PANEL MAIN LAYOUT ================= */
.login-main-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 3rem 3rem 3rem;
  display: grid;
  grid-template-columns: 46% 54%;
  gap: 3rem;
  flex-grow: 1;
  align-items: center;
}

/* ================= LEFT COLUMN: BRANDING & ILLUSTRATION ================= */
.login-left-panel {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.mocca-logo {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin: 0;
  cursor: pointer;
  display: inline-block;
}

.branding-content {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.branding-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
  color: var(--color-mocca-dark);
  line-height: 1.15;
  margin: 0;
}

.branding-subtext {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-mocca-muted);
  max-width: 420px;
  margin: 0;
}

.art-illustration-box {
  width: 100%;
  max-width: 440px;
  margin-top: 0.5rem;
}

.group-sitting-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Features Columns Badges */
.branding-features {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 400px;
}

.feat-badge-col {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.feat-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #EFECE6;
  border: 1px solid rgba(61, 99, 80, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.feat-text-box {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.feat-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.feat-desc {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
}

/* ================= RIGHT COLUMN: LOGIN CARD ================= */
.login-right-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.5rem;
}

.login-card-container {
  background-color: #FFFFFF;
  border: 1px solid rgba(61, 99, 80, 0.08);
  box-shadow: 0 10px 40px rgba(47, 78, 62, 0.035);
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Header Tab Buttons */
.login-tabs {
  display: flex;
  border-bottom: 1.5px solid rgba(61, 99, 80, 0.06);
  background-color: #FCFAF7;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  text-align: center;
}

.tab-btn:hover {
  color: var(--color-mocca-dark);
  background-color: #F8F5F0;
}

.tab-btn.active {
  color: var(--color-mocca-dark);
  font-weight: 700;
  background-color: #FFFFFF;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1.5px;
  left: 0;
  width: 100%;
  height: 2.5px;
  background-color: #8C7355;
}

/* Form Container Content */
.login-card-content {
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
}

.form-header {
  margin-bottom: 1.5rem;
}

.form-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0 0 0.35rem 0;
}

.form-subtext {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin: 0;
  line-height: 1.45;
}

/* Auth Input Fields */
.auth-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: var(--color-mocca-muted);
  opacity: 0.7;
}

.auth-input-field {
  width: 100%;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
  transition: all 0.25s ease;
}

.auth-input-field:focus {
  outline: none;
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(140, 115, 85, 0.08);
}

.eye-toggle-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-mocca-muted);
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-toggle-btn:hover {
  color: var(--color-mocca-dark);
}

/* Forgot Password Link Row */
.forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.25rem;
}

.forgot-link {
  font-size: 0.78rem;
  color: var(--color-mocca-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: var(--color-mocca-dark);
}

/* Submit Action Button */
.btn-auth-submit {
  width: 100%;
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0.85rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.btn-auth-submit:hover:not(:disabled) {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
}

.btn-auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Social Logins Split Block */
.social-auth-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(61, 99, 80, 0.08);
}

.divider-text {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
  white-space: nowrap;
}

.social-buttons-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.btn-social-auth {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  padding: 0.65rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-social-auth:hover {
  background-color: #FCFAF7;
  border-color: rgba(61, 99, 80, 0.22);
}

.social-logo {
  flex-shrink: 0;
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
  transition: all 0.2s ease;
}
.otp-input-field:focus {
  outline: none; border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(140, 115, 85, 0.08);
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

/* Bottom Tab Switch Link styling */
.auth-bottom-switch {
  text-align: center;
  margin-top: 1.75rem;
  font-size: 0.82rem;
  color: var(--color-mocca-muted);
}

.switch-link {
  color: var(--color-mocca-dark);
  text-decoration: none;
  margin-left: 0.25rem;
  border-bottom: 1.5px solid transparent;
  padding-bottom: 1px;
  transition: border-color 0.2s ease;
}

.switch-link:hover {
  border-color: var(--color-mocca-dark);
}

/* Split Column footer text disclaimers */
.login-footer-text {
  text-align: center;
  max-width: 440px;
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--color-mocca-muted);
}

.legal-link {
  color: var(--color-mocca-muted);
  text-decoration: underline;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: var(--color-mocca-dark);
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

/* Global Sleek Toast Popup Alerts */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, 15px);
  background-color: #2F4E3E;
  color: #FDFBF7;
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

/* ================= RESPONSIVE MEDIA QUERIES ================= */
@media (max-width: 1024px) {
  .login-main-container {
    grid-template-columns: 1fr; /* Stacking panels on tablets and phones */
    gap: 1.5rem;
    padding: 0.25rem 0.75rem 1rem 0.75rem;
    max-width: 440px;
    justify-content: center;
    align-items: center;
  }

  .login-left-panel {
    display: none; /* Hide the branding left panel on tablet/mobile so card is instantly visible */
  }
}

@media (max-width: 768px) {
  .card-back-home-wrapper {
    display: none; /* Hide Kembali ke Beranda button on mobile screens to maximize form visibility */
  }

  .login-card-container {
    border-radius: 12px;
  }

  .tab-btn {
    padding: 0.55rem;
    font-size: 0.8rem;
  }

  .login-card-content {
    padding: 0.85rem 0.85rem; /* Super compact padding */
  }

  .form-header {
    margin-bottom: 0.25rem;
  }

  .form-title {
    font-size: 0.95rem;
  }

  .form-subtext {
    display: none !important; /* Hide description fluff text on mobile to save vertical space */
  }

  .auth-form-fields {
    gap: 0.4rem; /* Ultra tight vertical spacing */
  }

  .form-input-group {
    gap: 0.1rem;
  }

  .form-label {
    font-size: 0.65rem;
  }

  .auth-input-field {
    padding: 0.42rem 0.65rem 0.42rem 2rem; /* Super slim inputs */
    font-size: 0.74rem;
  }

  .input-icon {
    left: 8px;
    width: 14px;
    height: 14px;
  }

  .btn-auth-submit {
    padding: 0.45rem;
    font-size: 0.76rem;
    margin-top: 0.05rem;
  }

  .social-auth-block {
    margin-top: 0.45rem;
    gap: 0.35rem;
  }

  .social-buttons-row {
    grid-template-columns: 1fr 1fr; /* Keep side-by-side to save height! */
    gap: 0.5rem;
  }

  .btn-social-auth {
    padding: 0.38rem;
    font-size: 0.7rem;
  }

  .auth-bottom-switch {
    margin-top: 0.45rem;
    font-size: 0.7rem;
  }

  .login-footer-text {
    font-size: 0.62rem;
    margin-top: 0.1rem;
  }
}
</style>
