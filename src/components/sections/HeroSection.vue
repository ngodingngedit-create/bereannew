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

const sliderBase = import.meta.env.VITE_SLIDER_API_URL || 'https://api.kolektix.my.id';
const SLIDER_URL = `${sliderBase}/api/myslide/e5e0a35f9a`;

const SLIDE_COUNT = 3;

const slides = ref([]);

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
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  restartAutoplay();
};

const prevSlide = () => {
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
  restartAutoplay();
};

const handleSlideClick = (index) => {
  if (didSwipe) {
    didSwipe = false;
    return;
  }
  if (index !== currentSlide.value) {
    setSlide(index);
    return;
  }
  const link = slides.value[index]?.link;
  if (link) window.open(link, '_blank', 'noopener');
};

// Touch support for swipe
let touchStartX = 0;
let touchStartY = 0;
let didSwipe = false;
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  didSwipe = false;
};
const handleTouchEnd = (e) => {
  const diffX = touchStartX - e.changedTouches[0].clientX;
  const diffY = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    didSwipe = true;
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const getSlidePositionClass = (index) => {
  const total = slides.value.length;
  let diff = (index - currentSlide.value + total) % total;

  if (diff === 0) return 'is-active';
  if (diff > total / 2) diff -= total;

  if (diff === 1) return 'is-next-1';
  if (diff === 2) return 'is-next-2';
  if (diff === -1) return 'is-prev-1';
  if (diff === -2) return 'is-prev-2';
  return 'is-hidden';
};

onMounted(async () => {
  restartAutoplay();
  try {
    const res = await fetch(SLIDER_URL);
    const json = await res.json();
    const items = (json?.data || [])
      .filter((s) => s?.image_url)
      .map((s) => ({ image: s.image_url, link: s.link }));
    if (!items.length) return;
    slides.value = Array.from({ length: SLIDE_COUNT }, (_, i) => items[i % items.length]);
    currentSlide.value = 0;
    restartAutoplay();
  } catch (e) {
    // API unavailable: no fallback slides
  }
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
  width: 84vw;
  max-width: 1360px;
  aspect-ratio: 1080 / 280;
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
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
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
    padding: 0;
  }

  .slider-container {
    padding: 0;
    touch-action: pan-y;
  }

  .slider-viewport {
    height: auto;
    aspect-ratio: 1080 / 280;
  }

  .carousel-item {
    width: 108vw;
  }

  .slide-img {
    border-radius: 0;
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
    display: none;
  }

  .slide-dots {
    position: absolute;
    left: 50%;
    bottom: 10px;
    z-index: 10;
    margin-top: 0;
    gap: 5px;
    transform: translateX(-50%);
  }

  .dot {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.55);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .dot.active {
    width: 15px;
    background-color: #fff;
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
