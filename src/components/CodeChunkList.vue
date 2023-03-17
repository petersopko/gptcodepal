<template>
    <div class="border border-gray-300 p-4 rounded mb-4 input">
        <div v-for="(codeChunk, index) in codeChunks" :key="index">
            <CodeInput v-model="codeChunks[index]" name-placeholder="Name your code chunk"
                code-placeholder="Enter your code" :rows="20" :index="index" @remove="removeCodeChunk(index)" />
        </div>
        <AddCodeChunkButton @add="addCodeChunk" />
    </div>
</template>

<script setup>
import CodeInput from './CodeInput.vue';
import AddCodeChunkButton from './AddCodeChunkButton.vue';

const props = defineProps({
    codeChunks: Array,
});

const emit = defineEmits(['remove', 'add']);

const removeCodeChunk = (index) => {
    emit('remove', index);
};

const addCodeChunk = () => {
    emit('add');
};
</script>