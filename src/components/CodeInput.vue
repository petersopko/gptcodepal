<template>
    <div class="mb-4">
        <input v-model="name" type="text"
            class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded mb-2 mx-auto bg-gray-800"
            :placeholder="namePlaceholder" />
        <textarea v-model="value" :placeholder="codePlaceholder" :rows="rows"
            class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"></textarea>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: Object,
    namePlaceholder: String,
    codePlaceholder: String,
    rows: Number,
});

const emit = defineEmits(["update:modelValue"]);

const name = ref(props.modelValue.name);
const value = ref(props.modelValue.code);

watch([name, value], () => {
    emit("update:modelValue", { name: name.value, code: value.value });
});
</script>
