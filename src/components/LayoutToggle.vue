<template>
  <div :style="mobileMode ? {} : toggleStyle">
    <n-button @click="toggle">
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
    type: [Number, String, null],
    required: true,
  },
  mobileMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-sidebar"]);

const toggleStyle = computed(() => {
  return {
    left: props.isSideBarVisible ? `${props.sideBarWidth + 20}px` : "20px",
  };
});

const toggle = () => {
  emit("toggle-sidebar");
};

watch(
  () => props.isSideBarVisible,
  (newValue) => {
    console.log("LayoutToggle: isSideBarVisible changed:", newValue);
  }
);
</script>
