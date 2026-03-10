import { setActivePinia } from 'pinia'
import { watch } from 'vue'
import { useVariantStore } from '~/stores/variant'

export default defineNuxtPlugin({
  name: 'pinia-fix',
  parallel: true,
  setup(nuxtApp) {
    // Use a useState bridge for the app variant class
    // This is highly stable across SSR and avoids store access issues in root templates
    const variantBridge = useState<string>('app-variant', () => 'fullstack')
    
    if (import.meta.server) {
      // Find pinia instance through various possible paths in Nuxt 4
      const pinia = nuxtApp.$pinia || 
                    (nuxtApp.vueApp && nuxtApp.vueApp.config.globalProperties.$pinia) ||
                    (nuxtApp.ssrContext && (nuxtApp.ssrContext as any).pinia)

      if (pinia) {
        try {
          setActivePinia(pinia as any)
          
          // Update the bridge from the store
          const store = useVariantStore(pinia as any)
          if (store && store.active) {
            variantBridge.value = store.active
          }
        } catch (e) {
          console.warn('[pinia-fix] Failed to initialize store on server:', e)
        }
      }
    } else if (import.meta.client) {
      // Keep bridge in sync on client
      const store = useVariantStore()
      watch(() => store.active, (nv) => {
        variantBridge.value = nv
      }, { immediate: true })
    }
  }
})
