<template>
  <div class="event-detail-page">
    <div class="event-detail-container">
      <!-- Breadcrumb Navigation -->
      <!-- <nav class="breadcrumb-nav">
        <a href="#" class="breadcrumb-link" @click.prevent="goBackToEvents">
          <svg class="breadcrumb-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</span>
        </a>
        <span class="breadcrumb-separator">></span>
        <a href="#" class="breadcrumb-link" @click.prevent="goBackToEvents">
          <span>Event</span>
        </a>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ displayEvent.title }}</span>
      </nav> -->

      <!-- Hero Event Banner Card -->
      <div class="hero-event-banner" :style="{ '--banner-bg-img': `url(${displayEvent.image})` }">
        <!-- Top Header Row (Title & Countdown side-by-side) -->
        <div class="hero-banner-header">
          <h1 class="event-banner-title">{{ displayEvent.title }}</h1>
          <!-- Real-time Event Countdown Widget -->
          <div class="banner-countdown-wrapper">
            <span class="countdown-label">{{ currentLang === 'id' ? 'Event Dimulai Dalam' : 'Event Starts In :' }}</span>
            <div class="countdown-timer">
              <div class="countdown-segment">
                <span class="countdown-num">{{ countdownTime.days }}</span>
                <span class="countdown-unit">{{ currentLang === 'id' ? 'Hari' : 'Days' }}</span>
              </div>
              <div class="countdown-divider">:</div>
              <div class="countdown-segment">
                <span class="countdown-num">{{ countdownTime.hours }}</span>
                <span class="countdown-unit">{{ currentLang === 'id' ? 'Jam' : 'Hrs' }}</span>
              </div>
              <div class="countdown-divider">:</div>
              <div class="countdown-segment">
                <span class="countdown-num">{{ countdownTime.minutes }}</span>
                <span class="countdown-unit">{{ currentLang === 'id' ? 'Menit' : 'Mins' }}</span>
              </div>
              <div class="countdown-divider">:</div>
              <div class="countdown-segment">
                <span class="countdown-num">{{ countdownTime.seconds }}</span>
                <span class="countdown-unit">{{ currentLang === 'id' ? 'Detik' : 'Secs' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Body Grid (Image & Metadata) -->
        <div class="hero-banner-body-grid">
          <!-- Left Side: Image / Artwork -->
          <div class="hero-banner-left">
            <img :src="displayEvent.image" :alt="displayEvent.title" class="hero-banner-img" />
            <!-- Gritty overlay text if it is the Mods Mayday event -->
            <div v-if="displayEvent.id === 13" class="mods-banner-overlay">
              <!-- Content already embedded in generated image, but we can overlay additional if needed -->
            </div>
          </div>

          <!-- Right Side: Event Metadata -->
          <div class="hero-banner-right">
            <div class="banner-meta-list">
              <!-- Date & Time -->
              <div class="banner-meta-item">
                <svg class="meta-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <div class="meta-text">
                  <span class="meta-main-info">{{ displayEvent.dateId }}</span>
                  <span class="meta-sub-info">{{ displayEvent.time }}</span>
                </div>
              </div>

              <!-- Location -->
              <div class="banner-meta-item">
                <svg class="meta-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div class="meta-text">
                  <span class="meta-main-info">{{ displayEvent.location }}</span>
                </div>
              </div>

              <!-- Categories -->
              <div class="banner-meta-item">
                <svg class="meta-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <div class="meta-text">
                  <span class="meta-main-info">{{ displayEvent.categoriesLabel || `${displayEvent.categoryNameId} • Musik • Pop` }}</span>
                </div>
              </div>

              <!-- Share Meta Item (Mobile Only) -->
              <div class="banner-meta-item share-meta-item" @click="triggerShare('Link')" style="cursor: pointer;">
                <svg class="meta-icon share-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <div class="meta-text">
                  <span class="meta-main-info share-text-link">{{ currentLang === 'id' ? 'Bagikan Event' : 'Share Event' }}</span>
                </div>
              </div>
            </div>

            <!-- Organizer Row (Moved to Banner) -->
            <div class="banner-creator-row">
              <div class="ticket-creator-avatar">
                <template v-if="displayEvent.creatorLogo === 'plus'">
                  <div class="creator-plus-logo-small">WJ</div>
                </template>
                <img v-else-if="displayEvent.creatorLogo" :src="displayEvent.creatorLogo" class="creator-avatar-img" />
                <div v-else class="creator-default-logo-small">M</div>
              </div>
              <div class="ticket-creator-info">
                <span class="ticket-creator-label">{{ currentLang === 'id' ? 'Penyelenggara' : 'Organizer' }}</span>
                <span class="ticket-creator-name">{{ displayEvent.creatorName || 'Warriors Jakarta' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Layout (Two-Column Grid) -->
      <div class="event-detail-grid">
        <!-- Left Column: Event Information -->
        <div class="event-info-left-col">
          <!-- Tab Menu Bar -->
          <div class="tabs-bar">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'deskripsi' }"
              @click="activeTab = 'deskripsi'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tab-icon">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="9"></line>
                <line x1="9" y1="13" x2="15" y2="13"></line>
                <line x1="9" y1="17" x2="15" y2="17"></line>
              </svg>
              {{ currentLang === 'id' ? 'Deskripsi' : 'Description' }}
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'tiket' }"
              @click="activeTab = 'tiket'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tab-icon">
                <path d="M21 9a3 3 0 0 0-3-3h-16a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9z"></path>
                <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="3 3"></line>
              </svg>
              {{ currentLang === 'id' ? 'Tiket' : 'Ticket' }}
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'syarat' }"
              @click="activeTab = 'syarat'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tab-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {{ currentLang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions' }}
            </button>
          </div>

          <!-- Description Tab Content -->
          <div v-show="activeTab === 'deskripsi'" class="tab-content-block">
            <div class="desc-section-card">
              <!-- General overview -->
              <div class="event-desc-main" v-html="currentLang === 'id' ? displayEvent.descriptionId : displayEvent.descriptionEn"></div>

              <!-- Informasi Penting Section (Moved to Description) -->
              <div class="desc-sub-section info-penting-inline-section">
                <h3 class="section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  {{ currentLang === 'id' ? 'Informasi Penting' : 'Important Info' }}
                </h3>
                
                <div class="info-facts-horizontal-grid">
                  <!-- Usia Minimum (Hidden per request) -->

                  <!-- Kategori Event -->
                  <div class="fact-item-inline">
                    <svg class="fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <div class="fact-text">
                      <span class="fact-label">{{ currentLang === 'id' ? 'Kategori Event' : 'Event Category' }}</span>
                      <span class="fact-value">{{ displayEvent.categoriesLabel || `${displayEvent.categoryNameId || 'Festival'} • Musik` }}</span>
                    </div>
                  </div>

                  <!-- Durasi (Hidden per request) -->

                  <!-- Bahasa -->
                  <div class="fact-item-inline">
                    <svg class="fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <div class="fact-text">
                      <span class="fact-label">{{ currentLang === 'id' ? 'Bahasa' : 'Language' }}</span>
                      <span class="fact-value">{{ displayEvent.language || 'Indonesia' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Highlight Event Grid -->
              <div class="desc-sub-section">
                <h3 class="section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  Highlight Event
                </h3>
                <div class="highlight-grid">
                  <div v-for="hl in displayEvent.highlights" :key="hl.title" class="highlight-item">
                    <div class="hl-icon-box" v-html="hl.icon"></div>
                    <div class="hl-text-box">
                      <span class="hl-title">{{ hl.title }}</span>
                      <span class="hl-desc">{{ hl.desc }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lineup & Program -->
              <div v-if="false" class="desc-sub-section">
                <h3 class="section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="2" y1="7" x2="7" y2="7"></line>
                    <line x1="2" y1="17" x2="7" y2="17"></line>
                    <line x1="17" y1="17" x2="22" y2="17"></line>
                    <line x1="17" y1="7" x2="22" y2="7"></line>
                  </svg>
                  Lineup & Program
                </h3>
                <div class="program-grid">
                  <div v-for="item in displayEvent.program" :key="item.title" class="program-card">
                    <div class="program-img-box">
                      <img :src="item.image" :alt="item.title" class="program-img" />
                    </div>
                    <div class="program-meta">
                      <span class="program-name">{{ item.title }}</span>
                      <span class="program-sub">{{ item.sub }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Terms and conditions Tab Content -->
          <div v-show="activeTab === 'syarat' || activeTab === 'deskripsi'" class="terms-tab-block">
            <div class="terms-section-card">
              <h3 class="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {{ currentLang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions' }}
              </h3>
              <div v-if="displayEvent.termCondition" class="event-desc-main terms-html-content" v-html="displayEvent.termCondition"></div>
              <ol v-else class="terms-list">
                <li v-for="(rule, idx) in displayEvent.rules" :key="idx">{{ rule }}</li>
              </ol>
            </div>
          </div>

          <!-- Ticket Tab Content -->
          <div v-show="activeTab === 'tiket'" class="ticket-selection-block">
            <div class="ticket-header-group">
              <h2 class="ticket-main-title">{{ currentLang === 'id' ? 'Pilih Jenis Tiket' : 'Select Ticket Type' }}</h2>
              <p class="ticket-sub-title">{{ currentLang === 'id' ? 'Pilih tiket yang sesuai dengan kebutuhanmu.' : 'Choose the ticket that fits your needs.' }}</p>
            </div>

            <div class="ticket-list-container">
              <div 
                v-for="ticket in ticketCategories" 
                :key="ticket.id" 
                class="ticket-card-item"
                :class="{ 
                  expanded: expandedTicketId === ticket.id,
                  selected: isTicketSelected(ticket.id),
                  'sold-out': ticket.status === 'sold-out'
                }"
              >
                <!-- Card Header Row (Top Section) -->
                <div class="ticket-item-header" @click="toggleExpandTicket(ticket.id)">
                  <!-- Header Left: Title & Badge -->
                  <div class="ticket-header-left">
                    <h3 class="ticket-item-title">{{ ticket.name }}</h3>
                    <div class="ticket-status-badge-inline" :class="ticket.status === 'on-sale' ? 'on-sale' : 'sold-out'">
                      <span class="status-dot"></span>
                      <template v-if="ticket.status === 'on-sale'">
                        {{ currentLang === 'id' ? 'PENJUALAN BERLANGSUNG' : 'ON SALE' }}
                      </template>
                      <template v-else-if="ticket.status === 'sold-out'">
                        {{ currentLang === 'id' ? 'TIKET HABIS' : 'SOLD OUT' }}
                      </template>
                      <template v-else-if="ticket.status === 'closed'">
                        {{ currentLang === 'id' ? 'PENJUALAN SELESAI' : 'SALES ENDED' }}
                      </template>
                    </div>
                  </div>

                  <!-- Vertical separator line -->
                  <div class="ticket-header-separator"></div>

                  <!-- Header Right: Price & Chevron -->
                  <div class="ticket-header-right">
                    <div class="ticket-price-container desktop-price-container">
                      <span class="ticket-price-label-top">{{ currentLang === 'id' ? 'Harga' : 'Price' }}</span>
                      <span class="ticket-price-value-top">{{ formatCurrency(ticket.price) }}</span>
                    </div>
                    <div class="ticket-price-container mobile-price-container">
                      <span class="ticket-price-label-top">{{ currentLang === 'id' ? 'Harga' : 'Price' }}</span>
                      <span class="ticket-price-value-top">{{ formatCurrency(ticket.price) }}</span>
                    </div>
                    <div class="ticket-chevron-btn">
                      <svg class="chevron-svg" :class="{ 'rotate': expandedTicketId === ticket.id }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Accordion Expanded Body -->
                <div v-show="expandedTicketId === ticket.id" class="ticket-expanded-body">
                  <!-- Tanggal Event Section -->
                  <div class="expanded-section">
                    <h4 class="expanded-section-title">{{ currentLang === 'id' ? 'Tanggal Event' : 'Event Date' }}</h4>
                    <div class="event-date-card-wrapper">
                      <div class="calendar-card-mini">
                        <span class="cal-month-mini">{{ ticket.month }}</span>
                        <span class="cal-day-mini">{{ ticket.day }}</span>
                        <span class="cal-day-name-mini">{{ ticket.dayName }}</span>
                      </div>
                      <div class="date-validity-info">
                        <span class="validity-label">{{ currentLang === 'id' ? 'Masa berlaku:' : 'Validity:' }}</span>
                        <span class="validity-value">{{ ticket.fullDate }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Informasi Tiket Section -->
                  <div class="expanded-section">
                    <h4 class="expanded-section-title">{{ currentLang === 'id' ? 'Informasi Tiket' : 'Ticket Information' }}</h4>
                    <div class="ticket-info-grid-mini">
                      <div class="info-item-mini">
                        <svg class="info-icon-mini" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <span class="info-text-mini">{{ currentLang === 'id' ? 'Tidak Bisa Refund' : 'Non-Refundable' }}</span>
                      </div>
                      <div class="info-item-mini">
                        <svg class="info-icon-mini" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span class="info-text-mini">{{ currentLang === 'id' ? 'Konfirmasi Instan' : 'Instant Confirmation' }}</span>
                      </div>
                      <div class="info-item-mini">
                        <svg class="info-icon-mini" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        <span class="info-text-mini">{{ currentLang === 'id' ? 'Termasuk Pajak 10%' : 'Includes 10% Tax' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Deskripsi Tiket Section -->
                  <div v-if="ticket.description" class="expanded-section">
                    <h4 class="expanded-section-title">{{ currentLang === 'id' ? 'Deskripsi Tiket' : 'Ticket Description' }}</h4>
                    <p class="ticket-description-text">{{ ticket.description }}</p>
                  </div>

                  <!-- Benefit Section -->
                  <div v-if="ticket.benefits && ticket.benefits.length > 0" class="expanded-section">
                    <h4 class="expanded-section-title">{{ currentLang === 'id' ? 'Benefit' : 'Benefits' }}</h4>
                    <div class="ticket-benefits-grid">
                      <div v-for="(benefit, bIdx) in ticket.benefits" :key="bIdx" class="benefit-item-mini">
                        <svg class="benefit-icon-mini" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span class="benefit-text-mini">{{ benefit }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Divider Line with left & right Cutouts -->
                <div class="ticket-middle-divider-row">
                  <div class="ticket-cutout left"></div>
                  <div class="ticket-cutout right"></div>
                  <div class="ticket-divider-line"></div>
                </div>

                <!-- Ticket Bottom Row (Desktop View) -->
                <div class="ticket-item-bottom desktop-only-bottom-row">
                  <!-- Left: Validity/Expiration -->
                  <div class="ticket-bottom-left-desktop">
                    <span class="bottom-info-label-desktop">{{ currentLang === 'id' ? 'Berakhir Pada' : 'Ends On' }}</span>
                    <span class="bottom-info-val-desktop">{{ ticket.expiration }}</span>
                  </div>

                  <!-- Right: Add Button or Qty adjuster + Total -->
                  <div class="ticket-bottom-right-desktop">
                    <!-- Add Button or Adjuster -->
                    <div class="ticket-action-wrapper-desktop">
                      <template v-if="ticket.status === 'sold-out' || ticket.status === 'closed'">
                        <button class="add-ticket-btn-card-desktop disabled" disabled>
                          {{ ticket.status === 'sold-out' ? (currentLang === 'id' ? 'Habis' : 'Sold Out') : (currentLang === 'id' ? 'Selesai' : 'Ended') }}
                        </button>
                      </template>
                      <template v-else-if="isTicketSelected(ticket.id)">
                        <div class="ticket-qty-adjuster-card-desktop">
                          <button class="qty-adjust-btn-card-desktop minus" @click.stop="adjustTicketQtyCard(ticket, -1)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          <span class="qty-val-card-desktop">{{ getSelectedTicketQty(ticket.id) }}</span>
                          <button class="qty-adjust-btn-card-desktop plus" @click.stop="adjustTicketQtyCard(ticket, 1)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      </template>
                      <template v-else>
                        <button class="add-ticket-btn-card-desktop" @click.stop="selectTicketCard(ticket)">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="btn-plus-icon">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          <span>{{ currentLang === 'id' ? 'Tambah' : 'Add' }}</span>
                        </button>
                      </template>
                    </div>

                    <!-- Total Price details -->
                    <div class="ticket-total-wrapper-card-desktop">
                      <span class="total-pax-label-card-desktop">
                        {{ currentLang === 'id' 
                           ? `Total (${getSelectedTicketQty(ticket.id)} pax)` 
                           : `Total (${getSelectedTicketQty(ticket.id)} pax)` }}
                      </span>
                      <span class="total-price-val-card-desktop">
                        {{ formatCurrency(ticket.price * getSelectedTicketQty(ticket.id)) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Ticket Bottom Row (Mobile View) -->
                <div class="ticket-item-bottom mobile-only-bottom-row">
                  <!-- Action row for button / adjuster -->
                  <div class="ticket-bottom-action-row">
                    <div class="ticket-action-wrapper">
                      <template v-if="ticket.status === 'sold-out' || ticket.status === 'closed'">
                        <button class="add-ticket-btn-card disabled" disabled>
                          {{ ticket.status === 'sold-out' ? (currentLang === 'id' ? 'Habis' : 'Sold Out') : (currentLang === 'id' ? 'Selesai' : 'Ended') }}
                        </button>
                      </template>
                      <template v-else-if="isTicketSelected(ticket.id)">
                        <div class="ticket-qty-adjuster-card">
                          <button class="qty-adjust-btn-card minus" @click.stop="adjustTicketQtyCard(ticket, -1)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          <span class="qty-val-card">{{ getSelectedTicketQty(ticket.id) }}</span>
                          <button class="qty-adjust-btn-card plus" @click.stop="adjustTicketQtyCard(ticket, 1)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      </template>
                      <template v-else>
                        <button class="add-ticket-btn-card" @click.stop="selectTicketCard(ticket)">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="btn-plus-icon">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          <span>{{ currentLang === 'id' ? 'Tambah' : 'Add' }}</span>
                        </button>
                      </template>
                    </div>
                  </div>

                  <!-- Meta row for expiration and total pax -->
                  <div class="ticket-bottom-meta-row">
                    <!-- Left: Validity/Expiration -->
                    <div class="ticket-bottom-left">
                      <span class="bottom-info-label">{{ currentLang === 'id' ? 'Berakhir Pada' : 'Ends On' }}</span>
                      <span class="bottom-info-val">{{ ticket.expiration }}</span>
                    </div>

                    <!-- Right: Total Price details -->
                    <div class="ticket-total-wrapper-card">
                      <span class="total-pax-label-card">
                        {{ currentLang === 'id' 
                           ? `Total (${getSelectedTicketQty(ticket.id)} pax)` 
                           : `Total (${getSelectedTicketQty(ticket.id)} pax)` }}
                      </span>
                      <span class="total-price-val-card">
                        {{ formatCurrency(ticket.price * getSelectedTicketQty(ticket.id)) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Banner at Bottom -->
            <div class="ticket-info-banner">
              <div class="info-banner-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="info-banner-text">
                {{ currentLang === 'id' 
                    ? 'E-ticket akan dikirim ke email setelah pembayaran berhasil. Pastikan data yang kamu masukkan sudah benar.'
                    : 'E-ticket will be sent to email after successful payment. Make sure the data you entered is correct.' }}
              </div>
            </div>
          </div>

          <!-- Organizer Card -->
          <div v-show="activeTab !== 'tiket'" class="organizer-card">
            <div class="org-avatar-box">
              <template v-if="displayEvent.creatorLogo === 'plus'">
                <div class="org-plus-logo">
                  <svg viewBox="0 0 32 32" width="48" height="48">
                    <rect width="32" height="32" rx="6" fill="#000000" />
                    <text x="16" y="21" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">WJ</text>
                  </svg>
                </div>
              </template>
              <img v-else :src="displayEvent.creatorLogo || '/logo_mocca.png'" :alt="displayEvent.creatorName" class="org-img" />
            </div>
            <div class="org-details">
              <span class="org-subtitle">{{ currentLang === 'id' ? 'Tentang Penyelenggara' : 'About Organizer' }}</span>
              <h4 class="org-name">{{ displayEvent.creatorName || 'Warriors Jakarta' }}</h4>
              <p class="org-bio">{{ displayEvent.orgBio || 'Komunitas scooterist dan mods Jakarta yang konsisten menggelar event budaya, musik, dan lifestyle sejak 2012.' }}</p>
              
              <div class="org-footer">
                <div class="org-socials">
                  <a href="#" class="social-icon-link" @click.prevent>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" class="social-icon-link" @click.prevent>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </a>
                </div>
                <button class="view-more-events-btn" @click="goBackToEvents">
                  {{ currentLang === 'id' ? 'Lihat Event Lainnya' : 'See Other Events' }}
                </button>
            </div>
          </div>
        </div>

          <!-- Event Untuk Kamu Recommendation Section -->
          <div v-show="activeTab !== 'tiket'" class="recommendation-section">
            <h3 class="recommendation-title">{{ currentLang === 'id' ? 'Event Untuk Kamu' : 'Events For You' }}</h3>
            <div class="recommendation-scroll-container">
              <div 
                v-for="recEvent in recommendedEvents" 
                :key="recEvent.id" 
                class="rec-event-card"
                @click="selectRecommendedEvent(recEvent)"
              >
                <div class="rec-card-img-box">
                  <img :src="recEvent.image" :alt="recEvent.title" class="rec-card-img" />
                </div>
                <div class="rec-card-info">
                  <h4 class="rec-card-title">{{ recEvent.title }}</h4>
                  <span class="rec-card-date">{{ currentLang === 'id' ? recEvent.dateId : recEvent.dateEn }}</span>
                  <span class="rec-card-location">{{ recEvent.location }}</span>
                  <span class="rec-card-price">{{ recEvent.priceLabel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Sticky Sidebar Panel -->
        <div class="event-sidebar-right-col">
          <div class="sticky-sidebar-container">
            <!-- Top Ticket Card -->
            <div v-if="activeTab !== 'tiket'" class="sidebar-card ticket-card">
              <span class="ticket-label">{{ currentLang === 'id' ? 'Harga mulai dari' : 'Price starting from' }}</span>
              <h2 class="ticket-price-value">{{ displayEvent.priceLabel }}</h2>
              
              <button class="buy-ticket-btn" @click="handleBeliTiket">
                {{ activeTab === 'deskripsi' ? (currentLang === 'id' ? 'Lihat Tiket' : 'View Tickets') : (currentLang === 'id' ? 'Beli Tiket' : 'Buy Ticket') }}
              </button>
              
              <button class="chat-event-btn" @click="handleChat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{{ currentLang === 'id' ? 'Chat' : 'Chat' }}</span>
              </button>

              <!-- Collapsible Accordion inside Ticket Card -->
              <div class="ticket-accordion">
                <button class="accordion-trigger" @click="isAccordionOpen = !isAccordionOpen">
                  <span>{{ currentLang === 'id' ? 'Detail Tiket & Benefit' : 'Ticket Details & Benefits' }}</span>
                  <svg class="chevron-icon" :class="{ 'rotate': isAccordionOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-content" :class="{ 'open': isAccordionOpen }">
                  <ul class="benefit-list">
                    <li><span class="bullet">•</span> {{ currentLang === 'id' ? 'Akses masuk venue event' : 'Event venue access entry' }}</li>
                    <li><span class="bullet">•</span> {{ currentLang === 'id' ? 'Stiker & Wristband Eksklusif' : 'Exclusive Sticker & Wristband' }}</li>
                    <li><span class="bullet">•</span> {{ currentLang === 'id' ? 'Sesi TTD & Foto bersama Artis' : 'Signing & Photo session with artist' }}</li>
                    <li><span class="bullet">•</span> {{ currentLang === 'id' ? 'Merchandise Berean.id edisi terbatas' : 'Limited edition Berean.id merchandise' }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Order Summary Card -->
            <div v-else class="sidebar-card summary-ticket-card">
              <div class="summary-card-header">
                <h2 class="summary-card-title">{{ currentLang === 'id' ? 'Ringkasan Pemesanan' : 'Order Summary' }}</h2>
                <button v-if="selectedTickets.length > 0" class="edit-summary-btn" @click="toggleEditSummary">
                  {{ isEditingSummary ? (currentLang === 'id' ? 'Selesai' : 'Done') : (currentLang === 'id' ? 'Edit' : 'Edit') }}
                </button>
              </div>
              
              <!-- Empty State -->
              <div v-if="selectedTickets.length === 0" class="summary-empty-state">
                <div class="summary-empty-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 9a3 3 0 0 0-3-3h-16a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9z"></path>
                    <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="3 3"></line>
                  </svg>
                </div>
                <h3 class="summary-empty-title">{{ currentLang === 'id' ? 'Belum ada tiket dipilih' : 'No tickets selected' }}</h3>
                <p class="summary-empty-text">{{ currentLang === 'id' ? 'Pilih jenis tiket untuk melihat ringkasan pemesanan.' : 'Choose a ticket type to see the order summary.' }}</p>
              </div>

              <!-- Selected State -->
              <div v-else class="summary-selected-state">
                <div v-for="item in selectedTickets" :key="item.id" class="selected-ticket-info-row">
                  <div class="selected-ticket-left-col">
                    <!-- Remove Button shown ONLY when editing -->
                    <button v-if="isEditingSummary" class="remove-ticket-btn" @click="removeTicketFromSummary(item.id)" :title="currentLang === 'id' ? 'Hapus Tiket' : 'Remove Ticket'">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                    <div class="ticket-name-row-wrapper">
                      <!-- Ticket Icon (Brown) -->
                      <svg class="ticket-icon-summary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 9a3 3 0 0 0-3-3h-16a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9z"></path>
                        <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="3 3"></line>
                      </svg>
                      <!-- Ticket Name Marquee scrolling -->
                      <div class="ticket-name-marquee-container">
                        <span class="scrolling-text">{{ item.name }}</span>
                      </div>
                      <!-- Ticket Quantity Tag -->
                      <span class="selected-ticket-qty-tag">x{{ item.quantity }}</span>
                    </div>
                  </div>
                  <div class="selected-ticket-right-col">
                    <span class="selected-ticket-price-unit">{{ formatCurrency(item.price) }}</span>
                  </div>
                </div>
              </div>

              <div class="summary-price-divider"></div>

              <!-- Pricing Breakdown -->
              <div class="summary-price-breakdown">
                <div class="price-breakdown-row">
                  <span class="breakdown-lbl">Subtotal</span>
                  <span class="breakdown-val">{{ formatCurrency(computedSubtotal) }}</span>
                </div>
              </div>

              <div class="summary-price-divider"></div>

              <!-- Total Row -->
              <div class="summary-total-payment-row">
                <span class="total-payment-label">{{ currentLang === 'id' ? 'Total Pembayaran' : 'Total Payment' }}</span>
                <span class="total-payment-val text-coffee">{{ formatCurrency(computedTotalPayment) }}</span>
              </div>
            </div>

            <!-- Share Buttons -->
            <div v-show="activeTab !== 'tiket'" class="share-event-section">
              <span class="share-label">{{ currentLang === 'id' ? 'Bagikan Event' : 'Share Event' }}</span>
              <div class="share-icons-row">
                <button class="share-icon-btn facebook" @click="triggerShare('Facebook')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </button>
                <button class="share-icon-btn whatsapp" @click="triggerShare('WhatsApp')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </button>
                <button class="share-icon-btn twitter" @click="triggerShare('Twitter')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </button>
                <button class="share-icon-btn link" @click="triggerShare('Link')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action Bar (Sticky at viewport bottom) -->
    <div class="bottom-action-bar">
      <!-- Desktop Only Bottom Bar (remains identical to original design) -->
      <div class="bottom-bar-container desktop-only-bottom-bar">
        <div class="bottom-price-info">
          <span class="bottom-label">{{ activeTab === 'tiket' ? (currentLang === 'id' ? `TOTAL (${totalSelectedTicketsCount} TIKET)` : `TOTAL (${totalSelectedTicketsCount} TICKETS)`) : (currentLang === 'id' ? 'Harga mulai dari' : 'Price starting from') }}</span>
          <span class="bottom-price">{{ activeTab === 'tiket' ? formatCurrency(computedTotalPayment) : displayEvent.priceLabel }}</span>
        </div>
        <div class="desktop-action-buttons-group">
          <button class="bottom-action-btn" @click="handleBeliTiket">
            {{ activeTab === 'deskripsi' ? (currentLang === 'id' ? 'Lihat Tiket' : 'View Tickets') : (currentLang === 'id' ? 'Beli Tiket' : 'Buy Ticket') }}
          </button>
          <button class="desktop-chat-icon-btn" @click="handleChat" :title="currentLang === 'id' ? 'Chat' : 'Chat'">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Only Bottom Bar -->
      <div class="bottom-bar-container mobile-only-bottom-bar" :class="{ 'has-details-row': activeTab === 'tiket' }">
        <!-- Top Row: Price and Detail toggle (Only when activeTab === 'tiket') -->
        <div v-if="activeTab === 'tiket'" class="mobile-bottom-top-row">
          <div class="bottom-price-info">
            <span class="bottom-label">{{ currentLang === 'id' ? 'TOTAL HARGA' : 'TOTAL PRICE' }}</span>
            <span class="bottom-price">{{ formatCurrency(computedTotalPayment) }}</span>
          </div>
          <button class="mobile-detail-toggle-btn" @click="showMobileSummary = !showMobileSummary">
            ({{ totalSelectedTicketsCount }}) {{ currentLang === 'id' ? 'Detail' : 'Details' }}
            <span class="detail-arrow">{{ showMobileSummary ? '▼' : '▲' }}</span>
          </button>
        </div>

        <!-- Bottom Row: Action button and Chat icon -->
        <div class="mobile-bottom-main-row">
          <!-- Price display on description tab inline -->
          <div v-if="activeTab !== 'tiket'" class="bottom-price-info mobile-price-info-inline">
            <span class="bottom-label">{{ currentLang === 'id' ? 'Harga mulai dari' : 'Price starting from' }}</span>
            <span class="bottom-price">{{ displayEvent.priceLabel }}</span>
          </div>

          <div class="mobile-action-buttons-group" :class="{ 'full-width': activeTab === 'tiket' }">
            <button class="bottom-action-btn mobile-action-btn" @click="handleBeliTiket">
              {{ activeTab === 'deskripsi' ? (currentLang === 'id' ? 'Lihat Tiket' : 'View Tickets') : (currentLang === 'id' ? 'Beli Tiket Sekarang' : 'Buy Ticket Now') }}
            </button>
            <button class="mobile-chat-icon-btn" @click="handleChat" :title="currentLang === 'id' ? 'Chat' : 'Chat'">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Order Summary Bottom Sheet -->
    <transition name="slide-up">
      <div v-if="showMobileSummary && activeTab === 'tiket'" class="mobile-summary-bottom-sheet">
        <div class="sheet-header">
          <div class="sheet-drag-handle"></div>
          <div class="sheet-header-title-row">
            <h3 class="sheet-title">{{ currentLang === 'id' ? 'Ringkasan Pemesanan' : 'Order Summary' }}</h3>
            <button class="sheet-close-btn" @click="showMobileSummary = false">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="sheet-body">
          <!-- Empty State -->
          <div v-if="selectedTickets.length === 0" class="summary-empty-state">
            <div class="summary-empty-icon-box">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M21 9a3 3 0 0 0-3-3h-16a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9z"></path>
                 <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="3 3"></line>
               </svg>
            </div>
            <h3 class="summary-empty-title">{{ currentLang === 'id' ? 'Belum ada tiket dipilih' : 'No tickets selected' }}</h3>
            <p class="summary-empty-text">{{ currentLang === 'id' ? 'Pilih jenis tiket untuk melihat ringkasan pemesanan.' : 'Choose a ticket type to see the order summary.' }}</p>
          </div>
          
          <!-- Selected State -->
          <div v-else class="summary-selected-state">
            <div v-for="item in selectedTickets" :key="item.id" class="selected-ticket-info-row">
              <div class="selected-ticket-left-col">
                <div class="ticket-name-row-wrapper">
                  <svg class="ticket-icon-summary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 9a3 3 0 0 0-3-3h-16a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V9z"></path>
                    <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="3 3"></line>
                  </svg>
                  <div class="ticket-name-marquee-container">
                    <span class="scrolling-text">{{ item.name }}</span>
                  </div>
                  <span class="selected-ticket-qty-tag">x{{ item.quantity }}</span>
                </div>
              </div>
              <div class="selected-ticket-right-col">
                <span class="selected-ticket-price-unit">{{ formatCurrency(item.price) }}</span>
              </div>
            </div>
            
            <div class="summary-price-divider"></div>
            
            <div class="summary-price-breakdown">
              <div class="price-breakdown-row">
                <span class="breakdown-lbl">Subtotal</span>
                <span class="breakdown-val">{{ formatCurrency(computedSubtotal) }}</span>
              </div>
            </div>
            
            <div class="summary-price-divider"></div>
            
            <div class="summary-total-payment-row">
              <span class="total-payment-label">{{ currentLang === 'id' ? 'Total Pembayaran' : 'Total Payment' }}</span>
              <span class="total-payment-val text-coffee">{{ formatCurrency(computedTotalPayment) }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Mobile Summary Overlay Backdrop -->
    <transition name="fade">
      <div v-if="showMobileSummary && activeTab === 'tiket'" class="mobile-summary-overlay" @click="showMobileSummary = false"></div>
    </transition>

    <!-- Toast Notification -->
    <ToastAlert
      :show="toastActive"
      :title="toastTitle"
      :description="toastDescription"
      @close="toastActive = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { currentPage, currentLang, selectedEvent, selectedTicket, ticketQuantity, selectedTickets } from '../store/cart.js';
import ToastAlert from './ToastAlert.vue';

const activeTab = ref('deskripsi');
const isSaved = ref(false);
const toastActive = ref(false);
const toastTitle = ref('');
const toastDescription = ref('');
let toastTimeout = null;
const isAccordionOpen = ref(false);
const showMobileSummary = ref(false);

const expandedTicketId = ref('early-wave-normal');

const ticketCategories = ref([]);

const fetchTickets = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const eventId = displayEvent.value.id || selectedEvent.value?.id;
    if (!eventId) return;
    
    const response = await fetch(`${apiUrl}/api/event-ticket/${eventId}`);
    const json = await response.json();
    const data = Array.isArray(json) ? json : (json.data || []);
    
    if (data && data.length > 0) {
      if (data[0].has_event && selectedEvent.value) {
        const ev = data[0].has_event;
        selectedEvent.value.is_name = ev.is_name ?? 1;
        selectedEvent.value.is_assistant = ev.is_assistant ?? 1;
        selectedEvent.value.is_phone_number = ev.is_phone_number ?? 1;
        selectedEvent.value.is_birthdate = ev.is_birthdate ?? 1;
        selectedEvent.value.is_email = ev.is_email ?? 1;
        selectedEvent.value.is_noidentity = ev.is_noidentity ?? 0;
        selectedEvent.value.is_gender = ev.is_gender ?? 1;
        selectedEvent.value.is_profession = ev.is_profession ?? 0;
        selectedEvent.value.is_company = ev.is_company ?? 0;
        selectedEvent.value.is_kelas = ev.is_kelas ?? 1;
      }

      ticketCategories.value = data.map(t => {
        // Parse event date
        const eventTimestamp = displayEvent.value.timestamp || Date.now();
        const tDateStr = t.event_schedule_date || t.ticket_date || t.ticket_start;
        const tDate = tDateStr ? new Date(tDateStr) : new Date(eventTimestamp);
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        let monthName = months[tDate.getMonth()] || '';
        let dayNum = tDate.getDate() || '';
        let dayName = days[tDate.getDay()] || '';
        
        // Prioritize ticket starting_time, then displayEvent time
        let startTime = '00:00';
        if (t.starting_time) {
          startTime = t.starting_time.slice(0, 5);
        } else if (displayEvent.value.time) {
          startTime = displayEvent.value.time.split('-')[0].trim();
        }
        let fullDate = `${dayNum} ${monthName} ${tDate.getFullYear()}, ${startTime} WIB`;
        
        // Parse ticket end/expiration date
        const eDateStr = t.ticket_end;
        const eDate = eDateStr ? new Date(eDateStr) : new Date(eventTimestamp);
        
        let eMonth = months[eDate.getMonth()] || '';
        let eDayNum = eDate.getDate() || '';
        
        let endTime = '23:59';
        if (t.ending_time) {
          endTime = t.ending_time.slice(0, 5);
        } else if (displayEvent.value.time && displayEvent.value.time.includes('-')) {
          endTime = displayEvent.value.time.split('-')[1].trim().replace(' WIB', '');
        }
        let expiration = `${eDayNum} ${eMonth} ${eDate.getFullYear()}, ${endTime} WIB`;

        let tStatus = 'on-sale';
        if (t.is_soldout) {
          tStatus = 'sold-out';
        } else if (t.ticket_end) {
          // Parse ending_time if available, e.g. "18:00:00"
          let endDateTimeStr = t.ticket_end;
          if (t.ending_time && !t.ticket_end.includes('T') && !t.ticket_end.includes(' ')) {
            endDateTimeStr = `${t.ticket_end}T${t.ending_time}`;
          }
          const endDateTime = new Date(endDateTimeStr);
          if (endDateTime < new Date()) {
            tStatus = 'closed';
          }
        }

        return {
          id: t.id,
          name: t.name,
          price: t.price,
          isBundle: t.is_bundling === 1,
          status: tStatus,
          description: t.description || '',
          ticket_fee: t.ticket_fee !== undefined ? t.ticket_fee : 0,
          benefits: [],
          month: monthName,
          day: dayNum,
          dayName: dayName,
          fullDate: fullDate,
          expiration: expiration
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
  }
};

const toggleExpandTicket = (id) => {
  expandedTicketId.value = expandedTicketId.value === id ? null : id;
};

const isTicketSelected = (ticketId) => {
  return selectedTickets.value.some(t => t.id === ticketId);
};

const getSelectedTicketQty = (ticketId) => {
  const t = selectedTickets.value.find(x => x.id === ticketId);
  return t ? t.quantity : 0;
};

const selectTicket = (ticket) => {
  if (ticket.status === 'sold-out' || ticket.status === 'closed') return;
  const idx = selectedTickets.value.findIndex(t => t.id === ticket.id);
  if (idx !== -1) {
    selectedTickets.value.splice(idx, 1);
  } else {
    selectedTickets.value.push({
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
      quantity: 1,
      ticket_fee: ticket.ticket_fee
    });
  }
};

const handleTicketHeaderClick = (ticket) => {
  toggleExpandTicket(ticket.id);
};

const adjustTicketQty = (delta) => {
  if (selectedTickets.value.length === 0) return;
  const firstTicket = selectedTickets.value[0];
  const nextQty = firstTicket.quantity + delta;
  if (nextQty >= 1 && nextQty <= 5) {
    firstTicket.quantity = nextQty;
  } else if (nextQty > 5) {
    triggerToast(currentLang.value === 'id' ? 'Maksimal pembelian adalah 5 tiket.' : 'Maximum purchase is 5 tickets.');
  }
};

const computedSubtotal = computed(() => {
  return selectedTickets.value.reduce((sum, t) => sum + t.price * t.quantity, 0);
});

const computedTotalPayment = computed(() => {
  return computedSubtotal.value;
});

const totalSelectedTicketsCount = computed(() => {
  return selectedTickets.value.reduce((sum, t) => sum + t.quantity, 0);
});

const formatCurrency = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

const selectTicketCard = (ticket) => {
  if (ticket.status === 'sold-out' || ticket.status === 'closed') return;
  const idx = selectedTickets.value.findIndex(t => t.id === ticket.id);
  if (idx === -1) {
    selectedTickets.value.push({
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
      quantity: 1,
      ticket_fee: ticket.ticket_fee
    });
  }
};

const adjustTicketQtyCard = (ticket, delta) => {
  const existing = selectedTickets.value.find(t => t.id === ticket.id);
  if (!existing) return;
  const nextQty = existing.quantity + delta;
  if (nextQty === 0) {
    selectedTickets.value = selectedTickets.value.filter(t => t.id !== ticket.id);
  } else if (nextQty >= 1 && nextQty <= 5) {
    existing.quantity = nextQty;
  } else if (nextQty > 5) {
    triggerToast(currentLang.value === 'id' ? 'Maksimal pembelian adalah 5 tiket.' : 'Maximum purchase is 5 tickets.');
  }
};

const isEditingSummary = ref(false);

const toggleEditSummary = () => {
  isEditingSummary.value = !isEditingSummary.value;
};

const removeTicketFromSummary = (itemId) => {
  selectedTickets.value = selectedTickets.value.filter(t => t.id !== itemId);
  if (selectedTickets.value.length === 0) {
    isEditingSummary.value = false;
  }
};

watch(selectedTickets, (newVal) => {
  if (newVal && newVal.length > 0) {
    selectedTicket.value = {
      id: newVal[0].id,
      name: newVal[0].name,
      price: newVal[0].price,
      ticket_fee: newVal[0].ticket_fee
    };
    ticketQuantity.value = newVal[0].quantity;
  } else {
    selectedTicket.value = null;
    ticketQuantity.value = 1;
  }
  if (!newVal || newVal.length === 0) {
    isEditingSummary.value = false;
  }
}, { deep: true, immediate: true });

const eventCalendarInfo = computed(() => {
  const timestamp = displayEvent.value.timestamp || 1779951600000;
  const date = new Date(timestamp);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[date.getMonth()];
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[date.getDay()];
  
  const dayNum = date.getDate();
  const fullDate = `${dayNum} ${monthName} ${date.getFullYear()}`;
  
  const timeStr = displayEvent.value.time || '12:00 - 23:00 WIB';
  const endTime = timeStr.includes('-') ? timeStr.split('-')[1].trim() : '23:00 WIB';
  const expirationStr = `${dayNum} ${monthName} ${date.getFullYear()}, ${endTime}`;
  
  return {
    month: monthName,
    day: dayNum,
    dayName: dayName,
    fullDate: fullDate,
    expiration: expirationStr
  };
});

// Define detailed static contents for Jakarta Mods Mayday 2026 (ID: 13)
const modsMaydayData = {
  categoriesLabel: 'Festival & Pameran • Musik • Pop Indonesia',
  aboutId: 'May Day bukan sekadar perayaan buruh. Bagi para mods dan scooterist, ini adalah perayaan atas kebebasan, solidaritas, dan semangat kebersamaan yang tak pernah padam. JMMD 2026 hadir dengan semangat "Keep on Holding On" — sebuah pengingat bahwa kita terus melaju, bersama. Sampai jumpa di JMMD 2026!',
  minAge: 'Semua umur',
  duration: '11 Jam',
  language: 'Indonesia',
  accessibility: 'Tersedia akses kursi roda & area khusus difabel',
  orgBio: 'Komunitas scooterist dan mods Jakarta yang konsisten menggelar event budaya, musik, dan lifestyle sejak 2012.',
  highlights: [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
      title: 'Live Music',
      desc: '10+ Band Lokal & Internasional'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle><path d="M3 17V7c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v10H3z"></path><polyline points="15 9 20 9 23 12 23 17 15 17"></polyline></svg>`,
      title: 'Scooter Riding',
      desc: 'Rolling Thunder & City Ride'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M20.4 20.4L15 11 9 21h12c.2 0 .4-.2.4-.6z"></path></svg>`,
      title: 'Art Exhibition',
      desc: 'Pameran Seni & Karya Visual'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
      title: 'Food & Market',
      desc: 'Kuliner & Marketplace Pilihan'
    }
  ],
  program: [
    {
      image: '/event_concert.png',
      title: 'Live Performance',
      sub: '10+ Band & DJ'
    },
    {
      image: '/event_mods_mayday.png',
      title: 'Rolling Thunder',
      sub: 'Scooter City Ride'
    },
    {
      image: '/event_popup.png',
      title: 'Art Exhibition',
      sub: 'Karya Visual & Instalasi'
    },
    {
      image: '/event_workshop.png',
      title: 'Market & F&B',
      sub: 'Food, Fashion & Lifestyle'
    }
  ],
  rules: [
    'Harga tiket sudah termasuk Pajak Pemerintah dan biaya platform. Ticket prices include government tax and platform fee.',
    '1 (satu) akun hanya bisa melakukan 1 (satu) kali transaksi dengan pembelian maksimum 5 (lima) tiket untuk semua kategori. 1 (one) account can only make 1 (one) transaction with a maximum purchase of 5 (five) tickets for all ticket category.',
    'Tiket yang sudah dibeli tidak dapat ditukar, diubah, atau dibatalkan. Purchased tickets cannot be exchanged, refunded, or canceled.',
    'Jika kamu datang berboncengan/berpasangan dan ingin mendapatkan benefit berupa Lcakehead Banner + VIP parking benefits, kamu cukup membeli 1 tiket VIP, maka cukup membeli 1 tiket VIP. Jika datang sendirian, kamu tetap akan mendapatkan benefit yang sama.',
    'E-ticket akan dikirim ke email setelah pembayaran berhasil. Pastikan data yang kamu masukkan sudah benar.',
    'Penyelenggara memiliki hak untuk mengubah atau menambah syarat & ketentuan tanpa pemberitahuan terlebih dahulu.'
  ]
};

// Compute event details dynamically based on selectedEvent from store with mock fallbacks
const displayEvent = computed(() => {
  const base = selectedEvent.value || {
    id: 13,
    title: 'Jakarta Mods Mayday 2026',
    image: '/banner/bannerevent.webp',
    dateId: 'Minggu, 31 Mei 2026',
    dateEn: 'Sunday, May 31, 2026',
    time: '12:00 - 23:00 WIB',
    location: 'Senayan Park (Island & Dome), Jakarta Pusat',
    priceLabel: 'Rp150.000',
    descriptionId: 'Jakarta Mods Mayday adalah perayaan tahunan subkultur mods yang diselenggarakan oleh Warriors Jakarta sejak 2011. Acara ini menggabungkan kecintaan pada scooter retro dengan musik indie pop, modern soul, ska, dan pameran karya seni.',
    descriptionEn: 'Jakarta Mods Mayday is an annual subculture celebration organized by the Warriors Jakarta community since 2011, combining vintage scooters with live music, art exhibitions, and food market.',
    creatorName: 'Warriors Jakarta',
    creatorLogo: 'plus',
    timestamp: 1779951600000
  };

  // If it's Jakarta Mods Mayday 2026, load the complete spec content
  if (base.id === 13) {
    return { ...base, ...modsMaydayData };
  }

  // Otherwise generate reasonable details for any other event
  return {
    ...base,
    categoriesLabel: base.categoryNameId ? `${base.categoryNameId} • Musik` : 'Event Berean.id • Musik',
    aboutId: base.descriptionId,
    minAge: '12 Tahun',
    duration: base.time ? base.time.split(' ')[0] : '2 Jam',
    language: 'Indonesia & English',
    accessibility: 'Tersedia kursi roda',
    orgBio: `Official event diselenggarakan oleh ${base.creatorName || 'Berean.id'}. Ikuti akun resmi mereka untuk mendapatkan informasi tiket dan promosi terbaru.`,
    highlights: [
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
        title: 'Timeline',
        desc: base.dateId || base.time || '15:00 - selesai'
      },
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        title: 'Lokasi',
        desc: base.location || 'Jakarta'
      },
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.75 0L12 5.67l-1.09-1.06a5.5 5.5 0 0 0-7.75 7.75l1.09 1.06L12 21.23l7.75-7.75 1.09-1.06a5.5 5.5 0 0 0 0-7.75z"></path></svg>`,
        title: 'Kreator',
        desc: base.creatorName || 'Berean.id'
      },
      {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
        title: 'Produk',
        desc: 'Merchandise Kolaborasi'
      }
    ],
    program: [
      {
        image: base.image || '/banner/bannerevent.webp',
        title: base.title,
        sub: 'Main Show Session'
      },
      {
        image: '/event_meet_greet.png',
        title: 'Exclusive Talk',
        sub: 'Q&A & Sharing'
      },
      {
        image: '/event_popup.png',
        title: 'Merch Booth',
        sub: 'Limited Collection Store'
      },
      {
        image: '/event_workshop.png',
        title: 'Signing Session',
        sub: 'Album & Merch Signing'
      }
    ],
    rules: [
      'Pembelian tiket hanya berlaku untuk satu orang dan tidak bisa diwakilkan.',
      'Harap menunjukkan e-ticket dan kartu identitas resmi di loket masuk.',
      'Dilarang membawa senjata tajam, obat terlarang, dan makanan/minuman dari luar.',
      'E-ticket yang sudah divalidasi akan diganti dengan gelang resmi (wristband).',
      'Penyelenggara tidak bertanggung jawab atas kehilangan tiket atau barang berharga.'
    ]
  };
});

const goBackToEvents = () => {
  currentPage.value = 'event';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleBeliTiket = () => {
  if (activeTab.value === 'deskripsi' || activeTab.value === 'syarat') {
    activeTab.value = 'tiket';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (activeTab.value === 'tiket') {
    if (!selectedTicket.value) {
      triggerToast(currentLang.value === 'id' ? 'Silakan pilih tiket terlebih dahulu!' : 'Please select a ticket first!');
      return;
    }
    currentPage.value = 'event-checkout';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleChat = () => {
  const msg = currentLang.value === 'id'
    ? 'Fitur chat dengan penyelenggara akan segera hadir!'
    : 'Chat with organizer feature is coming soon!';
  triggerToast(msg);
};

const recommendedEvents = ref([]);

const fetchRecommendedEvents = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const creatorId = apiUrl.includes('my.id') ? 11 : 127;
    const response = await fetch(`${apiUrl}/api/event-by-creator/${creatorId}`);
    const json = await response.json();
    const data = Array.isArray(json) ? json : json.data;

    if (data && data.length > 0) {
      // Filter out the currently displayed event to avoid self-recommendation
      const filteredData = data.filter(ev => ev.id !== (displayEvent.value.id || selectedEvent.value?.id));
      
      recommendedEvents.value = filteredData.map(ev => {
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
    console.error('Failed to fetch recommended events:', error);
  }
};

const selectRecommendedEvent = (recEvt) => {
  selectedEvent.value = recEvt;
  activeTab.value = 'deskripsi';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const toggleSave = () => {
  isSaved.value = !isSaved.value;
  const msg = isSaved.value 
    ? (currentLang.value === 'id' ? 'Event berhasil disimpan ke favorit!' : 'Event saved to favorites!')
    : (currentLang.value === 'id' ? 'Event dihapus dari favorit.' : 'Event removed from favorites.');
  triggerToast(msg);
};

const triggerShare = (platform) => {
  const msg = currentLang.value === 'id'
    ? `Link event berhasil dibagikan via ${platform}!`
    : `Event link shared successfully via ${platform}!`;
  triggerToast(msg);
};

const triggerToast = (msg, desc = '') => {
  if (msg.includes('favorit') || msg.includes('favorite')) {
    toastTitle.value = currentLang.value === 'id' ? 'Favorit' : 'Favorites';
    toastDescription.value = msg;
  } else if (msg.includes('bagikan') || msg.includes('shared')) {
    toastTitle.value = currentLang.value === 'id' ? 'Bagikan' : 'Share';
    toastDescription.value = msg;
  } else if (msg === 'Jumlah seat tidak sesuai qty' || msg === 'Seat quantity mismatch') {
    toastTitle.value = currentLang.value === 'id' ? 'Jumlah seat tidak sesuai qty' : 'Seat quantity mismatch';
    toastDescription.value = currentLang.value === 'id' ? 'Silakan periksa kembali jumlah seat yang dipilih.' : 'Please check the number of seats selected.';
  } else if (desc) {
    toastTitle.value = msg;
    toastDescription.value = desc;
  } else {
    toastTitle.value = currentLang.value === 'id' ? 'Pemberitahuan' : 'Notification';
    toastDescription.value = msg;
  }
  toastActive.value = true;
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastActive.value = false;
  }, 4000);
};

// Real-time Event Countdown Timer
const countdownTime = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
});
const isEventStarted = ref(false);
let countdownInterval = null;

const startCountdown = () => {
  if (countdownInterval) clearInterval(countdownInterval);
  
  let targetTime = displayEvent.value.timestamp;
  if (!targetTime) {
    const timestampMap = {
      13: 1779951600000, // Jakarta Mods Mayday 2026
      1: 1781204400000,  // Konser Berani Tambah Bahagia
      2: 1782313200000,  // Berean.id Meet & Greet Session / Acoustic Showcase
      3: 1783429200000,  // Berean.id Songwriting Workshop
      4: 1784464800000,  // Berean.id Pop-Up Store
      5: 1785500000000,  // Berean.id Acoustic Cafe Session
      12: 1790277600000  // Berean.id Show
    };
    targetTime = timestampMap[displayEvent.value.id] || 1779951600000;
  }
  
  const update = () => {
    const now = new Date().getTime();
    const diff = targetTime - now;
    
    if (diff <= 0) {
      isEventStarted.value = true;
      countdownTime.value = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      if (countdownInterval) clearInterval(countdownInterval);
      return;
    }
    
    isEventStarted.value = false;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdownTime.value = {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  };
  
  update();
  countdownInterval = setInterval(update, 1000);
};

onMounted(() => {
  fetchTickets();
  fetchRecommendedEvents();
  startCountdown();
});

onBeforeUnmount(() => {
  if (countdownInterval) clearInterval(countdownInterval);
});

watch(displayEvent, () => {
  startCountdown();
});
</script>

<style scoped>
.event-detail-page {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 2.5rem 0 6.5rem;
  overflow-x: clip;
}

.event-detail-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6rem;
}

/* Breadcrumb Navigation */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.25s ease;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

/* Hero Event Banner */
.hero-event-banner {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 40px rgba(47, 78, 62, 0.1);
  margin-bottom: 3rem;
  height: 370px;
}

.hero-event-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--banner-bg-img);
  background-size: cover;
  background-position: center;
  filter: blur(25px) brightness(0.35);
  transform: scale(1.1);
  z-index: -1;
}

@media (min-width: 1025px) {
  .hero-event-banner {
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0;
    margin-top: -1.5rem;
  }

  .hero-banner-header {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 0.75rem 8rem 0.75rem 8.5rem;
  }

  .hero-banner-header .event-banner-title {
    margin-left: 6rem;
  }

  .hero-banner-body-grid {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 0 6rem;
  }

  .hero-banner-left {
    padding-left: 1rem;
    justify-content: flex-start;
  }

  .hero-banner-img {
    width: auto;
    object-position: left center;
    position: relative;
    right: 15px;
    border-radius: 8px;
  }
}

.hero-banner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  box-sizing: border-box;
  z-index: 1;
}

.hero-banner-body-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 0.75rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: hidden;
  height: calc(100% - 60px);
}

.hero-banner-left {
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.25rem 0 0.75rem 2rem;
  box-sizing: border-box;
  top:10px;
}

.hero-banner-img {
  width: 100%;
  height: 266px;
  object-fit: contain;
  object-position: center;
  display: block;
  border-radius: 8px;
  box-shadow: none;
  margin-top: -1rem;
}

.hero-banner-right {
  padding: 0.25rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  top: 10px;
}

/* Banner Countdown Widget Styles */
.banner-countdown-wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-width: fit-content;
  position: relative;
  top: 10px;
  right:65px;
}

.countdown-label {
  font-family: var(--font-body);
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-align: right;
}

.countdown-timer {
  display: flex;
  align-items: flex-start;
  gap: 0.3rem;
}

.countdown-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 32px;
}

.countdown-num {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  min-width: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}

.countdown-unit {
  font-family: var(--font-body);
  font-size: 0.45rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 0.35rem;
  text-transform: uppercase;
  font-weight: 600;
}

.countdown-divider {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1;
  margin-top: 0.45rem;
}

.event-banner-title {
  font-family: var(--font-heading);
  font-size: 1.90rem;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0;
  letter-spacing: -0.01em;
  color: #ffffff !important;
}

.banner-meta-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.banner-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #ffffff !important;
}

.share-meta-item {
  display: none !important;
}

.meta-icon {
  margin-top: 0.15rem;
  flex-shrink: 0;
  opacity: 0.95;
  color: #ffffff !important;
  width: 24px;
  height: 24px;
}

.meta-text {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.meta-main-info {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff !important;
}

.meta-sub-info {
  font-family: var(--font-body);
  font-size: 0.8rem;
  opacity: 0.85;
  color: #ffffff !important;
}

/* Main Layout Grid */
.event-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 3rem;
  align-items: stretch;
}

/* Left Column Styling */
.event-info-left-col {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-left: 2rem;
}

/* Tabs Bar */
.tabs-bar {
  position: sticky;
  top: 95px; /* aligns right under the site header */
  background-color: #ffffff; /* covers text scrolling underneath */
  z-index: 100;
  padding-top: 0.5rem;
  margin-top: -0.5rem;
  display: flex;
  border-bottom: 1px solid var(--color-mocca-border);
  gap: 2rem;
  padding-bottom: 0.1rem;
}

.tab-btn {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem 0 1rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.25s ease;
}

.tab-btn:hover,
.tab-btn.active {
  color: var(--color-mocca-dark);
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--color-mocca-dark);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-btn.active::after {
  transform: scaleX(1);
}

.tab-icon {
  opacity: 0.85;
}

.tab-content-block {
  padding-top: 1.5rem;
}

.desc-section-card,
.terms-section-card {
  background: #ffffff;
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.111);
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.desc-sub-section {
  border-top: 1px solid rgba(47, 78, 62, 0.08);
  padding-top: 2rem;
  margin-top: 2rem;
}

.event-desc-main {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-mocca-dark);
  margin-bottom: 0;
  text-align: justify;
}

/* Content Sections */
.content-section {
  border-bottom: 1px solid rgba(47, 78, 62, 0.08);
  padding-bottom: 2.5rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-icon {
  color: var(--color-mocca-dark);
}

.event-about-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-mocca-dark);
  text-align: justify;
}

/* Highlights Grid */
.highlight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: var(--color-bg-light);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(47, 78, 62, 0.05);
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.02);
}

.hl-icon-box {
  background-color: rgba(122, 28, 28, 0.08);
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hl-text-box {
  display: flex;
  flex-direction: column;
}

.hl-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.2rem;
}

.hl-desc {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
}

/* Lineup Program Grid */
.program-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.program-card {
  background-color: var(--color-bg-light);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(47, 78, 62, 0.05);
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.02);
  display: flex;
  flex-direction: column;
}

.program-img-box {
  width: 100%;
  padding-top: 100%; /* 1:1 Square aspect ratio */
  position: relative;
}

.program-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.program-meta {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.program-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.program-sub {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.terms-tab-block {
  margin-top: 0;
}

/* Terms List */
.terms-list {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.terms-list li {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--color-mocca-dark);
}

/* Organizer Card */
.organizer-card {
  background-color: var(--color-bg-light);
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 8px 30px rgba(47, 78, 62, 0.03);
}

.org-avatar-box {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-bg-cream);
  border: 1px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.org-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.org-plus-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.org-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.org-subtitle {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-mocca-muted);
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.org-name {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
}

.org-bio {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-mocca-dark);
  margin-bottom: 0.75rem;
}

.org-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.org-socials {
  display: flex;
  gap: 1rem;
}

.social-icon-link {
  color: var(--color-mocca-muted);
  transition: color 0.2s;
}

.social-icon-link:hover {
  color: var(--color-mocca-dark);
}

.view-more-events-btn {
  background-color: #EFECE6;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.view-more-events-btn:hover {
  background-color: var(--color-mocca-border);
}

/* Right Column (Sidebar Panel) */
.event-sidebar-right-col {
  position: relative;
}

.sticky-sidebar-container {
  position: sticky;
  top: 120px; /* sticky offset header */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background-color: var(--color-bg-light);
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(47, 78, 62, 0.11);
}

/* Ticket Card styling */
.ticket-card {
  display: flex;
  flex-direction: column;
}

.ticket-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  margin-bottom: 0.25rem;
}

.ticket-price-value {
  font-family: var(--font-body);
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 1.5rem;
}

.buy-ticket-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
  margin-bottom: 1rem;
  transition: all 0.25s ease;
}

.buy-ticket-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.2);
}

.chat-event-btn {
  background: none;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.85rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
}

.chat-event-btn:hover {
  background-color: rgba(47, 78, 62, 0.03);
}

/* Share Section */
.share-event-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.share-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.share-icons-row {
  display: flex;
  gap: 0.85rem;
}

.share-icon-btn {
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.share-icon-btn:hover {
  transform: translateY(-2px);
  color: #ffffff;
}

.share-icon-btn.facebook:hover {
  background-color: #1877F2;
  border-color: #1877F2;
}

.share-icon-btn.whatsapp:hover {
  background-color: #25D366;
  border-color: #25D366;
}

.share-icon-btn.twitter:hover {
  background-color: #1DA1F2;
  border-color: #1DA1F2;
}

.share-icon-btn.link:hover {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

/* Ticket Creator inside Ticket Card */
.ticket-creator-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(47, 78, 62, 0.04);
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  margin-bottom: 1.25rem;
}

.ticket-creator-avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-mocca-dark);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  border: 1px solid rgba(47, 78, 62, 0.1);
}

