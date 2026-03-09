import { setActivePinia } from 'pinia'
import { useVariantStore } from '~/stores/variant'

export default defineNuxtPlugin((nuxtApp) => {
  // Use a useState bridge for the app variant class
  // This is highly stable across SSR and avoids store access issues in root templates
  const variantBridge = useState<string>('app-variant', () => 'fullstack')
  
  if (import.meta.server) {
    // Force active pinia to ensure initial context
    if (nuxtApp.$pinia) {
      setActivePinia(nuxtApp.$pinia as any)
      
      // Update the bridge from the store
      const store = useVariantStore(nuxtApp.$pinia as any)
      variantBridge.value = store.active
    }

    // Reinforce context right before final rendering/serialization
    // This hook is where the Vercel error "Reading properties of undefined (reading 'state')"
    // usually happens in @pinia/nuxt. By setting it here, we mitigate context loss.
    nuxtApp.hook('app:rendered', () => {
      if (nuxtApp.$pinia) {
        setActivePinia(nuxtApp.$pinia as any)
      }
    })
  }
})
