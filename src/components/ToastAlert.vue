<template>
  <Transition name="toast-slide">
    <div v-if="show" class="toast-card-container">
      <!-- Far-left pink vertical accent line -->
      <div class="toast-accent-line"></div>
      
      <!-- Icon badge -->
      <div class="toast-icon-badge">
        <svg class="toast-warning-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9V14" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 17.01H12.01" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21H20.47A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <!-- Center Text Content -->
      <div class="toast-text-content">
        <h4 class="toast-title">{{ title }}</h4>
        <p v-if="description" class="toast-desc">{{ description }}</p>
      </div>
      
      <!-- Close Button -->
      <button class="toast-close-button" @click="$emit('close')" aria-label="Close alert">
        <svg class="toast-close-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
});

defineEmits(['close']);
</script>

<style scoped>
.toast-card-container {
  position: fixed;
  z-index: 20000;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  box-sizing: border-box;
  
  /* Desktop Layout Constraints */
  bottom: 2rem;
  right: 2rem;
  width: 420px;
  padding: 16px 16px 16px 20px; /* Offset left for accent bar */
}

/* Light pink left vertical accent line */
.toast-accent-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #FEE2E2;
}

/* Warning Badge: square rounded, light red bg */
.toast-icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #FEF2F2;
  border-radius: 8px;
  flex-shrink: 0;
  margin-right: 14px;
}

.toast-warning-svg {
  display: block;
}

/* Center Text Content */
.toast-text-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
  padding-right: 8px;
  overflow: hidden;
}

.toast-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0F172A; /* dark navy / charcoal */
  margin: 0;
  line-height: 1.35;
  white-space: normal;
  word-break: break-word;
}

.toast-desc {
  font-size: 0.8rem;
  font-weight: 400;
  color: #475569; /* medium grey */
  margin: 0;
  line-height: 1.4;
  white-space: normal;
  word-break: break-word;
}

/* Close button - thin grey X vertically centered */
.toast-close-button {
  background: none;
  border: none;
  color: #64748B; /* thin grey */
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.toast-close-button:hover {
  background-color: #F1F5F9;
  color: #0F172A;
}

/* Transitions: Slide in from bottom right */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Mobile responsive constraints */
@media (max-width: 768px) {
  .toast-card-container {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    width: calc(100% - 2rem);
    margin: 0;
    padding: 14px 14px 14px 18px;
  }
  
  .toast-close-button {
    /* Touch target hit minimum 44px on mobile */
    min-height: 44px;
    min-width: 44px;
  }
}
</style>
