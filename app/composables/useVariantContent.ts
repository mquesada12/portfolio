import { computed } from 'vue'
import { useVariantStore } from '~/stores/variant'
import type { PortfolioVariant } from '~/stores/variant'

interface VariantContent {
  heroTitle: string
  roleLabel: string
  panelDescription: string
  codeSnippet: string
  techStack: string[]
}

const contentMap: Record<string, VariantContent> = {
  frontend: {
    heroTitle: '.front',
    roleLabel: 'Frontend Developer',
    panelDescription: 'Building responsive, accessible, and performant user interfaces with Vue 3, Nuxt, and modern CSS.',
    codeSnippet: `const app = createApp(App)\napp.use(router)\napp.use(pinia)\napp.mount('#app')`,
    techStack: ['Vue 3', 'Nuxt JS', 'Next JS', 'TypeScript', 'Shopify'],
  },

  backend: {
    heroTitle: '.back',
    roleLabel: 'Backend Developer',
    panelDescription: 'The frontend components you see are powered by the backend APIs I build. This portfolio itself is the proof.',
    codeSnippet: `@Controller('/api')\nexport class AppController {\n  @Get('/skills')\n  getSkills() { ... }\n}`,
    techStack: ['Java', 'Nest JS', 'PHP', 'Symfony', 'Laravel', 'Docker'],
  },

  fullstack: {
    heroTitle: '.full',
    roleLabel: 'Full Stack Developer',
    panelDescription: 'End-to-end development from database design to pixel-perfect UIs. Every layer, every detail.',
    codeSnippet: `// Full Stack\nconst api = useApi()\nconst { data } = await api.get('/skills')\nrender(data)`,
    techStack: ['Java', 'Nest JS', 'PHP', 'Symfony', 'Laravel', 'Docker', 'Vue 3', 'Nuxt JS', 'Next JS', 'TypeScript', 'Shopify'],
  },
}

export function useVariantContent() {
  const variantBridge = useState<string>('app-variant', () => 'fullstack')
  const getStore = () => useVariantStore()

  const currentVariant = computed(() => {
    // Priority 1: Nuxt Native State (bridge)
    if (variantBridge.value) return variantBridge.value
    // Priority 2: Pinia Store
    try {
      return getStore().active
    } catch {
      return 'fullstack'
    }
  })

  const content = computed(() => {
    const variant = currentVariant.value
    return contentMap[variant] ?? contentMap.fullstack
  })

  /**
   * Sets the variant across both Pinia store AND the useState bridge.
   * This keeps the CSS class on app.vue (variant--xxx) in sync.
   */
  function setVariant(variant: PortfolioVariant) {
    // Update Pinia store
    try {
      getStore().setVariant(variant)
    } catch {
      // SSR fallback — store might not be available
    }
    // Update useState bridge (this is what app.vue reads for CSS classes)
    variantBridge.value = variant
  }

  return {
    activeVariant: currentVariant,
    setVariant,
    content,
    heroTitle: computed(() => content.value!.heroTitle),
    roleLabel: computed(() => content.value!.roleLabel),
    codeSnippet: computed(() => content.value!.codeSnippet),
    panelDescription: computed(() => content.value!.panelDescription),
    techStack: computed(() => content.value!.techStack),
  }
}
