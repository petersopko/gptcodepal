<template>
  <div
    class="loader fixed inset-0 flex items-center justify-center"
    v-if="loadingStore"
  >
    <font-awesome-icon icon="cog" class="text-white cog-center" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useStatesStore } from "../store/statesStore";

const statesStore = useStatesStore();
const loadingStore = computed(() => statesStore.isLoading);
</script>

<style scoped>
.loader {
  font-size: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.cog-center {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
