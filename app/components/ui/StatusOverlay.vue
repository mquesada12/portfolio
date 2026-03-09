<script setup lang="ts">
interface Props {
  type: 'coming-soon' | 'locked'
  show?: boolean
  variant?: 'default' | 'compact'
}

withDefaults(defineProps<Props>(), {
  show: false,
  variant: 'default'
})
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="show" 
      class="status-overlay" 
      :class="[type, `variant-${variant}`]"
    >
      <div class="overlay-content">
        <template v-if="type === 'locked'">
          <div class="lock-icon-wrapper">
            <Icon name="mdi:lock-outline" class="lock-icon" />
          </div>
          <span v-if="variant !== 'compact'" class="status-text">Locked</span>
        </template>
        
        <template v-else-if="type === 'coming-soon'">
          <div class="coming-soon-badge">
            <span class="badge-dot" />
            <span class="status-text">{{ variant === 'compact' ? 'Soon' : 'Coming Soon' }}</span>
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.status-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.variant-default {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.variant-compact {
  backdrop-filter: none;
  border-radius: inherit;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.variant-compact .overlay-content {
  flex-direction: row;
  gap: 0.4rem;
  width: 100%;
  height: 100%;
}


.locked {
  background: rgba(10, 10, 10, 0.6);
}

.lock-icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--variant-accent);
  transition: transform 0.3s ease;
}

.variant-compact .lock-icon-wrapper {
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
}

.variant-compact .lock-icon {
  width: 14px;
  height: 14px;
}

.lock-icon {
  width: 24px;
  height: 24px;
}

.status-text {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.variant-compact.locked {
  background: rgba(10, 10, 10, 0.85);
}

.variant-compact.coming-soon {
  background: rgba(10, 10, 10, 0.7);
}


.coming-soon {
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(8px);
  pointer-events: none; 
}

.coming-soon-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--variant-accent);
  box-shadow: 0 0 10px var(--variant-accent);
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


:deep(.nav-link) .status-overlay {
  border-radius: var(--radius-full);
  pointer-events: none;
}
</style>
