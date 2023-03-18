<template>
    <div class="bg-gray-800 border border-gray-300 p-4 rounded-none mb-4">
        <div class="flex items-center justify-between text-xl font-bold mb-4">
            <div>
                <span>{{ !modelValue.name ? 'Code Input ' + (index + 1) : modelValue.name }}</span>
            </div>
            <div>
                <IconButton icon="chevron-down" v-if="refIsFolded" @click="toggleFold" />
                <IconButton icon="chevron-up" v-else @click="toggleFold" />
                <IconButton icon="trash-alt" class="text-red" @click="$emit('remove')" />
            </div>
        </div>
        <div v-show="!refIsFolded">
            <n-input v-model:value="name" :default-value="modelValue.name" :placeholder="namePlaceholder" class="mb-4" />
            <n-input v-model:value="value" :default-value="modelValue.code" :placeholder="codePlaceholder" type="textarea"
                :rows="rows" :style="{ 'min-height': minHeight + 'px' }" @input="updateValue" />
        </div>
    </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import IconButton from "./IconButton.vue";

const props = defineProps({
    modelValue: Object,
    namePlaceholder: String,
    codePlaceholder: String,
    rows: Number,
    index: Number,
    minHeight: {
        type: Number,
        default: 100,
    },
    isFolded: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue", "remove"]);

const name = ref(props.modelValue.name);
const value = ref(props.modelValue.code);
const refIsFolded = ref(props.isFolded);

watch(
    [name, value],
    () => {
        emit("update:modelValue", { name: name.value, code: value.value });
    },
    { deep: true }
);

watch(
    () => props.isFolded,
    (newVal) => {
        refIsFolded.value = newVal;
    }
);

const toggleFold = () => {
    refIsFolded.value = !refIsFolded.value;
    emit("update:isFolded", refIsFolded.value);
};

function updateValue(event) {
    emit("update:modelValue", { name: name.value, code: event });
}
</script>
