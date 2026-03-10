<script setup lang="ts">
import { useVariantContent } from '~/composables/useVariantContent'
import type { PortfolioVariant } from '~/stores/variant'

const { heroTitle, roleLabel, activeVariant, setVariant } = useVariantContent()

function selectVariant(variant: PortfolioVariant) {
  setVariant(variant)
}
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="container relative flex gap-5 flex-col">

      <div class="hero-content-top"> 
        <p><span class="label">Name:</span> Manuel Quesada Ruiz</p>
        <p><span class="label">Role:</span> {{ roleLabel }}</p>
        <p><span class="label">Experience:</span> +5 years</p>
        <br>
      </div>

      <div class="hero-content-body">
        <div class="hero-content-body-name">{{ heroTitle }}</div>
        
        <div class="hero-content-body-images flex flex-row w-full gap-4 p-2">
          <div class="hero-content-body-images-left rounded-sm" />
          <div class="hero-content-body-images-right rounded-sm" />
        </div>
      </div>

      <div class="hero-content-bottom flex flex-row align-center justify-between w-full"> 
        <button 
          class="role-selector variant-backend"
          :class="{ active: activeVariant === 'backend' }"
          @click="selectVariant('backend')"
        >BACKEND</button>
        <button 
          class="role-selector variant-frontend"
          :class="{ active: activeVariant === 'frontend' }"
          @click="selectVariant('frontend')"
        >FRONTEND</button>
        <button 
          class="role-selector variant-fullstack"
          :class="{ active: activeVariant === 'fullstack' }"
          @click="selectVariant('fullstack')"
        >FULL STACK</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .hero-section {
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
    margin-bottom:2rem;
  }

  .container {
    margin-top: 2vh;
    max-width: var(--container-max);
  }

  
  .hero-content-top {
    max-width: 20rem;
    top: 0;
    left:2rem;
  }

  .hero-content-top p {
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.8;
  }

  .hero-content-top .label {
    color: var(--variant-accent);
    font-weight: 600;
    transition: color var(--transition-theme);
  }

  .hero-content-top .text-primary {
    color: var(--variant-accent);
    font-weight: 600;
    transition: color var(--transition-theme);
  }

  
  .hero-content-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .hero-content-body-name {
    font-size: clamp(8rem, 25vw, 40rem);
    font-weight: 950;
    line-height: 0.65;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
        z-index: -1;

    letter-spacing: -0.02em;
    white-space: nowrap;
    display: inline-block;
    font-family: var(--font-title);

    
    transform: scaleY(1.4);
    transform-origin: center;

    
    color: var(--variant-accent);
    -webkit-text-fill-color: var(--variant-accent);
    transition: color var(--transition-theme), -webkit-text-fill-color var(--transition-theme);

    
    animation: fadeInUpTall 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeInUpTall {
    from {
      opacity: 0;
      transform: translateY(30px) scaleY(1.4);
    }
    to {
      opacity: 1;
      transform: translateY(0) scaleY(1.4);
    }
  }

  
  .hero-content-body-images {
    width: 100%;
    justify-content: center;
    margin-top: 4vh;
  }

  .hero-content-body-images-left,
  .hero-content-body-images-right {
    min-height: 400px;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    transition: background-color var(--transition-theme), border-color var(--transition-theme);
    overflow: hidden;
  }

  .hero-content-body-images-left {
    width: 65%;
  }

  .hero-content-body-images-right {
    width: 35%;
    display: flex;
    align-items: center;
    padding: var(--space-xl);
  }

  .code-panel {
    margin: 0;
    padding: var(--space-lg);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    white-space: pre;
    overflow-x: auto;
    height: 100%;
  }

  .panel-description {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.8;
    color: var(--color-text-muted);
  }

  
  .hero-content-bottom {
    margin-top: 2rem;
  }

  .role-selector {
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    color: var(--color-text-muted);
    background: none;
    border: none;
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
    position: relative;
    transition: color var(--transition-base);
  }

  .role-selector::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 2px;
    background-color: var(--variant-accent);
    transition: transform var(--transition-base), background-color var(--transition-theme);
  }

  .role-selector:hover {
    color: var(--color-text-primary);
  }

  .role-selector.active {
    color: var(--variant-accent);
  }

  .role-selector.active::after {
    transform: translateX(-50%) scaleX(1);
  }

  
  .variant-backend { --btn-accent: var(--backend-accent); }
  .variant-frontend { --btn-accent: var(--frontend-accent); }
  .variant-fullstack { --btn-accent: var(--fullstack-accent); }

  .variant-backend:hover { color: var(--backend-accent); }
  .variant-frontend:hover { color: var(--frontend-accent); }
  .variant-fullstack:hover { color: var(--fullstack-accent); }

  .variant-backend.active { color: var(--backend-accent); }
  .variant-frontend.active { color: var(--frontend-accent); }
  .variant-fullstack.active { color: var(--fullstack-accent); }

  .variant-backend.active::after { background-color: var(--backend-accent); }
  .variant-frontend.active::after { background-color: var(--frontend-accent); }
  .variant-fullstack.active::after { background-color: var(--fullstack-accent); }



  @media (max-width: 640px) {
    .hero-content-top {
      max-width: 100%;
    }

    .hero-content-body-images {
      flex-direction: column;
      margin-top: 2rem;
    }

    .hero-content-body-images-left,
    .hero-content-body-images-right {
      width: 100%;
      min-height: 200px;
    }

    .hero-content-body-images-right {
      display: none;
    }

    .hero-content-bottom {
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }

    .role-selector {
      font-size: 0.95rem;
      padding: var(--space-xs) var(--space-sm);
    }
  }
</style>
