import { defineNuxtModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

/**
 * Fixes the Pinia SSR crash on Vercel serverless:
 *   TypeError: Cannot read properties of undefined (reading 'state')
 *
 * This module removes @pinia/nuxt's original plugin.vue3 from the plugin list
 * and replaces it with our patched version (pinia-patched.server.ts) that
 * captures nuxtApp via closure instead of relying on useNuxtApp().
 */
export default defineNuxtModule({
  meta: {
    name: 'pinia-ssr-fix',
    configKey: 'piniaSSRFix',
  },
  setup(_options: Record<string, unknown>, nuxt: Nuxt) {
    // After all modules are done (including @pinia/nuxt), filter out its buggy plugin
    nuxt.hook('modules:done', () => {
      const originalPlugins = [...nuxt.options.plugins]
      nuxt.options.plugins = originalPlugins.filter((plugin: string | { src: string }) => {
        const src = typeof plugin === 'string' ? plugin : plugin.src
        // Remove the original @pinia/nuxt plugin.vue3 — we provide our own patched version
        if (src.includes('pinia') && src.includes('plugin.vue3')) {
          return false
        }
        return true
      })
    })
  }
})
