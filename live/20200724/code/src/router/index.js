import Vue from 'vue'
import VueRouter from '../my-vue-router'
import Home from '../views/Home.vue'
import Music from '../views/music/Index.vue'
import Pop from '../views/music/Pop.vue'
import Rock from '../views/music/Rock.vue'

Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/music',
    name: 'Music',
    component: Music,
    children: [
      {
        path: 'pop',
        name: 'pop',
        component: Pop
      },
      {
        path: 'rock',
        name: 'rock',
        component: Rock
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 路由对象
const router = new VueRouter({
  routes
})

export default router
