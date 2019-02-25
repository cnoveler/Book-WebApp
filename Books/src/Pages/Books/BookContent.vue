<template>
  <div class="body" v-loading="isLoadings">
    <div class="content" v-show="content.length>0">
      <div class="book-title-top">
        <div class="chapter-title">第一章 重生</div>
        <div class="title">{{bookInfo.title}}</div>
      </div>
      <div class="read-content">
        <article class="read-article">
          <section class="read-section">
            <div v-for="(items,index) in content" :key="index">
              <p v-for="(item,index) in items" :key="index">{{item}}</p>
            </div>
          </section>
        </article>
        <div class="readLoadNext">
          <el-button type="danger" @click="LoadNext" plain>加载下一章</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/http_";
export default {
  data() {
    return {
      _id: null, // 书籍 ID
      content: [], // 章节内容
      bookInfo: [], // 书籍信息
      chapterList: [], // 书籍章节
      isLoadings: true,
      index: null,
      chapterCount: 0 // 用于定位目录章节
    };
  },
  watch: {
    content(val) {
      this.isLoadings = false;
    },
    chapterCount(val, old) {
      if (val - old == 1) {
        this.getBookContent();
      }
      this.setBookReadName();
    },
    index(val) {
      this.$nextTick(() => {
        setTimeout(() => {
          // 延迟加载
          this.chapterCount = val;
        }, 1000);
      });
    }
  },
  methods: {
    // 检测是否有阅读历史
    isReadName() {
      const data = JSON.parse(localStorage.getItem("book-data"));
      if (data.length > 0) {
        const temp = data.filter(item => {
          return item._id == this._id;
        });
        const index = this.chapterList.chapters.filter((item, index) => {
          if (item.title == temp[0].RName) {
            this.chapterCount = index;
          }
        });
      }
    },
    // 将阅读到得当前章节存储到书架
    setBookReadName() {
      const data = JSON.parse(localStorage.getItem("book-data"));
      if (data.length > 0) {
        const temp = data.filter(item => {
          return item._id == this._id;
        });
        const temp1 = data.filter(item => {
          return item._id != this._id;
        });
        temp[0].RName = this.chapterList.chapters[this.chapterCount].title;
        const books = [...temp, ...temp1];
        localStorage.setItem("book-data", JSON.stringify(books));
      }
    },
    // 请求书籍章节内容
    async getBookContent() {
      const res = await request.get(
        this.$config.BASE_CHAPTER_CONTENT +
          "/" +
          encodeURIComponent(this.chapterList.chapters[this.chapterCount].link)
      );
      this.content = this.content.concat([res.data.chapter.body.split(/\n/)]);
      //   console.log(this.chapterList.chapters[this.chapterCount].title);
    },
    // 请求书籍目录
    async getBookChapters() {
      this._id = this.$route.params.id;
      const res = await request.get(
        `${this.$config.BOOK_CHAPTERS_URL}${this._id}?view=chapters`
      );
      this.chapterList = res.data.mixToc;
      //   console.log(this.chapterList);
      this.isReadName();
      this.getBookContent();
      this.setBookReadName();
    },
    // 请求书籍信息数据
    async getBookInfo() {
      const res = await request.get(this.$config.BOOK_INFO_URL + this._id);
      this.bookInfo = res.data;
    },
    // 加载下一章
    LoadNext() {
      this.chapterCount++;
    }
  },
  created() {
    this._id = this.$route.params.id;
    const index = this.$route.params.index;
    if (typeof index !== "undefined") {
      this.index = index;
    }
    this.getBookInfo();
    this.getBookChapters();
  }
};
</script>

<style scoped lang="scss">
.body {
  background: #c8e8c8;
}
.content {
  width: 100%;
  .book-title-top {
    height: 50px;
    margin: 0px 20px 10px 20px;
    width: calc(100% - 40px);
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.4);
  }
  .read-content {
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .read-article {
      width: calc(100% - 40px);
      .read-section {
        font-size: 1.2em;
        margin: 0.1em 0;
        p:nth-of-type(1) {
          font-weight: 900;
          //   text-indent: 0px;
        }
        p {
          //   text-indent: 30px;
          margin: 10px 0px 10px 0px;
        }
      }
    }
    .readLoadNext {
      display: flex;
      width: 100%;
      justify-content: center;
      align-content: center;
      margin: 20px 0 20px 0;
      button {
        outline: none;
        border: none;
        height: 40px;
        border-radius: 40px;
        color: #fff;
        letter-spacing: 1px;
        background: #ed424b;
        width: calc(100% - 100px);
      }
    }
  }
}
</style>