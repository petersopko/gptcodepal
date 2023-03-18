<template>
    <n-card>
        <n-collapse accordion>
            <n-collapse-item title="Settings" name="1">
                <ApiKeyInput @save-api-key="saveApiKey" />
            </n-collapse-item>
        </n-collapse>
    </n-card>
</template>

<script setup>
import ApiKeyInput from "./ApiKeyInput.vue";

const emit = defineEmits(["save-api-key"]);


const saveApiKey = (apiKey) => {
    emit("save-api-key", apiKey);
};
</script>
