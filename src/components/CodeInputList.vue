<template>
  <n-card
    @dragenter.prevent="dragCounter++"
    @dragleave.prevent="dragCounter--"
    @dragover.prevent
    @drop.prevent="fileDropHandler"
  >
    <div class="text-center text-gray-600 mb-6">
      <p class="mb-4">Drop your code files here</p>
      <n-icon size="50">
        <DocumentAttachOutline />
      </n-icon>
    </div>
    <n-collapse :accordion="true" default-expanded-names="0" class="mb-6">
      <div v-for="(codeInput, index) in codeInputsComputed" :key="index" class="code-input mb-4">
        <n-collapse-item :title="codeInput.label" :name="String(index)">
          <div class="mb-2">
            <div class="flex flex-row align-middle mb-4"></div>
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
              rows="10"
              @input="() => inputStore.updateCodeInput(codeInput, index)"
            />
          </div>
          <template #header-extra>
            <div class="flex align-middle">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-gradient-text class="mr-4">
                    {{ `${getTokenCount(codeInput.label, codeInput.value)}` }}
                  </n-gradient-text>
                </template>
                Estimated tokens needed for code input
              </n-tooltip>

              <n-button
                v-if="currentDeleteIndex !== index"
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
              </n-button></div
          ></template>
        </n-collapse-item>
        <div>
          <n-card class="mt-2" :content-style="{ padding: '8px' }">
            <div class="flex">
              <n-checkbox
                class="mr-2"
                :checked="codeInput.attachedToPrompt"
                @update:checked="(checked) => inputStore.updateAttachedToPrompt(index, checked)"
              ></n-checkbox>

              <p class="mr-2">Attached to prompt</p>
            </div>
          </n-card>
        </div>
      </div>
    </n-collapse>
    <div class="flex justify-center space-x-4">
      <n-button @click="addCodeInput()"> Add Code Section </n-button>
      <n-button @click=";($refs.fileInput as HTMLInputElement).click()"> Upload Code </n-button>
    </div>
    <input type="file" ref="fileInput" @change="fileChangeHandler" style="display: none" multiple />
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NCollapse,
  NCollapseItem,
  NButton,
  NInput,
  NIcon,
  NCheckbox,
  NTooltip,
  NGradientText
} from 'naive-ui'
import { computed, ref } from 'vue'
import { useInputStore } from '@/stores/inputStore'
import {
  TrashOutline,
  CheckmarkOutline,
  CloseOutline,
  DocumentAttachOutline
  // AttachOutline
} from '@vicons/ionicons5'
import { countTokens } from '@/composables/useTokenCount' // Add this import

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

const getTokenCount = (label: string, value: string): number => {
  return countTokens(label) + countTokens(value)
}

const toggleDeleteMode = (index: number) => {
  if (currentDeleteIndex.value !== -1 && currentDeleteIndex.value !== index) {
    // Leaving delete mode
    isDeleteMode.value = false
    currentDeleteIndex.value = -1
  }
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
<style scoped>
.code-input {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
}
</style>
