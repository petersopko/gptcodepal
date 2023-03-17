<template>
    <div class="flex flex-col items-center mt-2 mb-4">
        <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 mb-4"
            @click="submitPrompt">
            Submit
        </button>
        <div class="text-sm font-bold">
            Estimated Prompt Tokens: {{ tokenCount }}
            (${{ (tokenCount * 0.001 * 0.03).toFixed(3) }})
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    tokenCount: Number,
});

const emit = defineEmits(["submit"]);

const submitPrompt = () => {
    emit("submit");
};
</script>
