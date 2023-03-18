<template>
    <div class="bg-gray-800 border border-gray-300 p-4 rounded-none mb-4">
        <div class="flex items-center justify-between text-xl font-bold mb-2">
            <div>Description</div>
        </div>
        <n-input v-model:value="modelValueRef" :default-value="modelValue" :placeholder="placeholder" type="textarea"
            @input="updateValue" />
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({
    modelValue: String,
    placeholder: String,
    activeTab: Number,
});

const modelValueRef = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
    emit("update:modelValue", event);
}

watchEffect(() => {
    modelValueRef.value = props.modelValue;
});
</script>