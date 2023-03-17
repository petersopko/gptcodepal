<template>
    <div class="border border-gray-300 p-4 rounded mb-4">
        <div class="flex items-center justify-between text-xl font-bold mb-">
            <div>
                <span>{{ !modelValue.name ? 'Code Input ' + (index + 1) : modelValue.name }}</span>
            </div>
            <div>
                <button @click="toggleFold" class="text-lg text-white p-2 rounded mx-4">
                    <font-awesome-icon :icon="['fas', `chevron-${isFolded ? 'down' : 'up'}`]" />
                </button>
                <button @click="$emit('remove')" class="text-lg text-red p-2 rounded">
                    <font-awesome-icon icon="trash-alt" />
                </button>
            </div>
        </div>
        <div v-show="!isFolded">
            <input v-model="name" type="text"
                class="min-w-full max-w-3xl p-2 text-lg border border-green-500 rounded mb-2 mx-auto bg-gray-800"
                :placeholder="namePlaceholder" />
            <textarea v-model="value" :placeholder="codePlaceholder" :rows="rows"
                class="min-w-full max-w-3xl p-2 text-lg border border-green-500 rounded resize-y mb-2 mx-auto bg-gray-800"
                :style="{ 'min-height': minHeight + 'px' }"></textarea>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

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

watch(
    [name, value],
    () => {
        emit("update:modelValue", { name: name.value, code: value.value });
    },
    { deep: true }
);

const toggleFold = () => {
    props.isFolded.value = !isFolded.value;
};
</script>
