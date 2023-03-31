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
      <div>
        <p v-if="currentEditIndex !== index">{{ chat.label }}</p>
        <input
          :ref="setInputBarRef"
          v-else
          type="text"
          v-model="tempChatLabel"
          maxlength="20"
          style="outline: none; background-color: transparent"
          @blur="cancelEditMode()"
        />
      </div>
      <div class="flex justify-around">
        <n-button
          text
          style="font-size: 16px"
          :focusable="false"
          @click="
            currentEditIndex === index
              ? updateChatLabelFromTemp(index, tempChatLabel)
              : toggleEditMode(index, chat.label)
          "
        >
          <n-icon>
            <component :is="currentEditIndex === index ? CheckmarkOutline : PencilOutline" />
          </n-icon>
        </n-button>
        <n-button
          text
          style="font-size: 16px"
          :focusable="false"
          @click="
            ($event) =>
              currentEditIndex === index
                ? toggleEditMode(index, chat.label)
                : deleteChat(index, $event)
          "
        >
          <n-icon>
            <component :is="currentEditIndex === index ? CloseOutline : TrashOutline" />
          </n-icon>
        </n-button>
      </div>
    </n-card>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { NCard, NButton, NIcon, NScrollbar, useThemeVars } from 'naive-ui'
import { TrashOutline, PencilOutline, CheckmarkOutline, CloseOutline } from '@vicons/ionicons5'
import { useChatStore } from '../../stores/chatStore'

const chatStore = useChatStore()
const { updateChatLabel } = chatStore
const themeVar = useThemeVars()

const allChats = ref(chatStore.allChats)
const tempChatLabel = ref('')
const currentEditIndex = ref(-1)

// any is for losers
let inputBar: any
const setInputBarRef = (el: any) => {
  inputBar = el
}

const toggleEditMode = async (index: number, label: string) => {
  console.log('toggle edit mode')
  if (currentEditIndex.value === index) {
    currentEditIndex.value = -1
  } else {
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
  console.log('cancel edit mode')
  currentEditIndex.value = -1
}

const activeChatIndex = computed(() => {
  return chatStore.activeChatIndex
})

const updateActiveChat = (index: number) => {
  chatStore.updateActiveChat(index)
}

const deleteChat = (index: number, event: MouseEvent) => {
  event.stopPropagation() // Stop event propagation
  chatStore.deleteChat(index)
}
</script>

<style scoped>
.chat-card {
  cursor: pointer;
}
</style>
