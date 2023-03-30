<template>
  <div class="mb-2">
    <n-input v-model:value="name" placeholder="Name your code input" class="mb-4" />
    <n-input v-model:value="value" placeholder="Enter your code" type="textarea" />
  </div>
</template>
<script setup lang="ts">
import { NInput } from 'naive-ui'
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: {
    name: string
    code: string
  }
  index: number
}>()

const emit = defineEmits(['update:modelValue', 'remove'])

const name = computed({
  get: () => props.modelValue.name,
  set: (value) => {
    emit('update:modelValue', {
      index: props.index,
      name: value,
      code: props.modelValue.code
    })
  }
})
const value = ref(props.modelValue.code)

watch(
  () => ({ name: name.value, code: value.value }),
  (newValue) => {
    emit('update:modelValue', {
      index: props.index,
      name: newValue.name,
      code: newValue.code
    })
  },
  { deep: true }
)
</script>
