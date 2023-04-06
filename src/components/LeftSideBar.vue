<template>
  <div v-show="isLeftSideBarVisible">
    <div class="side-bar-add-chat flex flex-row justify-between mt-4 mx-4">
      <SideBarTop :class="{ 'w-4/5': isMobile }" />
      <LayoutToggle
        v-if="isMobile"
        :is-side-bar-visible="isLeftSideBarVisible"
        :window-width="windowWidth"
        :side-bar-width="sideBarWidth"
        :mobile-mode="isMobile"
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
import { useStatesStore } from '../stores/statesStore'
import { ref } from 'vue'
import { useWindowResize } from '../composables/useWindowResize'

const statesStore = useStatesStore()

const { windowWidth, isMobile } = useWindowResize()
const sideBarWidth = ref(0)
const isLeftSideBarVisible = statesStore.getLeftSideBarVisible()

const toggleLeftSidebar = () => {
  statesStore.setLeftSideBarVisible(!isLeftSideBarVisible.value)
}
</script>
