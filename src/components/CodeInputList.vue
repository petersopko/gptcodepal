<template>
  <n-card
    title="Code Inputs"
    @dragenter.prevent="dragCounter++"
    @dragleave.prevent="dragCounter--"
    @dragover.prevent
    @drop.prevent="fileDropHandler"
  >
    <div class="text-center text-gray-600 mb-6">Drop your code here</div>
    <n-collapse accordion default-expanded-names="0" class="mb-6">
      <n-collapse-item
        v-for="(codeInput, index) in codeInputsComputed"
        :title="codeInput.label"
        :name="String(index)"
        :key="index"
      >
        <CodeInput
          :model-value="codeInput"
          :index="index"
          @update:modelValue="inputStore.updateCodeInput(codeInput, index)"
        />
        <template #header-extra>
          <div>test</div>
        </template>
      </n-collapse-item>
    </n-collapse>
    <n-button class="mx-3" @click="addCodeInput()"> Add Code Section </n-button>
    <!-- <n-button @click="$refs.fileInput.click()"> Upload Code </n-button> -->
    <input type="file" ref="fileInput" @change="fileChangeHandler" style="display: none" multiple />
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NCollapse, NCollapseItem, NButton } from 'naive-ui'
import CodeInput from './CodeInput.vue'
import { computed, ref } from 'vue'
import { useInputStore } from '@/stores/inputStore'

const fileInput = ref(null)
const dragCounter = ref(0)
const inputStore = useInputStore()
const codeInputsComputed = computed(() => inputStore.inputStorage.codeInputs)

const addCodeInput = () => {
  inputStore.addCodeInput()
}

async function fileChangeHandler(event: any) {
  const files = event.target.files

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const content = await readFileContent(file)
    inputStore.addCodeInputFromFile(file.name, content)
  }

  event.target.value = null
}

async function fileDropHandler(event: any) {
  dragCounter.value = 0

  const files = event.dataTransfer.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const content = await readFileContent(file)
    inputStore.addCodeInputFromFile(file.name, content)
  }
}

// any is a hack to get around the fact that FileReader is not a generic
async function readFileContent(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target?.result)
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}
</script>
