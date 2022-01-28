import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import OAuth from '../views/OAuth'
import Mypage from '../views/Mypage'
import SignUp from '../views/SignUp'

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (store.state.UserInfo.login_success === true) {
    next('/')
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
  if (store.state.UserInfo.login_success === true) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: "login", name: 'Login', component: Login, beforeEnter: rejectAuthUser },
      { path: "mypage", name: 'Mypage', component: Mypage, beforeEnter: onlyAuthUser },
      { path: "signup", name: 'SignUp', component: SignUp },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'OAuth',
    component: OAuth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
