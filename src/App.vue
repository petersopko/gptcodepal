<script setup>
import Interface from './views/Interface.vue';
import { darkTheme } from 'naive-ui'

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <Interface />
  </n-config-provider>
</template>