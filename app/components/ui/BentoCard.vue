<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
  active?: boolean
  proficiency?: number
  tags?: string[]
  experience?: string
}

withDefaults(defineProps<Props>(), {
  active: false,
  proficiency: 0,
  tags: () => [],
  experience: '',
})
</script>

<template>
  <div class="bento-card" :class="{ 'bento-card--active': active }">
    <div class="card-body">
      <div v-if="icon" class="icon-box">
        <Icon :name="icon" class="skill-icon" />
      </div>
      <div class="card-info">
        <h3 class="card-title">{{ title }}</h3>
        <span v-if="experience" class="card-experience">{{ experience }}</span>
      </div>
    </div>
    
    <div class="card-arrow" aria-hidden="true">
      <Icon name="heroicons:chevron-right-20-solid" class="arrow-icon" />
    </div>

    <div class="" />
  </div>
</template>

<style scoped>
.bento-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  padding: 1.75rem 1.25rem;
  cursor: pointer;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.bento-card:hover {
  border-color: rgba(var(--variant-accent-rgb), 0.4);
  background: var(--color-bg-tertiary);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 15px 35px -10px var(--color-shadow),
    0 0 0 1px rgba(var(--variant-accent-rgb), 0.1);
}

.bento-card--active {
  border-color: var(--variant-accent);
  background: rgba(var(--variant-accent-rgb), 0.05);
  box-shadow: 
    0 10px 30px -10px rgba(var(--variant-accent-rgb), 0.3),
    inset 0 0 0 1px rgba(var(--variant-accent-rgb), 0.2);
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  width: 100%;
}

.icon-box {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: rgba(var(--variant-accent-rgb), 0.08);
  border: 1px solid rgba(var(--variant-accent-rgb), 0.15);
  color: var(--variant-accent);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.bento-card:hover .icon-box,
.bento-card--active .icon-box {
  background: rgba(var(--variant-accent-rgb), 0.15);
  border-color: rgba(var(--variant-accent-rgb), 0.3);
  transform: scale(1.1);
}

.skill-icon {
  width: 2rem;
  height: 2rem;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.card-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: 0.01em;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.bento-card:hover .card-title,
.bento-card--active .card-title {
  color: var(--variant-accent);
}

.card-experience {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.card-arrow {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  color: var(--color-text-muted);
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.bento-card:hover .card-arrow {
  opacity: 0.6;
  transform: translateX(0);
}

.bento-card--active .card-arrow {
  opacity: 1;
  color: var(--variant-accent);
  transform: translateX(0);
}

.arrow-icon {
  width: 1rem;
  height: 1rem;
}

.bottom-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--variant-accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0.6;
}

.bento-card:hover .bottom-accent,
.bento-card--active .bottom-accent {
  transform: scaleX(1);
}

@media (max-width: 640px) {
  .bento-card {
    padding: 1.25rem 1rem;
  }
  .icon-box {
    width: 3rem;
    height: 3rem;
  }
  .skill-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>
