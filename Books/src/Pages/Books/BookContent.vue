<template>
  <div :class="['body',isFuColor]" v-loading="isLoadings">
    <!-- 阅读设置头部 -->
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <div class="options-header" v-show="isOptionOpen" style="animation-duration: 600ms">
        <div class="icon">
          <i class="el-icon-arrow-left" onclick="history.back(-1)"></i>
          <i class="el-icon-more" @click="isMore=!isMore"></i>
        </div>
        <div class="more-card" v-show="isMore">
          <el-card class="box-card">
            <div class="tags">
              <i class="el-icon-star-off">添加标签</i>
            </div>
            <div class="tags">
              <i
                class="el-icon-document"
                @click="$router.push({name:'BookDeatils', parmas:{id:_id}})"
              >书籍详情</i>
            </div>
            <div class="tags">
              <i class="el-icon-menu" @click="$router.push({name:'BookShelf'})">返回我的书架</i>
            </div>
          </el-card>
        </div>
      </div>
    </transition>

    <div class="content" v-show="content.length>0">
      <div :class="['book-title-top',isFuColor]">
        <div class="chapter-title">{{title}}</div>
        <div class="title">《{{bookInfo.title}}》</div>
      </div>
      <div class="read-content" :style="{fontSize:fontSize + 'px'}">
        <article class="read-article" @click="isOptionOpen = !isOptionOpen">
          <section class="read-section">
            <div v-for="(items,index) in content" :key="index">
              <p class="chapter-t">{{title}}</p>
              <p v-for="(item,index) in items" :key="index">{{item}}</p>
            </div>
          </section>
        </article>
        <div class="readLoadNext">
          <el-button type="danger" @click="LoadNext" plain>加载下一章</el-button>
        </div>
      </div>
    </div>

    <!-- 阅读设置 -->
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <div class="options-footer" v-show="isOptionOpen" style="animation-duration: 600ms">
        <ul>
          <li class="list-menu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu"></use>
            </svg>
            <span>目录</span>
          </li>
          <li class="list-menu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-book"></use>
            </svg>
            <span @click="$router.push({name:'BookShelf'})">书架</span>
          </li>
          <li class="list-menu" @click="isSeting=!isSeting">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-setting"></use>
            </svg>
            <span>设置</span>
          </li>
          <li class="list-menu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-comment"></use>
            </svg>
            <span>评论</span>
          </li>
          <li class="list-menu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-info-circle"></use>
            </svg>
            <span>反馈</span>
          </li>
        </ul>
        <div class="option-box" v-show="isSeting">
          <!-- 字体设置 -->
          <div class="option option-set-font">
            <span @click="fontSize--">A-</span>
            <div class="block">
              <el-slider v-model="fontSize" :min="14" :max="30"></el-slider>
            </div>
            <span @click="fontSize++">A+</span>
          </div>
          <!-- 肤色设置 -->
          <div class="option option-set-color">
            <div class="color-box default" @click="isFuColor = 'default'">
              <svg class="icon" aria-hidden="true" v-show="isFuColor == 'default'">
                <use xlink:href="#icon-check"></use>
              </svg>
            </div>
            <div class="color-box skinBlue" @click="isFuColor = 'skinBlue'">
              <svg class="icon" aria-hidden="true" v-show="isFuColor == 'skinBlue'">
                <use xlink:href="#icon-check"></use>
              </svg>
            </div>
            <div class="color-box skinGreen" @click="isFuColor = 'skinGreen'">
              <svg class="icon" aria-hidden="true" v-show="isFuColor == 'skinGreen'">
                <use xlink:href="#icon-check"></use>
              </svg>
            </div>
            <div class="color-box skinLight" @click="isFuColor = 'skinLight'">
              <svg class="icon" aria-hidden="true" v-show="isFuColor == 'skinLight'">
                <use xlink:href="#icon-check"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 右侧目录展示 -->
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
      chapterCount: 0, // 用于定位目录章节
      isOptionOpen: false, // 阅读设置菜单
      fontSize: 16, // 章节文字大小
      isMore: false, // 设置 的more 是否打开
      isSeting: false, // 菜单字体肤色设置
      isFuColor: "skinGreen" // 肤色当前颜色
    };
  },
  watch: {
    isOptionOpen(val) {
      this.isSeting = false;
    },
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
  computed: {
    title() {
      if (this.chapterList.length !== 0) {
        return this.chapterList.chapters[this.chapterCount].title;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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

      this.$nextTick(() => {
        setTimeout(() => {
          if (this.index == null) {
            this.isReadName();
          }
          this.getBookContent();
          this.setBookReadName();
        }, 1000);
      });
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
  -moz-user-select: none; /* Firefox私有属性 */
  -webkit-user-select: none; /* WebKit内核私有属性 */
  -ms-user-select: none; /* IE私有属性(IE10及以后) */
  -khtml-user-select: none; /* KHTML内核私有属性 */
  -o-user-select: none; /* Opera私有属性 */
  user-select: none; /* CSS3属性 */
  // background: #c8e8c8;
}

.default {
  background: rgb(195, 178, 153);
}
.skinBlue {
  background: skyblue;
}
.skinGreen {
  background: #c8e8c8;
}
.skinLight {
  background: lightcyan;
}
.options-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  z-index: 99;
  align-items: center;
  flex-direction: column;
  background: #545c64;
  .icon {
    width: calc(100% - 40px);
    color: #fff;
    z-index: 99;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .more-card {
    position: absolute;
    right: 0;
    top: 50px;
    .box-card {
      color: #fff;
      background: #545c64;
      .tags {
        margin: 20px 0;
        letter-spacing: 2px;
      }
    }
  }
}
.options-footer {
  position: relative;
  width: 100%;
  height: 50px;
  background: rgba(#5b636b, 0.98);
  position: fixed;
  color: #fff;
  bottom: 0;
  display: flex;
  align-items: center;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .list-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 100;
      justify-content: center;
      span {
        margin-top: 2px;
      }
    }
  }
  .option-box {
    position: absolute;
    top: -139px;
    width: 100%;
    background: rgba(#5b636b, 0.98);
    display: flex;
    flex-direction: column;
    align-items: center;
    .option {
      height: 70px;
      display: flex;
      width: calc(100% - 40px);
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }
    .option-set-font::before {
      content: "";
      width: 100%;
      position: absolute;
      bottom: 70px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.16);
    }
    .option-set-color {
      .color-box {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-radius: 10px;
      }
      svg {
        font-size: 24px;
        color: #ed424b;
      }
    }
    .option-set-font {
      width: calc(100% - 20px);
      .block {
        width: calc(100% - 100px);
      }
      span {
        font-size: 24px;
        font-size: 100;
      }
    }
  }
}
.options-footer::after {
  content: "";
  width: 100%;
  top: 0;
  position: absolute;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}
.content {
  width: 100%;
  .book-title-top {
    position: fixed;
    // background: #c8e8c8;
    height: 50px;
    margin: 0px 20px 0px 20px;
    width: calc(100% - 40px);
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.4);
    .chapter-title {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
        margin: 0.2em 0;
        .chapter-t {
          text-indent: 0px;
          font-weight: 800;
        }
        p {
          text-indent: 25px;
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