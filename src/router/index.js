import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Home/Login'
import OAuth from '../views/OAuth'
import Mypage from '../views/Home/Mypage'
import SignUp from '../views/Home/SignUp'
import HelloWorld from '../components/HelloWorld'
import Shop from '@/views/Shop/Shop'
import Admin from '@/views/Admin/Admin'
import Category from '@/views/Admin/Category'
import AddCategory from '@/views/Admin/AddCategory'

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
      { path: "", name: 'HelloWorld', component: HelloWorld },

    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      { path: "category", name: 'Category', component: Category },
      { path: "addCategory", name: 'AddCategory', component: AddCategory },
    ]
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
