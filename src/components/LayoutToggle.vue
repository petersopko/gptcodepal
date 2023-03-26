<template>
  <div class="layout-toggle" :style="toggleStyle">
    {{ sideBarWidth }}
    <n-button quaternary circle @click="toggle">
      <template #icon>
        <n-icon v-if="isSideBarVisible">
          <arrow-back-sharp />
        </n-icon>
        <n-icon v-else>
          <arrow-forward-sharp />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup>
import { NButton, NIcon } from "naive-ui";
import { ArrowBackSharp, ArrowForwardSharp } from "@vicons/ionicons5";
import { computed } from "vue";
import { watch } from "vue";

const props = defineProps({
  isSideBarVisible: {
    type: Boolean,
    required: true,
  },
  windowWidth: {
    type: Number,
    required: true,
  },
  sideBarWidth: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(["toggle-sidebar"]);

const toggleStyle = computed(() => {
  return {
    left: props.isSideBarVisible
      ? props.windowWidth >= 640
        ? `calc(${props.sideBarWidth}px + 20px)`
        : `calc(${props.sideBarWidth}px + 20px)`
      : "20px",
  };
});

const toggle = () => {
  console.log("toglge");
  emit("toggle-sidebar");
};

watch(
  () => props.isSideBarVisible,
  (newValue) => {
    console.log("LayoutToggle: isSideBarVisible changed:", newValue);
  }
);
</script>

<style scoped>
.layout-toggle {
  position: fixed;
  top: 10px;
  z-index: 100;
}
</style>
