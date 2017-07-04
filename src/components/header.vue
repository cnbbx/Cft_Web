<template>
  <mt-header title="财富通自动发货系统" style="position: fixed;">
      <router-link to="/" slot="left">
        <mt-button>返回</mt-button>
      </router-link>
      <router-link to="/history" slot="right">
        <mt-button>历史订单</mt-button>
      </router-link>
    </mt-header>
</template>

<style scoped>
.mint-header {  top: 0; left: 0; width: 100%; z-index: 999;}
body { margin-top: 40px;}
</style>
