<template>
  <div class="content-box">
    <div class="bar-box">
      <div class="mask" v-if="menuShow" @click="closeMenu"></div>
      <div class="header" :class="getOpenClass">
        <div class="btn-menu" @click="openMenu">
          <span class="line"></span>
        </div>
        <p class="title">主题</p>
      </div>
      <div class="sidebar" :class="getOpenClass">
        <div class="logo">
          <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
        </div>
        <div class="menu-list">
          <router-link :to="{name:'all',query:{tab:'all'}}">- 全部</router-link>
          <router-link :to="{name:'all',query:{tab:'ask'}}">- 问答</router-link>
          <router-link :to="{name:'all',query:{tab:'share'}}">- 分享</router-link>
          <router-link :to="{name:'all',query:{tab:'job'}}">- 招聘</router-link>
          <router-link :to="{name:'all',query:{tab:'good'}}">- 精华</router-link>
          <router-link :to="{name:'about'}">- 关于</router-link>
        </div>
      </div>
    </div>
    <div class="topic-box" v-if="topic.title">
      <div class="topic-title">{{topic.title}}</div>
      <div class="author-box">
        <div class="author-avatar">
          <img :src="topic.author && topic.author.avatar_url" alt="">
        </div>
        <div class="author-desc">
          <p class="author-name"></p>
          <p class="author-ctime" v-if="topic.create_at">发布于：{{topic.create_at | getFreeTime}}</p>
        </div>
        <div class="author-view" v-if="topic.visit_count">{{topic.visit_count}}次浏览</div>
      </div>
      <div class="topic-content markdown-body" v-html="topic.content"></div>
      <div class="topic-reply-count" v-if="topic.reply_count"><b>{{topic.reply_count}}</b>条回复</div>
      <div class="topic-reply">
        <ul class="reply-list">
          <li v-for="reply in topic.replies">
            <div class="reply-info">
              <div class="reply-avatar">
                <img :src="reply.author.avatar_url" alt="">
              </div>
              <div class="reply-desc">
                <p class="clearfix">{{reply.author.loginname}} 发布于：{{reply.create_at | getFreeTime}}<span class="fr"><i class="iconfont icon-zan"></i>{{reply.ups.length}}</span></p>
              </div>
            </div>
            <div class="reply-content" v-html="reply.content"></div>
          </li>
        </ul>
      </div>
    </div>
    <backTop></backTop>
  </div>
</template>
<script>
  import $ from 'webpack-zepto';
  import backTop from '../components/backtop.vue';
  export default {
    name: "topic",
    components: {
      backTop,
    },
    filters: {
      getFreeTime: function (time) {
        var timestamp = +new Date(time)
        return formatTime(timestamp, "yyyy.MM.dd");
        function formatTime(time, format) {
          var t = new Date(time);
          var tf = function (i) {
            return ( i < 10 ? '0' : '') + i
          };
          return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
              case 'yyyy':
                return tf(t.getFullYear());
                break;
              case 'MM':
                return tf(t.getMonth() + 1);
                break;
              case 'mm':
                return tf(t.getMinutes());
                break;
              case 'dd':
                return tf(t.getDate());
                break;
              case 'HH':
                return tf(t.getHours());
                break;
              case 'ss':
                return tf(t.getSeconds());
                break;
            }
          })
        }
      }
    },
    data (){
      return {
        menuShow: false,
        topic: {},
        topicId: '',
      }
    },
    mounted: function () {
      $("body").removeClass("os-mode");
      this.topicId = this.$route.params.id;

      // 加载主题数据
      $.get('https://cnodejs.org/api/v1/topic/' + this.topicId, (res) => {
        if (res && res.data) {
          this.topic = res.data;
          console.log(this.topic);
          console.log(this.topic.author.avatar_url);
        }
      });
    },
    methods: {
      // 显示sidebar
      openMenu: function () {
        this.menuShow = true;
      },
      // 收起sidebar
      closeMenu: function () {
        this.menuShow = false;
      },
    },
    computed: {
      getOpenClass: function () {
        if (this.menuShow) {
          return "open";
        } else {
          return "";
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  @import
    "../../assets/css/common/_variable.scss";

  .content-box {
    position: relative;
    width: 100%;
    .bar-box {
      .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 9;
      }
      .header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 44px;
        box-shadow: 0 0 3px $border;
        z-index: 5;
        background-color: $white;
        transition: all 0.3s ease-out;
        .btn-menu {
          position: absolute;
          left: 0;
          top: 0;
          width: 44px;
          height: 44px;
          .line {
            position: absolute;
            display: block;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 1px;
            transform: translate(-50%, -50%) translateZ(0);
            background-color: $black;
            &:before {
              content: '';
              position: absolute;
              left: 0;
              width: 100%;
              height: 100%;
              top: -5px;
              background-color: $black;
            }
            &:after {
              content: '';
              position: absolute;
              left: 0;
              width: 100%;
              height: 100%;
              top: 5px;
              background-color: $black;
            }
          }
        }
        .title {
          font-size: 16px;
          color: $black;
          text-align: center;
          line-height: 44px;
        }
      }
      .sidebar {
        position: fixed;
        z-index: 99;
        left: 0;
        top: 0;
        width: 150px;
        height: 100%;
        background-color: $white;
        transition: all 0.3s ease-out;
        transform: translate(-150px, 0) translateZ(0);
        .logo {
          margin: 0 15px;
          padding: 20px 0;
          width: 120px;
          border-bottom: solid 1px $border;
          img {
            background-color: #444444;
          }
        }
        .menu-list {
          padding: 20px;
          a {
            display: block;
            line-height: 24px;
            font-size: 16px;
            padding: 10px 0;
          }
          a.active {
            color: $green;
          }
        }
      }
      .header.open {
        transform: translate(150px, 0) translateZ(0);
      }
      .sidebar.open {
        transform: translate(0, 0) translateZ(0);
      }
    }
    .topic-box { padding-top: 44px; background-color: $white; line-height: 1.5;
      .topic-title { margin: 15px; padding: 10px; border-bottom: solid 1px $border; font-size: 18px; font-weight: bolder;}
      .author-box { padding: 0 15px; display: flex;
        .author-avatar { width: 40px; height: 40px; margin-right: 10px; overflow: hidden; border-radius: 50%;}
      }
      .topic-content { padding: 15px; margin-top: 15px; border-bottom: solid 1px $border;}
      .topic-reply-count {  padding: 15px;
        b { color: $green; border-bottom: solid 1px $border;}
      }
      .topic-reply {
        .reply-list { width: 100%;
          li { border-bottom: solid 1px $border; padding: 10px 15px;
            .reply-info { display: flex;
              .reply-avatar { width: 40px; height: 40px; overflow: hidden; border-radius: 5px; margin-right: 10px;}
              .reply-desc { flex: 1; width: 0;}
            }
          }
        }
      }
    }
  }
</style>
