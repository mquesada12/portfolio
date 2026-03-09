<script setup lang="ts">
import SectionsProjects from '~/components/sections/Projects.vue'
</script>

<template>
  <div class="projects-page">
    <div class="back-nav">
      <NuxtLink to="/" class="back-link">
        <Icon name="mdi:arrow-left" class="back-icon" />
        <span>Back</span>
      </NuxtLink>
    </div>
    <SectionsProjects />
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

.back-nav {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.back-link:hover {
  color: var(--variant-accent);
  border-color: var(--variant-accent);
}

.back-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.back-link:hover .back-icon {
  transform: translateX(-4px);
}
</style>
