<template>
  <div>
    <div v-show="!isSearch" class="content" v-loading="isLoadings">
      <Header isHis="male" v-model="isSearch">
        <div class="logo" slot="left-icon">
          <img src="https://qidian.gtimg.com/qdm/img/logo-qdm.02fc8.svg" alt>
        </div>
        <div slot="search-user">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user"></use>
          </svg>
        </div>
        <div slot="tit1" @click="$router.push({ path: '/catrgory#male' })">男生</div>
        <div slot="tit2" @click="$router.push({ path: '/catrgory#female' })">女生</div>
      </Header>
      <div class="module-content">
        <!-- 轮播图 -->
        <div class="banner">
          <!-- swiper -->
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in banner" :key="index">
              <img :src="item" alt>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <!-- 搜索 -->
        <div class="search" @click="isSearch =! isSearch">
          <div class="search-input">
            <i class="icon-text el-icon-search">电影世界私人定制</i>
          </div>
        </div>
        <!-- 导航 -->
        <ul class="nav-list">
          <li>
            <div class="icon icon-sort"></div>
            <div class="title">分类</div>
          </li>
          <li>
            <div class="icon icon-rank"></div>
            <div class="title">排行榜</div>
          </li>
          <li>
            <div class="icon icon-free"></div>
            <div class="title">免费</div>
          </li>
          <li>
            <div class="icon icon-end"></div>
            <div class="title">完本</div>
          </li>
          <li>
            <div class="icon icon-god"></div>
            <div class="title">大神</div>
          </li>
        </ul>
        <!-- app广告 -->
        <div class="home-ad">
          <a
            href="//qidian.gtimg.com/QDReader/?redirect=https%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fqi-dian-du-shu-li-xian-ban%2Fid534174796%3Fmt%3D8"
          >
            <img
              src="//qidian.qpic.cn/qidian_common/349573/98630675299f399301c19529bcc02dda/0"
              alt
              srcset
            >
          </a>
        </div>
        <!-- 首页小说推荐模块 -->
        <!-- 热门小说 -->
        <div class="module">
          <HomeCard>
            <span slot="title-desc" class="title-desc">起点编辑推荐</span>
            <div slot="content" class="module-slide">
              <swiper :options="swiperOption2">
                <swiper-slide v-for="(item,index) in HotBooks" :key="index">
                  <div class="book-ad" @click="click_book(item._id)">
                    <img :src="decodeURIComponent((item.cover).replace('/agent/',''))" alt>
                    <span class="book-title">{{item.title}}</span>
                    <div class="book-author">{{item.author}}</div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </HomeCard>
        </div>
        <!-- 按钮推荐 -->
        <div class="home-btn-line-x">
          <a href="javascript:;">新书强推</a>
          <a href="javascript:;">
            三江
            <span class="dot-red"></span>网文新风
          </a>
        </div>
        <!-- 排行榜 -->
        <div class="module">
          <HomeCard>
            <h3 slot="title">排行榜</h3>
            <span slot="title-desc" class="title-desc"></span>
            <div slot="content" class="module-slide">
              <ul class="btn-group">
                <li class="active">热搜榜</li>
                <li>潜力榜</li>
                <li>好评榜</li>
                <li>VIP排行榜</li>
              </ul>
              <swiper :options="swiperOption2">
                <swiper-slide v-for="(item,index) in HotSearchBooks" :key="index">
                  <div class="book-ad" @click="click_book(item._id)">
                    <img :src="decodeURIComponent((item.cover).replace('/agent/',''))" alt>
                    <span class="book-title">{{item.title}}</span>
                    <div class="book-author">{{item.author}}</div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </HomeCard>
        </div>
        <!-- 新书抢先 -->
        <div class="module">
          <HomeCard>
            <h3 slot="title">新书抢先</h3>
            <span slot="title-desc" class="title-desc">24小时热销新书</span>
            <div slot="content" class="module-slide">
              <!-- 搜索结果显示 -->
              <div class="book-list">
                <ul>
                  <li class="book-li" v-for="item in PotentialBooks.slice(0,4)" :key="item._id">
                    <a @click="click_book(item._id)">
                      <img
                        :src="decodeURIComponent((item.cover).replace('/agent/',''))"
                        :alt="item.title"
                      >
                      <div class="book-info">
                        <div :class="['book-title']">
                          <h3>{{item.title}}</h3>
                        </div>
                        <div class="book-intro">{{item.shortIntro}}</div>
                        <div class="book-meta">
                          <div class="book-author">
                            <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-user"></use>
                            </svg>
                            <span>{{item.author}}</span>
                          </div>
                          <div class="book-tags">
                            <div class="gray">{{item.cat}}</div>
                            <div class="red">连载</div>
                            <div
                              class="blue"
                            >{{ parseInt((item.wordCount / 10000) * 10) / 10 + "万字"}}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </HomeCard>
        </div>
        <!-- 分类推荐 -->
        <div class="module">
          <HomeCard>
            <h3 slot="title">分类推荐</h3>
            <span slot="title-desc" class="title-desc"></span>
            <div slot="content" class="module-slide">
              <ul class="btn-group">
                <li :class="{active:isActiveX=='xuanhuan'}" @click="isActiveX='xuanhuan'">玄幻奇幻</li>
                <li :class="{active:isActiveX=='wuxia'}" @click="isActiveX='wuxia'">武侠仙侠</li>
                <li :class="{active:isActiveX=='dushi'}" @click="isActiveX='dushi'">都市职场</li>
              </ul>
              <swiper :options="swiperOption2">
                <swiper-slide v-for="(item,index) in typeBooksX" :key="index">
                  <div class="book-ad" @click="click_book(item._id)">
                    <img
                      :src="decodeURIComponent((item.cover).replace('/agent/',''))"
                      :alt="item.title"
                    >
                    <span class="book-title">{{item.title}}</span>
                    <div class="book-author">{{item.author}}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <ul class="btn-group">
                <li :class="{active:isActiveY=='lishi'}" @click="isActiveY='lishi'">历史军事</li>
                <li :class="{active:isActiveY=='games'}" @click="isActiveY='games'">游戏体育</li>
                <li :class="{active:isActiveY=='kehuan'}" @click="isActiveY='kehuan'">科幻灵异</li>
              </ul>
              <swiper :options="swiperOption2">
                <swiper-slide v-for="(item,index) in typeBooksY" :key="index">
                  <div class="book-ad" @click="click_book(item._id)">
                    <img
                      :src="decodeURIComponent((item.cover).replace('/agent/',''))"
                      :alt="item.title"
                    >
                    <span class="book-title">{{item.title}}</span>
                    <div class="book-author">{{item.author}}</div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </HomeCard>
        </div>
        <!-- 猜你喜欢 -->
        <div class="module">
          <HomeCard>
            <h3 slot="title">猜你喜欢</h3>
            <span slot="title-desc" class="title-desc"></span>
            <span slot="more" class="more">
              换一批
              <i class="el-icon-refresh"></i>
            </span>
            <div slot="content" class="module-slide">
              <!-- 搜索结果显示 -->
              <div class="book-list">
                <ul>
                  <li
                    class="book-li"
                    v-for="item in RetenTionBooks.slice(refresh, refresh+5)"
                    :key="item._id"
                  >
                    <a @click="click_book(item._id)">
                      <img
                        :src="decodeURIComponent((item.cover).replace('/agent/',''))"
                        :alt="item.title"
                      >
                      <div class="book-info">
                        <div :class="['book-title']">
                          <h3>{{item.title}}</h3>
                        </div>
                        <div class="book-intro">{{item.shortIntro}}</div>
                        <div class="book-meta">
                          <div class="book-author">
                            <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-user"></use>
                            </svg>
                            <span>{{item.author}}</span>
                          </div>
                          <div class="book-tags">
                            <div class="gray">{{item.cat}}</div>
                            <div class="red">连载</div>
                            <div
                              class="blue"
                            >{{ parseInt((item.wordCount / 10000) * 10) / 10 + "万字"}}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </HomeCard>
        </div>
        <!-- 专题 4张图片展示 -->
        <div class="module">
          <HomeCard>
            <h3 slot="title">精选专题</h3>
            <span slot="title-desc" class="title-desc"></span>
            <span slot="more" class="more"></span>
            <div slot="content" class="module-slide">
              <div class="imgs">
                <a href="javascript:;">
                  <img
                    src="//qidian.qpic.cn/qidian_common/349573/6cf1b2918b5ee84dfa8a13a8b55e953f/0"
                    alt
                  >
                </a>
                <a href="javascript:;">
                  <img
                    src="//qidian.qpic.cn/qidian_common/349573/ff450b00ae48c5956149911f6240ca4a/0"
                    alt
                  >
                </a>
              </div>
              <div class="imgs">
                <a href="javascript:;">
                  <img
                    src="//qidian.qpic.cn/qidian_common/349573/196e3d3bec0baee4ea0dcb40ddce2bb3/0"
                    alt
                  >
                </a>
                <a href="javascript:;">
                  <img
                    src="//qidian.qpic.cn/qidian_common/349573/22ad6771d7b54ec961c8d3e77d6991ac/0"
                    alt
                  >
                </a>
              </div>
            </div>
          </HomeCard>
        </div>
      </div>
    </div>
    <div class="footer">
      <Footer/>
    </div>
    <div class="search-page" v-show="isSearch">
      <Search v-model="isSearch"/>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Header from "@/components/Header";
