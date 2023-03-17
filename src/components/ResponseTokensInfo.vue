<template>
    <div>
        <div class="text-sm font-bold mb-1">
            Real Response Tokens: {{ responseTokens }} (${{ (responseTokens * 0.001 * 0.03).toFixed(3) }})
        </div>
        <div class="text-sm font-bold mb-1">
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
