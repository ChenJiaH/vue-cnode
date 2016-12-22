// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import routes from './routes';
import FastClick from 'fastclick';
import App from './App'

$.ajaxSettings.crossDomain = true;

/* eslint-disable no-new */

Vue.use(VueRouter);

var router = new VueRouter({
  routes
});
FastClick.attach(document.body);

var vm = new Vue({
  el: "#app",
  router,
  template: '<App/>',
  components: {
    App
  }
});
