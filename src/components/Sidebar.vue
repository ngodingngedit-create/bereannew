<template>
  <aside class="sidebar">
    <div class="sidebar-item">
      <h2 class="sidebar-title">The Band</h2>
      <p>Berean.id is an Indonesian indie pop band formed in 1999. Known for their whimsical lyrics and jazz-infused pop melodies.</p>
    </div>

    <div class="sidebar-item newsletter">
      <h3>Join the Diary</h3>
      <p>Subscribe for exclusive scrapbook updates and tour secrets.</p>
      <input type="email" placeholder="Your email address..." class="newsletter-input" />
      <button class="btn-primary">Sign Up</button>
    </div>

    <div class="sidebar-item socials">
      <h3>Connect</h3>
      <div class="social-links">
        <a href="#">Instagram</a>
        <a href="#">Spotify</a>
        <a href="#">YouTube</a>
        <a href="#">Twitter</a>
      </div>
    </div>

    <div class="sidebar-footer">
      <p>&copy; 2026 Berean.id. Hand-drawn with love.</p>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(0,0,0,0.1);
  padding-bottom: 0.5rem;
}

.sidebar-item h3 {
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.newsletter-input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.5);
  font-family: var(--font-body);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-links a {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.sidebar-footer {
  margin-top: auto;
  font-size: 0.8rem;
  opacity: 0.6;
}
</style>
