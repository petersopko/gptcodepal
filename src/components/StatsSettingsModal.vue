<template>
    <n-button @click="showModal = true">
        Stats & Settings 📊
    </n-button>
    <n-modal v-model:show="showModal">
        <n-card style="width: 600px" title="Stats & Settings" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <n-grid class="mb-2" cols="3">
                <n-gi class="flex justify-center">
                    <n-statistic label="Prompt Tokens 🪙" :value="promptTokensTotal" />
                </n-gi>
                <n-gi class="flex justify-center">
                    <n-statistic label="Completion Tokens 🪙" :value="completionTokensTotal" />
                </n-gi>
                <n-gi class="flex justify-center items-center">
                    <n-statistic label="Prompts Sent 🗣️" :value="totalPromptsSent" />
                </n-gi>
            </n-grid>
            <n-card>
                <n-collapse>
                    <n-collapse-item title="API Key">
                        <ApiKeyInput @save-api-key="saveApiKey" />
                    </n-collapse-item>
                </n-collapse>
            </n-card>
            <template #footer>
                Close
            </template>
        </n-card>
    </n-modal>
</template>

<script setup>
import { ref } from "vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import { useStatsStore } from "../../store/statsStore";

const emit = defineEmits(["save-api-key"]);

const store = useStatsStore();
const showModal = ref(false);

const promptTokensTotal = ref(store.promptTokensTotal);
const completionTokensTotal = ref(store.completionTokensTotal);
const totalPromptsSent = ref(store.totalPromptsSent);

const saveApiKey = (apiKey) => {
    emit("save-api-key", apiKey);
};
</script>
