<template>
  <div class="event-page-container">
    <!-- Main Content wrapper -->
    <div class="event-main-content">
      <!-- Title & Newsletter Banner Section -->
      <div class="event-hero-banner">
        <!-- Left Side: Title & Description -->
        <div class="event-hero-left">
          <h1 class="event-title-main">{{ currentLang === 'id' ? 'Event Berean.id' : 'Berean.id Events' }}</h1>
          <p class="event-subtitle">
            {{ currentLang === 'id' 
                ? 'Temukan berbagai event seru dari Berean.id. Ikuti dan jadi bagian dari pengalaman yang tak terlupakan.' 
                : 'Discover various exciting events from Berean.id. Join in and be part of an unforgettable experience.' }}
          </p>
        </div>

        
      </div>

      <!-- Filter & Controls Bar -->
      <div class="event-filters-bar">
        <!-- Left: Rounded Tag Filter Buttons -->
        <div class="filters-tags-list">
          <button 
            v-for="tag in filterTags" 
            :key="tag.value"
            class="filter-tag-btn"
            :class="{ active: activeFilter === tag.value }"
            @click="activeFilter = tag.value"
          >
            {{ currentLang === 'id' ? tag.nameId : tag.nameEn }}
          </button>
        </div>

        <!-- Right: Sort & Layout Views -->
        
      </div>

      <!-- Event Cards Grid / List -->
      <div :class="['event-items-container', viewLayout]">
        <div 
          v-for="event in filteredAndSortedEvents" 
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
              <h2 :class="['event-card-title', { 'animate-marquee': event.title.length > 20 }]" :data-title="event.title">{{ event.title }}</h2>
            </div>

            <!-- Card Metadata Rows -->
            <div class="event-meta-info-list">
              <!-- Calendar Date -->
              <div class="event-date-row">
                <svg class="calendar-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
                <span :class="['creator-name-text', { 'animate-marquee': event.creatorName.length > 22 }]" :data-name="event.creatorName">{{ event.creatorName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Events State -->
      <div v-if="filteredAndSortedEvents.length === 0" class="no-events-state-container">
        <svg class="no-events-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <line x1="10" y1="14" x2="14" y2="18"></line>
          <line x1="14" y1="14" x2="10" y2="18"></line>
        </svg>
        <h3>{{ currentLang === 'id' ? 'Tidak Ada Event Ditemukan' : 'No Events Found' }}</h3>
        <p>{{ currentLang === 'id' ? 'Silakan pilih kategori filter lainnya.' : 'Please select another filter category.' }}</p>
      </div>

      
    </div>

    <!-- Trust Footer Banner Section -->
    <div class="event-trust-banner">
      <div class="trust-banner-grid">
        <!-- Feature 1 -->
        <div class="trust-feature-col">
          <div class="trust-icon-box">
            <!-- Award/Shield Icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="trust-text-box">
            <h4 class="trust-col-title">{{ currentLang === 'id' ? 'Event Resmi' : 'Official Events' }}</h4>
            <p class="trust-col-desc">
              {{ currentLang === 'id' 
                  ? 'Semua event diselenggarakan secara resmi oleh manajemen Berean.id.' 
                  : 'All events are officially organized by Berean.id management.' }}
            </p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="trust-feature-col">
          <div class="trust-icon-box">
            <!-- Lock Icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div class="trust-text-box">
            <h4 class="trust-col-title">{{ currentLang === 'id' ? 'Tiket Aman' : 'Secure Tickets' }}</h4>
            <p class="trust-col-desc">
              {{ currentLang === 'id' 
                  ? 'Jaminan transaksi aman dan e-tiket langsung dikirim ke email.' 
                  : 'Secure checkout and instant e-tickets delivered to your email.' }}
            </p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="trust-feature-col">
          <div class="trust-icon-box">
            <!-- Refresh Icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
          <div class="trust-text-box">
            <h4 class="trust-col-title">{{ currentLang === 'id' ? 'Update Terbaru' : 'Latest Updates' }}</h4>
            <p class="trust-col-desc">
              {{ currentLang === 'id' 
                  ? 'Dapatkan jadwal terkini langsung melalui email langganan.' 
                  : 'Get the latest schedules and updates straight to your inbox.' }}
            </p>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="trust-feature-col">
          <div class="trust-icon-box">
            <!-- Users Icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="trust-text-box">
            <h4 class="trust-col-title">{{ currentLang === 'id' ? 'Komunitas Berean.id' : 'Berean.id Community' }}</h4>
            <p class="trust-col-desc">
              {{ currentLang === 'id' 
                  ? 'Bergabung dengan sesama fans Berean.id (Celebrating Berean.id).' 
                  : 'Join and interact with other passionate Berean.id fans.' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Detail Modal Window -->
    <Transition name="modal-fade">
      <div v-if="isModalOpen && selectedEvent" class="modal-overlay" @click="closeModal">
        <div class="modal-card" @click.stop>
          <button class="modal-close-btn" @click="closeModal" aria-label="Close Modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="modal-grid-content">
            <!-- Left Side: Image -->
            <div class="modal-image-side">
              <img :src="selectedEvent.image" :alt="selectedEvent.title" class="modal-main-img" />
              
            </div>

            <!-- Right Side: Details & Registration Form -->
            <div class="modal-info-side">
              <span class="modal-tag-badge">{{ currentLang === 'id' ? selectedEvent.categoryNameId : selectedEvent.categoryNameEn }}</span>
              <h2 class="modal-title-heading">{{ selectedEvent.title }}</h2>

              <div class="modal-meta-list">
                <div class="modal-meta-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ currentLang === 'id' ? selectedEvent.dateId : selectedEvent.dateEn }}</span>
                </div>
                <div class="modal-meta-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{{ selectedEvent.time }}</span>
                </div>
                <div class="modal-meta-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ selectedEvent.location }}</span>
                </div>
              </div>

              <div class="modal-description">
                <h3>{{ currentLang === 'id' ? 'Deskripsi Event' : 'Event Description' }}</h3>
                <p>{{ currentLang === 'id' ? selectedEvent.descriptionId : selectedEvent.descriptionEn }}</p>
              </div>

              <!-- Simulating ticket checkout/booking inside modal -->
              <div class="modal-booking-box">
                <div class="booking-price-row">
                  <span class="booking-label">{{ currentLang === 'id' ? 'Harga Tiket' : 'Ticket Price' }}</span>
                  <span class="booking-value">{{ selectedEvent.priceLabel }}</span>
                </div>
                <button class="btn-book-ticket" @click="handleBookTicket">
                  {{ currentLang === 'id' ? 'Dapatkan Tiket' : 'Get Tickets' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Success Toast Notification -->
    <div class="event-toast" :class="{ active: toastActive }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { currentPage, currentLang, selectedEvent } from '../store/cart.js';

// Subscription states
const subscribeEmail = ref('');
const toastActive = ref(false);
const toastMessage = ref('');

// Filter and sorting states
const activeFilter = ref('all');
const sortBy = ref('newest');
const viewLayout = ref('grid');
const currentPageNum = ref(1);

// Detail Modal states
const isModalOpen = ref(false);

const filterTags = [
  { nameId: 'Semua Event', nameEn: 'All Events', value: 'all' },
  { nameId: 'Konser', nameEn: 'Concerts', value: 'concert' },
  { nameId: 'Meet & Greet', nameEn: 'Meet & Greet', value: 'meet_greet' },
  { nameId: 'Talkshow', nameEn: 'Talkshows', value: 'talkshow' },
  { nameId: 'Workshop', nameEn: 'Workshops', value: 'workshop' },
  { nameId: 'Pop-up Store', nameEn: 'Pop-up Stores', value: 'popup_store' },
  { nameId: 'Lainnya', nameEn: 'Others', value: 'others' }
];

const eventsData = ref([]);

const fetchEvents = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const creatorId = apiUrl.includes('my.id') ? 11 : 127;
    const response = await fetch(`${apiUrl}/api/event-by-creator/${creatorId}`);
    const json = await response.json();
    const data = Array.isArray(json) ? json : json.data;

    if (data && data.length > 0) {
      eventsData.value = data.map(ev => {
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
          categoryNameId: ev.has_event_topic?.name || 'Lainnya',
          categoryNameEn: ev.has_event_topic?.name || 'Others',
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

// Reactive Filter & Sort logic
const filteredAndSortedEvents = computed(() => {
  let list = [...eventsData.value];

  // 1. Filter by category tag
  if (activeFilter.value !== 'all') {
    list = list.filter(e => e.category === activeFilter.value);
  }

  // 2. Sort by date
  list.sort((a, b) => {
    if (sortBy.value === 'newest') {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });

  return list;
});

// Newsletter Subscription Handler
const handleSubscribe = () => {
  if (!subscribeEmail.value) return;
  const msg = currentLang.value === 'id' 
    ? `Terima kasih! ${subscribeEmail.value} telah terdaftar untuk info event terbaru.` 
    : `Thank you! ${subscribeEmail.value} has been registered for event updates.`;
  
  triggerToastNotification(msg);
  subscribeEmail.value = '';
};

// Modal handlers
const openEventDetails = (event) => {
  selectedEvent.value = event;
  currentPage.value = 'event-detail';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedEvent.value = null;
};

// Simulated checkout booking action
const handleBookTicket = () => {
  closeModal();
  const msg = currentLang.value === 'id' 
    ? 'Registrasi tiket berhasil! E-tiket telah dikirimkan ke email kamu.' 
    : 'Ticket registration successful! Your e-ticket has been sent to your email.';
  triggerToastNotification(msg);
};

// Helper toast launcher
const triggerToastNotification = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 4000);
};
</script>

<style scoped>
.event-page-container {
  background-color: #F5F2ED; /* Warm cream background explicitly set */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
}

/* Breadcrumbs Section styling */
.breadcrumbs-container {
  border-bottom: 1px solid rgba(47, 78, 62, 0.06);
  padding: 1.25rem 0;
  background-color: var(--color-bg-light);
}

.breadcrumbs-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-mocca-dark);
}

.breadcrumb-icon {
  stroke-width: 2.2;
}

.breadcrumb-separator {
  color: rgba(47, 78, 62, 0.25);
  font-weight: 500;
}

.breadcrumb-current {
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* Main Content elements */
.event-main-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
  flex-grow: 1;
}

/* Hero Section (Title + Newsletter Card) */
.event-hero-banner {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 3rem;
  margin-bottom: 3.5rem;
}

.event-hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-title-main {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.15;
}

.event-subtitle {
  font-size: 1.1rem;
  color: var(--color-mocca-muted);
  line-height: 1.6;
  max-width: 540px;
}

/* Newsletter Subscription Banner Card */
.event-newsletter-card {
  background-color: var(--color-bg-light);
  border-radius: 16px;
  padding: 2rem;
  width: 440px;
  box-shadow: 0 10px 30px rgba(47, 78, 62, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.newsletter-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.newsletter-envelope-icon {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.newsletter-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.newsletter-card-desc {
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.newsletter-form-row {
  display: flex;
  gap: 0.75rem;
}

.newsletter-email-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-family: var(--font-body);
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  border-radius: 8px;
  outline: none;
  color: var(--color-mocca-dark);
  transition: border-color 0.25s ease;
}

.newsletter-email-input:focus {
  border-color: var(--color-mocca-dark);
}

.newsletter-subscribe-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.25s ease;
}

.newsletter-subscribe-btn:hover {
  background-color: var(--color-mocca-muted);
}

/* Filter Controls Bar */
.event-filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.filters-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tag-btn {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.filter-tag-btn:hover {
  border-color: var(--color-mocca-dark);
}

.filter-tag-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.filters-controls-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.event-sort-container {
  position: relative;
  display: flex;
  align-items: center;
}

.event-sort-select {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  padding: 0.5rem 2.25rem 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  appearance: none;
  transition: border-color 0.25s ease;
}

.event-sort-select:hover {
  border-color: var(--color-mocca-dark);
}

.event-sort-arrow {
  position: absolute;
  right: 0.75rem;
  color: var(--color-mocca-dark);
  pointer-events: none;
}

.layout-toggle-group {
  display: flex;
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 2px;
}

.layout-btn {
  background: none;
  border: none;
  color: var(--color-mocca-muted);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.layout-btn:hover {
  color: var(--color-mocca-dark);
}

.layout-btn.active {
  background-color: var(--color-bg-cream);
  color: var(--color-mocca-dark);
}

/* Event Items Container */
.event-items-container.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.85rem; /* tighter gap */
}

.event-card-item {
  background-color: var(--color-bg-light);
  border-radius: 8px; /* Changed to 8px */
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  padding: 0; /* Remove padding so banner is full at top, left, and right */
  cursor: pointer;
}

.event-card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(47, 78, 62, 0.08);
}

.event-card-image-box {
  position: relative;
  width: 100%;
  padding-top: 45%; /* Very wide aspect ratio matching mockup */
  overflow: hidden;
  border-radius: 0; /* Clipped by card border-radius: 8px */
  background-color: var(--color-bg-cream);
}

.event-card-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card-body {
  padding: 1.25rem; /* Applied padding inside card body instead of card container */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.event-card-title-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  margin-bottom: 0.5rem;
}

.event-card-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.1rem; /* Smaller font size */
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-mocca-dark);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.event-card-title.animate-marquee {
  display: inline-block;
  overflow: visible;
  text-overflow: clip;
  animation: marquee-text 8s linear infinite;
}

.event-card-title.animate-marquee::after {
  content: attr(data-title);
  padding-left: 2rem;
  display: inline;
}

@keyframes marquee-text {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 1rem)); }
}

/* Date & Location Row Styling */
.event-meta-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.event-date-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.event-location-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.calendar-svg-icon,
.location-svg-icon {
  stroke: var(--color-mocca-muted);
  flex-shrink: 0;
}

.event-date-text,
.event-location-text {
  font-family: var(--font-body);
  font-size: 0.75rem; /* Smaller date and location text */
  font-weight: 500;
  color: var(--color-mocca-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Price Styling */
.event-price-container {
  margin-bottom: 0.25rem;
}

.event-price-value {
  font-family: var(--font-body);
  font-size: 1.15rem; /* Smaller price text */
  font-weight: 700;
  color: var(--color-mocca-dark);
}

/* Divider & Creator styling */
.card-divider {
  border-top: 1px solid #E2DCD5; /* thin solid line */
  width: 100%;
  margin: 0.35rem 0 0.5rem 0; /* closer gap */
}

.card-creator-section {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: auto;
  overflow: hidden; /* clip long creator names */
}

.creator-avatar-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-plus-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.creator-avatar-img {
  width: 32px; /* Increased size */
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-mocca-border);
}

.creator-default-logo {
  color: var(--color-mocca-muted);
}

.creator-name-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  flex-grow: 1;
  height: 1.25rem;
}

.creator-name-text {
  display: block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: #5C6B8D; /* Slate/gray-blue from mockup */
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
  100% { transform: translateX(calc(-50% - 1rem)); }
}

/* List view modifications */
.event-items-container.list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-items-container.list .event-card-item {
  flex-direction: row;
  height: 220px;
  padding: 1rem;
}

.event-items-container.list .event-card-image-box {
  width: 320px;
  padding-top: 0;
  height: 100%;
  flex-shrink: 0;
  border-radius: 6px;
}

.event-items-container.list .event-card-body {
  padding: 0.25rem 1.5rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.event-items-container.list .event-card-title-container {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  margin-bottom: 0;
}

.event-items-container.list .event-card-title {
  font-size: 1.15rem;
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  animation: none;
}

.event-items-container.list .event-card-title::after {
  content: none;
}

.event-items-container.list .event-meta-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0;
  width: 200px;
}

.event-items-container.list .event-date-row {
  margin-bottom: 0;
}

.event-items-container.list .event-price-container {
  margin-bottom: 0;
}

.event-items-container.list .card-divider {
  display: none; /* Hide vertical/horizontal line in list row structure */
}

.event-items-container.list .card-creator-section {
  margin-top: 0;
  width: 240px;
  justify-content: flex-end;
}

.event-items-container.list .creator-name-container {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: none;
  max-width: 180px;
}

.event-items-container.list .creator-name-text {
  font-size: 0.85rem;
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  animation: none;
}

.event-items-container.list .creator-name-text::after {
  content: none;
}

/* No events status styling */
.no-events-state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  text-align: center;
  background-color: var(--color-bg-light);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(47, 78, 62, 0.03);
}

.no-events-icon {
  color: var(--color-mocca-muted);
  margin-bottom: 1.25rem;
}

.no-events-state-container h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-mocca-dark);
}

.no-events-state-container p {
  color: var(--color-mocca-muted);
  font-size: 0.95rem;
}



.pag-arrow-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pag-arrow-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pag-arrow-btn:not(:disabled):hover {
  border-color: var(--color-mocca-dark);
}

.pag-num-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.pag-num-btn.active {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
}

.pag-num-btn:not(.active):hover {
  border-color: var(--color-mocca-dark);
}

/* Trust Banner Styling */
.event-trust-banner {
  background-color: var(--color-bg-light);
  border-top: 1px solid rgba(47, 78, 62, 0.06);
  padding: 3rem 0;
}

.trust-banner-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
}

