import MainTechPage from "@/pages/MainTechPage.vue";
import MainAdminLoginPage from "@/pages/MainAdminLoginPage.vue";
import MainAdminRegisterPage from "@/pages/MainAdminRegisterPage.vue";
import MainManagementPage from "@/pages/MainManagementPage.vue";
import MainArticlePostPage from "@/pages/MainArticlePostPage.vue";
import MainTechSearchPage from "@/pages/MainTechSearchPage.vue";
import MainTechTagSearchPage from "@/pages/MainTechTagSearchPage.vue";

const routes = [
  { path: "/", component: MainTechPage },
  { path: "/admin/login", component: MainAdminLoginPage },
  { path: "/admin/register", component: MainAdminRegisterPage },
  { path: "/management", component: MainManagementPage },
  { path: "/post", component: MainArticlePostPage },
  { path: "/search", component: MainTechSearchPage },
  {
    name: "MainTechTagSearchPage",
    path: "/tag:searchTag",
    component: MainTechTagSearchPage,
  },
];

export default routes;
