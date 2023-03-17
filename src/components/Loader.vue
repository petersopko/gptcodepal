<template>
    <div class="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2" v-show="loading">
        <font-awesome-icon icon="cog" class="text-white text-9xl animate-spin" />
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
