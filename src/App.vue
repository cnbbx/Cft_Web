<template>
  <div id="app">
    <mt-header title="财富通自动发货系统">
      <router-link to="/" slot="left">
        <mt-button>返回</mt-button>
      </router-link>
      <router-link to="/history" slot="right">
        <mt-button>历史订单</mt-button>
      </router-link>
    </mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>