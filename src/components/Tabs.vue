<template>
    <n-tabs :value="activeTab" type="card" @update:value="updateActiveTab" :addable="addableRef" :closable="closable"
        tab-style="min-width: 80px;" @close="deleteTab" @add="addTab">
        <n-tab-pane v-for="(tab, index) in tabsRef" :key="index" :name="index">
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    tabs: Array,
    activeTab: Number,
});

const emits = defineEmits([
    "update:activeTab",
    "add-tab",
    "delete-tab",
]);

const updateActiveTab = (index) => {
    emits("update:activeTab", index);
};

const addTab = () => {
    emits("add-tab");
};

const deleteTab = (index) => {
    emits("delete-tab", index);
};

const tabsRef = computed(() => {
    return props.tabs;
});
const addableRef = computed(() => {
    return {
        disabled: tabsRef.value.length >= 10
    }
})

const closable = props.tabs.length > 1;
</script>
