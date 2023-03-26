<template>
  <div
    class="whole-screen min-h-screen max-h-screen flex flex-row justify-center xl:container xl:mx-auto"
  >
    <div
      class="side-bar flex flex-col w-full xl:w-1/5 border-2 border-gray-200"
      :style="`width: ${sideBarWidth}px; border-color: ${themeVar.primaryColor};`"
    >
      <div class="side-bar-add-chat flex-shrink-0">
        <SideBarTop />
      </div>
      <div class="side-bar-chat-messages flex-grow overflow-y-auto">
        <SideBarChatList />
      </div>
      <div class="side-bar-settings flex-shrink-0">
        <SideBarSettings />
      </div>
    </div>
    <div
      class="chat-container flex flex-col justify-between w-full xl:w-4/5 border-2"
      :style="`border-color: ${themeVar.primaryColor}; border-left: none !important;`"
    >
      <div class="chat-messages-container overflow-y-auto relative">
        <div
          v-if="chatStore.activeChat.messages.length === 0"
          class="robot-face"
        ></div>
        <ChatContainer />
      </div>

      <div class="chat-submit-card flex-shrink-0 bg-transparent">
        <SubmitCard
          :responseTokens="responseTokens"
          :promptTokens="promptTokens"
          @submit="submitPrompt"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, h } from "vue";
import { NGradientText } from "naive-ui";
import ChatContainer from "../components/Chat/ChatContainer.vue";
import SideBarChatList from "../components/Sidebar/SideBarChatList.vue";
import SideBarTop from "../components/Sidebar/SideBarTopControls.vue";
import useSubmit from "../composables/useSubmit.js";
import SubmitCard from "../components/SubmitCard.vue";
import SideBarSettings from "../components/Sidebar/SideBarMenu.vue";
import { useChatStore } from "../store/chatStore.js";
import { useStatesStore } from "../store/statesStore";
import { useThemeVars } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";
import PageHeader from "../components/PageHeader.vue";

const themeVar = useThemeVars();
const chatStore = useChatStore();
const windowWidth = ref(window.innerWidth);

const sideBarWidth = computed(() => (windowWidth.value <= 640 ? "100%" : 300));
const layoutTogglePosition = computed(() => ({
  right: windowWidth.value <= 640 ? "-20px" : "40px",
}));

const statesStore = useStatesStore();

const { submitPrompt, promptTokens, responseTokens } = useSubmit();

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  chatStore.updateActiveChat(chatStore.activeChatIndex);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style scoped>
.robot-face {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  -webkit-mask-image: url("../assets/robot-face.svg");
  mask-image: url("../assets/robot-face.svg");
  z-index: 1;
  background-blend-mode: overlay;
  background-image: linear-gradient(
      45deg,
      #63e2b7 25%,
      #85e9c7 50%,
      #63e2b7 75%
    ),
    linear-gradient(-45deg, #4bc9aa 25%, #63e2b7 50%, #4bc9aa 75%);
}
</style>
