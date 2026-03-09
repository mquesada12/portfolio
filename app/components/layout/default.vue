
<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="layout-default">
    <header class="navbar">
      <LayoutNavbar />
    </header>

    <main class="main-content" :class="{ 'main-content pb-0': route.path === '/projects' }">
      <slot />
    </main>

    <footer class="footer">
      <LayoutFooter />
    </footer>
  </div>
</template>
