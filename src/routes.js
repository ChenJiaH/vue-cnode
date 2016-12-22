/**
 * @Author: Created By McChen
 * @Date: 2016/12/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

import preLoader from './assets/view/preLoader.vue';
import all from './assets/view/all.vue';

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
  }
];
