<template>
    <n-card>
        <div class="flex justify-center">
            <n-button class="w-1/3 mt-4 mb-4" @click="submitPrompt">Submit 🚀</n-button>
        </div>
        <n-card>
            <TokenEstimations :tokenCount="tokenCount" :responseTokens="responseTokens" :actualTokens="actualTokens" />
        </n-card>
    </n-card>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import TokenEstimations from './TokenEstimations.vue';
const emit = defineEmits(["submit"]);

const props = defineProps({
    tokenCount: {
        type: Number,
        required: true,
    },
    responseTokens: {
        type: Number,
        default: 0,
    },
    actualTokens: {
        type: Number,
        required: false,
    },
});

// emit submit prompt 
const submitPrompt = () => {
    emit('submit');
}
</script>