import Search from "@/components/search";
import Footer from "@/components/Footer";
import HomeCard from "@/components/HomeCard";
import request from "@/http_";
export default {
  components: {
    Header,
    Footer,
    Search,
    swiper,
    swiperSlide,
    HomeCard
  },
  data() {
    return {
      isLoadings: true,
      HotBooks: [], // 热门小说
      HotSearchBooks: [], // 热搜榜
      PotentialBooks: [], // 潜力榜
      PraiseBooks: [], // 好评
      VipBooks: [], // VIP
      NewBooks: [], // 新书
      RetenTionBooks: [], // 读者存留率top100
      XuanHuanBooks: null, // 玄幻
      QiHuanBooks: null, // 奇幻
      WuXiaBooks: null, // 奇幻
      XianXiaBooks: null, // 奇幻
      DuShiBooks: null, // 奇幻
      LiShiBooks: null, // 奇幻
      GameBooks: null, // 奇幻
      KeHuanBooks: null, // 奇幻
      QiHuanBooks: null, // 奇幻
      Types: [
        { XuanHuanBooks: "玄幻" },
        { QiHuanBooks: "奇幻" },
        { WuXiaBooks: "武侠" },
        { XianXiaBooks: "仙侠" },
        { DuShiBooks: "都市" },
        { LiShiBooks: "历史" },
        { GameBooks: "游戏" },
        { KeHuanBooks: "科幻" },
        { LingYiBooks: "灵异" }
      ],
      refresh: 0, //刷新 值
      isActiveX: "xuanhuan", // 用来判断分类推荐当前选中类别
      isActiveY: "lishi", // 用来判断分类推荐当前选中类别
      banner: [
        "//qidian.qpic.cn/qidian_common/349573/28b9d57602d5f02139787ca9a9e361b6/0",
        "//qidian.qpic.cn/qidian_common/349573/185a83020cf454940b3074ca799e78c7/0",
        "//qidian.qpic.cn/qidian_common/349573/7d08609bf6b6f1370c714d157d43c8b2/0",
        "//qidian.qpic.cn/qidian_common/349573/2adf5c980c73a896b64dff676fb2d49d/0",
        "//qidian.qpic.cn/qidian_common/349573/2198d860477a1951e8e5ff0bb4d54dfd/0"
      ],
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        }
      },
      swiperOption2: {
        slidesPerView: 4
      },
      isSearch: false //是否搜索
    };
  },
  computed: {
    // 分类推荐返回
    typeBooksX() {
      if (this.isActiveX === "xuanhuan") {
        return this.XuanHuanBooks;
      }
      if (this.isActiveX === "wuxia") {
        return this.XianXiaBooks;
      }
      if (this.isActiveX === "dushi") {
        return this.DuShiBooks;
      }
    },
    typeBooksY() {
      if (this.isActiveY === "lishi") {
        return this.LiShiBooks;
      }
      if (this.isActiveY === "games") {
        return this.GameBooks;
      }
      if (this.isActiveY === "kehuan") {
        return this.KeHuanBooks;
      }
    }
  },
  created() {
    // 请求热门书籍
    this.getBooks(this.$config.LISTID._TOPID, res => {
      this.HotBooks = res.data.ranking.books;
    });
    // 请求热搜榜
    this.getBooks(this.$config.LISTID._HOTSEARCHID, res => {
      this.HotSearchBooks = res.data.ranking.books;
    });
    // 请求潜力榜
    this.getBooks(this.$config.LISTID._POTENTIALID, res => {
      this.PotentialBooks = res.data.ranking.books;
    });
    // 好评
    this.getBooks(this.$config.LISTID._PRAISEID, res => {
      this.PraiseBooks = res.data.ranking.books;
    });
    // Vip
    this.getBooks(this.$config.LISTID._VIPID, res => {
      this.VipBooks = res.data.ranking.books;
    });
    // 新书榜
    this.getBooks(this.$config.LISTID._NEWBOOKID, res => {
      this.NewBooks = res.data.ranking.books;
    });
    this.getBooks(this.$config.LISTID._RENTENTION, res => {
      this.RetenTionBooks = res.data.ranking.books;
    });
    // 请求分类
    this.Types.forEach(item => {
      this.getCateBooks(Object.keys(item)[0], Object.values(item)[0]);
    });
  },
  watch: {
    HotBooks(val) {
      this.isLoadings = false;
    }
  },
  methods: {
    // 跳转书籍详情
    click_book(_id) {
      this.$router.push({
        path: "/book/" + _id
      });
    },
    // 请求榜单
    async getBooks(_id, callback) {
      const res = await request.get(this.$config.LIST_URL + _id);
      if (res.status === 200) callback(res);
    },
    // 分类请求
    async getCateBooks(keys, query, limit = 4) {
      const res = await request.get(
        this.$config.FIRSTBOOKCATEGORIE +
          query +
          this.$config.ENDBOOKCATEGORIE +
          limit
      );
      this[keys] = res.data.books;
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  background-color: #f6f7f9;
}
.module-content {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 50px;
  justify-content: center;
  align-items: center;
  .module {
    margin-top: 10px;
    width: 100%;
    .title-desc {
      margin-left: 4px;
      color: #969ba3;
      letter-spacing: 1px;
    }
    .module-slide {
      margin-top: -20px;
      .imgs {
        width: 100%;
        display: flex;
        a {
          margin: 10px;
          display: flex;
          flex-wrap: wrap;
          text-decoration: none;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .book-list {
        width: calc(100% - 15px);
        .book-li {
          width: 100%;
          margin: 10px 0 10px 0;
          display: flex;
          padding-bottom: 5px;
          border-bottom: 1px solid #f0f1f2;
          font-size: 12px;
          a {
            width: 100%;
            height: 110px;
            display: flex;
            img {
              width: 4.823rem;
              height: 6.5rem;
            }
            .book-info {
              width: 100%;
              margin-left: 10px;
              color: black;
              display: flex;
              flex-direction: column;
              letter-spacing: 1px;
              .book-title {
                position: relative;
                line-height: 1.4;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .book-title.active {
                color: #ed424b;
              }
              .book-intro {
                margin-top: 10px;
                margin-bottom: 5px;
                font-size: 12px;
                color: #969ba3;
                text-indent: 10px;
                overflow: hidden;
                line-height: 20px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
              }
              .book-meta {
                display: flex;
                color: #969ba3;
                justify-content: space-between;
                .book-tags {
                  display: flex;
                  font-size: 11px;
                  align-content: center;
                  letter-spacing: 1px;
                  div {
                    margin-left: 5px;
                  }
                  .gray {
                    color: #969ba3;
                    box-shadow: 0px 0px 1px 0px #969ba3;
                  }
                  .red {
                    color: red;
                    box-shadow: 0px 0px 1px 0px red;
                  }
                  .blue {
                    color: blue;
                    box-shadow: 0px 0px 1px 0px blue;
                  }
                }
              }
            }
          }
        }
      }
      .btn-group {
        display: flex;
        width: 100%;
        justify-content: center;
        ul,
        li {
          list-style: none;
        }
        li {
          width: 33%;
          height: 30px;
          text-align: center;
          line-height: 30px;
          margin: 10px 0;
          color: #ed424b;
          border-left: none;
          cursor: pointer;
          border-top: 1px solid #ed424b;
          border-right: 1px solid #ed424b;
          border-bottom: 1px solid #ed424b;
        }
        li.active {
          background: #ed424b;
          color: #fff;
        }
        li:first-child {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          border-left: 1px solid #ed424b;
        }
        li:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
      .book-ad {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.688rem;
        justify-content: center;
        .book-author {
          color: #969ba3;
        }
        img {
          width: 80px;
          height: 100px;
        }
      }
    }
  }
  .home-btn-line-x {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .dot-red {
      display: inline-block;
      background: #ed424b;
      width: 3px;
      height: 3px;
      margin: 0 5px;
    }
    a {
      text-decoration: none;
      width: 45%;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      border: 1px solid #ed424b;
      background: transparent;
      color: #ed424b;
      border-radius: 20px;
    }
  }
  .banner {
    position: relative;
    width: 95%;
    height: 100%;
    display: flex;
    img {
      display: block;
      width: 100%;
      height: 100%;
      height: calc(100% + 25.1897%);
    }
  }
  .search {
    height: 2.85em;
    width: 100%;
    margin: 2px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-input {
      width: calc(100% - 20px);
      height: 2.75em;
      outline: none;
      font-size: 0.8125rem;
      line-height: 2rem;
      border-radius: 0.25rem;
      border: none;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-text {
        font-size: 0.8125rem;
        line-height: 2rem;
        display: block;
        margin: 0.375rem 0.75rem;
        text-align: center;
        color: #969ba3;
        border-radius: 0.25rem;
        background-color: #fff;
      }
    }
  }
  .nav-list {
    font-size: 0.8566em;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
    background: #fff;
    height: 5rem;
    border-radius: 0.235rem;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        font-weight: 500;
      }
    }
    .icon {
      margin: 5px;
      background-image: url(../assets/image/sprite.png);
      background-size: 87px 87px;
    }
    .icon-home {
      width: 28px;
      height: 25px;
      background-position: -31px 0;
    }
    .icon-sort {
      width: 24px;
      height: 24px;
      background-position: -63px -28px;
    }
    .icon-rank {
      width: 27px;
      height: 26px;
      background-position: 0 0;
    }
    .icon-free {
      width: 26px;
      height: 26px;
      background-position: 0 -30px;
    }
    .icon-end {
      width: 20px;
      height: 27px;
      background-position: 0 -60px;
    }
    .icon-god {
      background-position: -30px -30px;
      width: 26px;
      height: 26px;
    }
  }
  .home-ad {
    margin-top: 10px;
    width: 95%;
    display: flex;
    justify-content: center;
    a {
      width: 95%;
      height: 100%;
      max-height: 100px;
      display: flex;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
        max-height: 6rem;
      }
    }
  }
}

.footer {
  width: 100%;
  position: relative;
}
</style>