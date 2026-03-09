<script setup lang="ts">
import { useSwipe } from '@vueuse/core'

interface Props {
  name?: string
  image?: string
  locked?: boolean
}

withDefaults(defineProps<Props>(), {
  name: 'Project Name',
  image: '',
  locked: false,
})

const cardRef = ref<HTMLElement | null>(null)
const { direction, isSwiping, lengthX, lengthY } = useSwipe(cardRef)

const emit = defineEmits(['swipe'])

watch(direction, (d) => {
  if (d) {
    emit('swipe', d)
  }
})

</script>

<template>
  <div ref="cardRef" class="project-card" :class="{ 'is-locked': locked }">
    <div class="project-image">
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="image-fill"
      />
      <div v-else class="image-placeholder"></div>
    </div>

    <div class="project-name">
      <span class="name-text">{{ name }}</span>
    </div>

    
    <UiStatusOverlay 
      v-if="locked" 
      type="locked" 
      :show="true" 
    />
  </div>
</template>

<style scoped>
.project-card {
  position: relative;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}


.project-image {
  position: absolute;
  inset: 0;
  transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card.is-locked .project-image {
  filter: grayscale(1) blur(8px) brightness(0.5) !important;
}

.image-fill {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
}


.project-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.5rem;
  background: var(--color-bg-primary);
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease;
}

.project-card:hover .project-name {
  transform: translateY(0);
  opacity: 1;
}

.name-text {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1;
}
.is-first .project-image {
  filter: grayscale(0%);

}
.is-first .project-name {
  transform: translateY(0);
  opacity: 1;
}
</style>
