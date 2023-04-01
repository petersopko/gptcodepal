<template>
  <n-card
    title="Code Inputs"
    @dragenter.prevent="dragCounter++"
    @dragleave.prevent="dragCounter--"
    @dragover.prevent
    @drop.prevent="fileDropHandler"
  >
    <div class="text-center text-gray-600 mb-6">
      <p class="mb-4">Drag and drop your code files here</p>
      <n-icon size="50">
        <DocumentAttachOutline />
      </n-icon>
    </div>
    <n-collapse accordion default-expanded-names="0" class="mb-6">
      <n-collapse-item
        v-for="(codeInput, index) in codeInputsComputed"
        :title="codeInput.label"
        :name="String(index)"
        :key="index"
      >
        <div class="mb-2">
          <n-input
            v-model:value="codeInput.label"
            placeholder="Name your code input"
            class="mb-4"
            @input="() => inputStore.updateCodeInput(codeInput, index)"
          />
          <n-input
            v-model:value="codeInput.value"
            placeholder="Enter your code"
            type="textarea"
            @input="() => inputStore.updateCodeInput(codeInput, index)"
          />
        </div>
        <template #header-extra>
          <n-button
            v-if="!isDeleteMode"
            text
            style="font-size: 16px"
            :focusable="false"
            @click="toggleDeleteMode(index)"
          >
            <n-icon>
              <TrashOutline />
            </n-icon>
          </n-button>
          <!-- delete mode confirm -->
          <n-button
            v-if="isDeleteMode && currentDeleteIndex === index"
            text
            style="font-size: 16px"
            :focusable="false"
            class="mr-2"
            @click="deleteCode(index)"
          >
            <n-icon>
              <CheckmarkOutline />
            </n-icon>
          </n-button>
          <!-- delete mode cancel -->
          <n-button
            v-if="isDeleteMode && currentDeleteIndex === index"
            text
            style="font-size: 16px"
            :focusable="false"
            @click="toggleDeleteMode(index)"
          >
            <n-icon>
              <CloseOutline />
            </n-icon>
          </n-button>
        </template>
      </n-collapse-item>
    </n-collapse>
    <n-button class="mx-3" @click="addCodeInput()"> Add Code Section </n-button>
    <n-button @click=";($refs.fileInput as HTMLInputElement).click()"> Upload Code </n-button>
    <input type="file" ref="fileInput" @change="fileChangeHandler" style="display: none" multiple />
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NCollapse, NCollapseItem, NButton, NInput, NIcon } from 'naive-ui'
import { computed, ref } from 'vue'
import { useInputStore } from '@/stores/inputStore'
import {
  TrashOutline,
  CheckmarkOutline,
  CloseOutline,
  DocumentAttachOutline
} from '@vicons/ionicons5'

const fileInput = ref<HTMLInputElement | null>(null)
const dragCounter = ref(0)
const inputStore = useInputStore()
const codeInputsComputed = computed(() => inputStore.inputStorage.codeInputs)
const isDeleteMode = ref(false)
const currentDeleteIndex = ref(-1)

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

const toggleDeleteMode = (index: number) => {
  if (isDeleteMode.value && currentDeleteIndex.value === index) {
    // Leaving delete mode
    isDeleteMode.value = false
    currentDeleteIndex.value = -1
  } else {
    // Entering delete mode
    isDeleteMode.value = true
    currentDeleteIndex.value = index
  }
}

const deleteCode = (index: number) => {
  inputStore.deleteCodeInput(index)
  toggleDeleteMode(index)
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
