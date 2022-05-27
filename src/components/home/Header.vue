<template>
  <header>
    <h1>
      <!-- <img src="@/assets/images/home.png"
           alt=""> -->
      茶道人
    </h1>
    <div class="search"
         @click="goSearch">
      <i class="iconfont icon-fangdajing"></i>
      <span>猜搜你喜欢的</span>
    </div>
    <div class="kefu">
      <i class="iconfont icon-kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    goSearch () {
      this.$router.push("/search")
    }
  }
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: #b0352f;
  h1 {
    display: flex;
    width: 60px;
    height: 44px;
    color: #fff;
    font-size: 20px;
    align-items: center;
  }
  .search {
    display: flex;
    align-items: center;
    width: 246px;
    height: 30px;
    background: #fff;
    border-radius: 12px;
    i {
      padding: 0 6px;
      color: #ccc;
    }
    span {
      font-size: 14px;
      color: #999;
    }
  }
  .kefu {
    i {
      font-size: 36px;
      color: #fff;
    }
  }
}
</style>
