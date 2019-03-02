/*
 * @Author: Init 
 * @Date: 2019-02-28 14:32:10 
 * @Last Modified by: Init
 * @Last Modified time: 2019-03-01 14:58:09
 */
// 头部 
<template>
  <div>
    <header ref="header">
      <div class="header">
        <slot name="left-icon">
          <div class="left-icon" onclick="history.back(-1)">
            <i class="el-icon-arrow-left"></i>
            <slot name="left-text"></slot>
          </div>
        </slot>
        <slot name="header-content">
          <div class="content">
            <div :class="['my-bookshelf',{active: isHis == 'bookshelf'|| isHis == 'male'}]">
              <span>
                <a>
                  <slot name="tit1">我的书架</slot>
                </a>
              </span>
            </div>
            <div :class="['my-history',{active: isHis == 'history'|| isHis == 'female'}]">
              <span>
                <a>
                  <slot name="tit2">最近阅读</slot>
                </a>
                <!-- <a href="/bookshelf/my-history">最近阅读</a> -->
              </span>
            </div>
          </div>
        </slot>

        <div class="right-option">
          <div class="search">
            <slot name="search-user">
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-search"></use>
              </svg>-->
              <i class="el-icon-search" @click="click_search"></i>
            </slot>
          </div>
          <slot name="right-more">
            <div class="more" @click="open = !open">
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
            <li @click="$router.push({name:'Home'})">
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
          <div class="my-book">
            <button @click="$router.push({name:'BookShelf'})">我的书架</button>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script>
import "@/assets/styles/animate.css";
export default {
  props: ["isHis", "isSearch", "isopen"],
  data() {
    return {
      open: this.isopen,
      isSearched: this.isSearch
    };
  },
  methods: {
    click_search() {
      this.isSearched = true;
      return this.$emit("input", this.isSearched);
    }
  },
  watch: {
    isSearch(val, old) {
      this.isSearched = val;
    },
    isopen(val) {
      this.open = val;
    },
    open(val) {
      this.$emit("update:open", val);
    }
  }
};
</script>

<style lang="scss" scoped >
header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 3.5655rem;
  z-index: 99;
  background: #f4f5f6;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  // background: #fff;
  .header {
    width: calc(100% - 20px);
    height: 3.5655rem;
    display: flex;
    // border-bottom: 1px solid #ccc;
    background: #f4f5f6;
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
      // margin-left: 10px;
      font-size: 18px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
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
        background-color: #fff;
        border-radius: 4px 0 0 4px;
        border: 1px solid #ed424b;
        justify-content: center;
        line-height: 0 0.95rem;
        padding: 0 1.2rem;
        a {
          color: #ed424b;
          text-decoration: none;
        }
      }
      .my-history {
        background-color: #fff;
        border: 1px solid #ed424b;
        border-left: none;
        border-radius: 0 4px 4px 0;
        justify-content: center;
        line-height: 0 0.95rem;
        padding: 0 1.2rem;
        a {
          text-decoration: none;
          color: #ed424b;
        }
      }
    }
    .right-option {
      width: 50px;
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      .search {
        font-size: 18px;
      }
      .more {
        font-size: 18px;
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: calc(100% - 50px);
    top: 50px;
    background: rgba(0, 0, 0, 0.3);
  }
  .header-content {
    top: 50px;
    width: 100%;
    z-index: 99;
    position: absolute;
    background: #e5e8eb;
    .my-book {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        width: 80%;
        outline: none;
        max-width: 500px;
        margin: 10px 0;
        border-radius: 40px;
        height: 2.25rem;
        background: #ed424b;
        color: #fff;
        font-size: 0.875rem;
        line-height: 2.25rem;
        letter-spacing: 2px;
        border: none;
      }
    }
    ul,
    li {
      list-style: none;
    }
    .nav-list {
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 120px;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title {
          font-weight: 500;
        }
      }
      .icon {
        margin: 5px;
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