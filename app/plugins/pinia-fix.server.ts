import { setActivePinia, type Pinia } from 'pinia'
import { useVariantStore } from '~/stores/variant'

/**
 * Server-only plugin that sets the variant bridge state from the Pinia store.
 * The SSR crash fix is handled by pinia-patched.ts + modules/pinia-ssr-fix.ts.
 */
export default defineNuxtPlugin({
  name: 'pinia-variant-bridge',
  enforce: 'post', // Run after pinia-patched.ts has created the store
  setup(nuxtApp) {
    const variantBridge = useState<string>('app-variant', () => 'fullstack')

    if (import.meta.server) {
      const pinia = nuxtApp.$pinia as Pinia | undefined

      if (pinia) {
        setActivePinia(pinia)
        const store = useVariantStore(pinia)
        variantBridge.value = store.active
      }
    }
  }
})
