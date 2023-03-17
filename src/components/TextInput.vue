<template>
    <textarea v-model="value" :placeholder="placeholder" :rows="rows"
        class="w-full max-w-xl p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"></textarea>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
    modelValue: String,
    placeholder: String,
    rows: Number,
});

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(value, (newValue) => {
    emit("update:modelValue", newValue);
});
</script>
