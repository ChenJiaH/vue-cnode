<template>
  <div class="backtop" v-show="show" @click="backTop"><i class="iconfont icon-backtop"></i></div>
</template>

<script>
  import $ from 'webpack-zepto';
  export default {
    name: "backTop",
    data() {
      return {
        show: false
      }
    },
    mounted: function () {
      var self = this;
      $(window).on("scroll", function () {
        if($(window).scrollTop() > 100){
          self.show = true;
        } else {
          self.show = false;
        }
      });
      console.log("backtop:" + this.show);
    },
    methods: {
      backTop () {
        $(window).scrollTop(0);
        this.show = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .backtop { position: fixed; right: 20px; bottom: 20px; width: 36px; height: 36px;
    .icon-backtop { font-size: 36px; line-height: 36px; text-align: center; color: #80bd01;}
  }
</style>
