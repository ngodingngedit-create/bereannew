<template>
  <section class="hero-section">
    <div class="slider">
      <div class="slides-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
          :aria-hidden="currentSlide !== index"
        >
          <img :src="slide.image" :alt="`Slide ${index + 1}`" class="slide-img" draggable="false" />
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
import { ref, onMounted, onUnmounted } from 'vue';

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
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  restartAutoplay();
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
  background: var(--color-bg-light);
}

.slider {
  position: relative;
  width: 100%;
  height: clamp(240px, 42vw, 600px);
  overflow: hidden;
  background: #eef2ef;
}

.slides-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  min-width: 0;
}

.slide-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

.arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: var(--color-mocca-dark);
  cursor: pointer;
  transform: translateY(-50%);
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.arrow svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.arrow-prev {
  left: 1.5rem;
}

.arrow-next {
  right: 1.5rem;
}

.slide-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dot {
  position: relative;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.dot::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: #fff;
  opacity: 0.5;
  transform: translate(-50%, -50%);
  transition: width 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms ease;
}

.dot.active::before {
  width: 22px;
  opacity: 1;
  background-color: var(--color-mocca-dark);
}

.arrow:focus-visible,
.dot:focus-visible {
  outline: 2px solid var(--color-mocca-dark);
  outline-offset: 3px;
}

@media (hover: hover) and (pointer: fine) {
  .arrow:hover {
    transform: translateY(-50%) scale(1.05);
  }
}

@media (max-width: 768px) {
  .slider {
    height: clamp(180px, 56vw, 320px);
  }

  .arrow {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slides-track,
  .arrow,
  .dot::before {
    transition: none;
  }
}
</style>