.ticket-creator-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creator-plus-logo-small {
  background-color: #000000;
  color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.7rem;
}

.creator-default-logo-small {
  background-color: var(--color-mocca-dark);
  color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.ticket-creator-info {
  display: flex;
  flex-direction: column;
}

.ticket-creator-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.ticket-creator-name {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

/* Accordion inside Ticket Card */
.ticket-accordion {
  margin-top: 1.25rem;
  border-top: 1px dashed rgba(47, 78, 62, 0.12);
  padding-top: 1rem;
}

.accordion-trigger {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  cursor: pointer;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
}

.accordion-trigger .chevron-icon {
  color: var(--color-mocca-muted);
  transition: transform 0.25s ease;
}

.accordion-trigger .chevron-icon.rotate {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin-top 0.3s ease;
}

.accordion-content.open {
  max-height: 180px;
  margin-top: 0.75rem;
}

.benefit-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.benefit-list li {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  display: flex;
  gap: 0.35rem;
  align-items: flex-start;
  line-height: 1.4;
}

.benefit-list .bullet {
  color: var(--color-mocca-dark);
  font-weight: bold;
}

/* Horizontal Info Penting in Description */
.info-facts-horizontal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background-color: var(--color-bg-light);
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.25rem 0 2rem;
}

.fact-item-inline {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.fact-item-inline .fact-icon {
  color: var(--color-mocca-muted);
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.fact-item-inline .fact-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.fact-item-inline .fact-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.fact-item-inline .fact-value {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

/* Toast Popups removed for ToastAlert component */

/* Bottom Action Bar (Visible on desktop and mobile) */
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid rgba(47, 78, 62, 0.1);
  box-shadow: 0 -8px 30px rgba(47, 78, 62, 0.08);
  z-index: 9999;
  padding: 0.5rem 0;
  box-sizing: border-box;
}

.bottom-bar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.bottom-price-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.bottom-label {
  font-family: var(--font-body);
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.bottom-price {
  font-family: var(--font-body);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.bottom-action-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
  transition: all 0.25s ease;
}

.bottom-action-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.2);
}

.desktop-action-buttons-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.desktop-chat-icon-btn {
  display: none !important;
}

.desktop-chat-icon-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.2);
}

