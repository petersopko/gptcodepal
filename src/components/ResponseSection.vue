<template>
    <n-card title="Response">
        <ResponseContent :response="response" />
    </n-card>
</template>

<script setup>
import { NCard } from "naive-ui";
import ResponseContent from './ResponseContent.vue';

const props = defineProps({
    response: String,
});
</script>
