<template>
  <section class="home-event-section">
    <div class="event-section-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-titles">
          <span class="section-subtitle">{{ currentLang === 'id' ? 'Jangan Lewatkan' : 'Do Not Miss Out' }}</span>
          <h2 class="section-title">{{ currentLang === 'id' ? 'Event Mendatang' : 'Upcoming Events' }}</h2>
        </div>
        <a href="#" class="view-all-link" @click.prevent="goToEventPage">
          {{ currentLang === 'id' ? 'Lihat Semua Event' : 'View All Events' }} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

      <!-- Events Cards Grid -->
      <div class="events-grid">
        <div 
          v-for="event in featuredEvents" 
          :key="event.id" 
          class="event-card-item"
          @click="openEventDetails(event)"
        >
          <!-- Card Image Section -->
          <div class="event-card-image-box">
            <img :src="event.image" :alt="event.title" class="event-card-img" />
          </div>

          <!-- Card Content Section -->
          <div class="event-card-body">
            <div class="event-card-title-container">
              <h3 :class="['event-card-title', { 'animate-marquee': event.title.length > 20 }]" :data-title="event.title">
                {{ event.title }}
              </h3>
            </div>

            <!-- Card Metadata Rows -->
            <div class="event-meta-info-list">
              <!-- Calendar Date -->
              <div class="event-date-row">
                <svg class="calendar-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span class="event-date-text">{{ currentLang === 'id' ? event.dateId : event.dateEn }}</span>
              </div>
              <!-- Location Row -->
              <div class="event-location-row">
                <svg class="location-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span class="event-location-text">{{ event.location }}</span>
              </div>
            </div>

            <!-- Price container -->
            <div class="event-price-container">
              <span class="event-price-value">{{ event.priceLabel }}</span>
            </div>

            <!-- Divider Line -->
            <div class="card-divider"></div>

            <!-- Creator Footer -->
            <div class="card-creator-section">
              <div class="creator-avatar-wrapper">
                <template v-if="event.creatorLogo === 'plus'">
                  <div class="creator-plus-logo">
                    <svg viewBox="0 0 32 32" width="32" height="32">
                      <rect width="32" height="32" rx="6" fill="#000000" />
                      <path d="M16 8v16M8 16h16" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
                    </svg>
                  </div>
                </template>
                <template v-else-if="event.creatorLogo">
                  <img :src="event.creatorLogo" class="creator-avatar-img" />
                </template>
                <template v-else>
                  <div class="creator-default-logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                    </svg>
                  </div>
                </template>
              </div>
              <div class="creator-name-container">
                <span :class="['creator-name-text', { 'animate-marquee': event.creatorName.length > 22 }]" :data-name="event.creatorName">
                  {{ event.creatorName }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { currentPage, currentLang, selectedEvent } from '../../store/cart.js';

// Featured events to showcase on the homepage
const featuredEvents = ref([]);

const fetchEvents = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const creatorId = apiUrl.includes('my.id') ? 11 : 127;
    const response = await fetch(`${apiUrl}/api/event-by-creator/${creatorId}`);
    const json = await response.json();
    const data = Array.isArray(json) ? json : json.data;

    if (data && data.length > 0) {
      featuredEvents.value = data.map(ev => {
        const ticket = ev.has_event_ticket && ev.has_event_ticket.length > 0 ? ev.has_event_ticket[0] : {};
        const price = ticket.price || 0;
        
        const formattedPrice = price === 0 ? 'Gratis' : new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(price).replace('Rp', 'Rp');

        let formattedDateId = 'TBA';
        let formattedDateEn = 'TBA';
        if (ticket.event_schedule_date) {
          const d = new Date(ticket.event_schedule_date);
          if (!isNaN(d)) {
            const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
            const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            formattedDateId = `${d.getDate()} ${monthsId[d.getMonth()]} ${d.getFullYear()}`;
            formattedDateEn = `${d.getDate()} ${monthsEn[d.getMonth()]} ${d.getFullYear()}`;
          } else {
            formattedDateId = ticket.event_schedule_date;
            formattedDateEn = ticket.event_schedule_date;
          }
        }

        return {
          id: ev.id,
          slug: ev.slug,
          slug_url: ev.slug_url,
          title: ev.name || ev.title || 'Event Berean.id',
          image: ev.image_url || '/banner/bannerevent.webp',
          category: ev.has_event_topic?.name?.toLowerCase() || 'others',
          dateId: formattedDateId,
          dateEn: formattedDateEn,
          time: ticket.starting_time ? `${ticket.starting_time.slice(0, 5)} WIB` : 'TBA',
          location: ticket.detail_venue_name || ev.location_name || ev.location_city || ev.location || 'TBA',
          priceLabel: formattedPrice,
          descriptionId: ev.description || '',
          descriptionEn: ev.description || '',
          termCondition: ev.term_condition || '',
          timestamp: new Date(ticket.event_schedule_date || Date.now()).getTime(),
          creatorName: ev.has_creator?.name || 'My Diary Records',
          creatorLogo: ev.has_creator?.image_url || '/logo_mocca.png',
          is_name: ev.is_name ?? 1,
          is_assistant: ev.is_assistant ?? 1,
          is_phone_number: ev.is_phone_number ?? 1,
          is_birthdate: ev.is_birthdate ?? 1,
          is_email: ev.is_email ?? 1,
          is_noidentity: ev.is_noidentity ?? 0,
          is_gender: ev.is_gender ?? 1,
          is_profession: ev.is_profession ?? 0,
          is_company: ev.is_company ?? 0,
          is_kelas: ev.is_kelas ?? 1
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }
};

onMounted(() => {
  fetchEvents();
});

const goToEventPage = () => {
  currentPage.value = 'event';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openEventDetails = (event) => {
  selectedEvent.value = event;
  currentPage.value = 'event-detail';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.home-event-section {
  background-color: #FAF6F0; /* Cream background matching home section styles */
  padding: 5rem 3rem;
  border-top: 1px solid var(--color-mocca-border);
  width: 100%;
  box-sizing: border-box;
}

.event-section-container {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
}

/* Section Header styling matching ShopSection */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-mocca-muted);
  letter-spacing: 0.05em;
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin: 0;
}

.view-all-link {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition-smooth);
  border-bottom: 1.5px solid transparent;
  padding-bottom: 2px;
}

.view-all-link:hover {
  border-bottom-color: var(--color-mocca-dark);
}

.view-all-link:hover .arrow-icon {
  transform: translateX(4px);
}

.arrow-icon {
  width: 16px;
  height: 16px;
  transition: var(--transition-smooth);
}

/* Events Grid matching event listings page */
.events-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

/* Event Card Item Styling (matches EventPage.vue specs) */
.event-card-item {
  background-color: var(--color-bg-light);
  border: 1px solid rgba(47, 78, 62, 0.12);
  border-radius: 8px; /* Clean premium border-radius */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
}

.event-card-item:hover {
  transform: translateY(-6px);
  border-color: var(--color-mocca-dark);
  box-shadow: 0 12px 30px rgba(47, 78, 62, 0.06);
}

.event-card-image-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-bg-cream);
  position: relative;
}

