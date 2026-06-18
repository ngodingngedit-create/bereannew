<template>
  <section class="section-block section-sage">
    <div class="tape"></div>
    <h2 class="section-title">Gigs</h2>
    <div class="gigs-list">
      <div v-for="gig in gigs" :key="gig.id" class="gig-item">
        <div class="gig-date">
          <span class="day">{{ gig.day }}</span>
          <span class="month">{{ gig.month }}</span>
        </div>
        <div class="gig-info">
          <h3>{{ gig.venue }}</h3>
          <p>{{ gig.city }}</p>
        </div>
        <a href="#" class="btn-ticket">Tickets</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const gigs = [
  { id: 1, day: '12', month: 'JUN', venue: 'Jazz in the Park', city: 'Jakarta, ID' },
  { id: 2, day: '25', month: 'JUN', venue: 'Starlight Theatre', city: 'Bandung, ID' },
  { id: 3, day: '05', month: 'JUL', venue: 'Garden Festival', city: 'Singapore, SG' },
  { id: 4, day: '18', month: 'JUL', venue: 'The Blue Note', city: 'Tokyo, JP' }
]
</script>

<style scoped>
.section-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: white;
}

.gigs-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gig-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.3s;
}

.gig-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.gig-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  background: white;
  color: var(--color-sage);
  padding: 0.5rem;
  transform: rotate(-3deg);
}

.day {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.month {
  font-size: 0.8rem;
  font-weight: 600;
}

.gig-info {
  flex-grow: 1;
}

.gig-info h3 {
  margin: 0;
  font-size: 1.5rem;
}

.gig-info p {
  margin: 0;
  opacity: 0.8;
}

.btn-ticket {
  padding: 0.5rem 1.5rem;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 600;
  transition: all 0.3s;
}

.btn-ticket:hover {
  background: white;
  color: var(--color-sage);
}

@media (max-width: 600px) {
  .gig-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>
