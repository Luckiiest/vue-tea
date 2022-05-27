<template>
  <div id="app">
<<<<<<< HEAD
    <router-view />
  </div>
</template>
=======
    <!-- 要缓存的路由 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <!-- 不缓存的路由 -->
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>



<script>
export default {
  created () {
    this.$store.commit('initUser');
  }
}

</script>
>>>>>>> feature/home
