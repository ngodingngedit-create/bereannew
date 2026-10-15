<template>
  
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
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 3rem;
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
