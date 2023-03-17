<template>
    <div class="border border-gray-300 p-4 rounded mb-4">
        <div class="text-xl font-bold mb-2">
            Code Chunk {{ index + 1 }} <span v-if="modelValue.name">- {{ modelValue.name }}</span>
        </div>
        <input v-model="name" type="text"
            class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded mb-2 mx-auto bg-gray-800"
            :placeholder="namePlaceholder" />
        <textarea v-model="value" :placeholder="codePlaceholder" :rows="rows"
            class="min-w-full max-w-3xl p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"></textarea>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: Object,
    namePlaceholder: String,
    codePlaceholder: String,
    rows: Number,
    index: Number
});

const emit = defineEmits(["update:modelValue"]);

const name = ref(props.modelValue.name);
const value = ref(props.modelValue.code);

watch([name, value], () => {
    emit("update:modelValue", { name: name.value, code: value.value });
});
</script>
