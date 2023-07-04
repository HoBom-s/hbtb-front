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

// Preview
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";

// Highlight JavaScript
import hljs from "highlight.js";

import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import "@kangc/v-md-editor/lib/style/preview.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";

VueMarkdownEditor.lang.use("en-US", enUS);
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);
app.use(router);
app.use(Quasar, quasarUserOptions);
app.use(VueMarkdownEditor);
app.use(VMdPreview);
app.mount("#app");
