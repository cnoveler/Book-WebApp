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
            <h4>共402章</h4>
            <span>倒序</span>
          </div>
          <div class="chapter-list">
            <ul>
              <li class="chapter-bar">正文</li>
              <li>
                <div class="title">第1章 序章</div>
              </li>
              <li>
                <div class="title">第2章 重生</div>
              </li>
              <li>
                <div class="title">第3章 智脑</div>
              </li>
              <li>
                <div class="title">第4章 红颜？祸水？</div>
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
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isDir: true // 当前是否选中得是目录选项
    };
  },
  methods: {}
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