<template>
    <n-button class="mx-1" @click="onClick">
        <font-awesome-icon :icon="['fas', icon]" />
    </n-button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    icon: String,
});

const emit = defineEmits(["click"]);

const onClick = () => {
    emit("click");
};
</script>
