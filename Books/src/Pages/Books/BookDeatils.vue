<template>
  <div class="bookdetails" v-loading="isLoadings">
    <header>
      <Header>
        <span class="left-header-text" slot="left-text">{{bookInfo.title}}</span>
        <p slot="header-content"></p>
      </Header>
      <div class="book-info">
        <div class="book-cover">
          <img :src="authorCover" alt>
        </div>
        <div class="book-meta">
          <div class="book-title">
            <h3>{{bookInfo.title}}</h3>
          </div>
          <div class="book-author">
            <a href="javascript:;">{{bookInfo.author}}</a>
            <span>
              <i>Lv.4</i>
            </span>
          </div>
          <div class="rate">
            <el-rate
              v-model="rateValue"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="rateValue * 2 + '分'"
            ></el-rate>
            <!-- <span class="span-text">5.8分/95人评过</span> -->
          </div>
          <!-- <div class="rate">
            <span>☆☆☆☆☆</span>
            <div class="hollow" :style="style">★★★★★</div>
            <span class="span-text">5.8分/95人评过</span>
          </div>-->
          <div class="book-cat">{{bookInfo.majorCate}}/{{bookInfo.minorCate}}</div>
          <div class="book-count-status">
            <div class="book-word-count">{{parseInt(bookInfo.wordCount / 10000 *10)/10 + "万字|"}}</div>
            <div class="book-status">{{bookInfo.isSerial==true?"连载":"完本"}}</div>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button size="medium " class="btn-red" @click="go_read">点击阅读</el-button>
        <el-button
          v-if="isBtnDisabled"
          ref="btn-add-book"
          size="medium"
          @click="add_bookdata(bookInfo)"
          disabled
          plain
        >加入书架</el-button>
        <el-button
          v-if="!isBtnDisabled"
          ref="btn-add-book"
          size="medium"
          @click="add_bookdata(bookInfo)"
          plain
        >加入书架</el-button>
        <el-button size="medium " plain>VIP订阅</el-button>
      </div>
    </header>
    <div class="content">
      <div class="books-intro">
        <el-card class="box-card" shadow="never">{{bookInfo.longIntro}}</el-card>
        <div class="book-directory">
          <a href="javascript:;" @click="Jump_directory">
            <p>目录</p>
            <div class="right-text">
              <span>{{bookupdated}} · {{bookInfo.isSerial==true?"连载":"完本"}}至{{bookInfo.lastChapter}}</span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right"></use>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
    <article>
      <div class="modul">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">书友评价</span>
            <small>共{{reviewDataLen}}条评论</small>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <ul class="book-reviews">
            <li v-for="(item, index) in reviewData" :key="index">
              <div class="author-cover">
                <img :src="$config.BASE_STATIC_URL + item.author.avatar" alt>
              </div>
              <div class="author-info">
                <div class="nickname">{{item.author.nickname}}</div>
                <el-rate v-model="item.rating" disabled></el-rate>
                <div class="author-content">{{item.content}}</div>
                <div
                  class="updated"
                >{{formatDate(item.updated).slice(0,3).join('-')+" "+formatDate(item.updated).slice(3,6).join(':')}}</div>
              </div>
            </li>
            <li class="more" v-show="reviewDataLen !== null">
              <a href="javascript:;">更多书评</a>
            </li>
          </ul>
        </el-card>
      </div>
    </article>
    <article>
      <div class="modul">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">本书作者</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="book-x-author">
            <div class="author-cover">
              <img :src="authorCover" alt>
              <span>
                <i>Lv.4</i>
              </span>
            </div>
            <div class="author-meta">
              <a href="javascript:;">
                <div class="author-title">
                  <h3>{{bookInfo.author}}</h3>
                  <p class="book-desc">暂无作者简介</p>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-right"></use>
                </svg>
              </a>
            </div>
          </div>
        </el-card>
      </div>
    </article>
    <article>
      <div class="modul" v-if="tagLen.length >0">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">本书标签</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="book-x-tags">
            <el-tag
              class="tags"
              :type="tagsType[Math.floor(Math.random() * 4 + 1)]"
              v-for="(item, index) in bookInfo.tags"
              :key="index"
            >{{item}}</el-tag>
          </div>
        </el-card>
      </div>
    </article>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
