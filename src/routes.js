/**
 * @Author: Created By McChen
 * @Date: 2016/12/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

import preLoader from './assets/view/preLoader.vue';
import all from './assets/view/all.vue';
import topic from './assets/view/topic.vue';
import about from './assets/view/about.vue';

export default [
  {
    path: "/",
    name: "home",
    component: preLoader
  },
  {
    path: "/all",
    name: "all",
    component: all
  },
  {
    path: "/topic/:id",
    name: "topic",
    component: topic
  },
  {
    path: "/about",
    name: "about",
    component: about
  }
];
