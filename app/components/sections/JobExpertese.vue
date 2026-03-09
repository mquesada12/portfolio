<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface JobExperience {
  id: number
  role: string
  company: string
  period: string
  description: string
  tags: string[]
}

const experiences: JobExperience[] = [
  {
    id: 1,
    role: 'Mid Full Stack Developer',
    company: 'Columat Smart Systems',
    period: '2024 — Present',
    description: "Design and develop scalable web and mobile applications using NestJS, Next.js, Vue.js, React Native, and PHP (Laravel and Symfony). Lead the refactoring and migration of legacy platforms to modern architectures, improving maintainability, performance, and scalability. Collaborate closely with product managers, designers, and engineers to deliver high-quality, user-focused features. Introduce modern development tools and workflows to improve developer productivity and system reliability, while integrating CI/CD pipelines and automated testing strategies.",
    tags: ['Vue 3', 'Next JS', 'Nest JS', 'PostgreSQL', 'React Native', 'PHP', 'Laravel'],
  },
  {
    id: 2,
    role: 'Mid Full Stack Developer',
    company: 'Taurus Group',
    period: '2024 — 2025',
    description: "I've managed and optimized Shopify e-commerce platforms, including custom theme development and app integrations, reaching a performance metrics improvement of up to 20%.",
    tags: ['Symfony', 'Doctrine', 'MySQL', 'Shopify', 'Liquid'],
  },
  {
    id: 3,
    role: 'Backend Developer',
    company: 'Indoorclima',
    period: '2023 — 2024',
    description: "Developed backend services using PHP (Symfony/Laravel) and MySQL. Furthermore, I've assisted in building RESTful APIs and internal tools, and contributed to system optimization and bug fixing. Finally I've led the migration from PHP 5 to PHP 7 using the Laravel framework, significantly improving application efficiency and stability.",
    tags: ['PHP', 'Laravel'],
  },
  {
    id: 4,
    role: 'Web Application Developer',
    company: 'Hockerty',
    period: '2021 — 2023',
    description: "Developed Hockerty's website and internal tools.",
    tags: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
  },
]

const visibleItems = ref<Set<number>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'))
          visibleItems.value.add(id)
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('.timeline-item').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="experience-container">
      
      <div class="section-label">
        <span class="label-line" />
        <span class="label-text">Experience</span>
      </div>

      
      <h2 class="experience-hero-title">Career</h2>

      
      <div class="timeline">
        
        <div class="timeline-trunk" />

        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          :data-id="exp.id"
          class="timeline-item"
          :class="[
            index % 2 === 0 ? 'item-left' : 'item-right',
            { visible: visibleItems.has(exp.id) }
          ]"
        >
          
          <div class="timeline-branch" />

          
          <div class="timeline-node">
            <div class="node-dot" />
            <div class="node-ring" />
          </div>

          
          <div class="timeline-card">
            <span class="card-period">{{ exp.period }}</span>
            <h3 class="card-role">{{ exp.role }}</h3>
            <span class="card-company">@ {{ exp.company }}</span>
            <p class="card-description">{{ exp.description }}</p>
            <div class="card-tags">
              <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  width: 100%;
  padding: 6rem 0 8rem;
  background-color: var(--color-bg-primary);
  overflow: hidden;
}

.experience-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--container-padding);
  position: relative;
}


.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.label-line {
  width: 2rem;
  height: 1px;
  background: var(--variant-accent);
  transition: background var(--transition-theme);
}

.label-text {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--variant-accent);
  transition: color var(--transition-theme);
}


.experience-hero-title {
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%) scaleY(1.4);
  font-size: clamp(5rem, 18vw, 22rem);
  font-weight: 900;
  line-height: 0.8;
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-display);
  color: var(--variant-accent);
  opacity: 0.04;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  transition: color var(--transition-theme);
}


.timeline {
  position: relative;
  max-width: 1000px;
  margin: 4rem auto 0;
  z-index: 1;
}


.timeline-trunk {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: var(--color-border);
}

.timeline-trunk::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--variant-accent);
  transition: background var(--transition-theme);
}

.timeline-trunk::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--variant-accent);
  transition: background var(--transition-theme);
}


.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 50%;
  padding: 1.5rem 0;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item.item-left {
  margin-left: 0;
  justify-content: flex-end;
  padding-right: 3rem;
  transform: translateX(-30px);
}

.timeline-item.item-right {
  margin-left: 50%;
  justify-content: flex-start;
  padding-left: 3rem;
  transform: translateX(30px);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}


.timeline-node {
  position: absolute;
  top: 2rem;
  width: 12px;
  height: 12px;
  z-index: 2;
}

.item-left .timeline-node {
  right: -6px;
}

.item-right .timeline-node {
  left: -6px;
}

.node-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--variant-accent);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background var(--transition-theme);
  z-index: 2;
}

.node-ring {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--variant-accent);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  transition: border-color var(--transition-theme);
}


.timeline-branch {
  position: absolute;
  top: calc(2rem + 5px);
  height: 1px;
  width: 2rem;
  background: var(--color-border);
}

.item-left .timeline-branch {
  right: 0;
}

.item-right .timeline-branch {
  left: 0;
}


.timeline-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  max-width: 380px;
  transition: background var(--transition-theme), 
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

.timeline-card:hover {
  border-color: rgba(var(--variant-accent-rgb), 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.card-period {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--variant-accent);
  transition: color var(--transition-theme);
}

.card-role {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0.35rem 0 0.2rem;
  line-height: 1.3;
}

.card-company {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}

.card-description {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0.75rem 0;
  max-width: none;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  background: transparent;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.timeline-card:hover .tag {
  border-color: rgba(var(--variant-accent-rgb), 0.15);
  color: var(--color-text-secondary);
}


@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 0 5rem;
  }

  .timeline {
    margin-top: 2rem;
  }

  
  .timeline-trunk {
    left: 1rem;
  }

  .timeline-item,
  .timeline-item.item-left,
  .timeline-item.item-right {
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;
    padding-left: 3.5rem;
    padding-right: 0;
    transform: translateY(20px);
  }

  .timeline-item.visible {
    transform: translateY(0);
  }

  .item-left .timeline-node,
  .item-right .timeline-node {
    left: calc(1rem - 6px);
    right: auto;
  }

  .item-left .timeline-branch,
  .item-right .timeline-branch {
    left: 1rem;
    right: auto;
    width: 1.5rem;
  }

  .timeline-card {
    max-width: 100%;
  }

  .experience-hero-title {
    font-size: clamp(4rem, 20vw, 8rem);
    top: 3rem;
  }
}
</style>