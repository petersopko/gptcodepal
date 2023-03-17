<template>
    <div class="w-full whitespace-pre-wrap text-lg text-left">
        <span v-for="(part, index) in parts" :key="index">
            <span v-if="part.isCode" class="bg-gray-800 p-1 rounded inline-block relative">
                <code>{{ part.text }}</code>
                <button
                    class="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-gray-700 rounded p-1 cursor-pointer hover:bg-gray-600"
                    @click="copyToClipboard(part.text)">
                    <font-awesome-icon icon="clipboard" size="lg" />
                </button>
            </span>
            <span v-else>{{ part.text }}</span>
        </span>
    </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
const props = defineProps({ response: String, });
const parts = computed(() => {
    const regex = /```(.*?)```/gs;
    const parts = [];
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(props.response)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ text: props.response.slice(lastIndex, match.index), isCode: false });
        }
        parts.push({ text: match[1], isCode: true });
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < props.response.length) {
        parts.push({ text: props.response.slice(lastIndex), isCode: false });
    }

    return parts;
});
const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

</script> 