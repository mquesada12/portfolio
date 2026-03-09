<template>
  <div class="layout-default">
    <LayoutNavbar />

    <main class="main-content">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  
  padding-top: 4rem;
}

@media (max-width: 768px) {
  .main-content {
    
    padding-top: 0;
    padding-bottom: 4.5rem;
  }
}
</style>
