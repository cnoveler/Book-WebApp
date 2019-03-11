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
import Catrgory from "@/pages/Category/Category"
import CategoryDetails from "@/pages/Category/CategoryDetails"
import Ranking from "@/pages/Ranking/Ranking"
import RankingDetail from "@/pages/Ranking/RankingDetail"
import GoTop from "@/components/GoTop"
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
    path: "/",
    name: "Home",
    component: Home
  }, {
    path: "/bookshelf/my",
    name: "BookShelf",
    component: BookShelf
  }, {
    path: "/bookshelf/my-history",
    name: "BookShelfHistory",
    component: BookShelfHistory
  }, {
    path: "/search",
    name: "SearchResult",
    component: SearchResult,
    children: [{
      path: ":kw"
    }]
  }, {
    path: "/book/:id",
    name: "BookDeatils",
    component: BookDeatils,
  }, {
    path: '/book/:id/catalog',
    name: 'BookChapter',
    component: BookChapter
  }, {
    path: '/book/:id/read',
    name: 'BookContent',
    component: BookContent
  }, {
    path: '/catrgory',
    name: 'Catrgory',
    component: Catrgory,
  }, {
    path: '/catrgory/details',
    name: 'CategoryDetails',
    component: CategoryDetails,
    children: [{
      path: ':gender&:type&:major&:minor&:start&:limit'
    }]
  }, {
    path: '/ranking/:gender',
    name: 'Ranking',
    component: Ranking,
  }, {
    path: '/ranking/:id/:gender',
    name: 'RankingDetail',
    component: RankingDetail
  }, {
    path: '/test',
    name: "GoTop",
    component: GoTop
  }, {
    path: "*",
    name: "Error",
    component: Errors
  }]
});
