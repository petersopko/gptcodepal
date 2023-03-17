import { createApp } from "vue";
import "../styles/style.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faChevronUp,
  faClipboard,
  faTrashAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "highlight.js/styles/default.css"; // You can change 'default' to the theme you prefer
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage("javascript", javascript);

library.add(faChevronDown, faChevronUp, faTrashAlt, faClipboard, faCog);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(hljsVuePlugin);
app.mount("#app");
