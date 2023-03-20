<template>
    <div class="mb-2">
        <n-input v-model:value="name" placeholder="Name your code input" @input="updateValue" class="mb-4" />
        <n-input v-model:value="value" placeholder="Enter your code" type="textarea" @input="updateValue" />
    </div>
</template>
<script setup>
import { NInput } from "naive-ui";
import { ref, computed, watch } from "vue";

const props = defineProps({
    modelValue: Object,
    index: Number,
});

const emit = defineEmits(["update:modelValue", "remove"]);

const name = computed({
    get: () => props.modelValue.name,
    set: (value) => {
        props.modelValue.name = value;
    },
});
const value = ref(props.modelValue.code);

watch(
    () => value.value,
    (newValue) => {
        emit("update:modelValue", { index: props.index, name: name.value, code: newValue });
    },
    { deep: true }
);

function updateValue(event) {
    emit("update:modelValue", { index: props.index, name: name.value, code: event });
}
</script>
