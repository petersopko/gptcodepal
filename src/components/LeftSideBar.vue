<template>
  <div
    v-show="isLeftSideBarVisible"
    class="side-bar flex flex-col w-full sm:w-2/5 lg:w-2/6 border-2 border-gray-200"
    :style="`border-color: ${themeVar.primaryColor};${
      windowWidth >= 640 ? 'border-right: none !important;' : ''
    }`"
  >
    <div class="side-bar-add-chat flex flex-row justify-between mt-4 mx-4">
      <SideBarTop :class="{ 'w-4/5': mobileMode }" />
      <LayoutToggle
        v-if="mobileMode"
        :is-side-bar-visible="isLeftSideBarVisible"
        :window-width="windowWidth"
        :side-bar-width="sideBarWidth"
        :mobile-mode="mobileMode"
        :position="'left'"
        @toggle-sidebar="toggleLeftSidebar"
      />
    </div>
    <div class="side-bar-chat-messages flex-grow overflow-y-auto">
      <SideBarChatList />
    </div>
    <div class="side-bar-settings flex-shrink-0">
      <SideBarSettings />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBarTop from '../components/Sidebar/SideBarTopControls.vue'
import SideBarChatList from '../components/Sidebar/SideBarChatList.vue'
import SideBarSettings from '../components/Sidebar/SideBarMenu.vue'
import LayoutToggle from '../components/LayoutToggle.vue'
import { useThemeVars } from 'naive-ui'
import { useStatesStore } from '../stores/statesStore'
import { ref, computed } from 'vue'
import { useWindowResize } from '../composables/useWindowResize'

const themeVar = useThemeVars()
const statesStore = useStatesStore()

const windowWidth = useWindowResize()
const sideBarWidth = ref(0)
const isLeftSideBarVisible = statesStore.getLeftSideBarVisible()
const mobileMode = computed(() => windowWidth.value <= 640)

const toggleLeftSidebar = () => {
  statesStore.setLeftSideBarVisible(!isLeftSideBarVisible.value)
}
</script>