.desktop-chat-icon-btn:active {
  transform: translateY(0);
}

/* Visibility classes for mobile and desktop */
.mobile-only-bottom-bar {
  display: none !important;
}

.mobile-only-bottom-row {
  display: none !important;
}

.mobile-price-container {
  display: none !important;
}

/* Desktop-specific styling for bottom row elements */
.desktop-only-bottom-row {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-bottom-left-desktop {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.bottom-info-label-desktop {
  font-family: var(--font-body);
  font-size: 0.75rem; /* Larger than 0.5rem label */
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.bottom-info-val-desktop {
  font-family: var(--font-body);
  font-size: 0.95rem; /* Larger than 0.65rem val */
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.ticket-bottom-right-desktop {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
}

.add-ticket-btn-card-desktop {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(47, 78, 62, 0.12);
}

.add-ticket-btn-card-desktop:hover {
  background-color: #55331C;
}

.add-ticket-btn-card-desktop.disabled {
  background-color: #efece8;
  color: var(--color-mocca-muted);
  cursor: not-allowed;
  box-shadow: none;
}

.ticket-qty-adjuster-card-desktop {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-mocca-dark);
  border-radius: 8px;
  padding: 0.35rem 0.5rem;
  box-shadow: 0 2px 6px rgba(47, 78, 62, 0.12);
}

.qty-adjust-btn-card-desktop {
  background: none;
  border: none;
  color: var(--color-bg-light);
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.qty-adjust-btn-card-desktop:hover {
  opacity: 0.8;
}

.qty-val-card-desktop {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bg-light);
  min-width: 14px;
  text-align: center;
}

.ticket-total-wrapper-card-desktop {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
}

.total-pax-label-card-desktop {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.total-price-val-card-desktop {
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
}


/* Organizer Row (Banner Event overlay) */
.banner-creator-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-top: 0.85rem;
  max-width: fit-content;
  position: relative;
  top: 15px;
  right:20px;
}

.banner-creator-row .ticket-creator-label {
  color: rgba(255, 255, 255, 0.65) !important;
}

.banner-creator-row .ticket-creator-name {
  color: #ffffff !important;
}

/* Event Recommendation Section */
.recommendation-section {
  margin-top: 2.5rem;
  margin-bottom: 2rem;
}

.recommendation-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 1rem;
}

.recommendation-scroll-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-mocca-border) transparent;
}

