<template>
    <div class="mb-2">
        <n-input v-model:value="name" :default-value="modelValue.name" placeholder="Name your code input" class="mb-4" />
        <n-input v-model:value="value" :default-value="modelValue.code" placeholder="Enter your code" type="textarea"
            @input="updateValue" />
    </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: Object,
    index: Number,

});

const emit = defineEmits(["update:modelValue", "remove"]);

const name = ref(props.modelValue.name);
const value = ref(props.modelValue.code);

watch(
    [name, value],
    () => {
        emit("update:modelValue", { name: name.value, code: value.value });
    },
    { deep: true }
);


function updateValue(event) {
    emit("update:modelValue", { name: name.value, code: event });
}
</script>
