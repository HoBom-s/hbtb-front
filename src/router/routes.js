import MainTechPage from "@/pages/MainTechPage.vue";

const MainAdminLoginPage = import("@/pages/MainAdminLoginPage.vue");
const MainAdminRegisterPage = import("@/pages/MainAdminRegisterPage.vue");
const MainManagementPage = import("@/pages/MainManagementPage.vue");
const MainArticlePostPage = import("@/pages/MainArticlePostPage.vue");
const MainTechSearchPage = import("@/pages/MainTechSearchPage.vue");
const MainTechTagSearchPage = import("@/pages/MainTechTagSearchPage.vue");
const NotFoundPage = import("@/pages/NotFoundPage.vue");

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
  { path: "/:catchAll(.*)", component: NotFoundPage },
];

export default routes;
