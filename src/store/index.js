import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Route from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo: { id: '', name: '', login_success: false, login_error: false },
    Kakao_Token: ''
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

  },
  modules: {
  }
})
