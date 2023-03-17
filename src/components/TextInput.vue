<template>
    <div class="border border-gray-300 p-4 rounded mb-4">
        <div class="text-xl font-bold mb-2">Description</div>
        <textarea v-model="value" :placeholder="placeholder" :rows="rows"
            class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"></textarea>
    </div>
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