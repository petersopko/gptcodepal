<template>
    <div class="rounded p-5 mt-5 w-full max-w-3xl bg-gray-900">
        <ResponseTokensInfo :responseTokens="responseTokens" :actualTokens="actualTokens" />
        <HighlightedCode :response="response" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ResponseTokensInfo from './ResponseTokensInfo.vue';
import HighlightedCode from './HighlightedCode.vue';

const props = defineProps({
    response: String,
    responseTokens: Number,
    actualTokens: Number,
});
</script>
