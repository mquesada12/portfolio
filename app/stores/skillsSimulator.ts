import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface SkillMeta {
  icon: string
  desc: string
  proficiency: number
  tags: string[]
  contributions: string[]
  experience: string
}

const defaultSkillsData: Record<string, SkillMeta> = {
  'Vue 3': {
    icon: 'logos:vue',
    desc: 'Progressive JavaScript framework for building user interfaces.',
    proficiency: 90,
    tags: ['Frontend', 'SPA', 'Reactive'],
    contributions: ['Component architecture', 'State management', 'Composables'],
    experience: '+4 years',
  },
  'Nuxt JS': {
    icon: 'logos:nuxt-icon',
    desc: 'Full-stack framework built on Vue for server-side rendering.',
    proficiency: 85,
    tags: ['SSR', 'Full Stack', 'Meta-framework'],
    contributions: ['SEO optimization', 'Server routes', 'Auto-imports'],
    experience: '+3 years',
  },
  'Next JS': {
    icon: 'logos:nextjs-icon',
    desc: 'React framework for production-grade applications.',
    proficiency: 80,
    tags: ['SSR', 'React', 'Full Stack'],
    contributions: ['App router', 'API routes', 'ISR'],
    experience: '+2 years',
  },
  'TypeScript': {
    icon: 'logos:typescript-icon',
    desc: 'Typed superset of JavaScript for scalable applications.',
    proficiency: 88,
    tags: ['Language', 'Type Safety', 'DX'],
    contributions: ['Type definitions', 'Generic patterns', 'Strict mode'],
    experience: '+4 years',
  },
  'Shopify': {
    icon: 'logos:shopify',
    desc: 'E-commerce platform with custom theme and app development.',
    proficiency: 75,
    tags: ['E-commerce', 'Liquid', 'Storefront'],
    contributions: ['Theme development', 'App integrations', 'Performance'],
    experience: '+1 year',
  },
  'Java': {
    icon: 'logos:java',
    desc: 'Enterprise-grade programming language for backend systems.',
    proficiency: 70,
    tags: ['Backend', 'Enterprise', 'JVM'],
    contributions: ['REST APIs', 'Microservices', 'Spring Boot'],
    experience: '+2 years',
  },
  'Nest JS': {
    icon: 'logos:nestjs',
    desc: 'Progressive Node.js framework for scalable server-side apps.',
    proficiency: 85,
    tags: ['Backend', 'Node.js', 'TypeScript'],
    contributions: ['REST & GraphQL APIs', 'Guards & Pipes', 'Microservices'],
    experience: '+3 years',
  },
  'PHP': {
    icon: 'logos:php',
    desc: 'Server-side scripting language for web development.',
    proficiency: 85,
    tags: ['Backend', 'Server-side', 'Web'],
    contributions: ['API development', 'Legacy migration', 'Performance tuning'],
    experience: '+5 years',
  },
  'Symfony': {
    icon: 'logos:symfony',
    desc: 'PHP framework for web applications and reusable components.',
    proficiency: 80,
    tags: ['PHP', 'Framework', 'Enterprise'],
    contributions: ['Bundle development', 'Doctrine ORM', 'Event system'],
    experience: '+3 years',
  },
  'Laravel': {
    icon: 'logos:laravel',
    desc: 'Elegant PHP framework with expressive syntax.',
    proficiency: 88,
    tags: ['PHP', 'Framework', 'Rapid Dev'],
    contributions: ['Eloquent models', 'Queue workers', 'Blade templates'],
    experience: '+4 years',
  },
  'Docker': {
    icon: 'logos:docker-icon',
    desc: 'Container platform for building and deploying applications.',
    proficiency: 75,
    tags: ['DevOps', 'Containers', 'CI/CD'],
    contributions: ['Multi-stage builds', 'Docker Compose', 'CI pipelines'],
    experience: '+3 years',
  },
}

