<template>
  <div class="px-8 text-left">
    <span v-for="(part, index) in parts" :key="index">
      <span
        v-if="part.isCode"
        class="bg-gray-800 p-1 rounded-none inline-block relative w-full overflow-x-auto"
      >
        <highlightjs autodetect :code="part.text" style="white-space: pre-wrap" />
        <button
          class="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-gray-700 rounded-none p-2 cursor-pointer hover:bg-gray-600"
          @click="copyToClipboard(part.text)"
        >
          <n-icon><ClipboardOutline /></n-icon>
        </button>
      </span>
      <span v-else style="white-space: pre-wrap">{{ part.text }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { ClipboardOutline } from '@vicons/ionicons5'

interface Part {
  text: string
  isCode: boolean
}

const props = defineProps<{ response: string }>()
const parts = computed<Part[]>(() => {
  const tripleBackticks = '```'
  let isCode = false
  let lastIndex = 0
  const parts = []

  for (let i = 0; i < props.response.length; i++) {
    if (props.response.substring(i, i + tripleBackticks.length) === tripleBackticks) {
      if (i > lastIndex) {
        const text = props.response.slice(lastIndex, i)
        const trimmedText = isCode ? text.replace(/^[a-zA-Z]*\n/, '').trim() : text
        parts.push({ text: trimmedText, isCode })
      }
      isCode = !isCode
      lastIndex = i + tripleBackticks.length
    }
  }

  // If the response ends with an open code block, add the remaining text as a code part
  if (isCode) {
    const text = props.response.slice(lastIndex)
    parts.push({ text, isCode })
  } else if (lastIndex < props.response.length) {
    parts.push({ text: props.response.slice(lastIndex), isCode: false })
  }

  return parts
})

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>
