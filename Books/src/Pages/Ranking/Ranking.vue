<template>
  <div>
    <div>
      <Header :isHis="isMale" v-model="isSearch">
        <div slot="left-icon" onclick="history.back(-1)">
          <i class="el-icon-arrow-left"></i>
          <span>排行榜</span>
        </div>
        <div slot="search-user">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user"></use>
          </svg>
        </div>
        <div slot="tit1" @click="click_title('male')">男生</div>
        <div slot="tit2" @click="click_title('female')">女生</div>
      </Header>
      <div class="content">
        <article
          class="module"
          v-for="(item, index) in allBooksRank[isMale]"
          v-show="index <= 5"
          :key="index"
        >
          <section class="module-list">
            <div class="img" @click="click_Ranks(item._id)">
              <img :src="bgArr[index>3?Math.floor((Math.random()*3)+1):index]" alt>
              <div class="img-top-title">
                <h3>{{item.shortTitle}}</h3>
                <span class="icon-go-right-x">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrowright"></use>
                  </svg>
                </span>
              </div>
            </div>
            <div class="list-book-title">
              <ul class="list-book" v-for="(items, index) in Books[index]" :key="index">
                <li
                  class="list"
                  @click="click_book(item._id)"
                  v-for="(item, index) in items.slice(0, 5)"
                  :key="index"
                >
                  <div class="title">
                    <h3 class="index">{{index+1}}.</h3>
                    <h4>{{item.title}}</h4>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </li>
              </ul>
            </div>
          </section>
        </article>
      </div>
      <div class="footer">
        <Footer/>
      </div>
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
      isSearch: false,
      Books: [], //所有书籍
      allBooksRank: [], // 所有榜单
      topMaleBooks: [], // 最热 male
      isMale: "male", // 频道
      bgArr: [
        // 背景图
        "//qidian.gtimg.com/qdm/img/rank/rank-bg-1.c077f.jpg",
        "//qidian.gtimg.com/qdm/img/rank/rank-bg-2.868f8.jpg",
        "//qidian.gtimg.com/qdm/img/rank/rank-bg-3.cd1bc.jpg",
        "//qidian.gtimg.com/qdm/img/rank/rank-bg-4.b5dae.jpg"
      ]
    };
  },
  watch: {
    isMale(val) {
      console.log(this.allBooksRank);
      this.Books = [];
      this.getAllBooks();
    },
    allBooksRank(val) {
      if (val.ok) {
        this.getAllBooks();
      }
    }
  },
  created() {
    this.isMale = this.$route.params.gender;
    this.getBooksAllRanking();
  },
  methods: {
    // 点击主题书签
    click_Ranks(id) {
      this.$router.push({
        name: "RankingDetail",
        params: {
          id,
          gender: this.isMale
        }
      });
    },
    // 点击书籍
    click_book(id) {
      this.$router.push({
        name: "BookDeatils",
        params: {
          id
        }
      });
    },
    // 点击频道
    click_title(t) {
      this.$router.push({
        path: "/ranking/" + t
      });
      this.isMale = t;
    },
    // 请求榜单
    async getBooksRanking(_id, callback) {
      const res = await request.get(this.$config.RANKINGURL + _id);
      callback(res);
    },
    // 请求所有榜单分类
    async getBooksAllRanking() {
      const res = await request.get(this.$config.RANKINGALLURL);
      this.allBooksRank = res.data;
    },
    // 获取所有榜单书籍数据
    getAllBooks() {
      this.allBooksRank[this.isMale].forEach((element, index) => {
        const d = {};
        this.getBooksRanking(element._id, res => {
          d[element.shortTitle] = res.data.ranking.books;
          this.Books.push(d);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  background: #f3f4f5;
  position: relative;
  font-size: 16px;
  top: 60px;
  ul,
  li {
    list-style: none;
  }
  .module {
    background: #fff;
    width: 100%;
  }
  .module-list {
    margin-top: 10px;
    width: 100%;
    display: flex;
    .list-book-title {
      width: 100%;
      .list-book {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .list {
        width: calc(100% - 20px);
        display: flex;
        height: 2.3rem;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .books {
          display: flex;
          flex-direction: column;
        }
        .title {
          display: flex;
          align-items: baseline;
          letter-spacing: 1px;
          h3 {
            margin-right: 10px;
          }
        }
      }
    }
    .img {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .img-top-title {
        text-align: center;
        width: 25%;
        margin-top: -30px;
        position: absolute;
        color: #fff;
      }
      .icon-go-right-x {
        padding: 5px;
        letter-spacing: 2px;
        border-radius: 50%;
        background: #fff;
        position: relative;
        top: 60px;
        svg {
          color: #9120d4;
        }
      }
      img {
        width: 8.15rem;
        height: 11.55rem;
      }
    }
  }
}
.footer {
  margin-top: 60px;
}
</style>