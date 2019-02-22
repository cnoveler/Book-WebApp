// 头部 
<template>
  <div>
    <header ref="header">
      <div class="header">
        <slot name="left-icon">
          <div class="left-icon" onclick="history.back(-1)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-left"></use>
            </svg>
            <slot name="left-text"></slot>
          </div>
        </slot>
        <slot name="header-content">
          <div class="content">
            <div :class="['my-bookshelf',{active: isHis == 'bookshelf'}]">
              <span>
                <router-link to="/bookshelf/my">我的书架</router-link>
                <!-- <a href="/bookshelf/my">我的书架</a> -->
              </span>
            </div>
            <div :class="['my-history',{active: isHis == 'history'}]">
              <span>
                <router-link to="/bookshelf/my-history">最近阅读</router-link>
                <!-- <a href="/bookshelf/my-history">最近阅读</a> -->
              </span>
            </div>
          </div>
        </slot>

        <div class="right-option">
          <div class="search" @click="click_search">
            <slot name="search-user">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-search"></use>
              </svg>
            </slot>
          </div>
          <slot name="right-more">
            <div class="more" @click="openmenu">
              <svg class="icon" aria-hidden="true">
                <use v-if="!open" xlink:href="#icon-menu"></use>
                <use v-else xlink:href="#icon-close"></use>
              </svg>
            </div>
          </slot>
        </div>
      </div>
      <div class="mask" v-if="open"></div>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="header-content" v-show="open" style="animation-duration: 600ms">
          <ul class="nav-list">
            <li>
              <div class="icon icon-home"></div>
              <div class="title">首页</div>
            </li>
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
              <div class="icon icon-accound"></div>
              <div class="title">账户</div>
            </li>
          </ul>
        </div>
      </transition>
    </header>
  </div>
</template>

<script>
import "@/assets/styles/animate.css";
export default {
  props: ["isHis", "isSearch"],
  data() {
    return {
      open: false,
      isSearched: this.isSearch
    };
  },
  methods: {
    openmenu() {
      this.open = !this.open;
    },
    click_search() {
      this.isSearched = true;
      return this.$emit("input", this.isSearched);
    }
  },
  watch: {
    isSearch(val, old) {
      this.isSearched = val;
    }
  }
};
</script>

<style lang="scss" scoped >
header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  // background: #fff;
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    // border-bottom: 1px solid #ccc;
    justify-content: space-between;
    align-items: center;
    -moz-user-select: none; /* Firefox私有属性 */
    -webkit-user-select: none; /* WebKit内核私有属性 */
    -ms-user-select: none; /* IE私有属性(IE10及以后) */
    -khtml-user-select: none; /* KHTML内核私有属性 */
    -o-user-select: none; /* Opera私有属性 */
    user-select: none; /* CSS3属性 */
    .left-icon {
      cursor: pointer;
      margin-left: 10px;
      font-size: 24px;
    }
    .content {
      width: 200px;
      display: flex;
      font-size: 14px;
      font-weight: 500;
      .my-history.active {
        background-color: #ed424b;
        a {
          color: #fff;
        }
      }
      .my-bookshelf.active {
        background-color: #ed424b;
        a {
          color: #fff;
        }
      }
      .my-bookshelf {
        cursor: pointer;
        width: 100px;
        height: 38px;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 4px 0 0 4px;
        border: 1px solid #ed424b;
        justify-content: center;
        a {
          letter-spacing: 3px;
          font-size: 16px;
          color: #ed424b;
          text-decoration: none;
        }
      }
      .my-history {
        cursor: pointer;
        width: 100px;
        height: 38px;
        display: flex;
        align-items: center;
        background-color: #fff;
        border: 1px solid #ed424b;
        border-left: none;
        border-radius: 0 4px 4px 0;
        justify-content: center;
        a {
          text-decoration: none;
          letter-spacing: 3px;
          font-size: 16px;
          color: #ed424b;
        }
      }
    }
    .right-option {
      display: flex;
      .search {
        cursor: pointer;
        font-size: 22px;
      }
      .more {
        cursor: pointer;
        font-size: 22px;
        margin-left: 15px;
        margin-right: 10px;
      }
    }
  }
  .mask {
    position: absolute;
    width: 100%;
    z-index: 99;
    height: calc(100% - 50px);
    background: rgba(0, 0, 0, 0.3);
  }
  .header-content {
    z-index: 99;
    width: 100%;
    position: absolute;
    background: #fff;
    ul,
    li {
      list-style: none;
    }
    .nav-list {
      font-size: 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 130px;
        height: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-weight: bold;
        }
      }
      .icon {
        margin: 20px;
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
      .icon-accound {
        background-position: -63px 0;
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>