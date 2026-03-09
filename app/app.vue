<script setup lang="ts">
import { useVariantStore } from "~/stores/variant";
import { useTransitionDirection } from "~/composables/useTransitionDirection";

const el = ref<HTMLElement | null>(null);
const activeVariant = useState('app-variant');
const { transitionName } = useTransitionDirection();
</script>

<template>
  <div ref="el" :class="['app-root', `variant--${activeVariant}`]">
    <NuxtLayout>
      <NuxtPage :transition="{ name: transitionName, mode: 'out-in' }" />
    </NuxtLayout>
  </div>
</template>

<style>
/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>