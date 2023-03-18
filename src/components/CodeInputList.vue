<template>
    <n-card title="Code Inputs">
        {{ codeInputsComputed }}
        <n-collapse class="mb-6">
            <n-collapse-item v-for="(codeInput, index) in codeInputsComputed"
                :title="!codeInput.name ? 'Code Input ' + (index + 1) : codeInput.name" :name="index"
                default-expanded-names="1" accordion :key="index">
                <CodeInput :model-value="codeInput" :index="index" @update:modelValue="tabsStore.updateCodeInput($event)" />
                <template #header-extra>
                    <IconButton icon="trash-alt" class="text-red" @click="tabsStore.removeCodeInput(index)" />
                </template>
            </n-collapse-item>
        </n-collapse>
        <n-button @click="addCodeInput">Add Code Section</n-button>
    </n-card>
</template>

<script setup>
import CodeInput from './CodeInput.vue';
import IconButton from './IconButton.vue';
import { useTabsStore } from "../../store/tabsStore.js";
import { computed } from 'vue';
const tabsStore = useTabsStore();

const addCodeInput = () => {
    tabsStore.addCodeInput();
};

const codeInputsComputed = computed(() => tabsStore.activeTab.codeInputs);
</script>
