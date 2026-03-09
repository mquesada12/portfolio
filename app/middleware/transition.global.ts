import { useTransitionDirection } from '~/composables/useTransitionDirection'


export default defineNuxtRouteMiddleware((to, from) => {
  const { setDirection } = useTransitionDirection()
  setDirection(from.path, to.path)
})