// import Search from "@/components/Search";
import Footer from "@/components/Footer";
import request from "@/http_";
export default {
  data() {
    return {
      rateValue: null,
      bookid: null,
      bookInfo: [],
      updatedt: [],
      value: 4.5,
      tagsType: ["default", "success", "info", "warning", "danger"], // 书籍标签el-ui 的不同属性
      authorCover: null, // 书籍封面
      reviewData: [], // 书籍短评
      reviewDataLen: null, // 书籍短评数量
      tagLen: [], // 书籍标签数量
      isLoadings: true,
      isBtnDisabled: false
    };
  },
  components: {
    Header,
    // Search,
    Footer
  },
  watch: {
    bookInfo(val) {
      this.isLoadings = false;
    }
  },
  computed: {
    style() {
      return `width:${5.8 / 2.5}rem`;
    },
    bookupdated() {
      // 书籍更新时间
      if (this.updatedt.length <= 0) return;
      const [d, h, m] = this.updatedt;
      if (d > 0) return `${d}天前`;
      if (h > 0) return `${h}小时前`;
      if (m > 0) return `${m}分钟前`;
    },
    formatshorttime() {
      // 短评时间
      this.formatDate();
    }
  },
  created() {
    this.bookid = this.$route.params.id;
    this.getBookInfo();
    this.getShortReviews();
  },
  mounted() {
    this.isTheBookIn();
  },
  methods: {
    open2() {
      this.$confirm("此操作需要将书籍加入书架, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.add_bookdata(this.bookInfo);
          this.$message({
            type: "success",
            message: "加入成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 点击阅读
    go_read() {
      if (this.isBtnDisabled) {
        this.$router.push({
          name: "BookContent",
          params: { _id: this._id }
        });
      } else {
        this.open2();
      }
    },
    // 跳转目录
    Jump_directory() {
      this.$router.push({
        name: "BookChapter",
        params: { _id: this._id, title: this.bookInfo.title }
      });
    },
    // 检测书架是否包含当前书籍
    isTheBookIn() {
      const obj = this.BookData.filter(item => {
        return item._id == this.bookid;
      });
      if (obj.length > 0) {
        this.isBtnDisabled = true;
        return true;
      }
      return false;
    },
    // 添加书架
    add_bookdata(book) {
      let data = JSON.parse(localStorage.getItem("book-data"));
      if (data == null) {
        data = [];
      }
      book.isSelected = false;
      this.isBtnDisabled = true;
      data.push(book);
      localStorage.setItem("book-data", JSON.stringify(data));
    },
    // 时间格式话
    formatDate(t) {
      const [T, Z] = t
        .replace("T", " ")
        .replace("Z", " ")
        .split(" ");
      const [Y, M, D] = T.split("-");
      const [h, m, s] = Z.split(".")[0].split(":");
      return [
        parseInt(Y),
        parseInt(M) - 1,
        parseInt(D),
        parseInt(h) + 8,
        parseInt(m),
        parseInt(s)
      ];
    },
    // 获取书籍短评
    async getShortReviews() {
      const res = await request.get(
        this.$config.BOOK_SHORT_REVIEWS + this.bookid
      );
      this.reviewData = res.data.docs.slice(0, 5);
      this.reviewDataLen = res.data.docs.length;
    },
    // 获取书籍信息s
    async getBookInfo() {
      const result = await request.get(
        this.$config.BOOK_INFO_URL + this.bookid
      );
      this.bookInfo = result.data;
      this.rateValue = parseInt(result.data.rating.score * 10) / 10 / 2;
      const date = new Date(...this.formatDate(result.data.updated));
      const newDate = new Date();
      const t = (newDate - date) / 1000;
      const d = parseInt(t / 86400);
      const hh = parseInt((t % 86400) / 3600);
      const mm = parseInt(((t % 86400) % 3600) / 60);
      this.updatedt = [d, hh, mm];
      this.authorCover = decodeURIComponent(
        result.data.cover.replace("/agent/", "")
      );
      this.tagLen = result.data.tags;
    }
  }
};
</script>

<style scoped lang="scss">
.bookdetails {
  background: #f6f7f9;
}
header {
  // background: rgba(242, 236, 230, 0.4);
  background: -webkit-linear-gradient(#f4f5f6, #fff);
  height: 280px;
  .left-header-text {
    font-size: 16px;
    font-weight: 100;
  }
  .book-info {
    width: calc(100% - 30px);
    display: flex;
    height: 200px;
    z-index: 1;
    margin-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    img {
      width: 8.6rem;
      height: 11.2rem;
    }
    .book-meta {
      margin-left: 10px;
      display: flex;
      font-size: 14px;
      flex-direction: column;
      div {
        margin-bottom: 10px;
      }
      .book-title {
        margin-top: 10px;
        font-weight: 900;
        line-height: 1.4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .book-author {
        display: flex;
        align-items: baseline;
        a {
          text-decoration: none;
          outline: none;
          color: #aaa;
        }
        span {
          transform: scale(0.7);
          background: #f0643a;
          border: none;
          color: #fff;
          display: inline-block;
          width: 20px;
          height: 8px;
          border-radius: 2px;
          font-size: 12px;
          text-align: center;
          line-height: 8px;
          font-weight: 500;
          padding: 5px;
        }
      }
      // .rate {
      //   margin-bottom: 10px;
      // }
      .book-cat {
        letter-spacing: 1px;
      }
      .book-count-status {
        height: 30px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
      }
    }
  }
  .btn {
    width: calc(100% - 20px);
    margin: 10px;
    display: flex;
    justify-content: space-between;
    .btn-red {
      background: #ed424b;
      color: #fff;
    }
  }
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  background: #fff;
  .book-intro {
    width: 100%;
  }
  .box-card {
    margin-top: 10px;
    text-indent: 30px;
    width: calc(100% - 10px);
    font-size: 14px;
    letter-spacing: 1px;
    height: 120px;
    line-height: 20px;
    margin-left: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
  .book-directory {
    a {
      display: flex;
      height: 30px;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      color: black;
      text-decoration: none;
      p {
        font-size: 16px;
        font-weight: 900;
      }
      .right-text {
        width: 200px;
        display: flex;
        span {
          width: 200px;
          font-size: 12px;
          letter-spacing: 1px;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
          color: #aaa;
        }
        svg {
          color: #aaa;
          margin-left: -5px;
        }
      }
    }
  }
}
.modul {
  margin: 10px 0 10px 0;
  .box-card {
    .book-x-tags {
      display: flex;
      .tags {
        margin-left: 5px;
      }
    }
    .book-x-author {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .author-cover {
        position: relative;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        span {
          position: absolute;
          background: #f0643a;
          border: none;
          left: 2px;
          bottom: 3px;
          color: #fff;
          width: 35px;
          height: 10px;
          border-radius: 20px;
          font-size: 12px;
          text-align: center;
          line-height: 10px;
          font-weight: 500;
          padding: 5px;
        }
      }
      .author-meta {
        width: 100%;
        margin-left: 10px;
        width: calc(100% - 50px);
        a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          color: black;
          .book-desc {
            margin-top: 5px;
            color: #ccc;
            font-size: 14px;
          }
          svg {
            color: #aaa;
          }
        }
      }
    }
  }
  .clearfix {
    .title {
      font-size: 16px;
      font-weight: 900;
    }
    small {
      color: #aaa;
    }
  }
  .book-reviews {
    ul,
    li {
      list-style: none;
    }
    .more {
      a {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        text-decoration: none;
        font-size: 14px;
        align-items: center;
        letter-spacing: 1px;
        color: #4284ed;
      }
    }
    li {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #f0f1f2;
      .author-cover {
        position: relative;
        top: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .author-info {
        width: calc(100% - 50px);
        margin-left: 10px;
        font-size: 14px;
        padding-bottom: 10px;

        div {
          margin-top: 5px;
        }
        .nickname {
          font-size: 16px;
          letter-spacing: 1px;
          color: #aaa;
        }
        .author-content {
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
        .updated {
          color: #aaa;
        }
      }
    }
  }
}
</style>