<script setup>
import Interface from "./views/Interface.vue";
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  darkTheme,
} from "naive-ui";
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider placement="top">
      <n-message-provider>
        <Interface />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
