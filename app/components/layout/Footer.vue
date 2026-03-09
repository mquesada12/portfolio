<script setup lang="ts">
const currentYear = new Date().getFullYear()
const route = useRoute()
const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/', icon: 'mdi:github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/', icon: 'mdi:linkedin' },
  { label: 'Email', url: 'mailto:hello@example.com', icon: 'mdi:email-outline' },
]
</script>

<template>
  <footer v-if="route.path !== '/projects'" class="site-footer">
    <div class="footer-inner">
      
      <div class="footer-top">
        
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo">
            <span class="brand-symbol">&lt;</span>
            <span class="brand-text">MQR</span>
            <span class="brand-symbol">/&gt;</span>
          </NuxtLink>
          <p class="footer-tagline">Crafting digital experiences</p>
        </div>

        
        <div class="footer-col">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/" class="footer-link">Home</NuxtLink></li>
            <li><NuxtLink to="/projects" class="footer-link">Projects</NuxtLink></li>
            <li><NuxtLink to="/blog" class="footer-link">Blog</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
          </ul>
        </div>

        
        <div class="footer-col">
          <h4 class="footer-heading">Connect</h4>
          <div class="footer-socials">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="link.label"
            >
              <Icon :name="link.icon" class="social-icon" />
            </a>
          </div>
        </div>
      </div>

      
      <div class="footer-divider" />

      
      <div class="footer-bottom">
        <p class="footer-copy">
          &copy; {{ currentYear }} Manuel Quesada Ruiz
          <span class="footer-separator">&middot;</span>
          Built with
          <span class="heart" aria-label="love">&hearts;</span>
          &amp; Nuxt
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  transition: background var(--transition-theme), border-color var(--transition-theme);
  padding-bottom: 0;
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 3rem 2rem 1.5rem;
}


.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}


.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.15rem;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: opacity 0.3s ease;
}

.footer-logo:hover {
  opacity: 0.8;
}

.brand-symbol {
  color: var(--variant-accent);
  transition: color var(--transition-theme);
}

.brand-text {
  color: var(--color-text-primary);
  transition: color var(--transition-theme);
}

.footer-tagline {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
  max-width: 200px;
}


.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-heading {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0;
}

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-link {
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  transition: color 0.25s ease;
  padding: 0.15rem 0;
}

.footer-link:hover {
  color: var(--variant-accent);
}


.footer-socials {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: transparent;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: var(--variant-accent);
  background: rgba(var(--variant-accent-rgb), 0.08);
  transform: translateY(-2px);
}

.social-icon {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.social-link:hover .social-icon {
  color: var(--variant-accent);
}


.footer-divider {
  height: 1px;
  background: var(--color-border);
  margin-bottom: 1.25rem;
  transition: background var(--transition-theme);
}


.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-copy {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}

.footer-separator {
  margin: 0 0.4rem;
  opacity: 0.4;
}

.heart {
  color: var(--variant-accent);
  font-size: 0.8rem;
  display: inline-block;
  animation: heartbeat 1.5s ease infinite;
  transition: color var(--transition-theme);
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.2); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
}


@media (max-width: 768px) {
  .footer-inner {
    padding: 2rem 1.5rem 1.25rem;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-brand {
    align-items: center;
  }

  .footer-tagline {
    max-width: none;
  }

  .footer-col {
    align-items: center;
  }

  .site-footer {
    
    padding-bottom: calc(4rem + env(safe-area-inset-bottom));
  }
}
</style>
