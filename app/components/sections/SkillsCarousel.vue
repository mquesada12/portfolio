<script setup lang="ts">
import { useVariantStore } from '~/stores/variant'
import { useVariantContent } from '~/composables/useVariantContent'
import type { PortfolioVariant } from '~/stores/variant'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const variantStore = useVariantStore()
const { techStack } = useVariantContent()

const modules = [Autoplay]

function selectVariant(variant: PortfolioVariant) {
  variantStore.setVariant(variant)
}
</script>

<template>
  <section id="skills-carousel" class="skills-carousel-section">
    <div class="container h-[600px] flex flex-row justify-between gap-10">

      
      <div class="flex-1 h-full overflow-hidden marquee-column">
        <Swiper
          direction="vertical"
          slides-per-view="auto"
          :space-between="20"
          :loop="true"
          :speed="1000"
          :allow-touch-move="false"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :modules="modules"
          class="h-full"
        >
          <SwiperSlide v-for="skill in techStack" :key="skill" class="!h-auto">
            <UiCarouselCard :skill="skill" />
          </SwiperSlide>
        </Swiper>
      </div>

      
      <div class="flex-1 h-full overflow-hidden marquee-column">
        <Swiper
          direction="vertical"
          slides-per-view="auto"
          :space-between="20"
          :loop="true"
          :speed="1000"
          :allow-touch-move="false"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true
          }"
          :modules="modules"
          class="h-full"
        >
          <SwiperSlide v-for="skill in [...techStack].reverse()" :key="skill" class="!h-auto">
            <UiCarouselCard :skill="skill" />
          </SwiperSlide>
        </Swiper>
      </div>

      
      <div class="flex-1 h-full overflow-hidden marquee-column">
        <Swiper
          direction="vertical"
          slides-per-view="auto"
          :space-between="20"
          :loop="true"
          :speed="1000"
          :allow-touch-move="false"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :modules="modules"
          class="h-full"
        >
          <SwiperSlide v-for="skill in techStack" :key="skill" class="!h-auto">
            <UiCarouselCard :skill="skill" />
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  </section>
</template>

<style scoped>
  .skills-carousel-section {
    position: relative;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: var(--color-bg-primary);
    transition: background-color var(--transition-theme);
  }
  .marquee-column{
    overflow: hidden;
    pointer-events: none;
  }
  
  :deep(.marquee-column .swiper-wrapper) {
    transition-timing-function: linear !important;
  }
</style>