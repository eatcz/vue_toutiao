import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/layout',
    component: () => import('@/pages/Layout'),
    redirect:'/layout/home',
    children:[
      {
        path:'home',
        component: () => import('@/pages/Home'),
      },
      {
        path:'personal',
        component: () => import('@/pages/Personal')
      }
    ]
  },
  {
    path:'/login',
    component: () => import('@/pages/Login')
  },
  {
    path:'/search',
    component: () => import('@/pages/Search')
  },
  {
    path:'/',
    redirect:'/layout/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
