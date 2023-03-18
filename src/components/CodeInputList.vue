<template>
    <div class="bg-gray-900 border border-gray-300 p-4 rounded-none mb-4 input">
        <div v-for="(codeInput, index) in codeInputs" :key="index">
            <CodeInput v-model="codeInputs[index]" name-placeholder="Name your code input"
                code-placeholder="Enter your code" :rows="20" :index="index" @remove="removeCodeInput(index)"
                :is-folded="!isLastCodeInput(index)" @update:isFolded="updateIsFolded(index, $event)" />
        </div>
        <n-button @click="addCodeInput">Add Code Section</n-button>
    </div>
</template>


<script setup>
import CodeInput from './CodeInput.vue';

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

const isLastCodeInput = (index) => {
    return index === props.codeInputs?.length - 1;
};
const updateIsFolded = (index, newVal) => {
    if (index < props.codeInputs.length - 1) {
        props.codeInputs[index].isFolded = newVal;
    }
};
</script>
