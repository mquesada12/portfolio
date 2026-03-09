<script setup lang="ts">
</script>

<template>
  <section class="go-to-contact">
    <h2 class="hero-like-title">Contact</h2>
    
    <div class="content-wrapper">
      <div class="cta-section">
        <NuxtLink to="/contact" class="cta-button">
          <span>Get in Touch</span>
          <Icon class="icon" name="mdi:arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.go-to-contact {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 100%;
  padding: 5rem;
  background-color: var(--color-bg-primary);
  overflow: hidden;
}

.hero-like-title {
  position: absolute;
  font-size: clamp(5rem, 18vw, 22rem);
  font-weight: 900;
  line-height: 0.7;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  z-index: 0;
  letter-spacing: -0.05em;
  white-space: nowrap;
  font-family: var(--font-display);
  transform: scaleY(1.4);
  transform-origin: center;
  color: var(--variant-accent);
  opacity: 0.04;
  pointer-events: none;
  transition: color var(--transition-theme);
}

.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  max-width: var(--container-max);
  align-items: center;
  justify-content: center;
}

.cta-section {
  display: flex;
  justify-content: center;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: clamp(2rem, 3.5vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem 2rem;
  background: var(--color-bg-primary);
}

.cta-button:hover {
  color: var(--variant-accent);
  transform: translateX(10px);
}

.icon {
  font-size: 1.2em;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.cta-button:hover .icon {
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .go-to-contact {
    height: auto;
    min-height: 40vh;
    padding: 3rem 1.5rem;
  }

  .cta-button {
    font-size: 2rem;
    padding: 1rem;
    gap: 1rem;
  }

  .hero-like-title {
    font-size: clamp(4rem, 20vw, 8rem);
  }
}
</style>
