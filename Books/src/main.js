// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
import mixins from '@/mixins'

// 全局中引入js 使用 this.$config
import config from "@/config";
Vue.prototype.$config = config
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )


Vue.config.productionTip = false
Vue.mixin(mixins)
// 注册 element-ui
Vue.use(ElementUI)




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
