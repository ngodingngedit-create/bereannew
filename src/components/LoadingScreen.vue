<template>
  <Transition name="ls-fade" @after-leave="emit('done')">
    <div v-if="!done" class="ls-overlay" role="status" aria-label="Memuat halaman">
      <div class="ls-stack">
        <img src="/logo/logo.webp" alt="Berean.id" class="ls-logo" />
        <div class="ls-wordmark">Berean.id</div>
        <div class="ls-bar"><span class="ls-bar-fill"></span></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['done']);
const done = ref(false);
const DURATION_MS = 2000;

onMounted(() => {
  setTimeout(() => { done.value = true; }, DURATION_MS);
});
</script>

<style scoped>
.ls-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-cream, #ffffff);
}

.ls-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem;
}

.ls-logo {
  width: clamp(140px, 28vw, 260px);
  height: auto;
  object-fit: contain;
  animation: ls-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both,
             ls-breathe 3s ease-in-out 0.6s infinite;
}

.ls-wordmark {
  font-family: var(--font-heading);
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-mocca-muted, #82a291);
  opacity: 0;
  animation: ls-in-soft 0.6s ease-out 0.25s both;
}

.ls-bar {
  width: clamp(120px, 34vw, 220px);
  height: 3px;
  border-radius: 999px;
  background-color: var(--color-mocca-border, #e1ebe5);
  overflow: hidden;
}

.ls-bar-fill {
  display: block;
  width: 40%;
  height: 100%;
  border-radius: 999px;
  background-color: var(--color-mocca-dark, #2f4e3e);
  animation: ls-slide 1.1s ease-in-out infinite;
}

@keyframes ls-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes ls-in-soft {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ls-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

@keyframes ls-slide {
  0% { transform: translateX(-110%); }
  100% { transform: translateX(360%); }
}

.ls-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.ls-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .ls-logo {
    animation: ls-in-soft 0.3s ease-out both;
  }
  .ls-bar-fill {
    animation: none;
    width: 100%;
  }
}
</style>