export const useSkillsSimulatorStore = defineStore('skillsSimulator', () => {
  const skills = ref<Record<string, SkillMeta>>({ ...defaultSkillsData })
  const selectedSkill = ref<string | null>(null)
  const apiResponse = ref<string>('')
  const isLoading = ref(false)

  const selectedSkillData = computed(() => {
    if (!selectedSkill.value) return null
    return skills.value[selectedSkill.value] ?? null
  })

  function selectSkill(name: string) {
    selectedSkill.value = name
  }

  function updateSkill(name: string, data: Partial<SkillMeta>) {
    if (skills.value[name]) {
      skills.value[name] = { ...skills.value[name], ...data } as SkillMeta
    }
  }

  function resetSkills() {
    skills.value = { ...defaultSkillsData }
    selectedSkill.value = null
    apiResponse.value = ''
  }

  async function simulateApiCall(method: string, endpoint: string, body?: string) {
    isLoading.value = true
    apiResponse.value = ''

    await new Promise((resolve) => setTimeout(resolve, 600))

    try {
      if (method === 'GET') {
        if (endpoint === '/api/skills') {
          apiResponse.value = JSON.stringify(
            Object.entries(skills.value).map(([name, meta]) => ({
              name,
              ...meta,
            })),
            null,
            2
          )
        } else if (endpoint.startsWith('/api/skills/')) {
          const skillName = decodeURIComponent(endpoint.replace('/api/skills/', ''))
          const skill = skills.value[skillName]
          if (skill) {
            apiResponse.value = JSON.stringify({ name: skillName, ...skill }, null, 2)
          } else {
            apiResponse.value = JSON.stringify({ error: 'Skill not found', status: 404 }, null, 2)
          }
        }
      } else if (method === 'PUT' && endpoint.startsWith('/api/skills/') && body) {
        const skillName = decodeURIComponent(endpoint.replace('/api/skills/', ''))
        const parsed = JSON.parse(body)
        updateSkill(skillName, parsed)
        apiResponse.value = JSON.stringify(
          { message: 'Updated successfully', data: { name: skillName, ...skills.value[skillName] } },
          null,
          2
        )
      } else if (method === 'DELETE' && endpoint.startsWith('/api/skills/')) {
        const skillName = decodeURIComponent(endpoint.replace('/api/skills/', ''))
        if (skillName === 'reset') {
          resetSkills()
          apiResponse.value = JSON.stringify({ message: 'Skills reset to defaults' }, null, 2)
        } else if (skills.value[skillName]) {
          const deletedSkill = { ...skills.value[skillName] }
          delete skills.value[skillName]
          if (selectedSkill.value === skillName) {
            selectedSkill.value = null
          }
          apiResponse.value = JSON.stringify(
            { message: `Skill "${skillName}" deleted successfully`, data: { name: skillName, ...deletedSkill } },
            null,
            2
          )
        } else {
          apiResponse.value = JSON.stringify({ error: `Skill "${skillName}" not found`, status: 404 }, null, 2)
        }
      } else if (method === 'POST' && endpoint === '/api/skills' && body) {
        const parsed = JSON.parse(body)
        const name = parsed.name
        if (!name) {
          apiResponse.value = JSON.stringify({ error: 'Missing "name" field', status: 400 }, null, 2)
        } else if (skills.value[name]) {
          apiResponse.value = JSON.stringify({ error: `Skill "${name}" already exists`, status: 409 }, null, 2)
        } else {
          skills.value[name] = {
            icon: parsed.icon || '',
            desc: parsed.desc || '',
            proficiency: parsed.proficiency || 0,
            tags: parsed.tags || [],
            contributions: parsed.contributions || [],
            experience: parsed.experience || '',
          }
          apiResponse.value = JSON.stringify(
            { message: 'Skill added successfully', data: { name, ...skills.value[name] } },
            null,
            2
          )
        }
      } else if (method === 'PATCH' && endpoint.startsWith('/api/skills/') && body) {
        const skillName = decodeURIComponent(endpoint.replace('/api/skills/', ''))
        if (!skills.value[skillName]) {
          apiResponse.value = JSON.stringify({ error: `Skill "${skillName}" not found`, status: 404 }, null, 2)
        } else {
          const parsed = JSON.parse(body)
          updateSkill(skillName, parsed)
          apiResponse.value = JSON.stringify(
            { message: 'Skill patched successfully', data: { name: skillName, ...skills.value[skillName] } },
            null,
            2
          )
        }
      }
    } catch (e: any) {
      apiResponse.value = JSON.stringify({ error: e.message, status: 500 }, null, 2)
    }

    isLoading.value = false
  }

  return {
    skills,
    selectedSkill,
    selectedSkillData,
    apiResponse,
    isLoading,
    selectSkill,
    updateSkill,
    resetSkills,
    simulateApiCall,
  }
})
