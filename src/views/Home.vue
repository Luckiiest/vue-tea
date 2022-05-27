<template>
  <div class="home">
    <div class="headers">
      <div class="header">
        <Header></Header>
      </div>
      <!-- 导航 ly-tab插件-->
      <div class="nav">
        <ly-tabs v-model="value"
                 activeColor="#b0352f"
                 @change="changeTab">
          <ly-tab-item name="0"
                       title="推荐" />
          <ly-tab-item name="1"
                       title="大红袍" />
          <ly-tab-item name="2"
                       title="铁观音" />
          <ly-tab-item name="3"
                       title="绿茶" />
          <ly-tab-item name="4"
                       title="普洱" />
          <ly-tab-item name="5"
                       title="茶具" />
          <ly-tab-item name="6"
                       title="花茶" />
        </ly-tabs>
      </div>
    </div>
    <section class="wrapper">
      <div>
        <div v-for="(item,index) in newData"
             :key="index">
          <!-- 轮播图组件 -->
          <Swiper :swiperList="item.data"
                  v-if="item.type == 'swiperList'"></Swiper>
          <!-- 图标组件 -->
          <Icons :iconsList="item.data"
                 v-if="item.type == 'iconsList'"></Icons>
          <!-- 爆款推荐 -->
          <Recommend :recommendList="item.data"
                     v-if="item.type == 'recommendList'"></Recommend>
          <!-- 广告区域 -->
          <Ad :adList="item.data"
              v-if="item.type == 'adList'"></Ad>
          <!-- 猜你喜欢 -->
          <Like :likeList="item.data"
                v-if="item.type === 'likeList'"></Like>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar"; // 底部tabbar组件
import Header from "@/components/home/Header"; // 头部导航
import Swiper from "@/components/home/Swiper"; // 轮播组件
import Icons from "@/components/home/Icons.vue"; // 图表组件
import Like from "@/components/home/Like.vue"; // 猜你喜欢
import Recommend from "@/components/home/Recommend.vue"; // Swiper
import Ad from "@/components/home/Ad.vue"; // Ad

import BetterScroll from "better-scroll";// 滑动库
import http from "@/common/api/request.js"

export default {
  name: "Home",
  data () {
    return {
      value: 0,
      topBar: [],
      newData: [],
      oBetterScroll: "",
      tBetterScroll: ""
    };
  },
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
    Ad,
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取推荐数据
    async getData () {
      let res = await http.$axios({
        url: "/api/index_list/0/data/1"
      });

      this.topBar = Object.freeze(res.topBar)
      this.newData = Object.freeze(res.data)

      // 当dom加载加载完毕后再滑动插件执行
      this.$nextTick(() => {
        new BetterScroll(".wrapper", {
          movable: true,
          zoom: true,
          click: true,
        });
      })
    },


    // 获取分页内容
    async addData (index) {
      let res = await $.axios({
        url: `/api/index_list/${index}/data/1`
      })
      if (res.data.data.constructor != Array) {
        this.newData = res.data;
      } else {
        this.newData = res;
      }

      // 当dom加载加载完毕后再滑动插件执行
      this.$nextTick(() => {
        new BetterScroll(".wrapper", {
          movable: true,
          zoom: true,
        });
      })
    },
    changeTab (index) {
      console.log(index);

      this.addData(index);
    },
  },
};
</script>

<style scoped lang="scss">
.headers {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

section {
  margin-top: 84px;
  flex: 1;
  overflow: hidden;
}

.header {
  height: 44px;
}
.nav {
  height: 40px;
}

// 把ly-tab的底部阴影去掉
.ly-tabs {
  .ly-tabbar {
    box-shadow: none;
  }
}
</style>
