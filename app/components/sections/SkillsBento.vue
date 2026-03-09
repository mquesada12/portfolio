<script setup lang="ts">
import { onMounted, ref, watch, nextTick, computed } from 'vue'
import { useVariantContent } from '~/composables/useVariantContent'
import { useVariantStore } from '~/stores/variant'
import { useSkillsSimulatorStore } from '~/stores/skillsSimulator'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { techStack, panelDescription } = useVariantContent()
const getVariantStore = () => {
  const { $pinia } = useNuxtApp()
  return useVariantStore($pinia)
}
const getSimulatorStore = () => {
  const { $pinia } = useNuxtApp()
  return useSkillsSimulatorStore($pinia)
}
const bentoContainer = ref<HTMLElement | null>(null)
const hasEntered = ref(false)

const skillsList = computed(() => {
  const simulator = getSimulatorStore()
  return techStack.value
    .filter((name: string) => !!simulator.skills[name])
    .map((name: string) => {
      const meta = simulator.skills[name]
      return {
        name,
        icon: meta?.icon ?? '',
        desc: meta?.desc ?? '',
        tags: meta?.tags ?? [],
        contributions: meta?.contributions ?? [],
        experience: meta?.experience ?? '',
      }
    })
})

const selectedSkillData = computed(() => getSimulatorStore().selectedSkillData)

function selectSkill(name: string) {
  getSimulatorStore().selectSkill(name)
}

const showGrid = computed(() => {
  const active = getVariantStore().active
  return active === 'frontend' || active === 'fullstack'
})

const showSimulator = computed(() => {
  const active = getVariantStore().active
  return active === 'backend' || active === 'fullstack'
})

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

onMounted(() => {
  if (!bentoContainer.value) return

  const cards = bentoContainer.value.querySelectorAll('.bento-item')
  if (!cards.length) return

  gsap.set(cards, { opacity: 0, y: 40 })

  ScrollTrigger.create({
    trigger: bentoContainer.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      hasEntered.value = true
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      })
    },
  })
})

watch(
  () => getVariantStore().active,
  async () => {
    await nextTick()
    if (!bentoContainer.value || !hasEntered.value) return
    const cards = bentoContainer.value.querySelectorAll('.bento-item')
    if (!cards.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      }
    )
  }
)

// Preselect first skill
watch(skillsList, (newList) => {
  const simulator = getSimulatorStore()
  const currentSelected = simulator.selectedSkill
  const stillExists = newList.some(s => s.name === currentSelected)
  
  if (newList.length > 0 && (!currentSelected || !stillExists)) {
    const firstSkill = newList[0]
    if (firstSkill) {
      simulator.selectSkill(firstSkill.name)
    }
  }
}, { immediate: true })
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="skills-container">

      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge"><Icon name="mdi:code-braces" class="badge-icon" /> TECHNICAL ARSENAL</span>
        <h2 class="section-title">Core <span class="title-accent">Expertise</span></h2>
        <p class="section-description">{{ panelDescription }}</p>
      </div>

      <!-- Skills Grid + Detail Panel -->
      <div v-if="showGrid" class="skills-layout">
        <!-- Grid -->
        <div ref="bentoContainer" class="bento-grid">
          <div
            v-for="skill in skillsList"
            :key="skill.name"
            class="bento-item"
            @click="selectSkill(skill.name)"
          >
            <UiBentoCard
              :title="skill.name"
              :icon="skill.icon"
              :tags="skill.tags"
              :experience="skill.experience"
              :active="getSimulatorStore().selectedSkill === skill.name"
            />
          </div>
        </div>

        <!-- Detail Panel (right side) -->
        <Transition name="panel-fade">
          <div v-if="selectedSkillData" class="detail-panel">
            <div class="detail-panel-header">
              <div class="icon-wrapper">
                <Icon v-if="selectedSkillData.icon" :name="selectedSkillData.icon" class="detail-icon" />
              </div>
              <div class="header-text">
                <h3 class="detail-title">{{ getSimulatorStore().selectedSkill }}</h3>
              </div>
            </div>

            <div class="detail-info-grid">
              <div class="info-item">
                <span class="info-label">Experience</span>
                <span class="info-value">{{ selectedSkillData.experience }}</span>
              </div>
              <div v-if="selectedSkillData.tags?.length" class="info-item">
                <span class="info-label">Specialization</span>
                <div class="info-tags">
                  <span v-for="tag in selectedSkillData.tags" :key="tag" class="small-tag">{{ tag }}</span>
                </div>
              </div>
            </div>

            <p class="detail-desc">{{ selectedSkillData.desc }}</p>

            <div v-if="selectedSkillData.contributions?.length" class="detail-contributions">
              <span class="contributions-title">CORE CAPABILITIES</span>
              <ul class="contributions-list">
                <li v-for="item in selectedSkillData.contributions" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </Transition>

      </div>

      <!-- Postman Simulator -->
      <div v-if="showSimulator" class="simulator-wrapper">
        <UiPostmanSimulator />
      </div>

    </div>
  </section>
</template>

<style scoped>
.skills-section {
  position: relative;
  width: 100%;
  padding: 6rem 0 8rem;
  background-color: var(--color-bg-primary);
  overflow: hidden;
}

.skills-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--container-padding);
  position: relative;
}

/* Section Header */
.section-header {
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--variant-accent);
  padding: 0.4rem 0.9rem;
  border: 1px solid rgba(var(--variant-accent-rgb), 0.3);
  border-radius: var(--radius-full);
  background: rgba(var(--variant-accent-rgb), 0.06);
  margin-bottom: 1.25rem;
  transition: color var(--transition-theme), border-color var(--transition-theme), background var(--transition-theme);
}

.badge-icon {
  width: 0.9rem;
  height: 0.9rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.title-accent {
  color: var(--variant-accent);
  transition: color var(--transition-theme);
}

.section-description {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 600px;
}

/* Skills Layout - Grid + Detail panel side by side */
.skills-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
  align-items: start;
}

/* Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.bento-item {
  opacity: 0;
}

/* Detail Panel (right side) */
.detail-panel {
  position: sticky;
  top: 6rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--transition-theme);
  box-shadow: 0 20px 40px -20px var(--color-shadow);
}

.detail-panel-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.icon-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--variant-accent-rgb), 0.08);
  border: 1px solid rgba(var(--variant-accent-rgb), 0.15);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.detail-icon {
  width: 2rem;
  height: 2rem;
  color: var(--variant-accent);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.detail-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
}


.mini-bar {
  height: 3px;
  width: 100px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.mini-fill {
  height: 100%;
  background: var(--variant-accent);
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.detail-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-value {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.small-tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  background: rgba(var(--variant-accent-rgb), 0.05);
  border: 1px solid rgba(var(--variant-accent-rgb), 0.1);
  color: var(--variant-accent);
  border-radius: var(--radius-sm);
}

.detail-desc {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.detail-contributions {
  background: rgba(var(--variant-accent-rgb), 0.03);
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px dashed rgba(var(--variant-accent-rgb), 0.2);
}

.contributions-title {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--variant-accent);
  letter-spacing: 0.12em;
  display: block;
  margin-bottom: 0.75rem;
}

.contributions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contributions-list li {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  position: relative;
  padding-left: 1rem;
}

.contributions-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--variant-accent);
  font-weight: 700;
}


/* Simulator */
.simulator-wrapper {
  margin-top: 2.5rem;
}

/* Transitions */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 1024px) {
  .skills-layout {
    grid-template-columns: 1fr;
  }

  .detail-panel {
    position: static;
  }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 4rem 0 5rem;
  }

  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}
</style>
