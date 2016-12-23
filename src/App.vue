<template>
  <div class="main-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style rel="stylesheet/scss" type="text/css"  lang="scss">
  @import "./assets/css/base.scss";
  .main-wrap { position: relative; max-width: 750px; min-width: 320px; margin: 0 auto; width: 100%; min-height: 100%; overflow: hidden;}
</style>
