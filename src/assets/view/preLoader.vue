<template>
  <div id="pageLoader" v-show="show"><img src="~assets/images/preLoad.gif" alt=""></div>
</template>
<script>
    export default {
      name: 'preLoader',
      data (){
        return {
          show: true
        }
      },
      mounted: function () {
        setTimeout (() => {
          this.$router.push({
            name: 'all'
          });
          this.show = false;
        },1314);
      }
    }
</script>
<style lang="scss">
  .main-wrap { position: relative; max-width: 750px; min-width: 320px; margin: 0 auto; width: 100%; min-height: 100%;}
  #pageLoader { position: fixed; left: 50%; top: 50%; transform: translate(-50%,-50%) translateZ(0); width: 160px; height: 20px;}
</style>
