<template>
  <div class="body">
    <div v-show="!isSearch">
      <Header isHis="male" v-model="isSearch">
        <div slot="left-icon" onclick="history.back(-1)">
          <i class="el-icon-arrow-left"></i>
          <span>{{title}}</span>
        </div>
        <span slot="header-content"></span>
      </Header>
      <div class="content">
        <div class="header" v-show="!isFixedHeade">
          <ul class="lists">
            <li @click="click_tags(item.value)" v-for="(item,index) in filters.items" :key="index">
              <span :class="{active:filters.selectedIndex === item.value}">{{item.text}}</span>
            </li>
          </ul>
        </div>
        <div class="fixed-header" v-show="isFixedHeade">
          <div class="fixed-title" @click="isSelect = !isSelect">
            <span>{{rtCurrentTag[0].text}}-当月</span>
            <i :class="isSelect?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </div>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <ul class="lists" v-show="isSelect" style="animation-duration:300ms">
              <li
                @click="click_tags(item.value)"
                v-for="(item,index) in filters.items"
                :key="index"
              >
                <span :class="{active:filters.selectedIndex === item.value}">{{item.text}}</span>
              </li>
            </ul>
          </transition>
        </div>
        <article class="module">
          <section>
            <ol class="book-list">
              <li
                class="book-li"
                @click="click_book(item._id)"
                v-for="(item, index) in Books"
                :key="index"
              >
                <div class="book-layout">
                  <h4 class="count">{{index + 1}}.</h4>
                  <img :src="decodeURIComponent((item.cover).replace('/agent/',''))" alt>
                  <div class="book-cell-x">
                    <div class="book-cell">
                      <div class="book-title-x">
                        <h4>{{item.title}}</h4>
                        <div class="book-title-r">{{parseInt(item.latelyFollower / 1000) / 10}}万收藏</div>
                      </div>
                      <div class="book-tags">
                        <em>{{item.majorCate}}</em> ·
                        <em>{{item.minorCate}}</em>
                      </div>
                      <p class="book-desc">{{item.shortIntro}}</p>
                      <div class="book-meta">
                        <div class="book-meta-l">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-user"></use>
                          </svg>
                          <div class="author">{{item.author}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </section>
        </article>
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
import request from "@/http_";
export default {
  components: {
    Header,
    Search
  },
  data() {
    return {
      id: null,
      isMale: "male",
      isSelect: false, // 是否开启固定顶部的选分类项
      isFixedHeade: false,
      Books: [],
      title: "",
      clientHeight: 0,
      scrollHight: 0,
      scrollTop: 0, // 当前滚动条高度
      filters: {
        key: "catId",
        selectedIndex: -1,
        items: [
          {
            value: -1,
            text: "全站"
          },
          {
            value: 21,
            text: "玄幻"
          },
          {
            value: 1,
            text: "奇幻"
          },
          {
            value: 2,
            text: "武侠"
          },
          {
            value: 22,
            text: "仙侠"
          },
          {
            value: 4,
            text: "都市"
          },
          {
            value: 5,
            text: "历史"
          },
          {
            value: 7,
            text: "游戏"
          },
          {
            value: 9,
            text: "科幻"
          },
          {
            value: 10,
            text: "灵异"
          }
        ]
      },
      start: 0,
      text: null, //当前选中的分类text值
      isSearch: false
    };
  },
  watch: {
    start(val, old) {
      if (val - old === 20) {
        let a = [];
        this.getBooksCatetory(this.text, res => {
          this.Books = this.Books.concat(res.data.books);
        });
      }
    },
    // 监控filters对象中index 值是否改变
    getSelectIndex(val) {
      if (val !== -1) {
        const r = this.filters.items.filter(item => {
          return item.value === val;
        })[0];
        this.text = r.text;
        this.getBooksCatetory(r.text, res => {
          this.Books = [];
          this.Books = res.data.books;
        });
      } else {
        this.getBooksRanking(this.id, res => {
          this.Books = res.data.ranking.books;
        });
      }
    },
    // 监控滚动条当前高度
    scrollTop(val) {
      if (val > 0.1) {
        this.isSelect = false;
        this.isFixedHeade = true;
      } else {
        this.isFixedHeade = false;
      }
    }
  },
  computed: {
    // 返回filters 对象中的 index
    getSelectIndex() {
      return this.filters.selectedIndex;
    },
    // 返回当前选择标签
    rtCurrentTag() {
      return this.filters.items.filter(item => {
        return item.value === this.filters.selectedIndex;
      });
    }
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
  created() {
    this.id = this.$route.params.id;
    this.isMale = this.$route.params.gender;
    this.getBooksRanking(this.id, res => {
      this.Books = res.data.ranking.books;
      this.title = res.data.ranking.shortTitle;
    });
  },
  methods: {
    // 请求分类书单列表
    async getBooksCatetory(query, callback) {
      const res = await request.get(
        `${this.$config.FIRSTBOOKCATEGORIE}?gender=${
          this.isMale
        }&type=hot&major=${query}&start=${this.start}&limit=20`
      );
      callback(res);
    },
    // 点击书籍
    click_book(id) {
      this.$router.push({ name: "BookDeatils", params: { id } });
    },
    // 点击标签
    click_tags(v) {
      this.filters.selectedIndex = v;
    },
    // 请求榜单
    async getBooksRanking(_id, callback) {
      const res = await request.get(this.$config.RANKINGURL + _id);
      callback(res);
    }
  }
};
</script>

<style scoped lang="scss">
.body {
  width: 100%;
}
.content {
  margin-top: 50px;
  background: #f1f2f3;
  .header {
    ul,
    li {
      list-style: none;
    }
    .lists {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        width: 14%;
        display: flex;
        color: rgba(0, 0, 0, 0.4);
        justify-content: center;
        margin: 10px;
        span {
          padding: 5px;
          width: 100%;
          font-size: 0.88rem;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .active {
          color: #ed424b;
          border-radius: 10px;
          border: 1px solid #ed424b;
        }
      }
    }
  }
  .fixed-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    background: #fff;
    flex-direction: column;
    .fixed-title {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 2px;
      color: #e1e2e1;
      span {
        color: #ed424b;
      }
    }
    .lists {
      z-index: 99;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background: #f1f2f3;
      li {
        width: 14%;
        display: flex;
        color: rgba(0, 0, 0, 0.4);
        justify-content: center;
        margin: 10px;
        span {
          padding: 5px;
          width: 100%;
          font-size: 0.88rem;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .active {
          color: #ed424b;
          border-radius: 10px;
          border: 1px solid #ed424b;
        }
      }
    }
  }
  .module {
    background: #fff;
    ol,
    li {
      list-style: none;
    }
    .book-list {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .book-li {
        width: calc(100% - 20px);
        display: flex;
        flex-direction: column;
        align-items: center;
        .book-layout {
          width: inherit;
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          .count {
            display: flex;
            align-items: center;
            padding: 5px;
          }
          .book-cell-x {
            width: 100%;
            color: #969ba3;
            display: flex;
            justify-content: center;
            align-items: center;
            .book-cell {
              width: calc(100% - 20px);
              .book-title-x {
                margin-bottom: 5px;
                color: black;
                display: flex;
                justify-content: space-between;
                .book-title-r {
                  letter-spacing: 2px;
                  color: #ed424b;
                }
              }
              .book-tags {
                margin-bottom: 5px;
                font-size: 0.898rem;
              }
              .book-desc {
                margin-bottom: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1; // 控制多行的行数
                -webkit-box-orient: vertical;
              }
              .book-meta {
                display: flex;
                .book-meta-l {
                  display: flex;
                  align-items: center;
                }
              }
            }
          }
          img {
            width: 4.4235rem;
            height: 6.4564rem;
          }
        }
        counter-increment: number 1;
      }
      // .book-li::before {
      //   width: 20px;
      //   position: relative;
      //   font-size: 20px;
      //   font-weight: 700;
      //   top: 65px;
      //   content: counter(number) ".";
      // }
    }
  }
}
</style>