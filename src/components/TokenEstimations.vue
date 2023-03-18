<template>
    <n-grid :cols="3">
        <n-gi>
            <n-statistic label="Required Tokens (estimate)"
                :value="`${tokenCount} ($${(tokenCount * 0.001 * 0.03).toFixed(3)})`" />
        </n-gi>
        <n-gi>
            <n-statistic label="Real Response Tokens"
                :value="`${responseTokens} ($${(responseTokens * 0.001 * 0.03).toFixed(3)})`" />
        </n-gi>
        <n-gi>
            <n-statistic label="Real Prompt Tokens"
                :value="`${promptTokens} ($${(promptTokens * 0.001 * 0.03).toFixed(3)})`" />
        </n-gi>
    </n-grid>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    responseTokens: {
        type: Number,
        default: 0,
    },
    promptTokens: {
        type: Number,
        required: false,
    },
    tokenCount: {
        type: Number,
        required: true,
    },
});
</script>
