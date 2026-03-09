<script setup lang="ts">
import { useVariantStore } from '~/stores/variant'

const variantStore = useVariantStore()
const route = useRoute()

const navItems = [
  { label: 'Home', to: '/', icon: 'mdi:home-outline', iconActive: 'mdi:home' },
  { label: 'Projects', to: '/projects', icon: 'mdi:folder-outline', iconActive: 'mdi:folder' },
  { label: 'Blog', to: '/blog', icon: 'mdi:post-outline', iconActive: 'mdi:post', status: 'locked' },
  { label: 'Contact', to: '/contact', icon: 'mdi:email-outline', iconActive: 'mdi:email' },
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  scrolled.value = window.scrollY > 20
}
</script>

<template>
  
  <nav class="navbar-desktop" :class="{ 'navbar-scrolled': scrolled }">
    <div class="navbar-inner">
      
      <NuxtLink to="/" class="navbar-brand">
        <span class="brand-symbol">&lt;</span>
        <span class="brand-text">MQR</span>
        <span class="brand-symbol">/&gt;</span>
      </NuxtLink>

      
      <ul class="navbar-links">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.status ? '#' : item.to"
            class="nav-link"
            :class="{ active: isActive(item.to), 'is-disabled': !!item.status }"
          >
            <span class="nav-link-text">{{ item.label }}</span>
            <span class="nav-link-indicator" />
            <UiStatusOverlay 
              v-if="item.status === 'locked'" 
              type="locked" 
              variant="compact"
              :show="true" 
            />
          </NuxtLink>
        </li>
      </ul>

      
      <div class="navbar-actions">
        <span class="variant-badge">
          <span class="variant-dot" />
          {{ variantStore.active }}
        </span>
      </div>
    </div>
  </nav>

  
  <nav v-if="route.path !== '/projects'" class="navbar-mobile">
    <div class="navbar-mobile-inner">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.status ? '#' : item.to"
        class="mobile-nav-item"
        :class="{ active: isActive(item.to), 'is-disabled': !!item.status }"
      >
        <Icon
          :name="isActive(item.to) ? item.iconActive : item.icon"
          class="mobile-nav-icon"
        />
        <span class="mobile-nav-label">{{ item.label }}</span>


        
        <UiStatusOverlay 
          v-if="item.status === 'locked'" 
          type="locked" 
          variant="compact"
          :show="true" 
        />
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>

.navbar-desktop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  padding: 1rem 2rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-scrolled {
  padding: 0.6rem 2rem;
  background: rgba(26, 26, 26, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.navbar-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.navbar-brand {
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

.navbar-brand:hover {
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


.navbar-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;

  
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-full);
  padding: 0.3rem 0.35rem;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  transition: color 0.3s ease, background 0.3s ease;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.is-disabled {
  cursor: default;
}

.nav-link.is-disabled:hover {
  background: transparent;
  color: var(--color-text-muted);
}

.nav-link.active {
  color: var(--color-bg-primary);
  background: var(--variant-accent);
  font-weight: 600;
}

.nav-link-indicator {
  display: none;
}


.navbar-actions {
  display: flex;
  align-items: center;
}

.variant-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  transition: border-color 0.3s ease, color 0.3s ease;
}

.variant-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--variant-accent);
  transition: background var(--transition-theme);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.navbar-mobile {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom));
}

.navbar-mobile-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
  position: relative;
}

.mobile-nav-icon {
  width: 1.35rem;
  height: 1.35rem;
  color: var(--color-text-muted);
  transition: color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-nav-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.mobile-nav-item.active .mobile-nav-icon {
  color: var(--variant-accent);
  transform: translateY(-2px);
}

.mobile-nav-item.active .mobile-nav-label {
  color: var(--variant-accent);
}

.mobile-nav-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--variant-accent);
  transition: background var(--transition-theme);
}

.mobile-nav-item:not(.active):active {
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .navbar-desktop {
    display: none;
  }

  .navbar-mobile {
    display: block;
  }
}
</style>
