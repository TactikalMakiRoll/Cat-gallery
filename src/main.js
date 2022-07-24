import { createApp } from "vue";

import Main from "./Main.vue";
import router from "./router/router.js";
import UiLibrary from "./components/UI/UiLibrary";

import "./scss/style.scss";

const App = createApp(Main);

UiLibrary.forEach((component) => {
    App.component(component.name, component);
});

App.use(router).mount("#app");
