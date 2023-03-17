<template>
    <div class="flex items-center mb-5">
        <label for="api-key-input" class="font-bold mr-2">OpenAI API Key:</label>
        <div class="relative w-full max-w-md">
            <input id="api-key-input" v-model="apiKey" :class="{ 'opacity-0': !inputFocused }" @focus="inputFocused = true"
                @blur="onBlur" type="text"
                class="w-full p-1 text-sm border border-green-500 rounded bg-gray-800 absolute" />
            <input id="api-key-hidden" :class="{ 'opacity-0': inputFocused }" @focus="inputFocused = true"
                :value="apiKeyHidden" type="text" readonly
                class="w-full p-1 text-sm border border-green-500 rounded bg-gray-800" />
        </div>
        <button class="ml-2 text-sm px-2 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
            @click="saveApiKey">
            Save API Key
        </button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(["save-api-key"]);

const apiKey = ref("");
const inputFocused = ref(false);
const apiKeyHidden = computed(() => (apiKey.value ? "*".repeat(apiKey.value.length) : ""));

onMounted(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
        apiKey.value = savedApiKey;
    }
});

const saveApiKey = () => {
    localStorage.setItem("openai_api_key", apiKey.value);
    emit("save-api-key", apiKey.value);
};

const onBlur = () => {
    setTimeout(() => (inputFocused.value = false), 200);
};
</script>