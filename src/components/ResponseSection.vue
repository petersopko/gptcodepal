<template>
    <n-card title="Response">
        <div v-if="!response"> There is no response from the bot now. Don't hesitate and start prompting! </div>
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
