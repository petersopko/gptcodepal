<template>
    <n-card>
        <div class="flex justify-center">
            <n-button class="w-1/3 mt-4 mb-4" @click="submitPrompt">Submit 🚀 {{ `(Estimated tokens
                            ${tokenCount})` }}</n-button>
        </div>
    </n-card>
</template>

<script setup>

// emit submit prompt 
const submitPrompt = () => {
    console.log('test')
    emit('submit');
}
</script>
