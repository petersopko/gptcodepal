<template>
  <div v-show="isRightSideBarVisible">
    <div
      v-show="mobileMode"
      class="right-side-bar-add-chat flex flex-row justify-between mt-4 mx-4"
    >
      <LayoutToggle
        v-if="mobileMode"
        :is-side-bar-visible="isRightSideBarVisible"
        :window-width="windowWidth"
        :side-bar-width="sideBarWidth"
        :mobile-mode="mobileMode"
        :position="'right'"
        class="mb-4"
        @toggle-sidebar="toggleRightSidebar"
      />
    </div>
    <div class="overflow-y-auto relative">
      <CodeInputList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeInputList from '@/components/CodeInputList.vue'
import LayoutToggle from '../components/LayoutToggle.vue'
import { useStatesStore } from '../stores/statesStore'
import { ref, computed } from 'vue'
import { useWindowResize } from '../composables/useWindowResize'

const statesStore = useStatesStore()

const windowWidth = useWindowResize()
const sideBarWidth = ref(0)
const isRightSideBarVisible = statesStore.getRightSideBarVisible()
const mobileMode = computed(() => windowWidth.value <= 640)

const toggleRightSidebar = () => {
  statesStore.setRightSideBarVisible(!isRightSideBarVisible.value)
}
</script>
