<template>
  <div class='login container'>
    <Header></Header>
    <section>
      <div class='login-tel'>
        <input type="text"
               placeholder="请输入手机号"
               v-model="userTel"
               pattern="[0-9]*">
      </div>
      <div class='login-code'>
        <input type="text"
               placeholder="请输入短信验证码"
               pattern="[0-9]*"
               v-model="userCode">
        <button @click='sendCode'
                :disabled="disabled">{{codeMsg}}</button>
      </div>
      <div class='login-btn'
           @click='login'>登 录</div>
      <div class='tab'>
        <span @click='goUserLogin'>密码登录</span>
        <span @click='goRegister'>快速注册</span>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from './Header'
import { Toast } from 'mint-ui';
import http from '@/common/api/request.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      disabled: false, // 发送验证码是否禁用
      userTel: "", //用户输入手机号
      userPwd: "", // 用户输入密码
      codeNum: 6, // 验证码倒计时
      codeMsg: "获取短信验证码", // 默认发送验证码按钮
      code: "", // 验证码
      userCode: '', // 验证码
      // 验证规则
      rules: {//手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字'
        }
      },
    }
  },
  components: {
    Header,
    Tabbar
  },
  methods: {
    ...mapMutations(["userLogin"]),
    // 获取短信验证码按钮
    sendCode () {
      // 验证
      if (!this.validate("userTel")) return;

      // 请求短信验证码接口
      http.$axios({
        url: 'api/code',
        method: "POST",
        data: {
          phone: this.userTel
        }
      }).then(res => {
        if (res.success) {
          // 存储验证码
          this.code = res.data;
        }
      })

      // 禁用按钮
      this.disabled = true;
      // 倒计时
      let timer = setInterval(() => {
        --this.codeNum;
        this.codeMsg = `重新发送(${this.codeNum})`
      }, 1000)
      // 判断什么时候停止定时器
      setTimeout(() => {
        clearInterval(timer);
        this.codeNum = 6;
        this.disabled = false;
        this.codeMsg = "获取短信验证码"
      }, 6000)
    },
    //注册
    goRegister () {
      this.$router.push('/register');
    },
    //密码登录
    goUserLogin () {
      this.$router.push('/userLogin');
    },
    //验证信息提示
    validate (key) {
      let bool = true;
      if (!this.rules[key].rule.test(this[key])) {
        //提示信息
        Toast(this.rules[key].msg);
        bool = false;
        return false;
      }
      return bool;
    },
    //点击登录
    login () {
      // 前端验证
      if (!this.validate('userTel')) return;

      // 判断输入验证码是否正确
      if (this.code == this.userCode) {
        // 用户输入短信验证码正确
        // 发送请求
        http.$axios({
          url: 'api/addUser',
          method: "POST",
          data: {
            phone: this.userTel
          }
        }).then(res => {
          if (!res.success) return;
          //登录成功 ==》跳转页面，存储用户信息,使用vuex中的state进行存储
          this.userLogin(res.data);
          //跳转到我的页面中
          this.$router.push('/my');
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.32rem;
  background-color: #f5f5f5;
  div {
    margin: 0.266666rem 0;
    width: 8.933333rem;
    height: 1.173333rem;
  }
  input {
    box-sizing: border-box;
    padding: 0 0.266666rem;
    line-height: 1.173333rem;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .login-tel {
    margin-top: 0.8rem;
    input {
      width: 8.933333rem;
    }
  }
  .login-code {
    display: flex;
    input {
      flex: 1;
    }
    button {
      padding: 0 0.533333rem;
      line-height: 1.173333rem;
      color: #fff;
      background-color: #b0352f;
      border: 0;
      border-radius: 6px;
    }
  }
  .login-btn {
    line-height: 44px;
    color: #fff;
    font-size: 0.48rem;
    text-align: center;
    background-color: #b0352f;
    border-radius: 6px;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 0.373333rem;
  }
}
</style>
