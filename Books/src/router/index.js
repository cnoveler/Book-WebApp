import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import BookShelf from '@/pages/BookShelf'
import Errors from '@/pages/Error';
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bookshelf/my',
      name: 'BookShelf',
      component: BookShelf
    },
    {
      path: '*',
      name: "Error",
      component: Errors,
    }
  ]
})
