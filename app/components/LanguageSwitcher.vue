<script setup>
const { locale, locales, setLocale } = useI18n()

const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <div class="flex gap-4">
    <NuxtLink 
      v-for="lang in availableLocales" 
      :key="lang.code" 
      :to="switchLocalePath(lang.code)"
    >
      {{ lang.name }}
    </NuxtLink> 
  </div>
</template>
