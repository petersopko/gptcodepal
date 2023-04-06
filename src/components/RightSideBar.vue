<template>
  <div v-show="isRightSideBarVisible">
    <div class="overflow-y-auto relative">
      <CodeInputList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeInputList from '@/components/CodeInputList.vue'
import { useStatesStore } from '../stores/statesStore'

const statesStore = useStatesStore()

const isRightSideBarVisible = statesStore.getRightSideBarVisible()
</script>
