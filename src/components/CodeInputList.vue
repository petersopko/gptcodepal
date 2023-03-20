<template>
    <n-card title="Code Inputs" @dragenter.prevent="dragCounter++" @dragleave.prevent="dragCounter--" @dragover.prevent
        @drop.prevent="fileDropHandler">
        {{ loadedFiles }}
        <input type="file" ref="fileInput" @change="fileChangeHandler" style="display: none" multiple />
        <n-button @click="$refs.fileInput.click()">
            Load Files
        </n-button>
        <n-button @click="refreshFiles">Refresh Files</n-button>
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
import { NCard, NCollapse, NCollapseItem, NButton } from "naive-ui";
import CodeInput from './CodeInput.vue';
import IconButton from './IconButton.vue';
import { useTabsStore } from "../../store/tabsStore.js";
import { computed, ref } from 'vue';
import { watch } from "vue";

const tabsStore = useTabsStore();
// test aaag
const addCodeInput = () => {
    tabsStore.addCodeInput();
};
const fileInput = ref(null);
const loadedFiles = ref([]);
async function fileChangeHandler(event) {
    const files = event.target.files;
    loadedFiles.value = {};
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const content = await readFileContent(file);
        tabsStore.addCodeInputFromFile(file.name, content);
        loadedFiles.value[file.name] = { file, content }; // Use the file name as the key
    }
    // Reset the input value to ensure the change event is fired every time
    event.target.value = null;
}


async function refreshFiles() {
    console.log('test')
    for (const fileName in loadedFiles.value) {
        const { file } = loadedFiles.value[fileName];
        const index = codeInputsComputed.value.findIndex(
            (codeInput) => codeInput.name === file.name
        );
        console.log('index', index)
        if (index !== -1) {
            const newContent = await readFileContent(file);
            console.log('test2', newContent)

            tabsStore.updateCodeInput({ index, name: file.name, code: newContent });
        }
    }
}

const codeInputsComputed = computed(() => tabsStore.activeTab.codeInputs);

const dragCounter = ref(0);

async function fileDropHandler(event) {
    dragCounter.value = 0;

    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const content = await readFileContent(file);

        tabsStore.addCodeInputFromFile(file.name, content);
    }
}
async function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}
</script>
