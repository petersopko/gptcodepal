<template>
    <n-card title="Prompt Input">
        <n-input v-model:value="modelValueRef" :default-value="modelValue" :placeholder="placeholder" type="textarea"
            @input="updateValue" />
    </n-card>
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