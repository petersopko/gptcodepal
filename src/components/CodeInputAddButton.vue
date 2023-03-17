
<template>
    <button class="text-sm px-6 py-2 bg-green-500 text-white rounded-none cursor-pointer hover:bg-green-600 mt-2 mb-4 mx-4"
        @click="addCodeInput">
        Add Code Section
    </button>
</template>


<script setup>
const emit = defineEmits(['add']);

const addCodeInput = () => {
    emit('add');
};
</script>
