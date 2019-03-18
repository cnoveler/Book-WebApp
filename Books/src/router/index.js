import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/Home"
import BookShelf from "@/pages/BookShelf"
import BookShelfHistory from "@/pages/BookShelfHistory"
import Errors from "@/pages/Error"
import SearchResult from "@/pages/SearchResult"
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
    component: Home,
    meta: {
      title: '首页'
    }
  }, {
    path: "/bookshelf/my",
    name: "BookShelf",
    component: BookShelf,
    meta: {
      title: '我的书架'
    }
  }, {
    path: "/bookshelf/my-history",
    name: "BookShelfHistory",
    component: BookShelfHistory,
    meta: {
      title: '最近阅读'
    }
  }, {
    path: "/search",
    name: "SearchResult",
    component: SearchResult,
    children: [{
      path: ":kw"
    }],
    meta: {
      title: '搜索'
    }
  }, {
    path: "/book/:id",
    name: "BookDeatils",
    component: BookDeatils,
    meta: {
      title: '书籍详情'
    }
  }, {
    path: '/book/:id/catalog',
    name: 'BookChapter',
    component: BookChapter,
    meta: {
      title: '书籍目录'
    }
  }, {
    path: '/book/:id/read',
    name: 'BookContent',
    component: BookContent,
    meta: {
      title: '书籍阅读'
    }
  }, {
    path: '/catrgory',
    name: 'Catrgory',
    component: Catrgory,
    meta: {
      title: '书籍分类'
    }
  }, {
    path: '/catrgory/details',
    name: 'CategoryDetails',
    component: CategoryDetails,
    children: [{
      path: ':gender&:type&:major&:minor&:start&:limit'
    }],
    meta: {
      title: '分类详情'
    }
  }, {
    path: '/ranking/:gender',
    name: 'Ranking',
    component: Ranking,
    meta: {
      title: '排行榜'
    }
  }, {
    path: '/ranking/:id/:gender',
    name: 'RankingDetail',
    component: RankingDetail,
    meta: {
      title: '排行榜详情'
    }
  }, {
    path: '/test',
    name: "GoTop",
    component: GoTop
  }, {
    path: "*",
    name: "Error",
    component: Errors,
    meta: {
      title: '错误'
    }
  }]
});
