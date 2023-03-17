<template>
    <div v-if="codeChunks.length >= 1" class="border border-gray-300 p-4 rounded mb-4 input">
        <div v-for="(codeChunk, index) in codeChunks" :key="index">
            <CodeInput v-model="codeChunks[index]" name-placeholder="Name your code chunk"
                code-placeholder="Enter your code" :rows="20" :index="index" @remove="removeCodeChunk(index)" />
        </div>
    </div>
</template>

<script setup>
import CodeInput from './CodeInput.vue';

const props = defineProps({
    codeChunks: Array,
});

const emit = defineEmits(['remove']);

const removeCodeChunk = (index) => {
    emit('remove', index);
};
</script>