import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    set_token(state, data) {
      state.token = data
    }
  },
  actions: {
    kakaoLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/kakaologin', { params: { code: payload } })
          .then(Response => {
            console.log(Response.data)
            if (Response.data != null) {
              axios.defaults.headers.common['Authorization'] = `Bearer ${Response.data}`
              localStorage.setItem("token", Response.data)
              commit('set_token', Response.data)
            }
          })
          .catch(Error => {
            console.log('kakaoLogin_error')
          })
      })
    },
    kakaoLogout({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/kakaologout', { params: { code: state.token } })
          .then(Response => {
            console.log(Response.data)
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
