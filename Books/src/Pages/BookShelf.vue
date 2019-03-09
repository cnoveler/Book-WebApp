// 书架
<template>
  <div>
    <div v-show="!isSearch">
      <div class="edit-header" ref="edit" v-show="isEdit">
        <div class="checkall" @click="checkall">全选</div>
        <div class="book-count">共{{BookData.length}}本</div>
        <div class="close" @click="isEdit=!isEdit">取消</div>
      </div>
      <div class="mask-bookshelf" v-show="isDefaultshelf" @click="isDefaultshelf=!isDefaultshelf">
        <ul class="list">
          <li>
            <span class="title">默认书架({{BookData.length}})</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-check"></use>
            </svg>
          </li>
        </ul>
      </div>
      <transition
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <div class="delete" v-show="selected">
          <button @click="clicked_del">删除</button>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <Header
          v-if="!isEdit"
          v-show="isShow"
          v-model="isSearch"
          isHis="bookshelf"
          :open.sync="open"
        >
          <div slot="tit1" @click="$router.push({name:'BookShelf'})">我的书架</div>
          <div slot="tit2" @click="$router.push({name:'BookShelfHistory'})">最近阅读</div>
        </Header>
      </transition>

      <div class="content" ref="content">
        <div class="my-default-header" ref="myDefaultHeader" v-show="!isEdit">
          <div class="default-header">
            <div class="default-selected" @click="isDefaultshelf=!isDefaultshelf">
              <span class="title">默认书架({{BookData.length}})</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="edit" @click="isEdit=!isEdit">编辑</div>
          </div>
        </div>
        <div class="null" v-if="BookData.length <= 0">默认书架是空的</div>
        <div class="book-list" ref="book-list" v-if="BookData.length > 0">
          <ul>
            <li
              class="book-li"
              v-for="(book,index) in BookData"
              :key="book.id"
              @click="selected_book(book._id)"
            >
              <div class="book-layout">
                <i :class="['radio',{active: book.isSelected}] " v-show="isEdit">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-check"></use>
                  </svg>
                </i>
                <a href="javascript:;">
                  <img :src="decodeURIComponent((book.cover).replace('/agent/',''))">
                </a>
                <div class="book-info">
                  <div class="book-header">
                    <div class="book-title">{{book.title}}</div>
                    <div class="book-title-r">
                      <span>{{isReadName=='尚未阅读'? '立即阅读':'继续阅读'}}</span>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-right"></use>
                      </svg>
                    </div>
                  </div>
                  <div class="book-meta">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-user"></use>
                    </svg>
                    {{book.author}} | {{isReadName=='尚未阅读'?'尚未阅读':isReadName[index].RName}}
                  </div>
                  <div class="book-to-new">
                    <div class="left-text">
                      <span class="dot-red"></span>
                      <span>更新至 {{book.lastChapter}}</span>
                    </div>
                    <span class="updatedtime" v-if="!isEdit">{{formatDate(book.updated)}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div ref="footer" class="footer">
        <Footer/>
      </div>
    </div>
    <div class="search-page" v-show="isSearch">
      <Search v-model="isSearch"/>
    </div>
    <GoTop/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/search";
import GoTop from "@/components/GoTop";
export default {
  data() {
    return {
      isDefaultshelf: false, // 选中默认书架
      isEdit: false, // 是否编辑书架
      isSearch: false, //是否搜索
      isShow: true,
      open: false,
      scrollTops: 0,
      updatedt: []
    };
  },
  components: {
    Header,
    Footer,
    Search,
    GoTop
  },
  watch: {
    scrollTops(val) {
      if (val >= 50) {
        this.$refs["myDefaultHeader"].style.position = "fixed";
        this.$refs["myDefaultHeader"].style.top = 0;
        this.$refs["myDefaultHeader"].style.Zindex = 99;
        this.isShow = false;
      } else {
        this.$refs["myDefaultHeader"].style.position = "";
        this.isShow = true;
      }
    },
    isEdit(val, old) {
      this.isShow = true;
      if (this.BookData.length <= 0) return;
      if (val) {
        this.$refs["content"].style.marginTop = "0px";
        this.$refs["book-list"].style.marginTop = "50px";
      } else {
        this.$refs["book-list"].style.marginTop = "0px";
        this.$refs["content"].style.marginTop = "50px";
      }
      this.BookData.map(item => (item.isSelected = false));
    },
    BookData(val, old) {
      if (this.BookData.length <= 4) {
        this.$refs["footer"].style.position = "fixed";
        this.$refs["footer"].style.bottom = "0px";
      } else {
        this.$refs["footer"].style.position = "relative";
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", e => {
      if (!this.open) {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollTops = scrollTop;
      }
    });
  },
  computed: {
    // 检测是否有阅读历史
    isReadName() {
      return this.isReadNams();
    },
    bookupdated() {
      // 书籍更新时间
      if (this.updatedt.length <= 0) return;
      const [d, h, m] = this.updatedt;
      if (d > 0) return `${d}天前`;
      if (h > 0) return `${h}小时前`;
      if (m > 0) return `${m}分钟前`;
    },
    selected() {
      const obj = this.BookData.filter(item => item.isSelected === true);
      if (obj.length > 0) return true;
      return false;
    }
  },
  methods: {
    isReadNams() {
      const data = JSON.parse(localStorage.getItem("book-data"));
      if (data.length > 0) {
        const temp = data.filter((item, index) => {
          return item.RName != "undefined";
        });
        if (temp.length > 0) {
          return temp;
        } else {
          return "尚未阅读";
        }
      }
    },
    // 时间格式话
    formatDate(t) {
      const [T, Z] = t
        .replace("T", " ")
        .replace("Z", " ")
        .split(" ");
      const [Y, M, D] = T.split("-");
      const [h, m, s] = Z.split(".")[0].split(":");
      const date = new Date(
        ...[
          parseInt(Y),
          parseInt(M) - 1,
          parseInt(D),
          parseInt(h) + 8,
          parseInt(m),
          parseInt(s)
        ]
      );
      const newDate = new Date();
      const tt = (newDate - date) / 1000;
      const d = parseInt(tt / 86400);
      const hh = parseInt((tt % 86400) / 3600);
      const mm = parseInt(((tt % 86400) % 3600) / 60);
      if (d > 0) return `${d}天前`;
      if (hh > 0) return `${h}小时前`;
      if (mm > 0) return `${m}分钟前`;
    },
    selected_book(_id) {
      if (this.isEdit) {
        const obj = this.BookData.filter(item => {
          if (item._id == _id) {
            return (item.isSelected = !item.isSelected);
          }
        });
      } else {
        if (this.isReadNams() !== "尚未阅读") {
          this.$router.push(`/book/${_id}/read`);
        } else {
          this.$router.push(`/book/${_id}`);
        }
      }
    },
    checkall() {
      this.BookData.map(item => (item.isSelected = !item.isSelected));
    },
    clicked_del() {
      const obj = this.BookData.filter(item => {
        return !item.isSelected;
      });
      this.BookData = obj;
      localStorage.removeItem("book-data"); // 清除书架缓存
      localStorage.setItem("book-data", JSON.stringify(this.BookData));
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  align-items: center;
  .my-default-header {
    z-index: 1;
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
    background: #fff;
    justify-content: center;
    border-bottom: 1px solid #eee;
    .default-header {
      width: calc(100% - 20px);
      display: flex;
      justify-content: space-between;
    }
    .title {
      font-weight: 600;
      font-size: 0.89rem;
    }
    .edit {
      cursor: pointer;
      font-size: 0.89rem;
    }
  }
  .null {
    position: relative;
    top: 200px;
    display: flex;
    height: 200px;
    flex-direction: column;
    align-items: center;
    color: #ccc;
    font-weight: 200;
  }
  .null::before {
    display: block;
    width: 2.25rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    content: "";
    background: url(../assets/image/null.svg);
    background-size: 100% 100%;
  }
}
.mask-bookshelf {
  ul,
  li {
    list-style: none;
  }
  .list {
    z-index: 99;
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #fff;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px 0 10px;
    height: 50px;
    line-height: 50px;
    letter-spacing: 1px;
    svg {
      color: #ed424b;
    }
  }
}

.mask-bookshelf::before {
  content: "";
  position: fixed;
  width: 100%;
  z-index: 99;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.book-list {
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  ul,
  li {
    list-style: none;
  }
  .book-li {
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    .radio {
      margin: 0 15px 0 15px;
      display: inherit;
      width: 15px;
      height: 15px;
      border: 1px solid #c0c5cc;
      border-radius: 50%;
      color: #fff;
      font-size: 15px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .radio.active {
      background: #ed424b;
    }
    .book-layout {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin-right: 10px;
        width: 60px;
        height: 80px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      .book-info {
        display: flex;
        width: 100%;
        flex-direction: column;
        // margin-left: 15px;
        overflow: hidden;
        left: 10px;
        align-content: center;
        font-size: 14px;
        .book-header {
          width: 100%;
          height: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 200;
          .book-title {
            width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .book-title-r {
            font-size: 14px;
            color: #bbb;
            svg {
              margin-left: -3px;
            }
          }
        }
        .book-meta {
          width: 100%;
          color: #bbb;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .book-to-new {
          width: 100%;
          display: flex;
          margin-top: 10px;
          align-items: center;
          justify-content: space-between;
          .left-text {
            position: relative;
            width: calc(100% - 20px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            letter-spacing: 0.5px;
            .dot-red {
              position: absolute;
              left: -3px;
              top: 2px;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: red;
              margin: 0 2px 0 2px;
            }
            span {
              color: #bbb;
            }
          }
          .updatedtime {
            font-size: 12px;
            color: #bbb;
          }
        }
      }
    }
  }
}
.edit-header {
  display: flex;
  height: 50px;
  width: 100%;
  z-index: 99;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  background: #fff;
  position: fixed;
  top: 0;
  div {
    margin: 0 20px 0 20px;
  }
  .book-count {
    font-weight: 700;
  }
}
.delete {
  width: 100%;
  position: fixed;
  z-index: 99;
  bottom: 0;
  button {
    border: none;
    width: 100%;
    height: 40px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    outline: none;
    background: #ed424b;
    color: #fff;
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 16px;
  }
}
.footer {
  width: 100%;
}
</style>