import MainTechPage from "@/pages/MainTechPage.vue";
import MainAdminLoginPage from "@/pages/MainAdminLoginPage.vue";
import MainAdminRegisterPage from "@/pages/MainAdminRegisterPage.vue";

const routes = [
  { path: "/", component: MainTechPage },
  { path: "/admin/login", component: MainAdminLoginPage },
  { path: "/admin/register", component: MainAdminRegisterPage },
];

export default routes;
