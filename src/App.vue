<template>
  <div id="app">
    <Gpt4Prompt />
  </div>
</template>

<script>
import Gpt4Prompt from "./components/Gpt4Prompt.vue";

export default {
  name: 'App',
  components: {
    Gpt4Prompt

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
