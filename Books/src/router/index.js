import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import BookShelf from "@/pages/BookShelf";
import BookShelfHistory from "@/pages/BookShelfHistory";
import Errors from "@/pages/Error";
import SearchResult from "@/pages/SearchResult";
import BookDeatils from "@/pages/Books/BookDeatils"
import BookChapter from "@/pages/Books/BookChapter"
import BookContent from "@/pages/Books/BookContent"
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/bookshelf/my",
      name: "BookShelf",
      component: BookShelf
    },
    {
      path: "/bookshelf/my-history",
      name: "BookShelfHistory",
      component: BookShelfHistory
    },
    {
      path: "/search",
      name: "SearchResult",
      component: SearchResult,
      children: [{
        path: ":kw"
      }]
    },
    {
      path: "/book/:id",
      name: "BookDeatils",
      component: BookDeatils,
    },
    {
      path: '/book/:id/catalog',
      name: 'BookChapter',
      component: BookChapter
    },
    {
      path: '/book/:id/read',
      name: 'BookContent',
      component: BookContent
    },
    {
      path: "*",
      name: "Error",
      component: Errors
    }
  ]
});
