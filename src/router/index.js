import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PostApp from "../views/PostApp.vue"
import PostList from "../views/PostList.vue"
import MyPage from "../views/MyPage.vue"
import PostRate from "../views/PostRate.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },

  {
    path: "/post-page",
    name: "PostPage",
    component: PostApp,
  },
  {
    path: "/post-list",
    name: "PostList",
    component: PostList,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/post/:id",
    name: "Rate",
    component: PostRate,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
