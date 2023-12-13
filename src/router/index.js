import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PostApp from "../views/PostApp.vue"
import PostList from "../views/PostList.vue"
import MyPage from "../views/MyPage.vue"
import MyApp from "../views/MyApp.vue"
import LogIn from "../views/LogIn.vue"

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
    name: "postlist",
    component: PostList,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPage,
  },
  {
    path: "/myapp",
    name: "myapp",
    component: MyApp,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
