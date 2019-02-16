import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import BookShelf from '@/pages/BookShelf'
import BookShelfHistory from '@/pages/BookShelfHistory'
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
      path: '/bookshelf/my-history',
      name: 'BookShelfHistory',
      component: BookShelfHistory
    },
    {
      path: '*',
      name: "Error",
      component: Errors,
    }
  ]
})
