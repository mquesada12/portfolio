<script setup lang="ts">
import UiProjectTemplate from '../ui/ProjectTemplate.vue'

const projects = [
    { name: 'AI Translator', image: '/images/first-project-card.webp' },
    { name: 'Dashboard Analytics', image: '/images/second-project-card.png' },
    { name: 'Mobile Banking', image: '/images/third-project-card.png' },
]


</script>

<template>
    <div class="go-to-projects">
        
        <h2 class="hero-like-title">Projects</h2>
        
        <div class="content-wrapper">
            <div class="cards-section">
                <div class="stack-container">
                    <UiProjectTemplate 
                        v-for="(project, index) in projects"
                        :key="project.name"
                        :name="project.name"
                        :image="project.image"
                        :locked="true"
                        :class="['stacked-card', `card-${index}`, { 'is-first': index === 0 }]" 
                    />
                </div>
            </div>
            
            <div class="cta-section">
                <NuxtLink to="/projects" class="cta-button">
                    <span>View All</span>
                    <Icon class="icon" name="mdi:arrow-right" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.go-to-projects {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    padding: 5rem;
    background-color: var(--color-bg-primary);
    overflow: hidden;
}

.hero-like-title {
    position: absolute;
    font-size: clamp(5rem, 18vw, 22rem);
    font-weight: 950;
    line-height: 0.65;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
    z-index: 0;
    letter-spacing: -0.02em;
    white-space: nowrap;
    font-family: var(--font-display);
    transform: scaleY(1.4);
    transform-origin: center;
    color: var(--variant-accent);
    opacity: 0.8;
    pointer-events: none;
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

.content-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    max-width: var(--container-max);
    align-items: center;
    justify-content: center;
    gap: 5rem;
}

.cards-section {
    width: 50%;
    display: flex;
    justify-content: center;
}

.stack-container {
    position: relative;
    width: 30vw;
    height: 75vh;
}

:deep(.project-card) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease;
    border: 5px solid var(--color-bg-primary);
}


.card-0 {
    z-index: 3;
    transform: translate(0, 0);
}

.card-1 {
    z-index: 2;
    transform: translate(120px, 0px);
}

.card-2 {
    z-index: 1;
    transform: translate(240px, 0px);
}


.stacked-card:not(.card-0) {
    cursor: default !important;
    pointer-events: none; 
}

.stacked-card:not(.card-0) :deep(.project-name) {
    display: none !important; 
}

.cta-section {
    width: 40%;
    display: flex;
    justify-content: flex-end;
}

.cta-button {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: clamp(2rem, 3.5vw, 4rem);
    font-weight: 800;
    text-transform: uppercase;
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 1rem 2rem;
    background: var(--color-bg-primary);
}

.cta-button:hover {
    color: var(--variant-accent);
    background: var(--color-bg-primary);
    transform: translateX(10px);
}

.icon {
    font-size: 1.2em;
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

@media (max-width: 768px) {
    .go-to-projects {
        height: auto;
        min-height: 80vh;
        padding: 1rem 1.5rem;
    }
    .content-wrapper {
        flex-direction: column;
        gap: 2rem;
    }
    .cards-section, .cta-section {
        width: 100%;
        justify-content: center;
    }
    .stack-container {
        height: 90vw;
        opacity: 0.5;
        
        margin-left: -30vw; 
    }
    
    .card-1 {
        transform: translate(2.5vw, 0px) rotate();
    }

    .card-2 {
        transform: translate(5vw, 0px) rotate();
    }

    .cta-button {
        font-size: 2.2rem;
        padding: 1rem;
        gap: 1rem;
    }

    .hero-like-title {
        display: flex;
        flex-direction: column;
        top: 10%;
        left: 5%;
        transform: translate(-50%, -50%) scaleY(1.2);
        font-size: 12vw;
        line-height: 0.8;
        z-index: 1;
        letter-spacing: 0;
        white-space: normal;
        word-break: break-all;
        width: min-content;
        opacity: 0.6;
    }
}
</style>
