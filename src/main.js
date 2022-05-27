import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import axios from 'axios'

// 淘宝无限适配文件
// import '@/assets/js/flexible.js'
import 'lib-flexible'
// 公共css文件
import '@/assets/css/common.css'
// 字体图标css文件
import '@/assets/css/iconfont.css'

// lay-tab 插件
import LyTab from 'ly-tab'
Vue.use(LyTab)

// 全局引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入vant中的checked和stepper
import { RadioGroup, Radio, Stepper, Checkbox, AddressEdit } from 'vant'
import 'vant/lib/index.css'
Vue.use(Checkbox)
Vue.use(Stepper)
Vue.use(AddressEdit)
Vue.use(Radio)
Vue.use(RadioGroup)

// axios 加入baseURL基础路径
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false
Vue.prototype.HOST = '/api'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
