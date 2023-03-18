import { createApp } from "vue";
import App from "./App.vue";

import naive from "naive-ui";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { createPinia } from "pinia";

import {
  faChevronDown,
  faChevronUp,
  faClipboard,
  faTrashAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import "highlight.js/styles/default.css";
import "../styles/style.css";

hljs.registerLanguage("javascript", javascript);
library.add(faChevronDown, faChevronUp, faTrashAlt, faClipboard, faCog);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(hljsVuePlugin);
app.use(naive);
app.use(createPinia());
app.mount("#app");
