<template>
    <button class="text-lg px-6 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 mb-4"
        @click="submitPrompt">
        Submit
    </button>
</template>

<script setup>
const emit = defineEmits(["submit"]);

const submitPrompt = () => {
    emit("submit");
};
</script>
