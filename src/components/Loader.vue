<template>
    <div class="loader fixed inset-0 flex items-center justify-center" v-show="loading">
        <font-awesome-icon icon="cog" class="text-white cog-horizontal" />
        <font-awesome-icon icon="cog" class="text-white cog-vertical ml-8" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
});
</script>

<style scoped>
.loader {
    font-size: 10rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.cog-horizontal {
    animation: spin 4s linear infinite, bounce-horizontal 4s infinite ease-in-out;
}

.cog-vertical {
    animation: spin 4s linear infinite, bounce-vertical 4s infinite ease-in-out;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes bounce-horizontal {

    0%,
    100% {
        transform: translateY(-50%) rotate(0deg);
    }

    50% {
        transform: translateY(50%) rotate(180deg);
    }
}

@keyframes bounce-vertical {

    0%,
    100% {
        transform: translateX(-50%) rotate(0deg);
    }

    50% {
        transform: translateX(50%) rotate(180deg);
    }
}
</style>
