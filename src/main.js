import { createApp } from "vue";

import Home from "./pages/Home.vue";
import router from "./router/router.js";

import './scss/style.scss';

createApp(Home)
.use(router)
.mount("#app");
