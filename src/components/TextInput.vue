<template>
    <n-card title="Description">
        <n-input :value="description" :placeholder="placeholder" type="textarea" @input="updateDescription($event)" />
    </n-card>
</template>

<script setup>
import { computed } from "vue";
import { useTabsStore } from "../../store/tabsStore";
const props = defineProps({
    placeholder: String,
});

const tabsStore = useTabsStore();
const description = computed(() => tabsStore.activeTab.description);

const updateDescription = (event) => {
    tabsStore.updateDescription(event);
}
</script>