.trust-feature-col {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.trust-icon-box {
  color: var(--color-mocca-dark);
  background-color: var(--color-bg-cream);
  padding: 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.trust-text-box {
  display: flex;
  flex-direction: column;
}

.trust-col-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--color-mocca-dark);
}

.trust-col-desc {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
}

/* Modal details overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(47, 78, 62, 0.4);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-card {
  background-color: var(--color-bg-light);
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(47, 78, 62, 0.2);
  overflow: hidden;
  position: relative;
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.modal-close-btn:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.modal-grid-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 500px;
}

.modal-image-side {
  position: relative;
  height: 100%;
  background-color: var(--color-bg-cream);
}

.modal-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-img-overlay {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
}

.modal-badge-status {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 0.85rem;
  border-radius: 4px;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.modal-badge-status.status-available {
  background-color: #28a745;
  color: #fff;
}

.modal-badge-status.status-limited {
  background-color: #d97706;
  color: #fff;
}

.modal-badge-status.status-free {
  background-color: #0D3B7A;
  color: #fff;
}

.modal-info-side {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-tag-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  display: block;
}

.modal-title-heading {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 1.25rem;
  color: var(--color-mocca-dark);
}

.modal-meta-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
}

.modal-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-mocca-dark);
  font-weight: 500;
}

.modal-meta-row svg {
  stroke: var(--color-mocca-muted);
  flex-shrink: 0;
}

.modal-description {
  margin-bottom: 2rem;
}

.modal-description h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.modal-description p {
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
  line-height: 1.6;
}

.modal-booking-box {
  background-color: var(--color-bg-cream);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  border: 1px solid var(--color-mocca-border);
}

.booking-price-row {
  display: flex;
  flex-direction: column;
}

.booking-label {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  margin-bottom: 0.25rem;
}

.booking-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
}

.btn-book-ticket {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-book-ticket:hover {
  background-color: var(--color-mocca-muted);
}

/* Success Toast style */
.event-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(120%);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  z-index: 11000;
}

