<template>
    <n-card>
        <n-collapse>
            <n-collapse-item v-for="(codeInput, index) in codeInputs"
                :title="!codeInput.name ? 'Code Input ' + (index + 1) : codeInput.name" :name="String(index)"
                default-expanded-names="1" accordion :key="index">
                <CodeInput v-model="codeInputs[index]" :index="index" />
                <template #header-extra>
                    <IconButton icon="trash-alt" class="text-red" @click="removeCodeInput(index)" />
                </template>
            </n-collapse-item>
        </n-collapse>
        <n-button @click="addCodeInput">Add Code Section</n-button>
    </n-card>
</template>


<script setup>
import CodeInput from './CodeInput.vue';
import IconButton from './IconButton.vue';

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
