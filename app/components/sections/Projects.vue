<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'

const projects = [
  { name: 'AI Translator', image: '/images/first-project-card.webp' },
  { name: 'Portfolio Website', image: '/images/fifth-project-card.png' },
  { name: 'Maps searcher', image: '/images/second-project-card.png' },
  { name: 'Hospitals SaaS', image: '/images/third-project-card.png' },
  { name: 'Social Network', image: '/images/fourth-project-card.png' },
]

const sectionRef = ref<HTMLElement | null>(null)
const stripRef = ref<HTMLElement | null>(null)

let targetX = 0
let maxScroll = 0

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

function onWheel(e: WheelEvent) {
  e.preventDefault()

  const delta = e.deltaY || e.deltaX
  targetX = clamp(targetX + delta, 0, maxScroll)

  gsap.to(stripRef.value!, {
    x: -targetX,
    duration: 0.6,
    ease: 'power2.out',
    overwrite: true,
  })
}

function recalcMaxScroll() {
  if (!stripRef.value) return
  maxScroll = stripRef.value.scrollWidth - window.innerWidth
  if (maxScroll < 0) maxScroll = 0
  targetX = clamp(targetX, 0, maxScroll)
}

function isDesktop() {
  return window.innerWidth > 768
}

onMounted(() => {
  if (isDesktop()) {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    recalcMaxScroll()
    sectionRef.value?.addEventListener('wheel', onWheel, { passive: false })
  }
  window.addEventListener('resize', recalcMaxScroll)
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  sectionRef.value?.removeEventListener('wheel', onWheel)
  window.removeEventListener('resize', recalcMaxScroll)
})
</script>

<template>
  <section ref="sectionRef" id="projects" class="projects-section">
    <div ref="stripRef" class="projects-strip">
      <UiProjectTemplate
        v-for="(project, index) in projects"
        :key="project.name"
        :name="project.name"
        :image="project.image"
        :locked="true"
        :class="{ 'is-first': index === 0 }"
      />
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background-color: var(--color-bg-primary);
}

.projects-strip {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 100%;
  width: max-content;
  gap: 0.5rem;
  padding: 0.5rem;
}

:deep(.project-card) {
  width: 28vw;
  height: 100%;
  flex-shrink: 0;
}


:deep(.project-card:not(.is-first) .project-image) {
  filter: grayscale(100%);
  transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.project-card.is-first .project-image) {
  filter: grayscale(0%);
}

:deep(.project-card.is-first .project-name) {
  transform: translateY(0);
  opacity: 1;
}


.projects-strip:hover :deep(.project-card.is-first .project-name) {
  transform: translateY(100%);
  opacity: 0;
}

.projects-strip:hover :deep(.project-card.is-first .project-image) {
  filter: grayscale(100%);
}


:deep(.project-card:hover .project-image) {
  filter: grayscale(0%) !important;
}

:deep(.project-card:hover .project-name) {
  transform: translateY(0) !important;
  opacity: 1 !important;
}


@media (max-width: 768px) {
  .projects-section {
    position: relative;
    height: auto;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .projects-strip {
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 1rem;
    gap: 1rem;
  }

  :deep(.project-card) {
    width: 100%;
    height: 60vh;
  }
}
</style>
