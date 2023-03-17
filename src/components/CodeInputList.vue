<template>
    <div class="border border-gray-300 p-4 rounded mb-4 input">
        <div v-for="(codeInput, index) in codeInputs" :key="index">
            <CodeInput v-model="codeInputs[index]" name-placeholder="Name your code chunk"
                code-placeholder="Enter your code" :rows="20" :index="index" @remove="removeCodeInput(index)" />
        </div>
        <AddCodeInputButton @add="addCodeInput" />
    </div>
</template>

<script setup>
import CodeInput from './CodeInput.vue';
import AddCodeInputButton from './CodeInputAddButton.vue';

const props = defineProps({
    codeInputs: Array,

});

const emit = defineEmits(['remove', 'add']);

const removeCodeInput = (index) => {
    emit('remove', index);
};

const addCodeInput = () => {
    emit('add');
};
</script>