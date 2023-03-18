<template>
    <n-card title="Response">
        <ResponseContent :response="response" />
    </n-card>
</template>

<script setup>
import ResponseContent from './ResponseContent.vue';

const props = defineProps({
    response: String,
    responseTokens: Number,
    actualTokens: Number,
});
</script>
