<template>
  <n-list bordered>
    <!-- <n-list-item>
      <div class="flex justify-center mt-2">
        <p>Mode</p>
        <n-radio-group>
          <n-radio>Basic</n-radio>
          <n-radio>Advanced</n-radio>
        </n-radio-group>
      </div>
    </n-list-item> -->
    <n-list-item>
      <SystemMessageDropdown />
    </n-list-item>
    <n-list-item>
      <ApiKeyInput />
    </n-list-item>

    <!-- <n-list-item>
      <SettingsAdvanced />
    </n-list-item> -->
    <!-- <n-list-item>
      <div class="flex-1 flex justify-center space-x-4">
        <n-icon size="10">
          <InformationCircleIcon />
        </n-icon>
        <n-icon size="10">
          <GithubIcon />
        </n-icon>
        <n-icon size="20">
          <AccessibilityIcon />
        </n-icon>
      </div>
    </n-list-item> -->
  </n-list>
</template>

<script setup lang="ts">
import { NList, NListItem } from 'naive-ui'
import ApiKeyInput from '../ApiKeyInput.vue'
import SystemMessageDropdown from '../SystemMessageDropdown.vue'
</script>
