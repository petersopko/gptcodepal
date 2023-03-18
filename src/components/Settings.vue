<template>
    <div class="bg-gray-800 border border-gray-300 py-2 px-4 rounded-none mb-5">
        <div class="flex items-center justify-between text-xl font-bold">
            <div>Settings</div>
            <IconButton @click="toggleFold" :icon="`chevron-${isFolded ? 'down' : 'up'}`" />
        </div>
        <div v-show="!isFolded">
            <div class="mt-4">
                <ApiKeyInput @save-api-key="saveApiKey" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import IconButton from "./IconButton.vue";
import ApiKeyInput from "./ApiKeyInput.vue";

const emit = defineEmits(["save-api-key"]);

const isFolded = ref(true);

const saveApiKey = (apiKey) => {
    emit("save-api-key", apiKey);
};

const toggleFold = () => {
    isFolded.value = !isFolded.value;
};
</script>
