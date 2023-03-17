<template>
    <div>
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
