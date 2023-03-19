<template>
    <n-card title="Description">
        <n-input v-model:value="modelValueRef" :default-value="modelValue" :placeholder="placeholder" type="textarea"
            @input="updateValue" />
    </n-card>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
    modelValue: String,
    placeholder: String,
    activeTab: Number,
});

const modelValueRef = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
    emit("update:modelValue", event);
}
</script>