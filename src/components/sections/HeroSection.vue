<template>
  <section class="hero-section">
    <!-- Slider Track for the sliding background -->
    <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="slide-bg"
        :style="{ 
          backgroundImage: `url(${slide.image})`,
          '--pos-desktop': slide.posDesktop,
          '--pos-mobile': slide.posMobile
        }"
      ></div>
    </div>
    
    <!-- Gradient Overlay -->
    <div class="hero-overlay"></div>

    <div class="hero-container">
      <!-- Left-aligned Content -->
      <div class="hero-content">
        <span class="tagline">Berean.id's Official Merchandise</span>
        <h1 class="headline">Berean.id's <br /> Official Merchandise</h1>
        
        <div class="cta-wrapper">
          <button class="shop-button">SHOP NOW</button>
        </div>
        
        <!-- Slide Indicators -->
        <div class="slide-dots">
          <span 
            v-for="(slide, index) in slides" 
            :key="index"
            class="dot" 
            :class="{ active: currentSlide === index }"
            @click="setSlide(index)"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  { image: '/slider/slider1.png', posDesktop: 'center center', posMobile: 'center center' },
  { image: '/slider/slider2.png', posDesktop: 'center center', posMobile: 'center center' },
  { image: '/slider/slider3.png', posDesktop: 'center center', posMobile: 'center center' },
];

const currentSlide = ref(0);

const setSlide = (index) => {
  currentSlide.value = index;
};

let interval;
onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.hero-section {
  width: 100%;
  min-height: 520px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.slider-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

.slide-bg {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: var(--pos-desktop);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.98) 0%, 
    rgba(255, 255, 255, 0.92) 25%, 
    rgba(255, 255, 255, 0.55) 55%, 
    rgba(255, 255, 255, 0.10) 90%,
    rgba(255, 255, 255, 0.0) 100%
  );
  pointer-events: none;
}

.hero-container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 3;
}

.hero-content {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  animation: fadeIn 1s cubic-bezier(0.25, 1, 0.5, 1);
}

.tagline {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-mocca-dark);
  opacity: 0.8;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.headline {
  font-family: var(--font-heading);
  font-size: clamp(2.0rem, 3.2vw, 3.2rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--color-mocca-dark);
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.subtext {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  font-weight: 300;
  color: var(--color-mocca-dark);
  opacity: 0.75;
  margin-bottom: 2rem;
  max-width: 420px;
  line-height: 1.5;
}

.cta-wrapper {
  margin-bottom: 2.5rem;
}

.shop-button {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.95rem 2.5rem;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.12);
  transition: var(--transition-smooth);
}

.shop-button:hover {
  background-color: #1C3026;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(47, 78, 62, 0.2);
}

.slide-dots {
  display: flex;
  gap: 0.65rem;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #A9BDB2;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.dot.active {
  background-color: var(--color-mocca-dark);
}

.dot:hover {
  background-color: var(--color-mocca-dark);
  transform: scale(1.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .hero-container {
    padding: 0 4rem;
  }
}

@media (max-width: 1024px) {
  .hero-section {
    min-height: 480px;
  }
  .hero-container {
    padding: 0 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 450px;
  }
  
  .slide-bg {
    background-position: var(--pos-mobile);
  }

  .hero-overlay {
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.96) 0%, 
      rgba(255, 255, 255, 0.90) 60%, 
      rgba(255, 255, 255, 0.75) 100%
    );
  }

  .hero-container {
    padding: 2rem;
    justify-content: center;
  }

  .hero-content {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .subtext {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-wrapper {
    margin-bottom: 2rem;
  }
}
</style>
