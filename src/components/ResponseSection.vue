<template>
    <div class="bg-gray-900 border border-gray-700">
        <ResponseSectionHeadline />
        <ResponseTokensInfo :responseTokens="responseTokens" :actualTokens="actualTokens" />
        <ResponseContent :response="response" />
    </div>
</template>

<script setup>
import ResponseSectionHeadline from './ResponseSectionHeadline.vue';
import ResponseTokensInfo from './ResponseTokensInfo.vue';
import ResponseContent from './ResponseContent.vue';

const props = defineProps({
    response: String,
    responseTokens: Number,
    actualTokens: Number,
});
</script>
