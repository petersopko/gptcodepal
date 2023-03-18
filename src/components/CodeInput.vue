<template>
    <div class="bg-gray-800 border border-gray-300 p-4 rounded-none mb-4">
        <div class="flex items-center justify-between text-xl font-bold mb-">
            <div>
                <span>{{ !modelValue.name ? 'Code Input ' + (index + 1) : modelValue.name }}</span>
            </div>
            <div>
                <button @click="toggleFold" class="text-lg text-white p-2 rounded-none mx-4">
                    <font-awesome-icon :icon="['fas', `chevron-${isFolded ? 'down' : 'up'}`]" />
                </button>
                <button @click="$emit('remove')" class="text-lg text-red p-2 rounded-none">
                    <font-awesome-icon icon="trash-alt" />
                </button>
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
