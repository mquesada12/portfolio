import { computed } from 'vue'
import { useVariantStore } from '~/stores/variant'

interface VariantContent {
  heroTitle: string
  roleLabel: string
  tagline: string
  panelDescription: string
  codeSnippet: string
  techStack: string[]
}

const contentMap: Record<string, VariantContent> = {
  frontend: {
    heroTitle: '.front',
    roleLabel: 'Frontend Developer',
    tagline: 'Crafting pixel-perfect interfaces',
    panelDescription: 'Building responsive, accessible, and performant user interfaces with Vue 3, Nuxt, and modern CSS.',
    codeSnippet: `const app = createApp(App)\napp.use(router)\napp.use(pinia)\napp.mount('#app')`,
    techStack: ['Vue 3', 'Nuxt JS', 'Next JS', 'TypeScript', 'Shopify'],
  },

  backend: {
    heroTitle: '.back',
    roleLabel: 'Backend Developer',
    tagline: 'Engineering robust server architectures',
    panelDescription: 'The frontend components you see are powered by the backend APIs I build. This portfolio itself is the proof.',
    codeSnippet: `@Controller('/api')\nexport class AppController {\n  @Get('/skills')\n  getSkills() { ... }\n}`,
    techStack: ['Java', 'Nest JS', 'PHP', 'Symfony', 'Laravel', 'Docker'],
  },

  fullstack: {
    heroTitle: '.full',
    roleLabel: 'Full Stack Developer',
    tagline: 'Bridging frontend elegance with backend power',
    panelDescription: 'End-to-end development from database design to pixel-perfect UIs. Every layer, every detail.',
    codeSnippet: `// Full Stack\nconst api = useApi()\nconst { data } = await api.get('/skills')\nrender(data)`,
    techStack: ['Java', 'Nest JS', 'PHP', 'Symfony', 'Laravel', 'Docker', 'Vue 3', 'Nuxt JS', 'Next JS', 'TypeScript', 'Shopify'],
  },
}

export function useVariantContent() {
  const store = useVariantStore()

  const content = computed(() => {
    return contentMap[store.active] ?? contentMap.frontend
  })

  return {
    content,
    heroTitle: computed(() => content.value!.heroTitle),
    roleLabel: computed(() => content.value!.roleLabel),
    tagline: computed(() => content.value!.tagline),
    codeSnippet: computed(() => content.value!.codeSnippet),
    panelDescription: computed(() => content.value!.panelDescription),
    techStack: computed(() => content.value!.techStack),
  }
}
