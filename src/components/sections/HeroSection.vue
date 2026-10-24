<template>
  <section class="hero-section">
    <div class="slider-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <div class="slider-viewport">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-item"
          :class="getSlidePositionClass(index)"
          @click="handleSlideClick(index)"
        >
          <div class="slide-card">
            <img :src="slide.image" :alt="`Slide ${index + 1}`" class="slide-img" draggable="false" />
          </div>
        </div>
      </div>

      <button type="button" class="arrow arrow-prev" aria-label="Previous slide" @click="prevSlide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <button type="button" class="arrow arrow-next" aria-label="Next slide" @click="nextSlide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div class="slide-dots">
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          class="dot"
          :class="{ active: currentSlide === index }"
          :aria-label="`Slide ${index + 1}`"
          :aria-current="currentSlide === index ? 'true' : undefined"
          @click="setSlide(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const slides = [
  { image: '/slider/slider1.png' },
  { image: '/slider/slider2.webp' },
  { image: '/slider/slider3.webp' },
  { image: '/slider/slider4.webp' },
];

const currentSlide = ref(0);

let interval;
const restartAutoplay = () => {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
};

const setSlide = (index) => {
  currentSlide.value = index;
  restartAutoplay();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
  restartAutoplay();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  restartAutoplay();
};

const handleSlideClick = (index) => {
  if (index === currentSlide.value) return;
  setSlide(index);
};

// Touch support for swipe
let touchStartX = 0;
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};
const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const getSlidePositionClass = (index) => {
  const total = slides.length;
  const diff = (index - currentSlide.value + total) % total;

  if (diff === 0) return 'is-active';
  if (diff === 1 || diff === -(total - 1)) return 'is-next-1';
  if (diff === 2 || diff === -(total - 2)) return 'is-next-2';
  if (diff === total - 1 || diff === -1) return 'is-prev-1';
  if (diff === total - 2 || diff === -2) return 'is-prev-2';
  return 'is-hidden';
};

onMounted(() => {
  restartAutoplay();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.hero-section {
  width: 100%;
  background: #F7F8FA;
  padding: 1rem 0 1.25rem;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.slider-viewport {
  position: relative;
  width: 100%;
  height: clamp(220px, 26vw, 380px);
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

.carousel-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65vw;
  max-width: 960px;
  aspect-ratio: 16 / 5.4;
  transform-origin: center center;
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1),
              opacity 500ms cubic-bezier(0.25, 1, 0.5, 1),
              filter 500ms cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  will-change: transform, opacity;
}

.slide-card {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

/* Layered Carousel Positioning & Scaling */
.carousel-item.is-active {
  z-index: 5;
  transform: translate(-50%, -50%) scale(1) translateX(0);
  opacity: 1;
  filter: blur(0px);
  cursor: default;
}

.carousel-item.is-prev-1 {
  z-index: 4;
  transform: translate(-50%, -50%) scale(0.85) translateX(-62%);
  opacity: 0.9;
  filter: brightness(0.92);
}

.carousel-item.is-next-1 {
  z-index: 4;
  transform: translate(-50%, -50%) scale(0.85) translateX(62%);
  opacity: 0.9;
  filter: brightness(0.92);
}

.carousel-item.is-prev-2 {
  z-index: 3;
  transform: translate(-50%, -50%) scale(0.72) translateX(-118%);
  opacity: 0.75;
  filter: brightness(0.85);
}

.carousel-item.is-next-2 {
  z-index: 3;
  transform: translate(-50%, -50%) scale(0.72) translateX(118%);
  opacity: 0.75;
  filter: brightness(0.85);
}

.carousel-item.is-hidden {
  z-index: 1;
  transform: translate(-50%, -50%) scale(0.6) translateX(0);
  opacity: 0;
  pointer-events: none;
}

/* Navigation Buttons */
.arrow {
  position: absolute;
  top: 50%;
  z-index: 10;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  color: #1a1a1a;
  cursor: pointer;
  transform: translateY(-50%);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
              background-color 200ms ease;
}

.arrow svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.arrow-prev {
  left: calc(50% - 500px);
}

.arrow-next {
  right: calc(50% - 500px);
}

.arrow:active {
  transform: translateY(-50%) scale(0.94);
}

/* Slide Dots / Indicators */
.slide-dots {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background-color: #C5CEE0;
  cursor: pointer;
  transition: width 350ms cubic-bezier(0.23, 1, 0.32, 1),
              background-color 350ms ease;
}

.dot.active {
  width: 28px;
  background-color: #2E4A3E;
  border-radius: 999px;
}

.arrow:focus-visible,
.dot:focus-visible {
  outline: 2px solid #2E4A3E;
  outline-offset: 3px;
}

@media (hover: hover) and (pointer: fine) {
  .arrow:hover {
    transform: translateY(-50%) scale(1.06);
    background: #ffffff;
  }
}

@media (max-width: 1400px) {
  .arrow-prev {
    left: 2rem;
  }
  .arrow-next {
    right: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 0.6rem 0 0.9rem;
  }

  .slider-container {
    padding: 0 0.6rem;
  }

  .slider-viewport {
    height: clamp(150px, 44vw, 220px);
  }

  .carousel-item {
    width: 90vw;
  }

  .slide-card {
    border-radius: 10px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  }

  .carousel-item.is-prev-1 {
    transform: translate(-50%, -50%) scale(0.82) translateX(-50%);
    opacity: 0.6;
  }

  .carousel-item.is-next-1 {
    transform: translate(-50%, -50%) scale(0.82) translateX(50%);
    opacity: 0.6;
  }

  .carousel-item.is-prev-2,
  .carousel-item.is-next-2 {
    opacity: 0;
    pointer-events: none;
  }

  .arrow {
    width: 40px;
    height: 40px;
  }

  .arrow svg {
    width: 18px;
    height: 18px;
  }

  .arrow-prev {
    left: 0.5rem;
  }

  .arrow-next {
    right: 0.5rem;
  }

  .slide-dots {
    margin-top: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-item,
  .slide-card,
  .arrow,
  .dot {
    transition: none;
  }
}
</style>
