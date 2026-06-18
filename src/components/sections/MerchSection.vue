<template>
  <section class="section-block section-cream">
    <div class="tape"></div>
    <h2 class="section-title">Merchandise</h2>
    <div class="merch-grid">
      <div v-for="item in merch" :key="item.id" class="merch-card">
        <div class="merch-image-wrapper">
          <img :src="item.image" :alt="item.name" class="merch-image" />
        </div>
        <div class="merch-info">
          <h3>{{ item.name }}</h3>
          <p class="price">{{ item.price }}</p>
          <button class="btn-primary">Add to Bag</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const merch = [
  { id: 1, name: 'Swing It Loud Tee', price: '$25.00', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop' },
  { id: 2, name: 'Vintage Tote Bag', price: '$15.00', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop' },
  { id: 3, name: 'Secret Notebook', price: '$12.00', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&auto=format&fit=crop' }
]
</script>

<style scoped>
.section-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: right;
}

.merch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.merch-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.merch-image-wrapper {
  background: white;
  padding: 2rem;
  box-shadow: var(--shadow-scrapbook);
  transform: rotate(1deg);
  transition: transform 0.3s;
}

.merch-card:nth-child(even) .merch-image-wrapper {
  transform: rotate(-2deg);
}

.merch-card:hover .merch-image-wrapper {
  transform: rotate(0deg) translateY(-5px);
}

.merch-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.merch-info {
  text-align: center;
}

.merch-info h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: 700;
  margin-bottom: 1rem;
  opacity: 0.7;
}
</style>
