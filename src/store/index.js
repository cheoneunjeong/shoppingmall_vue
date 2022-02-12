import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Route from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo: {
      id: null, name: null, auth: [], token: null, oauth: null, login_success: false, login_error: false,
      point: null, address: null, phone: null, AUTH: null, datetime: null, reject: null,
      wishList: [], heartList: [],
    },
    Categories: [],
    ProductList: [],
    UserList: [],
    PointList: [],
    product: {
      category: '', code: '', name: '', descr: '', type: ["hit", "new", "disc", "recom", "best"],
      sale: false, detail_desc: '', material: '상세페이지 참고', size: '상세페이지 참고', manufacturer: '상세페이지 참고', caution: '상세페이지 참고',
      price: '', point: '', stock: '', shipping: '', files: [],
      options: [], edit: false
    },
    Menu: [],
    productList_shop: [],
    productDetails_shop: null,
    items: [],
    orderRequest: null,
    orderInfo: { products: [], userInfo: null, receiverInfo: null, payway: null, point: null, total: null },
    orderList: [],
    orderInfo_address: { user: null, receiver: null }
  },
  mutations: {
    SET_USER(state, data) {
      state.UserInfo.id = data.user.username
      state.UserInfo.name = data.user.name
      state.UserInfo.auth = data.roles
      state.UserInfo.token = data.token
      state.UserInfo.oauth = data.user.oauth
      state.UserInfo.login_success = true
      state.UserInfo.login_error = false
      state.UserInfo.address = data.user.address
      state.UserInfo.phone = data.user.phone
      state.UserInfo.point = data.user.point
      state.UserInfo.AUTH = data.user.auth
      state.UserInfo.datetime = data.user.datetime
      state.UserInfo.reject = data.user.reject
      state.UserInfo.wishList = data.user.wishItems
    },
    LOGOUT(state) {
      state.UserInfo.id = null
      state.UserInfo.name = null
      state.UserInfo.auth = []
      state.UserInfo.token = null
      state.UserInfo.oauth = null
      state.UserInfo.login_success = false
      state.UserInfo.login_error = false
      state.UserInfo.address = null
      state.UserInfo.phone = null
      state.UserInfo.point = null
      state.UserInfo.AUTH = null
      state.UserInfo.datetime = null
      state.UserInfo.reject = null
      state.UserInfo.wishList = []
      localStorage.removeItem('token')
      console.log("로그아웃?" + localStorage.getItem('token'))
      if (Route.currentRoute.matched[0].name === "Shop") {
        Route.push("/shop")
      } else {
        Route.push("/")
      }
    },
    SET_USER_REFRESH(state, data) {
      state.UserInfo.id = data.user.username
      state.UserInfo.name = data.user.name
      state.UserInfo.auth = data.roles
      state.UserInfo.token = data.token
      state.UserInfo.oauth = data.user.oauth
      state.UserInfo.login_success = true
      state.UserInfo.login_error = false
      state.UserInfo.address = data.user.address
      state.UserInfo.phone = data.user.phone
      state.UserInfo.point = data.user.point
      state.UserInfo.AUTH = data.user.auth
      state.UserInfo.datetime = data.user.datetime
      state.UserInfo.reject = data.user.reject
      state.UserInfo.wishList = data.user.wishItems
    },
    SET_CATEGORIES(state, data) {
      state.Categories = data
    },
    SET_PRODUCTLIST(state, data) {
      state.ProductList = data
    },
    // update_category(state, data) {
    //   state.product.category[data.i] = data.value
    // },
    update_category(state, data) {
      state.product.category = data
    },
    update_code(state, data) {
      state.product.code = data
    },
    update_name(state, data) {
      state.product.name = data
    },
    update_descr(state, data) {
      state.product.descr = data
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
    update_options(state, data) {
      state.product.options = data
    },
    update_option(state, data) {
      state.product.options[data.index].option = data.value
    },
    update_shipping(state, data) {
      state.product.shipping = data
    },
    update_files(state, data) {
      state.product.files = data
    },
    SET_PRODUCT_DETAILS(state, data) {
      state.product.edit = true
      state.product.category = data.category
      state.product.code = data.code
      state.product.name = data.name
      state.product.descr = data.descr
      state.product.type = data.type
      state.product.sale = data.sale
      state.product.detail_desc = data.detail_desc
      state.product.material = data.material
      state.product.size = data.size
      state.product.manufacturer = data.manufacturer
      state.product.caution = data.caution
      state.product.price = data.price
      state.product.point = data.point
      state.product.stock = data.stock
      state.product.shipping = data.shipping
      state.product.options = data.options
    },
    SET_EDIT(state) {
      state.product.edit = false
      Route.push('/admin/addproduct')
    },
    SET_USERLIST(state, data) {
      state.UserList = data
    },
    SET_POINTLIST(state, data) {
      state.PointList = data
    },
    SET_MENU(state, data) {
      state.Menu = data
    },
    SET_SHOP_PRODUCTLIST(state, data) {
      state.productList_shop = data
    },
    SET_PRODUCT_DETAILS_SHOP(state, data) {
      state.productDetails_shop = data
    },
    SET_WISHLIST(state, data) {
      state.UserInfo.wishList = data
    },
    SET_ORDER_REQUEST(state, data) {
      state.orderRequest = data
    },
    SET_ORDERINFO(state, data) {
      state.orderInfo.products = data.products
      state.orderInfo.userInfo = data.userInfo
      state.orderInfo.payway = data.payway
      state.orderInfo.point = data.point
      state.orderInfo.total = data.total
      if (data.check === true) {
        state.orderInfo.receiverInfo = {}
        console.log("snf")
      }
    },
    update_receiver_name(state, data) {
      state.orderInfo.receiverInfo.receiver_name = data
    },
    update_receiver_phone(state, data) {
      state.orderInfo.receiverInfo.receiver_phone = data
    },
    update_receiver_postcode(state, data) {
      state.orderInfo.receiverInfo.receiver_postcode = data
    },
    update_final_address(state, data) {
      state.orderInfo.receiverInfo.address = data
    },
    SET_ORDERLIST(state, data) {
      state.orderList = data
    },
    SET_ORDER_ADDRESS(state, data) {
      state.orderInfo_address.user = data.userInfo
      state.orderInfo_address.receiver = data.receiverInfo
    }
  },
  actions: {
    NewUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/public/newUser', payload)
          .then(Response => {
            if (Response.data === "success") {
              if (Route.currentRoute.name === "shopSignUp") {
                Route.push("/shop/login")
              } else {
                Route.push("/login")
              }
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
            if (Route.currentRoute.name === "shopLogin") {
              Route.push("/shop/")
            } else {
              Route.push("/")
            }
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
            Route.push('/login')
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/public/unpackToken')
          .then(Response => {
            commit('SET_USER_REFRESH', Response.data)
          })
          .catch(Error => {
            alert("로그인 유효시간이 만료되었습니다.")
            console.log('UnpackToken_error')
            if (Route.currentRoute.matched[0].name === "Shop") {
              Route.push("/shop/")
            } else {
              Route.push("/")
            }
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
            Route.go()
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
    Get_ProductDetails({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/admin/product-details', { params: { code: payload } })
          .then(Response => {
            commit("SET_PRODUCT_DETAILS", Response.data)
            Route.push('/admin/addproduct')
          })
          .catch(Error => {
            console.log("Get_ProductDetails_error")
          })
      })
    },
    EditProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.put('http://localhost:9010/api/admin/product', payload)
          .then(Response => {
            Route.push('/admin/product')
          })
          .catch(Error => {
            console.log("EditProduct_error")
          })
      })
    },
    Get_UserList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/admin/userlist')
          .then(Response => {
            commit("SET_USERLIST", Response.data)
          })
          .catch(Error => {
            console.log("Get_UserList_error")
          })
      })
    },
    Give_Point({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/admin/point', payload)
          .then(Response => {
            Route.go()
          })
          .catch(Error => {
            console.log("Give_Point_error")
          })
      })
    },
    Get_PointList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/admin/point')
          .then(Response => {
            commit("SET_POINTLIST", Response.data)
          })
          .catch(Error => {
            console.log("Get_PointList_error")
          })
      })
    },
    Block_user({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.put('http://localhost:9010/api/admin/block-user', payload)
          .then(Response => {
            Route.go()
          })
          .catch(Error => {
            console.log("Block_user_error")
          })
      })
    },
    Unblock_user({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.put('http://localhost:9010/api/admin/unblock-user', payload)
          .then(Response => {
            Route.go()
          })
          .catch(Error => {
            console.log("Unblock_user_error")
          })
      })
    },
    Update_UserInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.put('http://localhost:9010/api/public/user', payload)
          .then(Response => {
            alert("수정이 완료되었습니다.")
            if (Route.currentRoute.name === "shopUserInfo") {
              Route.push("/shop/")
            } else {
              Route.push("/")
            }
          })
          .catch(Error => {
            console.log("Update_UserInfo_error")
          })
      })
    },
    Delete_User({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.delete('http://localhost:9010/api/public/user', { params: { username: payload } })
          .then(Response => {
            commit("LOGOUT")
            if (Route.currentRoute.name === "shopMyPage") {
              Route.push("/shop/")
            } else {
              Route.push("/")
            }
          })
          .catch(Error => {
            console.log("Unlink_User_err")
          })
      })
    },

    //쇼핑몰페이지
    Get_Menu({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/menu')
          .then(Response => {
            commit("SET_MENU", Response.data)
          })
          .catch(Error => {
            console.log("Get_Menu_err")
          })
      })
    },
    Get_ProductList_shop({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/productlist-shop', { params: { code: payload } })
          .then(Response => {
            commit("SET_SHOP_PRODUCTLIST", Response.data)
          })
          .catch(Error => {
            console.log("Get_ProductList_err")
          })
      })
    },
    Get_ProductDetails_shop({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/product-details-shop', { params: { code: payload } })
          .then(Response => {
            commit("SET_PRODUCT_DETAILS_SHOP", Response.data)
          })
          .catch(Error => {
            console.log("Get_ProductDetails_shop_err")
          })
      })
    },
    Get_OrderList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/user/orderlist', payload)
          .then(Response => {
            commit("SET_ORDER_REQUEST", Response.data)
          })
          .catch(Error => {
            console.log("Get_OrderList_err")
          })
      })
    },
    //카카오페이 일시적인 오류인지 계속 종료된요청이라고뜸....
    Buy_items({ commit, state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_ORDERINFO", payload)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/user/order', state.orderInfo)
          .then(Response => {
            dispatch("KakaoPay", payload.total)
          })
          .catch(Error => {
            console.log("Buy_items_err")
          })
      })
    },
    KakaoPay({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/user/kakaopay', { params: { total: payload } })
          .then(Response => {
            window.location.href = Response.data.next_redirect_pc_url
          })
          .catch(Error => {
            console.log("kakaopay_err")
          })
      })
    },
    // Buy_items({ commit, state, dispatch }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    //     axios.get('http://localhost:9010/api/user/kakaopay', { params: { total: payload.total } })
    //       .then(Response => {
    //         dispatch("set", payload)
    //         window.location.href = Response.data.next_redirect_pc_url
    //       })
    //       .catch(Error => {
    //         console.log("Buy_items_err")
    //       })
    //   })
    // },
    // set({ commit, state, dispatch }, payload) {
    //   return new Promise((resolve, reject) => {
    //     commit("SET_ORDERINFO", payload)
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    //     axios.post('http://localhost:9010/api/user/order', state.orderInfo)
    //       .then(Response => {
    //       })
    //       .catch(Error => {
    //         console.log("set_err")
    //       })
    //   })
    // },
    Get_OrderSuccess_List({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/user/order-success', { params: { id: payload.id } })
          .then(Response => {
            console.log(Response.data)
            commit("SET_ORDERLIST", Response.data)
          })
          .catch(Error => {
            console.log("Get_OrderSuccess_List_err")
          })
      })
    },
    Insert_WishItems({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/user/wishitems', payload)
          .then(Response => {
            commit('SET_WISHLIST', Response.data.wishItems)
            alert("장바구니에 추가되었습니다.")
          })
          .catch(Error => {
            console.log("Insert_WishItems_err")
          })
      })
    },
    Get_heartList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.post('http://localhost:9010/api/user/heart-items', payload)
          .then(Response => {
            commit("SET_SHOP_PRODUCTLIST", Response.data)
          })
          .catch(Error => {
            console.log("Get_heartList_err")
          })
      })
    },
    deleteWishItems({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.put('http://localhost:9010/api/user/wishitems', payload)
          .then(Response => {
            commit("SET_WISHLIST", Response.data)
            Route.go()
          })
          .catch(Error => {
            console.log("deleteWishItems_err")
          })
      })
    },
    Get_All_OrderList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.get('http://localhost:9010/api/user/orderlist')
          .then(Response => {
            commit("SET_ORDERLIST", Response.data)
          })
          .catch(Error => {
            console.log("Get_All_OrderList_err")
          })
      })
    }
  },
  modules: {
  }
})