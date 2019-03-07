<template>
  <div class="body">
    <div v-show="!isSearch">
      <Header ref="header" v-model="isSearch" v-show="!isFixed">
        <div slot="left-icon" onclick="history.back(-1)">
          <i class="el-icon-arrow-left"></i>
          <span>{{minor}}</span>
        </div>
        <span slot="header-content"></span>
      </Header>
      <div class="content">
        <div class="content-filter" ref="content-filter">
          <ul class="filter-list">
            <li class="filter-li" @click="type = 'hot'">
              <span :class="{active:type === 'hot'}">最热</span>
            </li>
            <li class="filter-li" @click="type = 'new'">
              <span :class="{active:type === 'new'}">新书</span>
            </li>
            <li class="filter-li" @click="type = 'reputation'">
              <span :class="{active:type === 'reputation'}">好评</span>
            </li>
            <li class="filter-li" @click="type = 'over'">
              <span :class="{active:type === 'over'}">完结</span>
            </li>
          </ul>
        </div>
        <!-- 搜索结果显示 -->
        <div class="book-list" v-show="results.length > 0">
          <ul>
            <li class="book-li" v-for="item in results" :key="item._id">
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
                      <div class="blue">{{ parseInt((item.wordCount / 10000) * 10) / 10 + "万字"}}</div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="null" v-show="results.length <= 0">
          <div class="null-box">
            <img src="@/assets/image/null.svg" alt>
            <div class="null-text">
              <span>还木有数据( •̀ ω •́ )！</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-page" v-show="isSearch">
      <Search v-model="isSearch"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/search";
import Footer from "@/components/Footer";
import request from "@/http_";
export default {
  components: {
    Header,
    Search,
    Footer
  },
  data() {
    return {
      gender: "male", // 男频还是女频
      start: 0, // 分页开始数目
      limit: 20, // 获取分页条数
      major: null, // 大分类
      minor: null, // 小分类
      type: "hot", // 最热书籍
      results: [], // 主题书籍数据
      isFixed: false,
      scrollTop: 0, // 浏览器滚动条当前高度
      clientHeight: 0, // 元素高度
      scrollHight: null, // 滚动条高度
      isLoading: false, // 是否触底
      isSearch: false
    };
  },
  watch: {
    type(val) {
      this.results = [];
      this.getCatgoryBooks();
    },
    start(val, old) {
      if (val - old === 20) {
        this.getCatgoryBooks();
      }
    },
    scrollTop(val) {
      if (val > 60) {
        this.isFixed = true;
        this.theFilterisFixed();
        return;
      }
      if (val < 60) {
        this.isFixed = false;
        this.$refs["content-filter"].style.position = "";
      }
    }
  },
  created() {
    this.gender = this.$route.query.gender;
    this.start = this.$route.query.start;
    this.limit = this.$route.query.limit;
    this.major = this.$route.query.major;
    this.minor = this.$route.query.minor;
    this.type = this.$route.query.type;
    this.getCatgoryBooks();
  },
  mounted() {
    window.addEventListener("scroll", e => {
      // 当前滚动条高度
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = scrollTop;
      // 可视区高度
      const clientHeight = document.documentElement.clientHeight;
      this.clientHeight = clientHeight;
      // 滚动条总高度
      const scrollHight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      this.scrollHight = scrollHight;
      // 判断是否触底
      if (this.clientHeight + this.scrollTop >= this.scrollHight - 100) {
        this.start = parseInt(this.start) + 20;
      }
    });
  },
  methods: {
    // 点击书籍
    click_book(_id) {
      this.$router.push({ name: "BookDeatils", params: { id: _id } });
    },
    // 当滑动滚动条的时候过滤转为固定
    theFilterisFixed() {
      this.$refs["content-filter"].style.position = "fixed";
      this.$refs["content-filter"].style.top = 0;
    },
    // 获取分类主题书籍
    async getCatgoryBooks() {
      const url = `${this.$config.FIRSTBOOKCATEGORIE}?gender=${
        this.gender
      }&type=${this.type}&major=${this.major}&minor=${this.minor}&start=${
        this.start
      }&limit=${this.limit}`;
      const res = await request.get(url);
      this.results = this.results.concat(res.data.books);
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .null {
    .null-box {
      margin: 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .null-text {
        margin-top: 10px;
        font-size: 0.756rem;
        color: #aaa;
      }
    }
  }
  .book-list {
    width: calc(100% - 15px);
    .book-li {
      width: 100%;
      margin: 5px 0 10px 0;
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
  .content-filter {
    width: 100%;
    height: 50px;
    z-index: 1;
    background: #fff;
    ul,
    li {
      list-style: none;
    }
    .filter-list {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      .filter-li {
        width: 100%;
        display: flex;
        justify-content: center;
        color: #aaa;
        font-size: 14px;
      }
      .active {
        border: 1px solid #ed424b;
        border-radius: 10px;
        color: #ed424b;
        padding: 0.065rem 0.5rem;
      }
    }
  }
}
</style>