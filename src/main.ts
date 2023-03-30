import { createApp } from 'vue'
import App from './App.vue'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { createPinia } from 'pinia'

import 'highlight.js/styles/default.css'
import './styles.css'

hljs.registerLanguage('javascript', javascript)

const app = createApp(App)
app.use(hljsVuePlugin)
app.use(createPinia())
app.mount('#app')