.event-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.event-card-item:hover .event-card-img {
  transform: scale(1.03);
}

.event-card-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.event-card-title-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
}

.event-card-title {
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
  white-space: nowrap;
  position: relative;
}

/* Marquee logic for titles that overflow */
.event-card-title.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 10s linear infinite;
  padding-left: 100%;
}

.event-card-title.animate-marquee::after {
  content: attr(data-title);
  position: absolute;
  left: 0;
  padding-left: 100%;
}

@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}

.event-meta-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.event-date-row, 
.event-location-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-mocca-dark);
}

.calendar-svg-icon, 
.location-svg-icon {
  color: var(--color-mocca-muted);
  flex-shrink: 0;
}

.event-date-text,
.event-location-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-price-container {
  margin-top: auto;
  padding-bottom: 0.75rem;
}

.event-price-value {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.card-divider {
  height: 1px;
  background-color: rgba(47, 78, 62, 0.08);
  margin: 0.5rem 0;
}

/* Creator Footer Section matching EventPage */
.card-creator-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.creator-avatar-wrapper {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-bg-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(47, 78, 62, 0.1);
}

.creator-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creator-plus-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-name-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.creator-name-text {
  display: block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.creator-name-text.animate-marquee {
  display: inline-block;
  overflow: visible;
  text-overflow: clip;
  animation: marquee-creator 10s linear infinite;
}

.creator-name-text.animate-marquee::after {
  content: attr(data-name);
  padding-left: 2rem;
  display: inline;
}

@keyframes marquee-creator {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Responsive Media Queries */
@media (max-width: 1200px) {
  .home-event-section {
    padding: 5rem 4rem;
  }
}

@media (max-width: 900px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .home-event-section {
    padding: 3rem 1.5rem;
  }
  .section-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }
  .section-title {
    font-size: 1.15rem !important;
    white-space: nowrap;
  }
  .section-subtitle {
    font-size: 0.7rem !important;
    white-space: nowrap;
  }
  .view-all-link {
    font-size: 0.72rem !important;
    white-space: nowrap;
  }
  .view-all-link .arrow-icon {
    width: 12px;
    height: 12px;
  }
  .events-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
