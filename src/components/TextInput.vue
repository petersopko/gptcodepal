
<template>
    <div class="border border-gray-300 p-4 rounded mb-4">
        <div class="flex items-center justify-between text-xl font-bold mb-2">
            <div>Description</div>
        </div>
        <textarea :value="modelValue" @input="updateValue" :placeholder="placeholder" :rows="rows"
            class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"></textarea>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    placeholder: String,
    rows: Number,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
    emit("update:modelValue", event.target.value);
}
</script>
