import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Route from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo: { id: null, name: null, auth: [], token: null, oauth: null, login_success: false, login_error: false },
    Categories: [],
  },
  mutations: {
    SET_USER(state, data) {
      state.UserInfo.id = data.username
      state.UserInfo.name = data.name
      state.UserInfo.auth = data.roles
      state.UserInfo.token = data.token
      state.UserInfo.oauth = data.oauth
      state.UserInfo.login_success = true
      state.UserInfo.login_error = false
    },
    LOGOUT(state) {
      state.UserInfo.id = null
      state.UserInfo.name = null
      state.UserInfo.auth = null
      state.UserInfo.token = null
      state.UserInfo.oauth = null
      state.UserInfo.login_success = false
      state.UserInfo.login_error = false
      localStorage.removeItem('token')
      console.log("로그아웃?" + localStorage.getItem('token'))
      Route.push('/')
    },
    SET_USER_REFRESH(state, data) {
      state.UserInfo.id = data.username
      state.UserInfo.name = data.name
      state.UserInfo.auth = data.roles
      state.UserInfo.token = data.token
      state.UserInfo.oauth = data.oauth
      state.UserInfo.login_success = true
      state.UserInfo.login_error = false
    },
    SET_CATEGORIES(state, data) {
      state.Categories = data
    }
  },
  actions: {
    NewUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/public/newUser', payload)
          .then(Response => {
            console.log(Response.data)
            if (Response.data === "success") {
              Route.push("/login")
            }
          })
          .catch(Error => {
            console.log("SignUp_error")
            alert("중복된 아이디가 있습니다.")
          })
      })
    },
    LoginUser({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/public/login', payload)
          .then(Response => {
            localStorage.setItem('token', Response.data.token)
            commit("SET_USER", Response.data)
            Route.push('/')
          })
          .catch(Error => {
            console.log('login_error')
          })
      })
    },
    kakaoLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/kakaologin', { params: { code: payload } })
          .then(Response => {
            localStorage.setItem('token', Response.data.token)
            commit("SET_USER", Response.data)
            Route.push('/')
          })
          .catch(Error => {
            console.log('kakaoLogin_error')
          })
      })
    },
    KakaoUnlink({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/public/kakaoUnlink')
          .then(Response => {
            commit('LOGOUT')
            console.log('kakaologout_success')
          })
          .catch(Error => {
            console.log('kakaoLogout_error')
          })
      })
    },
    UnpackToken({ commit }) {
      return new Promise((resolve, reject) => {
        console.log("시작")
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/public/unpackToken')
          .then(Response => {
            console.log(Response.data)
            commit('SET_USER_REFRESH', Response.data)
          })
          .catch(Error => {
            alert("로그인 유효시간이 만료되었습니다.")
            console.log('UnpackToken_error')
            Route.push('/')
          })
      })
    },
    Get_Categories({ commit }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/admin/category')
          .then(Response => {
            commit('SET_CATEGORIES', Response.data)
          })
          .catch(Error => {
            console.log('Get_Categories_error')
          })
      })

    },
    Create_category({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/category', payload)
          .then(Response => {
            commit('SET_CATEGORIES', Response.data)
            Route.push('/admin/category')
          })
          .catch(Error => {
            console.log("Create_category_error")
          })
      })
    },
    Create_ChildCategory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/childCategory', payload)
          .then(Response => {
            commit('SET_CATEGORIES', Response.data)
            Route.push('/admin/category')
          })
          .catch(Error => {
            console.log("Create_category_error")
          })
      })
    },
  },

  modules: {
  }
})
