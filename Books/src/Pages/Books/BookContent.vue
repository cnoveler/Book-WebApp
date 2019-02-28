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

    <div class="content" v-show="content.length>0" ref="content">
      <div :class="['book-title-top',isFuColor]">
        <div class="title-top">
          <div class="chapter-title">{{title}}</div>
          <!-- <div class="title">《{{bookInfo.title}}》</div> -->
        </div>
      </div>
      <div :class="['read-content',isFuColor]" :style="{fontSize:fontSize + 'px'}">
        <article class="read-article" @click="isOptionOpen = !isOptionOpen">
          <section class="read-section">
            <div v-for="(items,index) in content" :key="index">
              <h4 class="chapter-t">{{title}}</h4>
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
            <span @click="isOpenChapter=true">目录</span>
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
    <div class="mask" v-show="isOpenChapter" @click="isOpenChapter=!isOpenChapter"></div>
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <!-- 右侧目录展示 -->
      <div
        class="chapter-right-x"
        v-show="isOpenChapter"
        ref="chapter-right-x"
        style="animation-duration: 500ms"
      >
        <div class="module-x">
          <div class="module-header">
            <div class="header-tab">
              <div :class="['module-tab',{active:isChapterOrTag}]" @click="isChapterOrTag = true">目录</div>
              <div
                :class="['module-tab',{active:!isChapterOrTag}]"
                @click="isChapterOrTag = false"
              >书签</div>
            </div>
          </div>
          <div class="module-content">
            <div class="module-chapter-x" v-show="isChapterOrTag">
              <div class="module-conut">
                <div class="conut">
                  <h4>共{{chapterList.chaptersCount1}}章</h4>
                  <span @click="isOrder=!isOrder">{{isOrder? '倒序':'正序'}}</span>
                </div>
              </div>
              <div class="text-x">正文卷</div>
              <ul>
                <li
                  class="title"
                  v-for="(item,index) in chapterList.chapters"
                  :key="index"
                  @click="click_chapter_title(index)"
                >{{item.title}}</li>
              </ul>
            </div>
            <div class="module-tag-x" v-show="!isChapterOrTag">
              <div class="null">
                <div class="isnull">
                  <img src="@/assets/image/null.svg" alt>
                  <span>你还没有书签，请先在阅读页内添加</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
      isFuColor: "skinGreen", // 肤色当前颜色
      isOpenChapter: false, // 是否打开目录
      isChapterOrTag: true, // true chapter false tag
      isOrder: true // 顺序  false 正序  true 倒序
    };
  },
  watch: {
    isOpenChapter(val) {
      if (val) {
        document.documentElement.style.overflowY = "hidden";
        this.$refs["chapter-right-x"].style.overflowY = "scroll";
      } else {
        document.documentElement.style.overflowY = "scroll";
      }
    },
    isOptionOpen(val) {
      this.isSeting = false;
    },
    content(val) {
      this.isLoadings = false;
    },
    chapterCount(val, old) {
      if (this.isOpenChapter) {
        this.content = [];
        this.getBookContent();
        this.isOpenChapter = false;
      }
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
    // 点击目录章节
    click_chapter_title(i) {
      this.chapterCount = i;
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
  position: relative;
  width: 100%;
  .book-title-top {
    position: fixed;
    top: 0;
    z-index: 1;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, 0.4);
    .title-top {
      width: calc(100% - 40px);
      height: 50px;
      display: flex;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      .chapter-title {
        width: 50%;
        overflow: hidden;
        display: flex;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .title {
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .read-content {
    width: inherit;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    letter-spacing: 2px;
    top: 50px;
    .read-article {
      width: calc(100% - 40px);
      .read-section {
        font-size: 1.2em;
        margin: 0.2em 0;
        .chapter-t {
          text-indent: 0px;
          font-weight: 500;
        }
        p {
          text-indent: 25px;
          font-weight: 300;
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
.mask {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  background: rgba($color: #000000, $alpha: 0.3);
}
.chapter-right-x {
  width: 80%;
  position: fixed;
  left: 20%;
  height: 100%;
  z-index: 99;
  background: #fff;
  .module-x {
    display: flex;
    width: 100%;
    z-index: 999;
    position: absolute;
    background: #fff;
    flex-direction: column;
    .module-header {
      width: 100%;
      height: 50px;
      z-index: 99;
      background: #fff;
      .header-tab {
        width: 100%;
        display: flex;
        height: 50px;
        justify-content: space-between;
      }
      .module-tab {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #bbb;
        border-bottom: 1px solid #eee;
      }
      .active {
        border-bottom: 1.5px solid #ed424b;
        color: #ed424b;
      }
    }
    .module-chapter-x {
      width: 100%;
      display: flex;
      position: relative;
      flex-direction: column;
      .module-conut {
        display: flex;
        justify-content: center;
        .conut {
          width: calc(100% - 20px);
          display: flex;
          height: 50px;
          justify-content: space-between;
          align-items: center;
        }
      }
      .text-x {
        height: 50px;
        background: #eee;
        color: #aaa;
        font-size: 0.8933rem;
        padding-left: 10px;
        display: flex;
        align-items: center;
      }
      ul,
      li {
        list-style: none;
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .title {
        height: 50px;
        width: calc(100% - 10px);
        display: flex;
        align-items: center;
        font-weight: 200;
        border-bottom: 1px solid #eee;
      }
    }
    .module-tag-x {
      width: 100%;
      display: flex;
      .null {
        width: 100%;
        display: flex;
        justify-content: center;
        background: #fff;
        .isnull {
          width: 251px;
          display: flex;
          justify-content: center;
          height: 251px;
          align-items: center;
          flex-direction: column;
          span {
            width: 70%;
            color: #aaa;
            font-size: 14px;
            position: relative;
            top: 10px;
            text-align: center;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
}
// .chapter-right-x::before {
//   content: "";
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   z-index: 1;
//   background: rgba($color: #000000, $alpha: 0.3);
// }
</style>