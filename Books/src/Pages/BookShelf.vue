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
      <Header v-show="!isEdit" v-model="isSearch" isHis="bookshelf"/>
      <div class="content" ref="content">
        <div class="my-default-header" v-show="!isEdit">
          <div class="default-selected" @click="isDefaultshelf=!isDefaultshelf">
            <span class="title">默认书架({{BookData.length}})</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-caret-down"></use>
            </svg>
          </div>
          <div class="edit" @click="isEdit=!isEdit">编辑</div>
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
              <i :class="['radio',{active: book.isSelected}] " v-show="isEdit">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-check"></use>
                </svg>
              </i>
              <div class="book-layout">
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
                    {{book.author}} | {{isReadName[index].RName}}
                  </div>
                  <div class="book-to-new">
                    <div class="left-text">
                      <span class="dot-red"></span>
                      <a href="javascript:;">更新至 {{book.lastChapter}}</a>
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
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/search";
export default {
  data() {
    return {
      isDefaultshelf: false, // 选中默认书架
      isEdit: false, // 是否编辑书架
      isSearch: false, //是否搜索
      updatedt: []
    };
  },
  components: {
    Header,
    Footer,
    Search
  },
  watch: {
    isEdit(val, old) {
      if (this.BookData.length <= 0) return;
      if (val) {
        this.$refs["content"].style.marginTop = 0;
        this.$refs["book-list"].style.marginTop = "50px";
      } else {
        this.$refs["book-list"].style.marginTop = "0px";
        this.$refs["content"].style.marginTop = "50px";
      }
      this.BookData.map(item => (item.isSelected = false));
    },
    BookData(val, old) {
      if (this.BookData.length <= 5) {
        this.$refs["footer"].style.position = "fixed";
        this.$refs["footer"].style.bottom = "0px";
      } else {
        this.$refs["footer"].style.position = "relative";
      }
    }
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
          return item.RName;
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
      }
      if (this.isReadNams() !== "尚未阅读") {
        this.$router.push(`/book/${_id}/read`);
      } else {
        this.$router.push(`/book/${_id}`);
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
  .my-default-header {
    display: flex;
    margin: 10px;
    justify-content: space-between;
    .title {
      font-weight: 600;
    }
    .edit {
      cursor: pointer;
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
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  margin-left: 30px;
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
      img {
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
        margin-left: 15px;
        overflow: hidden;
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
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .book-title-r {
            width: 100px;
            font-size: 14px;
            color: #bbb;
            svg {
              margin-left: -3px;
            }
          }
        }
        .book-meta {
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
            width: 70%;
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
            a {
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
  position: fixed;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  background: #fff;
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