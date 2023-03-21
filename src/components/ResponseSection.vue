<template>
    <n-card>
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