.recommendation-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.recommendation-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.recommendation-scroll-container::-webkit-scrollbar-thumb {
  background: var(--color-mocca-border);
  border-radius: 4px;
}

.rec-event-card {
  flex: 0 0 180px;
  background-color: var(--color-bg-light);
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.rec-event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(47, 78, 62, 0.08);
}

.rec-card-img-box {
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.rec-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rec-card-info {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
}

.rec-card-title {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0 0 0.15rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.2em;
  line-height: 1.25;
}

.rec-card-date {
  font-family: var(--font-body);
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
}

.rec-card-location {
  font-family: var(--font-body);
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rec-card-price {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-top: auto;
  padding-top: 0.35rem;
}

/* Custom Ticket tab and summary styling */
.ticket-selection-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.ticket-header-group {
  margin-bottom: 0.5rem;
}

.ticket-main-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0 0 0.5rem 0;
}

.ticket-sub-title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-muted);
  margin: 0;
}

.ticket-list-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ticket-card-item {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: visible;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.174);
}

.ticket-card-item:hover:not(.sold-out) {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(47, 78, 62, 0.05);
  border-color: rgba(47, 78, 62, 0.15);
}

.ticket-card-item.selected {
  border-color: var(--color-mocca-dark);
  border-width: 1.5px;
}

