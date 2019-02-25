<template>
  <div>
    <div class="header">
      <Header>
        <span class="left-header-text" slot="left-text">重生武神大主播</span>
        <p slot="header-content"></p>
      </Header>
    </div>
    <div class="content">
      <div class="btn-group-tab">
        <div class="btn-group">
          <div :class="[{active:isDir}]" @click="isDir = true">目录</div>
          <div :class="[{active:!isDir}]" @click="isDir = false">书签</div>
        </div>
        <div class="tab-content" v-if="isDir">
          <div class="module-header">
            <h4>共{{chapterList.chaptersCount1}}章</h4>
            <span @click="ReverseOrder">倒序</span>
          </div>
          <div class="chapter-list">
            <ul>
              <li class="chapter-bar">正文目录</li>
              <li
                v-for="(item, index) in chapterList.chapters"
                :key="index"
                @click="click_chpater(item.link)"
              >
                <div class="title">{{item.title}}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content" v-if="!isDir">书签</div>
      </div>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import request from "@/http_";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      _id: null, // 书籍id
      chapterList: [], // 书籍章节
      isDir: true // 当前是否选中得是目录选项
    };
  },
  methods: {
    // 书籍章节倒叙
    ReverseOrder() {
      this.chapterList.chapters.reverse();
    },
    // 点击章节
    click_chpater(link) {
      console.log(link);
    },
    // 请求目录
    async getBookChapters() {
      this._id = this.$route.params.id;
      const res = await request.get(
        `${this.$config.BOOK_CHAPTERS_URL}${this._id}?view=chapters`
      );
      this.chapterList = res.data.mixToc;
    }
  },
  created() {
    this.getBookChapters();
  }
};
</script>

<style scoped lang="scss">
.header {
  background: #fff;
  .left-header-text {
    font-size: 16px;
  }
}
.content {
  width: 100%;
  margin-top: 50px;
  .btn-group-tab {
    display: flex;
    flex-direction: column;
    .tab-content {
      width: 100%;
      .module-header {
        padding: 0 20px 0 20px;
        width: calc(100% - 40px);
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .chapter-list {
        width: 100%;
        li {
          width: calc(100% - 20px);
          height: 50px;
          display: flex;
          padding-left: 20px;
          line-height: 40px;
          letter-spacing: 1px;
          align-items: center;
          font-size: 16px;
          .title {
            width: inherit;
            border-bottom: 1px solid #f0f1f2;
          }
        }
        .chapter-bar {
          font-size: 14px;
          color: #969ba3;
          background: #f6f7f9;
        }
      }
    }
    .btn-group {
      display: flex;
      div {
        height: 50px;
        width: 50%;
        line-height: 50px;
        display: flex;
        justify-content: center;
        letter-spacing: 1px;
        border-bottom: 2px solid #ccc;
      }
      div.active {
        color: #ed424b;
        border-bottom: 2px solid #ed424b;
      }
    }
  }
}
</style>