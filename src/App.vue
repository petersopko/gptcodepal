<script setup>
import Interface from './views/Interface.vue';
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <Interface />
    </n-message-provider>
  </n-config-provider>
</template>

