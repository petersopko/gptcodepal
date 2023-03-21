<template>
    <div class="loader fixed inset-0 flex items-center justify-center" v-show="loading">
        <font-awesome-icon icon="cog" class="text-white cog-center" />
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

.cog-center {
    animation: spin 4s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