.event-toast.active {
  transform: translateY(0);
  opacity: 1;
}

/* Transition Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from .modal-card,
.modal-fade-leave-to .modal-card {
  transform: scale(0.95) translateY(10px);
}

/* ================= RESPONSIVE MEDIA QUERIES ================= */
@media (max-width: 1024px) {
  .event-items-container.grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .event-items-container.list .event-card-item {
    height: auto;
    flex-direction: column;
  }
  
  .event-items-container.list .event-card-image-box {
    width: 100%;
    padding-top: 56%;
  }

  .event-items-container.list .event-card-body {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
    padding: 1.5rem;
  }

  .event-items-container.list .event-card-title {
    max-width: 100%;
  }

  .event-items-container.list .event-meta-info-list {
    width: 100%;
  }

  .event-items-container.list .event-card-actions {
    width: 100%;
  }

  .event-hero-banner {
    flex-direction: column;
    gap: 2rem;
  }

  .event-newsletter-card {
    width: 100%;
  }

  .trust-banner-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .event-main-content {
    padding: 2rem 1.25rem;
  }

  .event-title-main {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .event-subtitle {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .event-filters-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filters-tags-list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    padding-bottom: 0.5rem;
    scrollbar-width: none; /* Hide scrollbar in Firefox */
    -ms-overflow-style: none; /* Hide scrollbar in IE/Edge */
    gap: 0.5rem;
  }

  .filters-tags-list::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome/Safari */
  }

  .filter-tag-btn {
    flex-shrink: 0;
    padding: 0.4rem 0.85rem;
    font-size: 0.75rem;
  }

  .filters-controls-right {
    width: 100%;
    justify-content: space-between;
  }

  .event-items-container.grid {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-grid-content {
    grid-template-columns: 1fr;
    max-height: 85vh;
    overflow-y: auto;
  }

  .modal-image-side {
    height: 250px;
  }

  .modal-info-side {
    padding: 1.5rem;
    max-height: none;
    overflow-y: visible;
  }

  .modal-title-heading {
    font-size: 1.5rem;
  }

  .trust-banner-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .event-toast {
    left: 1.25rem;
    right: 1.25rem;
    bottom: 5.5rem; /* Make space for MobileNavbar */
    text-align: center;
  }
}
</style>
