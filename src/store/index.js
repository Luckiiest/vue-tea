import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user.js'
// 购物车模块
import cart from './modules/cart.js'
// 收货地址
import path from './modules/path.js'
// 订单
import order from './modules/order.js'

export default new Vuex.Store({
  modules: {
    user,
    cart,
    path,
    order,
  },
})
