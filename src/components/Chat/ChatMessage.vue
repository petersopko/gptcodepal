<template>
  <div class="px-8 text-left">
    <span v-for="(part, index) in parts" :key="index">
      <span
        v-if="part.isCode"
        class="bg-gray-800 p-1 rounded-none inline-block relative w-full overflow-x-auto"
      >
        <highlightjs :code="part.text" style="white-space: pre-wrap" />
        <button
          class="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-gray-700 rounded-none p-2 cursor-pointer hover:bg-gray-600"
          @click="copyToClipboard(part.text)"
        >
          <font-awesome-icon icon="clipboard" size="2x" />
        </button>
      </span>
      <span v-else>{{ part.text }}</span>
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { NScrollbar } from "naive-ui";

const props = defineProps({ response: String });
const parts = computed(() => {
  const regex = /```(.*?)```/gs;
  const parts = [];
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(props.response)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: props.response.slice(lastIndex, match.index),
        isCode: false,
      });
    }
    // Remove the language name from the beginning of the code block
    const code = match[1].replace(/^[a-zA-Z]+\n/, "");
    parts.push({ text: code, isCode: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < props.response.length) {
    parts.push({ text: props.response.slice(lastIndex), isCode: false });
  }

  return parts;
});
const copyToClipboard = (text) => {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
</script>