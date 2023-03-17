<template>
    <div class="animate-spin absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 border-t-4 border-white border-opacity-50 w-14 h-14 rounded-full"
        v-show="loading"></div>
</template>

<script setup lang="ts">
const props = defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
});
</script>
