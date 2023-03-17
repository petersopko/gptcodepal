<template>
    <div class="flex flex-col items-center mt-2">
        <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 mb-4"
            @click="submitPrompt">
            Submit
        </button>
        <ResponseTokensInfo v-show="tokenCount > 0" :tokenCount="tokenCount" />
    </div>
</template>

<script setup>
import ResponseTokensInfo from './ResponseTokensInfo.vue';

const props = defineProps({
    tokenCount: Number,
});

const emit = defineEmits(["submit"]);

const submitPrompt = () => {
    emit("submit");
};
</script>
