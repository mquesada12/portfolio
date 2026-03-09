<script setup lang="ts">
const props = defineProps({
    skill: {
        type: String,
        required: true
    }
})

const skillDescription = computed(() => {
    return `I have ${props.skill} years of experience in ${props.skill}`
})
</script>

<template>
    <div class="carousel-card rounded-md">
        <div class="carousel-card-image">
            <img src="" alt="">
        </div>
        <div class="carousel-card-content">
            <h3 class="carousel-card-title">{{ skill }}</h3>
            <p class="carousel-card-description">{{ skillDescription }}</p>
            <div class="code-snippet">
                <pre><code>{{ skill }}</code></pre>
            </div>
            <div class="carousel-card-footer">
                <button class="carousel-card-button">View</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .carousel-card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 5px;
        align-items: center;
        overflow: hidden;
        background-color: var(--color-bg-primary);
        transition: background-color var(--transition-theme);
        border: 1px solid var(--color-border);
        padding: 20px;
    }
    .carousel-card-image {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: var(--color-bg-primary);
        transition: background-color var(--transition-theme);
    }
    .carousel-card-content {
        width: 100%;
        height: 100%;
        display: flex;

        flex-direction: column;
        justify-content: start;
        align-items: start;
        overflow: hidden;
        background-color: var(--color-bg-primary);
        transition: background-color var(--transition-theme);
    }
    .carousel-card-title {
        height: 100%;
        overflow: hidden;
        background-color: var(--color-bg-primary);
        transition: background-color var(--transition-theme);
    }
    .carousel-card-description {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: var(--color-bg-primary);
        transition: background-color var(--transition-theme);
    }
</style>
