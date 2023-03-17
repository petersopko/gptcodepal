<template>
    <div v-show="responseTokens > 0" class="token-info-container">
        <div class="token-info-item">
            Real Response Tokens: {{ responseTokens }} (${{ (responseTokens * 0.001 * 0.03).toFixed(3) }})
        </div>
        <div class="token-info-item">
            Real Prompt Tokens: {{ actualTokens }} (${{ (actualTokens * 0.001 * 0.03).toFixed(3) }})
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    responseTokens: {
        type: Number,
        required: true,
    },
    actualTokens: {
        type: Number,
        required: true,
    },
});
</script>

<style scoped>
.token-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
}

.token-info-item {
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}
</style>
