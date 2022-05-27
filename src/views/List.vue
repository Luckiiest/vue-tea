<template>
<<<<<<< HEAD
  <div class="list">
    类别
=======
  <div class='list'>
    <header v-show="isShow">
      <div @click="goBack"
           class='returns'>
        <i class='iconfont icon-fanhui'></i>
      </div>
      <div class='search'>
        <i class='iconfont icon-fangdajing'></i>
        <span>搜您喜欢的...</span>
      </div>
      <div class='go-home'>
        <img src="@/assets/images/home.png"
             alt="">
      </div>
    </header>
    <section>
      <div class='list-l'
           ref='left'>
        <ul class='l-item'>
          <li v-for="(item,index) in leftData"
              :key="index"
              :class="{'active':index == currentIndex}"
              @click="goScroll(index)">
            {{item.name}}
          </li>
        </ul>
      </div>

      <div class='list-r'
           ref='right'>
        <div>
          <ul v-for="(item,index) in rightData"
              :key="index"
              class='shop-list'>
            <li v-for="(k,i) in item"
                :key="i">
              <h2>{{k.name}}</h2>
              <ul class='r-content'>
                <li v-for="(j,idx) in k.list"
                    :key="idx">
                  <img :src="j.imgUrl"
                       alt="">
                  <span>{{j.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </section>
    <Tabbar></Tabbar>
>>>>>>> feature/home
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: "List"
}
</script>

<style>
</style>
=======
import BetterScroll from 'better-scroll'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
export default {
  name: "List",
  data () {
    return {
      leftData: [], //左侧数据
      rightData: [], // 右侧数据
      allHeight: [], //右侧每一块的高度值
      rightBScroll: "", // 右侧滚动
      scrollY: "", // 右侧滚动距离
      isShow: true,
    }
  },
  computed: {
    currentIndex () {
      return this.allHeight.findIndex((item, index) => {
        return this.scrollY >= item && this.scrollY < this.allHeight[index + 1]
      })
    }
  },
  components: {
    Tabbar
  },
  async created () {
    let res = await http.$axios({
      url: "/api/goods/list",
    })

    let leftArr = [];
    let rightArr = [];

    // 对左右数据进行处理
    res.forEach((v, i) => {
      leftArr.push({
        id: v.id,
        name: v.name
      })
      rightArr.push(v.data);
    });
    this.leftData = leftArr;
    this.rightData = rightArr;


    this.$nextTick(() => {
      // 左侧、右侧滑动
      new BetterScroll(this.$refs.left, {
        click: true,
      })
      this.rightBScroll = new BetterScroll(this.$refs.right, {
        click: true,
        probeType: 3,// 使scroll事件生效
        bounce: true
      })
      // 统计右侧所有板块高度值，并且放入数组中
      let height = 0;
      this.allHeight.push(height);
      // 获取每一块高度
      let uls = this.$refs.right.getElementsByClassName("shop-list");
      // 把DOM对象转换为真正的数组
      Array.from(uls).forEach((v, i) => {
        height += v.clientHeight
        this.allHeight.push(height)
      })

      // 得到右侧滚动的值,进行是否展示头部
      this.rightBScroll.on("scroll", res => {
        this.scrollY = Math.abs(res.y);
        if (Math.abs(res.y) >= 50) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      })
    })
  },
  methods: {
    // BetterScroll 默认取消点击事件，再BetterScroll中click:true
    goScroll (index) {
      this.rightBScroll.scrollTo(0, -this.allHeight[index], 300)
    },
    goBack () {
      this.$router.push({
        name: "Home"
      })
    }
  }
};
</script>
<style scoped lang='scss'>
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
  background-color: #b0352f;
  .returns {
    line-height: 1.173333rem;
    padding: 0 0.533333rem;
    i {
      color: #fff;
      font-size: 0.693333rem;
    }
  }
  .search {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.16rem 0.266666rem;
    background-color: #ffffff;
    border-radius: 0.64rem;
    i {
      padding-right: 0.16rem;
      color: #666;
      font-size: 0.48rem;
    }
    span {
      color: #666;
      font-size: 0.373333rem;
    }
  }
  .go-home {
    padding: 0 0.266666rem;
    line-height: 0.4rem;
    img {
      width: 1rem;
      height: 1rem;
    }
  }
}
section {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.list-l {
  width: 2.48rem;
  background-color: #fff;
  border-right: 1px solid #cccccc;
  overflow: hidden;
  .l-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
      width: 100%;
      padding: 0.08rem 0;
      margin: 0.3rem 0;
      text-align: center;
      font-size: 0.373333rem;
      &.active {
        color: #b54f4a;
        border-left: 6px solid #b54f4a;
      }
    }
  }
}

.list-r {
  flex: 1;
  overflow: hidden;
  .shop-list {
    text-align: center;
    h2 {
      padding: 0.533333rem 0;
      font-size: 0.64rem;
      font-weight: 400;
    }
    .r-content {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33%;
        padding: 0.266666rem 0;
        img {
          width: 1.413333rem;
          height: 1.413333rem;
        }
        span {
          font-size: 0.426666rem;
        }
      }
    }
  }
}
::v-deep.tabbar {
  border-top: 1px solid #cccccc;
}
</style>


>>>>>>> feature/home
