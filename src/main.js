import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router";

// Editor
import VueMarkdownEditor from "@kangc/v-md-editor";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import Prism from "prismjs";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";

import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

VueMarkdownEditor.lang.use("en-US", enUS);
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);
app.use(router);
app.use(Quasar, quasarUserOptions);
app.use(VueMarkdownEditor);
app.mount("#app");
