<template>
  <section class="section-block section-cream">
    <div class="tape"></div>
    <h2 class="section-title">Music</h2>
    <div class="music-grid">
      <div v-for="album in albums" :key="album.id" class="album-card">
        <div class="album-art-wrapper">
          <img :src="album.cover" :alt="album.title" class="album-art" />
          <div class="album-overlay">
            <button class="btn-play">Listen</button>
          </div>
        </div>
        <div class="album-info">
          <h3>{{ album.title }}</h3>
          <p>{{ album.year }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const albums = [
  { id: 1, title: 'My Diary', year: '2002', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&auto=format&fit=crop' },
  { id: 2, title: 'Friends', year: '2004', cover: 'https://images.unsplash.com/photo-1514525253361-bee243870eb2?w=400&auto=format&fit=crop' },
  { id: 3, title: 'Colours', year: '2007', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce6742?w=400&auto=format&fit=crop' },
  { id: 4, title: 'Home', year: '2014', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop' }
]
</script>

<style scoped>
.section-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
}

.music-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.album-card {
  background: white;
  padding: 10px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.album-card:hover {
  transform: scale(1.05) rotate(2deg);
}

.album-art-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.album-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.album-card:hover .album-overlay {
  opacity: 1;
}

.btn-play {
  padding: 0.5rem 1rem;
  background: white;
  border: none;
  font-family: var(--font-heading);
  cursor: pointer;
}

.album-info {
  margin-top: 1rem;
  text-align: center;
}

.album-info h3 {
  font-size: 1.2rem;
  margin: 0;
}

.album-info p {
  font-size: 0.9rem;
  opacity: 0.6;
}
</style>
