<template>
  <Teleport to="body">
    <Transition name="pp-fade">
      <div
        v-if="open"
        class="pp-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Promo produk"
        @click.self="close"
      >
        <div class="pp-card">
          <button type="button" class="pp-close" aria-label="Tutup" @click="close">&times;</button>
          <img :src="image" :alt="title || 'Produk'" class="pp-img" @click="goToProduct" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { openProduct, DEFAULT_PICKUP_STORE } from '../store/cart.js';

const open = ref(false);
const image = ref('');
const title = ref('');
const product = ref(null);

const close = () => { open.value = false; };
const onKey = (e) => { if (e.key === 'Escape') close(); };

const goToProduct = () => {
  if (!product.value) return;
  close();
  openProduct(product.value);
};

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onMounted(async () => {
  document.addEventListener('keydown', onKey);
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const res = await fetch(`${apiUrl}/api/creator-maping-product/berean.id?page=1`);
    const json = await res.json();
    const list = Array.isArray(json.products?.data) ? json.products.data : [];
    const p = list.find((item) => item.product_status_id == 2 && item.images?.[0]?.image_url);
    if (p) {
      const price = parseInt(p.price) || 0;
      product.value = {
        id: p.id,
        slug: p.slug || p.slug_url,
        title: p.product_name,
        image: p.images[0].image_url,
        price,
        original_price: price,
        promo_price: p.is_promo == 1 ? (parseInt(p.promo_price) || null) : null,
        discount: p.discount || 0,
        is_promo: p.is_promo == 1,
        is_preorder: p.is_preorder == 1,
        variant_id: p.varians?.[0]?.id || null,
        creator: p.creator || null,
        rating: p.average_star ? parseFloat(String(p.average_star).replace(',', '.')) : null,
        total_sold: p.total_sold || 0,
        admin_fee: p.admin_fee || 0,
        colors: ['cream'],
        has_store_location: p.store_location || p.pickup_store || DEFAULT_PICKUP_STORE,
      };
      image.value = product.value.image;
      title.value = product.value.title;
      open.value = true;
    }
  } catch (e) {
    // no image available: keep popup closed
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.pp-overlay {
  position: fixed;
  inset: 0;
  z-index: 10050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.45);
}

.pp-card {
  position: relative;
  width: min(90vw, 420px);
  border-radius: 16px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.pp-img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  cursor: pointer;
}

.pp-close {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #111;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.pp-close:hover {
  background-color: #fff;
}

.pp-fade-enter-active,
.pp-fade-leave-active {
  transition: opacity 0.25s ease;
}

.pp-fade-enter-active .pp-card,
.pp-fade-leave-active .pp-card {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.pp-fade-enter-from,
.pp-fade-leave-to {
  opacity: 0;
}

.pp-fade-enter-from .pp-card,
.pp-fade-leave-to .pp-card {
  transform: scale(0.94);
}

@media (prefers-reduced-motion: reduce) {
  .pp-fade-enter-active,
  .pp-fade-leave-active,
  .pp-fade-enter-active .pp-card,
  .pp-fade-leave-active .pp-card {
    transition: none;
  }
}
</style>
