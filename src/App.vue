<script setup lang="ts">
import InterfaceView from './views/InterfaceView.vue'
import { NConfigProvider, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider placement="top">
      <n-message-provider>
        <InterfaceView />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
