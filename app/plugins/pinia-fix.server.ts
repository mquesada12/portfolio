import { setActivePinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  // Pinia is automatically installed by the @pinia/nuxt module.
  // This plugin ensures that the active Pinia instance is correctly set
  // in the server environment's active context, which can sometimes be lost
  // on providers like Vercel during the finalization of the render.
  
  if (import.meta.server) {
    // Initial set
    if (nuxtApp.$pinia) {
      setActivePinia(nuxtApp.$pinia as any)
    }

    // Reinforce context right before final rendering/serialization
    nuxtApp.hook('app:rendered', () => {
      if (nuxtApp.$pinia) {
        setActivePinia(nuxtApp.$pinia as any)
      }
    })
  }
})
