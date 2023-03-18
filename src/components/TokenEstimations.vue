<template>
    <div class="token-info-container">
        <div class="text-sm font-bold">
            Required Tokens (estimate): {{ tokenCount }}
            (${{ (tokenCount * 0.001 * 0.03).toFixed(3) }})
        </div>
        <div v-if="responseTokens > 0">
            <div class="token-info-item">
                Real Response Tokens: {{ responseTokens }}
                (${{ (responseTokens * 0.001 * 0.03).toFixed(3) }})
            </div>
            <div class="token-info-item">
                Real Prompt Tokens: {{ actualTokens }}
                (${{ (actualTokens * 0.001 * 0.03).toFixed(3) }})
            </div>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    responseTokens: {
        type: Number,
        required: false,
    },
    actualTokens: {
        type: Number,
        required: false,
    },
    tokenCount: {
        type: Number,
        required: true,
    },
});
</script>