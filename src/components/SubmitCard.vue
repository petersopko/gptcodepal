<template>
    <n-card>
        <div class="flex justify-center">
            <n-button class="w-1/3 mt-4 mb-4" @click="submitPrompt">Submit 🚀 {{ `(Estimated tokens
                            ${tokenCount || 0})` }}</n-button>
        </div>
    </n-card>
</template>

<script setup>
import useTokenCount from '../composables/useTokenCount';

const emit = defineEmits(['submit']);
const { tokenCount } = useTokenCount
// emit submit prompt 
const submitPrompt = () => {
    console.log('test')
    emit('submit');
}
</script>
