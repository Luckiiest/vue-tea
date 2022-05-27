/* 购物车store */

import http from '@/common/api/request.js'
import { Toast, Dialog } from 'vant'
import { CART_LIST, CHECK_ALL, UNCHECK_ALL, CHECK_ITEM } from './mutation-types'

export default {
  state: {
    list: [], // 购物车数据
    selectList: [], //选中的购物车商品数据
  },
  getters: {
    // 判断购物车是否全选
    isCheckedAll(state) {
      // 如果list和selectList相等，就代表全部选中了
      return state.list.length == state.selectList.length
    },
    // 总计数量与价格
    total(state) {
      let total = {
        num: 0,
        price: 0,
      }
      // 循环进行计算总价与价格
      state.list.forEach((v) => {
        // 判断只有选中才可以进行相加
        if (v.checked) {
          total.num += parseInt(v.goods_num)
          total.price += v.goods_price * v.goods_num
        }
      })

      return total
    },
  },
  mutations: {
    // 添加
    [CART_LIST](state, cartArr) {
      state.list = cartArr

      state.selectList = state.list.map((v) => {
        return v.id
      })
    },
    // 全选
    [CHECK_ALL](state) {
      state.selectList = state.list.map((v) => {
        v.checked = true
        return v.id
      })
    },
    // 全不选
    [UNCHECK_ALL](state) {
      state.list.forEach((v) => {
        v.checked = false
      })
      state.selectList = []
    },
    // 单选
    [CHECK_ITEM](state, index) {
      // 点击单选的商品id
      let id = state.list[index].id
      let i = state.selectList.indexOf(id)
      // 如果i>1说明能在selectList找到对应的Id，说明是要减去的
      if (i > -1) {
        return state.selectList.splice(i, 1)
      } else {
        // 如果之前没有选中，就给selectList添加一个Id进去
        state.selectList.push(id)
      }
    },
    // 删除
    delGoods(state) {
      state.list = state.list.filter((v) => {
        return state.selectList.indexOf(v.id) == -1
      })
    },
  },
  actions: {
    // 提交
    checkAllFn({ commit, getters }) {
      getters.isCheckedAll ? commit('unCheckAll') : commit('checkAll')
    },
    // 删除购物车商品
    // 删除操作
    delGoodsFn({ commit, state }, id) {
      // 如果没有被选中，则提示信息
      if (state.selectList.length == 0) {
        Toast('请选择商品')
      }

      // 删除商品数组
      let arrCart = []

      Dialog.confirm({
        message: '确认删除吗？',
      }).then(() => {
        if (typeof id == 'number') {
          // 单选删除
          arrCart = [id]

          let index = state.list.findIndex((v) => {
            return v.id == id
          })

          state.list.splice(index, 1)
        } else {
          // 多选删除
          arrCart = state.selectList
          commit('delGoods')
          commit('unCheckAll')
        }

        http
          .$axios({
            url: '/api/deleteCart',
            method: 'post',
            data: {
              arrId: arrCart,
            },
          })
          .then((res) => {
            if (res.success) {
              Toast('删除成功')
            }
          })
      })
    },
  },
}
