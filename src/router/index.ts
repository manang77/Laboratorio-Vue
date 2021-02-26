import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GitUsers from "@/views/GitUsers.vue";
import GitUserDetail from "@/views/GitUserDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "GitUsers",
    component: GitUsers
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: GitUserDetail
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
