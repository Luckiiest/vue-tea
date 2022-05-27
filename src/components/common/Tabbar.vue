<template>
  <div class="tabbar">
    <ul>
      <li v-for="(item, index) in routerList"
          :key="index"
          @click="switchTab(item.path)">
        <!-- 图片判断是否选中方法：如果当前路由地址与当前点击地址相等则更改为select图片否则就是active图片 -->
        <img :src="$route.path.includes(item.path) ? item.selected : item.active"
             alt="" />
        <span :class="$route.path.includes(item.path) ? 'active' : ''">{{
          item.title
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // tabbar导航数据
      routerList: [
        {
          title: "首页",
          path: "/home",
          active: "/images/home.png",
          selected: "/images/home-select.png",
        },
        {
          title: "分类",
          path: "/list",
          active: "/images/list.png",
          selected: "/images/list-select.png",
        },
        {
          title: "购物车",
          path: "/cart",
          active: "/images/cart.png",
          selected: "/images/cart-select.png",
        },
        {
          title: "我的",
          path: "/my",
          active: "/images/my.png",
          selected: "/images/my-select.png",
        },
      ],
    };
  },
  methods: {
    // tabbar跳转方法
    switchTab (path) {
      // 是否点击当前所在路由或同路由
      if (this.$router.path == path) return;
      // 对应跳转页面
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  background: #fff;
  ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  li {
    display: flex;
    flex-direction: column;
    text-align: center;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 16px;
    }
    span.active {
      color: red;
    }
  }
}
</style>
