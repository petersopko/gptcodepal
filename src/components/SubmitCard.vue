<template>
    <n-card>
        <div class="flex justify-center">
            <n-button class="w-1/3 mt-4 mb-4" @click="submitPrompt">Submit 🚀 {{ `(Estimated tokens ${tokenCount || 0})`
            }}</n-button>
        </div>
    </n-card>
</template>

<script setup>
import { computed } from "vue";
import { useTabsStore } from "../../store/tabsStore";
import { countTokens } from "../composables/useTokenCount";

const emit = defineEmits(["submit"]);

const tabsStore = useTabsStore();
const activeTab = computed(() => tabsStore.activeTab);

const tokenCount = computed(() => {
    const text = `${activeTab.value.description}${activeTab.value.codeInputs
        .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
        .join("")}`;

    if (!text) {
        return 0;
    }
    return countTokens(text);
});

const submitPrompt = () => {
    emit("submit");
};
</script>
