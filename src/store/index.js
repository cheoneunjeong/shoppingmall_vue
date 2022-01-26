import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Route from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo: { id: '', name: '', auth: [], login_success: false, login_error: false },
    User_Token: null,
    Kakao_Token: null
  },
  mutations: {
    SET_KAKAOUSER(state, data) {
      state.UserInfo.id = data.user.k_email
      state.UserInfo.name = data.user.k_name
      state.UserInfo.login_success = true
      state.UserInfo.login_error = false
      state.Kakao_Token = data.access_token
    },
    LOGOUT_KAKAOUSER(state) {
      state.UserInfo.id = null
      state.UserInfo.name = null
      state.UserInfo.login_success = false
      state.UserInfo.login_error = false
      state.Kakao_Token = null
    },
    SET_USER(state, data) {
      state.UserInfo.id = data.username
      state.UserInfo.name = data.name
      state.UserInfo.auth = data.roles
      state.UserInfo.login_success = true
      state.UserInfo.login_error = false
      state.User_Token = data.token
    }
  },
  actions: {
    kakaoLogin({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/kakaologin', { params: { code: payload } })
          .then(Response => {
            if (Response.data != null) {
              commit('SET_KAKAOUSER', Response.data)
              Route.push('/')
            }
          })
          .catch(Error => {
            console.log('kakaoLogin_error')
          })
      })
    },
    kakaoLogout({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/kakaologout', { params: { code: state.Kakao_Token } })
          .then(Response => {
            commit('LOGOUT_KAKAOUSER')
            console.log('kakaologout_success')
          })
          .catch(Error => {
            console.log('kakaoLogout_error')
          })
      })
    },
    LoginUser({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/public/login', payload)
          .then(Response => {
            console.log(Response.data)
            commit("SET_USER", Response.data)
            Route.push('/')
          })
          .catch(Error => {
            console.log('login_error')
          })
      })
    },
    NewUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/public/user', payload)
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
    }

  },
  modules: {
  }
})
