<template>
  <div class="mb-2">
    <n-input v-model:value="label" placeholder="Name your code input" class="mb-4" />
    <n-input v-model:value="value" placeholder="Enter your code" type="textarea" />
  </div>
</template>
<script setup lang="ts">
import { NInput } from 'naive-ui'
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: {
    label: string
    value: string
  }
  index: number
}>()

const emit = defineEmits(['update:modelValue', 'remove'])

const label = computed({
  get: () => props.modelValue.label,
  set: (value) => {
    emit('update:modelValue', {
      index: props.index,
      label: value,
      value: props.modelValue.value
    })
  }
})
const value = ref(props.modelValue.value)

watch(
  () => ({ label: value.value, value: value.value }),
  (newValue) => {
    emit('update:modelValue', {
      index: props.index,
      label: newValue.label,
      value: newValue.value
    })
  },
  { deep: true }
)
</script>
