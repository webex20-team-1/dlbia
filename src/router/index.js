import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PostApp from "../views/PostApp.vue"
import PostList from "../views/PostList.vue"
import SignIn from "../views/SignIn.vue"
import MyApp from "../views/MyApp.vue"
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
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/myapp",
    name: "myapp",
    component: MyApp,
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
  scrollBehavior() {
    // ページ遷移時に最上部にスクロールする
    return { x: 0, y: 0 }
  },
})

export default router