.ticket-card-item.sold-out {
  background: #fafaf9;
  opacity: 0.85;
}

/* Header Row styling */
.ticket-item-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.ticket-header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.ticket-status-badge-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: rgba(16, 185, 129, 0.08);
  color: #10B981;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  width: max-content;
}

.ticket-status-badge-inline.sold-out {
  background-color: rgba(239, 68, 68, 0.08);
  color: #DC2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  background-color: currentColor;
  border-radius: 50%;
}

.ticket-header-separator {
  width: 1px;
  align-self: stretch;
  background-color: rgba(47, 78, 62, 0.08);
  margin: 0 1.5rem;
}

.ticket-header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-width: 150px;
  justify-content: flex-end;
}

.ticket-price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.desktop-price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ticket-price-label-top {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.ticket-price-value-top {
  font-family: var(--font-body);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
}

.ticket-chevron-btn {
  color: var(--color-mocca-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron-svg {
  transition: transform 0.2s ease;
}

.chevron-svg.rotate {
  transform: rotate(180deg);
}

/* Expanded body styling */
.ticket-expanded-body {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: #fbfbfa;
  border-top: 1px solid rgba(47, 78, 62, 0.04);
  padding-top: 1.25rem;
}

.expanded-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ticket-description-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-mocca-dark);
  margin: 0;
  white-space: normal;
  word-break: break-word;
}

.ticket-benefits-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.benefit-item-mini {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.benefit-icon-mini {
  color: #B48A64;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.benefit-text-mini {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  font-weight: 500;
  line-height: 1.4;
}

.expanded-section-title {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-mocca-muted);
  letter-spacing: 0.03em;
  margin: 0;
}

.event-date-card-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.calendar-card-mini {
  width: 44px;
  height: 48px;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.cal-month-mini {
  background-color: #f5f3ef;
  color: var(--color-mocca-muted);
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  padding: 0.15rem 0;
  border-bottom: 1px solid rgba(47, 78, 62, 0.06);
}

.cal-day-mini {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
  text-align: center;
  line-height: 1.1;
  padding-top: 0.1rem;
}

.cal-day-name-mini {
  font-size: 0.55rem;
  color: var(--color-mocca-muted);
  text-align: center;
}

.date-validity-info {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.validity-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

.validity-value {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.ticket-info-grid-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-item-mini {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.info-icon-mini {
  flex-shrink: 0;
  color: #B48A64;
}

.info-text-mini {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* Divider Cutout Row styling */
.ticket-middle-divider-row {
  position: relative;
  height: 16px;
  overflow: visible;
  display: flex;
  align-items: center;
}

.ticket-divider-line {
  width: 100%;
  border-top: 1px dashed rgba(47, 78, 62, 0.1);
}

.ticket-middle-divider-row .ticket-cutout {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  background-color: var(--color-bg-cream);
  border: 1px solid rgba(47, 78, 62, 0.08);
  border-radius: 50%;
  z-index: 10;
  box-sizing: border-box;
  transform: translateY(-50%);
}

.ticket-middle-divider-row .ticket-cutout.left {
  left: -9px;
  clip-path: inset(0 0 0 50%);
}

.ticket-middle-divider-row .ticket-cutout.right {
  right: -9px;
  clip-path: inset(0 50% 0 0);
}

.ticket-card-item.selected .ticket-middle-divider-row .ticket-cutout {
  border-color: var(--color-mocca-dark);
}

/* Bottom Row styling */
/* Bottom Row styling */
.ticket-item-bottom {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bottom-info-label {
  font-family: var(--font-body);
  font-size: 0.5rem;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.bottom-info-val {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.ticket-bottom-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
}

.add-ticket-btn-card {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(47, 78, 62, 0.12);
}

.add-ticket-btn-card:hover {
  background-color: #55331C;
}

.add-ticket-btn-card.disabled {
  background-color: #efece8;
  color: var(--color-mocca-muted);
  cursor: not-allowed;
  box-shadow: none;
}

.ticket-qty-adjuster-card {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-mocca-dark);
  border-radius: 8px;
  padding: 0.35rem 0.5rem;
  box-shadow: 0 2px 6px rgba(47, 78, 62, 0.12);
}

.qty-adjust-btn-card {
  background: none;
  border: none;
  color: var(--color-bg-light);
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.qty-adjust-btn-card:hover {
  opacity: 0.8;
}

.qty-val-card {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bg-light);
  min-width: 14px;
  text-align: center;
}

.ticket-total-wrapper-card {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
}

.total-pax-label-card {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.total-price-val-card {
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
}



.ticket-info-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: rgba(47, 78, 62, 0.02);
  border: 1px dashed rgba(47, 78, 62, 0.08);
  border-radius: 12px;
  padding: 1.25rem;
  margin-top: 1rem;
}

.info-banner-icon-box {
  color: var(--color-mocca-muted);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.info-banner-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-mocca-muted);
}

/* Order Summary (Sidebar Card) */
.summary-ticket-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(47, 78, 62, 0.111);
}


.summary-card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
}

.summary-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
  gap: 0.75rem;
}

.summary-empty-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fbf9f6;
  border: 1px solid rgba(47, 78, 62, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-muted);
}

.summary-empty-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
}

.summary-empty-text {
  font-family: var(--font-body);
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--color-mocca-muted);
  margin: 0;
}

