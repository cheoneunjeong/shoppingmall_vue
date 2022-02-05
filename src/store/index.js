import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Route from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo: { id: null, name: null, auth: [], token: null, oauth: null, login_success: false, login_error: false },
    Categories: [],
    ProductList: [],
    product: {
      category: [], code: '', name: '', desc: '', type: ["hit", "new", "disc", "recom", "best"],
      sale: false, detail_desc: '', material: '상세페이지 참고', size: '상세페이지 참고', manufacturer: '상세페이지 참고', caution: '상세페이지 참고',
      price: '', point: '', stock: '', shipping: '', files: [],
      options: [{ option: null, op_detail: null }, { option: null, op_detail: null }]
    }
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
      Route.go()
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
    },
    SET_PRODUCTLIST(state, data) {
      state.ProductList = data
    },
    update_category(state, data) {
      state.product.category[data.i] = data.value
    },
    update_code(state, data) {
      state.product.code = data
    },
    update_name(state, data) {
      state.product.name = data
    },
    update_desc(state, data) {
      state.product.desc = data
    },
    update_type(state, data) {
      state.product.type = data
    },
    update_isSale(state, data) {
      state.product.sale = data
    },
    update_detail_desc(state, data) {
      state.product.detail_desc = data
    },
    update_material(state, data) {
      state.product.material = data
    },
    update_size(state, data) {
      state.product.size = data
    },
    update_manufacturer(state, data) {
      state.product.manufacturer = data
    },
    update_caution(state, data) {
      state.product.caution = data
    },
    update_price(state, data) {
      state.product.price = data
    },
    update_point(state, data) {
      state.product.point = data
    },
    update_stock(state, data) {
      state.product.stock = data
    },
    update_option1(state, data) {
      state.product.options[data.i].option = data.value
    },
    update_option2(state, data) {
      state.product.options[data.i].op_detail = data.value
    },
    update_shipping(state, data) {
      state.product.shipping = data
    },
    update_files(state, data) {
      state.product.files = data
    },
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
    Add_Role({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.UserInfo.token}`
        axios.post('http://localhost:9010/api/public/roleAdmin', payload)
          .then(Response => {
            commit('SET_USER_REFRESH', Response.data)
            alert("관리자 권한이  추가되었습니다.")
          })
          .catch(Error => {
            console.log('Add_Role_error')
          })
      })
    },
    Delete_Role({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.UserInfo.token}`
        axios.delete('http://localhost:9010/api/public/roleAdmin', { params: { username: payload } })
          .then(Response => {
            commit('SET_USER_REFRESH', Response.data)
            alert("관리자 권한이  삭제되었습니다.")
          })
          .catch(Error => {
            console.log('Delete_Role_error')
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
    Edit_Category({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/edit-Category', payload)
          .then(Response => {
            commit('SET_CATEGORIES', Response.data)
            Route.push('/admin/category')
          })
          .catch(Error => {
            console.log("Edit_Category_error")
          })
      })
    },
    CreateProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/product', payload)
          .then(Response => {
            Route.push('/admin/product')
          })
          .catch(Error => {
            console.log("CreateProduct_error")
          })
      })
    },
    CreateProduct_files({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/product-files',
          payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
          .then(Response => {
          })
          .catch(Error => {
            console.log("CreateProduct_files_error")
          })
      })
    },
    Get_ProductList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/admin/product')
          .then(Response => {
            commit('SET_PRODUCTLIST', Response.data)
          })
          .catch(Error => {
            console.log("Get_ProductList_error")
          })
      })
    },
    Delete_SelectedProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/delete-product', payload)
          .then(Response => {
            Route.go()
          })
          .catch(Error => {
            console.log("Get_ProductList_error")
          })
      })
    },
    Delete_SelectedCategory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/delete-category', payload)
          .then(Response => {
            Route.go()
          })
          .catch(Error => {
            console.log("Get_ProductList_error")
          })
      })
    },
  },

  modules: {
  }
})
