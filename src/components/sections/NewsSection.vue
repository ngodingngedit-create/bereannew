<template>
  <section class="section-block section-turquoise">
    <div class="tape"></div>
    <h2 class="section-title">Latest News</h2>
    <div class="news-list">
      <article v-for="post in news" :key="post.id" class="news-item">
        <span class="news-date">{{ post.date }}</span>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
        <a href="#" class="read-more">Read Entry →</a>
      </article>
    </div>
  </section>
</template>

<script setup>
const news = [
  { id: 1, date: 'May 10, 2026', title: 'Recording in the Clouds', excerpt: 'We spent the last week in a cabin recording new melodies. The birds were our backing vocals...', image: '' },
  { id: 2, date: 'April 22, 2026', title: 'New Vinyl Release', excerpt: 'Our special anniversary edition vinyl is finally here. Pressed on transparent cream wax...', image: '' }
]
</script>

<style scoped>
.section-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: white;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.news-item {
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-text);
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(0,0,0,0.05);
}

.news-date {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  opacity: 0.6;
  display: block;
  margin-bottom: 0.5rem;
}

.news-item h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.news-item p {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  opacity: 0.8;
}

.read-more {
  color: var(--color-turquoise);
  font-weight: 700;
  text-decoration: none;
  font-family: var(--font-heading);
}

.read-more:hover {
  text-decoration: underline;
}
</style>