.summary-selected-state {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selected-ticket-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.summary-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-summary-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.edit-summary-btn:hover {
  background-color: rgba(47, 78, 62, 0.05);
}

.selected-ticket-left-col {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
  overflow: hidden;
}

.ticket-name-row-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.ticket-icon-summary {
  color: #B48A64;
  flex-shrink: 0;
}

.ticket-name-marquee-container {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  max-width: 150px;
  margin: 0 0.5rem;
}

.scrolling-text {
  display: inline-block;
  padding-left: 100%;
  animation: marquee-animation 10s linear infinite;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

@keyframes marquee-animation {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.selected-ticket-qty-tag {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  flex-shrink: 0;
  margin-left: 0.25rem;
}

@media (max-width: 768px) {
  .ticket-name-marquee-container {
    max-width: 100px;
  }
}

.selected-ticket-right-col {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 90px;
}

.selected-ticket-price-unit {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.remove-ticket-btn {
  background-color: rgba(239, 68, 68, 0.08);
  border: none;
  border-radius: 6px;
  color: #EF4444;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-ticket-btn:hover {
  background-color: #EF4444;
  color: #ffffff;
}

.summary-price-divider {
  height: 1px;
  border-top: 1px solid rgba(47, 78, 62, 0.08);
}

.summary-price-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price-breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breakdown-lbl {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.info-icon-tooltip {
  color: var(--color-mocca-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.breakdown-val {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.summary-total-payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-payment-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

.total-payment-val {
  font-family: var(--font-body);
  font-size: 1.40rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

/* ================= RESPONSIVE MEDIA QUERIES ================= */
@media (max-width: 1024px) {
  .hero-banner-body-grid {
    grid-template-columns: 1fr 300px;
    gap: 2rem;
  }
  .event-detail-grid {
    grid-template-columns: 1fr 300px;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  /* ── Page & Container ── */
  .event-detail-page {
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
    padding: 1rem 0 5.5rem !important;
    overflow-x: hidden;
  }
  .event-detail-container {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 0 1.25rem;
  }

  /* ── Breadcrumb ── */
  
  .breadcrumb-nav::-webkit-scrollbar { display: none; }
  .breadcrumb-current { max-width: 180px; }

  /* ────────── MOBILE BANNER: clean image-only, no blurred overlay ────────── */

  /* 1. Remove the blurred pseudo-background */
  .hero-event-banner::before {
    display: none;
  }

  /* 2. Banner wrapper: white bg, show only image + white info below */
  .hero-event-banner {
    width: 100%;
    height: auto;
    margin: 0 0 1.5rem 0;
    border-radius: 12px;
    background: #ffffff;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(47, 78, 62, 0.08);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
  }

  /* 3. Header: positioned relatively, Title & Countdown stacked */
  .hero-banner-header {
    order: 2; /* below the image */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: static;
    height: auto;
    padding: 1rem 1rem 0.25rem 1rem;
    z-index: 1;
    pointer-events: auto;
    box-sizing: border-box;
    width: 100%;
  }

  .event-banner-title {
    font-size: 1.35rem;
    line-height: 1.3;
    font-weight: 700;
    color: var(--color-mocca-dark) !important; /* Matches our website's premium theme color */
    max-width: 100%;
    text-shadow: none;
    margin-bottom: 0.5rem;
  }

  .banner-countdown-wrapper {
    display: none !important; /* Hidden on mobile — saves space */
  }

  .countdown-label {
    font-size: 0.6rem;
    color: var(--color-mocca-muted);
    text-align: left;
  }

  .countdown-timer {
    gap: 0.3rem;
  }

  .countdown-num {
    font-size: 0.8rem;
    padding: 0.2rem 0.3rem;
    min-width: 22px;
    color: var(--color-mocca-dark);
    background-color: #ffffff;
    border: 1px solid var(--color-mocca-border);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .countdown-unit {
    font-size: 0.5rem;
    color: var(--color-mocca-muted);
  }

  .countdown-divider {
    font-size: 0.8rem;
    color: var(--color-mocca-muted);
    margin-top: 0.25rem;
  }

  .countdown-segment {
    min-width: 22px;
  }

  /* 4. Body grid: disappears, lets left & right be direct column children of hero-event-banner */
  .hero-banner-body-grid {
    display: contents;
  }

  /* 5. Image container: full width, auto height */
  .hero-banner-left {
    order: 1; /* at the very top */
    position: relative;
    width: 100%;
    height: auto;
    max-height: 240px;
    padding: 0;
    top: 0;
    overflow: hidden;
    border-radius: 0;
    display: block; /* Override flex on mobile to support standard block image flow */
  }

  /* 6. Image: fills container */
  .hero-banner-img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    max-height: 240px;
    object-fit: cover;
    border-radius: 0;
    box-shadow: none;
    display: block;
  }

  /* 7. Remove gradient overlay on mobile image */
  .hero-banner-left::after {
    display: none;
  }

  /* 9. Right column (meta info): show below title in white */
  .hero-banner-right {
    order: 3; /* below header */
    padding: 0.25rem 1rem 1rem 1rem;
    height: auto;
    top: 0;
    background: #ffffff;
    border-top: none;
    box-sizing: border-box;
    width: 100%;
  }

  /* 10. Meta items: dark text, aligned like premium list in image */
  .banner-meta-list {
    gap: 0.85rem;
  }

  .banner-meta-item {
    color: #333333 !important;
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .share-meta-item {
    display: flex !important;
  }

  .meta-icon {
    width: 20px;
    height: 20px;
    color: var(--color-mocca-dark) !important; /* Premium signature berean.id theme color */
    opacity: 1;
  }

  .share-text-link {
    color: var(--color-mocca-dark) !important;
    font-weight: 600;
  }

  .meta-main-info {
    font-size: 0.95rem;
    color: #333333 !important;
    font-weight: 500;
  }

  .meta-sub-info {
    font-size: 0.8rem;
    color: #666666 !important;
    opacity: 1 !important;
  }

  /* 11. Organizer row: adapt to match the provided image with dashed top border */
  .banner-creator-row {
    position: static;
    top: 0;
    background: none;
    border: none;
    border-top: 1px dashed rgba(47, 78, 62, 0.15); /* Dashed divider exactly like image */
    padding: 1.25rem 0 0 0;
    margin-top: 1.25rem;
    max-width: 100%;
    border-radius: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .ticket-creator-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .creator-avatar-img,
  .creator-plus-logo-small,
  .creator-default-logo-small {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .banner-creator-row .ticket-creator-label {
    color: #888888 !important;
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: normal;
  }

  .banner-creator-row .ticket-creator-name {
    color: #111111 !important;
    font-size: 1rem;
    font-weight: 700;
  }

  /* ── Two-column grid → single column ── */
  .event-detail-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    width: 100%;
  }

  /* ── Left column: remove desktop-only left padding ── */
  .event-info-left-col {
    padding-left: 0;
    gap: 1.5rem;
    order: 1;
    min-width: 0;
    width: 100%;
  }

  .tab-content-block {
    padding-top: 1rem;
  }
  /* ── Tabs Bar ── */
  .tabs-bar {
    top: 60px;
    padding: 0.5rem 0 0;
    margin: 0 0 1.25rem 0;
    background-color: #ffffff;
    border-bottom: 1px solid var(--color-mocca-border);
    display: flex;
    justify-content: flex-start;
    gap: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 100;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tabs-bar::-webkit-scrollbar {
    display: none;
  }
  .tab-btn {
    font-size: 0.82rem;
    font-weight: 700;
    padding: 0.85rem 1rem;
    flex: 0 0 auto;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
  }
  .tab-icon {
    width: 14px;
    height: 14px;
  }

  /* ── Description tab text ── */
  .desc-section-card,
  .terms-section-card {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }
  .desc-sub-section {
    padding-top: 1.25rem;
    margin-top: 1.25rem;
  }
  .event-desc-main {
    font-size: 0.9rem;
    line-height: 1.65;
    margin-bottom: 1.25rem;
  }
  .section-title {
    font-size: 1.05rem;
    margin-bottom: 0.85rem;
  }
  .content-section {
    padding-bottom: 1.5rem;
  }

  /* ── Info facts grid ── */
  .info-facts-horizontal-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 1rem;
    margin: 0.75rem 0 1.25rem;
    width: 100%;
    box-sizing: border-box;
  }
  .fact-item-inline {
    min-width: 0;
    overflow: hidden;
  }
  .fact-item-inline .fact-label {
    font-size: 0.65rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fact-item-inline .fact-value {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Highlight grid ── */
  .highlight-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
    width: 100%;
  }
  .highlight-item {
    padding: 1rem;
    min-width: 0;
  }

  /* ── Program grid ── */
  .program-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    width: 100%;
  }

  /* ── Organizer card ── */
  .organizer-card {
    flex-direction: column;
    padding: 1.25rem;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  .org-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  .org-name { font-size: 1.1rem; }
  .org-bio { font-size: 0.8rem; }

  /* ── Recommendation section ── */
  .recommendation-section {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  .recommendation-title { font-size: 1rem; }
  .rec-event-card { flex: 0 0 140px; }
  .rec-card-img-box { height: 80px; }
  .rec-card-title { font-size: 0.75rem; }
  .rec-card-date, .rec-card-location { font-size: 0.6rem; }
  .rec-card-price { font-size: 0.75rem; }
  .rec-card-info { padding: 0.6rem; }

  /* ── Right sidebar → bottom on mobile ── */
  .event-sidebar-right-col {
    order: 2; /* Positioned below left column content */
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
  .sticky-sidebar-container {
    position: static;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .sidebar-card {
    padding: 1.25rem;
    border-radius: 12px;
  }
  .ticket-card {
    display: none !important; /* Hide desktop buy panel on mobile */
  }

  /* Price/ticket card */
  .ticket-label { font-size: 0.65rem; }
  .ticket-price-value {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .buy-ticket-btn {
    padding: 0.85rem;
    font-size: 0.9rem;
    border-radius: 10px;
  }
  .chat-event-btn {
    padding: 0.7rem;
    font-size: 0.8rem;
  }

  /* Order summary card */
  .summary-card-title { font-size: 1.05rem; }
  .summary-empty-state { padding: 1.25rem 0.5rem; }
  .summary-empty-title { font-size: 0.85rem; }
  .summary-empty-text { font-size: 0.75rem; }
  .edit-summary-btn { font-size: 0.75rem; }
  .breakdown-lbl, .breakdown-val { font-size: 0.8rem; }
  .total-payment-val { font-size: 1.25rem; }
  .total-payment-label { font-size: 0.8rem; }

  /* Share section */
  .share-label { font-size: 0.8rem; }

  .terms-tab-block {
    margin-top: 0;
  }

  /* ── Ticket selection tab ── */
  .ticket-main-title { font-size: 1.15rem; }
  .ticket-sub-title { font-size: 0.82rem; }
  .ticket-selection-block { gap: 1rem; margin-top: 0.75rem; }
  .ticket-list-container { gap: 0.85rem; }

  .ticket-item-header {
    padding: 1rem;
    gap: 0.5rem;
    flex-direction: column; /* stack left/right vertically */
    align-items: stretch;
  }
  .ticket-header-left {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
  }
  .ticket-item-title {
    font-size: 0.85rem;
    line-height: 1.35;
    white-space: normal;
    word-break: break-word;
    font-family: var(--font-body);
    font-weight: 600;
  }
  .ticket-header-separator { display: none; }
  .ticket-header-right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: unset;
    gap: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(47, 78, 62, 0.08);
  }
  .ticket-price-label-top { font-size: 0.65rem; }
  .ticket-price-value-top { font-size: 1.05rem; }

  .ticket-expanded-body {
    padding: 1rem;
    gap: 1rem;
  }
  .expanded-section-title { font-size: 0.68rem; }
  
  .date-validity-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }

  .ticket-info-grid-mini {
    flex-direction: column;
    gap: 0.6rem;
  }
  .info-text-mini { font-size: 0.78rem; }

  .ticket-description-text {
    font-size: 0.8rem;
    line-height: 1.5;
  }
  .benefit-text-mini {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .ticket-item-bottom {
    padding: 0.85rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }
  .ticket-bottom-action-row {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .ticket-bottom-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }
  .total-pax-label-card { font-size: 0.65rem; }
  .total-price-val-card { font-size: 1rem; }

  .add-ticket-btn-card {
    padding: 0.5rem 1.25rem;
    font-size: 0.85rem;
    border-radius: 8px;
  }
  .ticket-info-banner {
    padding: 0.85rem;
    gap: 0.6rem;
  }
  .info-banner-text { font-size: 0.78rem; }

  /* Hide desktop summary card on mobile */
  .summary-ticket-card {
    display: none !important;
  }

  /* ── Bottom action bar mobile styles ── */
  .bottom-action-bar {
    background-color: #ffffff !important;
    padding: 0.85rem 1.25rem;
    padding-bottom: calc(0.85rem + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid var(--color-mocca-border) !important;
    box-shadow: 0 -10px 30px rgba(47, 78, 62, 0.1) !important;
  }
  
  .desktop-only-bottom-bar {
    display: none !important;
  }

  .mobile-only-bottom-bar {
    display: flex !important;
    flex-direction: column;
    width: 100%;
    gap: 0.85rem;
    padding: 0 !important;
  }

  .mobile-bottom-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }

  .mobile-bottom-main-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.75rem;
  }

  .mobile-price-info-inline {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .mobile-action-buttons-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-grow: 1;
    justify-content: flex-end;
  }

  .mobile-action-buttons-group.full-width {
    width: 100%;
    display: flex;
    gap: 0.75rem;
  }

  .mobile-action-buttons-group.full-width .bottom-action-btn.mobile-action-btn {
    flex-grow: 1;
    max-width: none;
  }

  .mobile-action-buttons-group:not(.full-width) .bottom-action-btn.mobile-action-btn {
    max-width: 165px;
  }

  .mobile-detail-toggle-btn {
    background: none;
    border: none;
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-mocca-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0;
    text-decoration: none;
  }

  .detail-arrow {
    font-size: 0.7rem;
    margin-left: 2px;
  }

  .bottom-price-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    text-align: left;
    align-items: flex-start;
  }

  .bottom-label {
    font-size: 0.58rem;
    letter-spacing: 0.05em;
    font-weight: 700;
    color: var(--color-mocca-muted);
    text-transform: uppercase;
  }

  .bottom-price {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--color-mocca-dark);
    line-height: 1.2;
  }
  
  .bottom-action-btn.mobile-action-btn {
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.25rem;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 14px;
    background-color: var(--color-mocca-dark);
    color: #ffffff;
    border: none;
    box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
    transition: all 0.2s ease;
    box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
  }

  .bottom-action-btn.mobile-action-btn:active {
    opacity: 0.9;
    transform: scale(0.98);
  }

  .mobile-chat-icon-btn {
    background-color: var(--color-mocca-dark);
    color: #ffffff;
    border: none;
    border-radius: 14px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(47, 78, 62, 0.15);
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .mobile-chat-icon-btn:active {
    opacity: 0.9;
    transform: scale(0.98);
  }

  /* ── Mobile Summary Bottom Sheet ── */
  .mobile-summary-bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 -10px 40px rgba(47, 78, 62, 0.15);
    z-index: 10000;
    padding: 1.5rem;
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
    max-height: 75vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-sizing: border-box;
  }

  .sheet-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sheet-drag-handle {
    width: 40px;
    height: 4px;
    background-color: rgba(47, 78, 62, 0.15);
    border-radius: 2px;
    align-self: center;
  }

  .sheet-header-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .sheet-title {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-mocca-dark);
    margin: 0;
  }

  .sheet-close-btn {
    background: none;
    border: none;
    color: var(--color-mocca-muted);
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sheet-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }

  .mobile-summary-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  /* Visibility overrides for desktop elements inside mobile media query */
  .mobile-only-bottom-row {
    display: flex !important;
  }
  .mobile-price-container {
    display: flex !important;
  }
  .desktop-only-bottom-row {
    display: none !important;
  }
  .desktop-price-container {
    display: none !important;
  }
}

/* Transitions for bottom sheet & backdrop */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ticket marquee on mobile — already handled in main block above */
</style>
