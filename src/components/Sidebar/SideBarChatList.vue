<template>
  <n-scrollbar>
    <n-card
      v-for="(chat, index) in allChats"
      :key="index"
      @click="updateActiveChat(index)"
      :content-style="{
        'justify-content': 'space-between',
        display: 'flex',
        'align-items': 'center'
      }"
      class="chat-card mx-4 my-4 w-auto"
      size="small"
      :style="{
        'border-color': `${activeChatIndex === index ? `${themeVar.primaryColor}` : 'gray'}`
      }"
    >
      <div class="flex flex-row items-center">
        <n-icon text style="font-size: 16px" class="mr-2">
          <component :is="ChatboxEllipsesOutline" />
        </n-icon>
        <p v-if="currentEditIndex !== index">{{ chat.label }}</p>
        <input
          :ref="setInputBarRef"
          v-else
          type="text"
          v-model="tempChatLabel"
          maxlength="20"
          style="outline: none; background-color: transparent"
          @blur="cancelEditMode()"
          @keypress.enter="updateChatLabelFromTemp(index, tempChatLabel)"
        />
      </div>
      <div v-if="activeChatIndex === index" class="flex">
        <!-- pencil outline -->
        <n-button
          v-if="!isEditMode && !isDeleteMode"
          text
          style="font-size: 16px"
          :focusable="false"
          class="mr-2"
          @click="toggleEditMode(index, chat.label)"
        >
          <n-icon>
            <PencilOutline />
          </n-icon>
        </n-button>
        <!-- trash outline -->
        <n-button
          v-if="!isEditMode && !isDeleteMode"
          text
          style="font-size: 16px"
          :focusable="false"
          @click="toggleDeleteMode(index)"
        >
          <n-icon>
            <TrashOutline />
          </n-icon>
        </n-button>
        <!-- edit mode confirm -->
        <n-button
          v-if="isEditMode"
          text
          style="font-size: 16px"
          :focusable="false"
          class="mr-2"
          @click="updateChatLabelFromTemp(index, tempChatLabel)"
        >
          <n-icon>
            <CheckmarkOutline />
          </n-icon>
        </n-button>
        <!-- edit mode cancel -->
        <n-button
          v-if="isEditMode"
          text
          style="font-size: 16px"
          :focusable="false"
          @click="cancelEditMode()"
        >
          <n-icon>
            <CloseOutline />
          </n-icon>
        </n-button>

        <!-- delete mode confirm -->
        <n-button
          v-if="!isEditMode && isDeleteMode && currentDeleteIndex === index"
          text
          style="font-size: 16px"
          :focusable="false"
          class="mr-2"
          @click="deleteChat(index)"
        >
          <n-icon>
            <CheckmarkOutline />
          </n-icon>
        </n-button>
        <!-- delete mode cancel -->
        <n-button
          v-if="!isEditMode && isDeleteMode && currentDeleteIndex === index"
          text
          style="font-size: 16px"
          :focusable="false"
          @click="toggleDeleteMode(index)"
        >
          <n-icon>
            <CloseOutline />
          </n-icon>
        </n-button>
      </div>
    </n-card>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { NCard, NButton, NIcon, NScrollbar, useThemeVars } from 'naive-ui'
import {
  TrashOutline,
  PencilOutline,
  CheckmarkOutline,
  CloseOutline,
  ChatboxEllipsesOutline
} from '@vicons/ionicons5'
import { useChatStore } from '../../stores/chatStore'

const chatStore = useChatStore()
const { updateChatLabel } = chatStore
const themeVar = useThemeVars()

const allChats = ref(chatStore.allChats)
const tempChatLabel = ref('')
const currentEditIndex = ref(-1)
const currentDeleteIndex = ref(-1)
const isEditMode = ref(false)
const isDeleteMode = ref(false)

let inputBar: any
const setInputBarRef = (el: any) => {
  inputBar = el
}

const toggleEditMode = async (index: number, label: string) => {
  if (isEditMode.value && currentDeleteIndex.value === index) {
    // Leaving edit mode
    isEditMode.value = false
    currentEditIndex.value = -1
  } else {
    // Entering edit mode
    isEditMode.value = true
    currentEditIndex.value = index
    tempChatLabel.value = label

    await nextTick()
    if (inputBar) {
      inputBar.focus()
    }
  }
}

const updateChatLabelFromTemp = (index: number, label: string) => {
  updateChatLabel(index, label)
  cancelEditMode()
}

const cancelEditMode = () => {
  currentEditIndex.value = -1
  isEditMode.value = false
}

const toggleDeleteMode = (index: number) => {
  if (!isEditMode.value) {
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
}

const activeChatIndex = computed(() => {
  return chatStore.activeChatIndex
})

const updateActiveChat = (index: number) => {
  chatStore.updateActiveChat(index)
}

const deleteChat = (index: number) => {
  chatStore.deleteChat(index)
  isDeleteMode.value = false
}

watch(
  () => activeChatIndex.value,
  () => {
    if (isDeleteMode.value) {
      isDeleteMode.value = false
      currentDeleteIndex.value = -1
    }
  }
)
</script>

<style scoped>
.chat-card {
  cursor: pointer;
}
</style>
