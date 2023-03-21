<script setup>
import Interface from './views/Interface.vue';
import { NConfigProvider, NMessageProvider, darkTheme, NSpace } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <n-space justify="center">
        <Interface />
      </n-space>
    </n-message-provider>
  </n-config-provider>
</template>