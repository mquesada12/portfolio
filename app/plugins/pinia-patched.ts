import { createPinia, setActivePinia, type Pinia } from 'pinia'
import { defineNuxtPlugin } from '#app'
import { toRaw } from 'vue'

/**
 * Patched version of @pinia/nuxt's plugin.vue3.js
 * 
 * The ONLY difference from the original: instead of using a `hooks` block
 * with `useNuxtApp()` (which fails on Vercel serverless due to lost async context),
 * we use `nuxtApp.hook()` inside `setup()` to capture nuxtApp via closure.
 */
const plugin = defineNuxtPlugin({
  name: 'pinia',
  setup(nuxtApp) {
    const pinia = createPinia()
    nuxtApp.vueApp.use(pinia)
    setActivePinia(pinia)

    if (nuxtApp.payload && nuxtApp.payload.pinia) {
      pinia.state.value = nuxtApp.payload.pinia as typeof pinia.state.value
    }

    if (import.meta.server) {
      // Original code uses:
      //   hooks: { 'app:rendered'() { const nuxtApp = useNuxtApp(); ... } }
      //
      // This fails because useNuxtApp() relies on async local storage context
      // which is lost in Vercel's serverless runtime.
      //
      // Fix: Use nuxtApp.hook() with closure-captured nuxtApp and pinia.
      nuxtApp.hook('app:rendered', () => {
        try {
          nuxtApp.payload.pinia = toRaw(pinia).state.value
        } catch {
          nuxtApp.payload.pinia = {} as Record<string, Record<string, unknown>>
        }
        setActivePinia(undefined as unknown as Pinia)
      })
    }

    return {
      provide: {
        pinia
      }
    }
  }
})

export default plugin
