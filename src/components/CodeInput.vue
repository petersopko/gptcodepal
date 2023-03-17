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
            <input v-model="name" type="text"
                class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded-none mb-2 mx-auto bg-gray-800"
                :placeholder="namePlaceholder" />
            <textarea v-model="value" :placeholder="codePlaceholder" :rows="rows"
                class="w-full max-w-3xl p-2 text-lg border border-green-500 rounded-none resize-y mb-2 mx-auto bg-gray-800"
                :style="{ 'min-height': minHeight + 'px' }"></textarea>
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
</script>
