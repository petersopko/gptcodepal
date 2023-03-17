<template>
    <div class="flex items-center mt-2 mb-4">
        <div class="text-sm font-bold mr-4">
            Estimated Prompt Tokens: {{ tokenCount }}
            (${{ (tokenCount * 0.001 * 0.03).toFixed(3) }})
        </div>
        <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
            @click="submitPrompt">
            Submit
        </button>
    </div>
</template>

<script setup>

const props = defineProps({
    tokenCount: Number,
});

const emit = defineEmits(['submit']);

const submitPrompt = () => {
    emit('submit');
};
</script>
