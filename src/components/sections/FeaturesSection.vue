<template>
  <section class="features-section">
    <div class="features-container">
      <!-- 1. Official Merchandise -->
      <div class="feature-card">
        <div class="feature-icon">
          <!-- Badge Ribbon Icon -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M9.09 14.29L6 22l6-3 6 3-3.09-7.71"></path>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Official Merchandise</h3>
          <p class="feature-text">100% official Berean.id merch</p>
        </div>
      </div>

      <!-- 2. Quality Material -->
      <div class="feature-card">
        <div class="feature-icon">
          <!-- Box Icon -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Quality Material</h3>
          <p class="feature-text">Comfortable & durable</p>
        </div>
      </div>

      <!-- 3. Secure Payment -->
      <div class="feature-card">
        <div class="feature-icon">
          <!-- Credit Card with Shield Lock Icon -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="2" y1="9" x2="22" y2="9"></line>
            <!-- Lock indicator overlay -->
            <path d="M16 14h6"></path>
            <rect x="18" y="13" width="4" height="4" rx="1"></rect>
            <path d="M19 13v-2a1 1 0 0 1 2 0v2"></path>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Secure Payment</h3>
          <p class="feature-text">Safe and trusted checkout</p>
        </div>
      </div>

      <!-- 4. Worldwide Shipping -->
      <div class="feature-card">
        <div class="feature-icon">
          <!-- Truck Icon -->
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">Worldwide Shipping</h3>
          <p class="feature-text">Delivering to your door</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Interactive feature cards
</script>

<style scoped>
.features-section {
  width: 100%;
  background-color: var(--color-bg-light);
  border-top: 1px solid var(--color-mocca-border);
  border-bottom: 1px solid var(--color-mocca-border);
  padding: 3rem 0;
  transition: var(--transition-smooth);
}

.features-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 1.5rem;
  position: relative;
}

/* Dividing lines between columns */
.feature-card:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -0.75rem;
  top: 15%;
  height: 70%;
  width: 1px;
  background-color: var(--color-mocca-border);
}

.feature-icon {
  color: var(--color-mocca-dark);
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.feature-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.feature-text {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  font-weight: 400;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .features-container {
    padding: 0 4rem;
  }
}

@media (max-width: 1024px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  .feature-card {
    padding: 0.5rem 0;
  }

  /* Adjust borders for 2x2 grid */
  .feature-card:not(:last-child)::after {
    display: none;
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 2.5rem 0;
  }

  .features-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 2rem;
  }
  
  .feature-card {
    justify-content: flex-start;
  }
}
</style>
