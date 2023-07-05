import MainTechPage from "@/pages/MainTechPage.vue";
import MainAdminLoginPage from "@/pages/MainAdminLoginPage.vue";
import MainAdminRegisterPage from "@/pages/MainAdminRegisterPage.vue";
import MainArticlePostPage from "@/pages/MainArticlePostPage.vue";
import MainManagementPage from "@/pages/MainManagementPage.vue";
import MainTechSearchPage from "@/pages/MainTechSearchPage.vue";
import MainTechTagSearchPage from "@/pages/MainTechTagSearchPage.vue";
import MainArticleDetailPage from "@/pages/MainArticleDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  { path: "/", component: MainTechPage },
  { path: "/admin/login", component: MainAdminLoginPage },
  { path: "/admin/register", component: MainAdminRegisterPage },
  { path: "/management", component: MainManagementPage },
  { path: "/post", component: MainArticlePostPage },
  { path: "/search", component: MainTechSearchPage },
  {
    name: "MainTechTagSearchPage",
    path: "/tag",
    component: MainTechTagSearchPage,
  },
  {
    name: "MainArticleDetailPage",
    path: "/article",
    component: MainArticleDetailPage,
  },
  { path: "/:catchAll(.*)", component: NotFoundPage },
];

export default routes;
