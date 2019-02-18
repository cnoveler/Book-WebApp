<template>
  <div>
    <Header isHis="history"/>
    <div class="content">
      <div class="null" v-if="BookHistory.length <= 0">还没有阅读历史哟</div>
      <div class="book-list" ref="book-list" v-if="BookHistory.length > 0">
        <ul>
          <li class="book-li" v-for="book in BookHistory" :key="book.id">
            <div class="book-layout">
              <a href="javascript:;">
                <img :src="decodeURIComponent((book.cover).replace('/agent/',''))">
              </a>
              <div class="book-info">
                <div class="book-header">
                  <div class="book-title">{{book.title}}</div>
                  <div class="book-title-r">
                    <span>立即阅读</span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-right"></use>
                    </svg>
                  </div>
                </div>
                <div class="book-meta">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                  </svg>
                  {{book.author}} | 尚未阅读
                </div>
                <div class="book-to-new">
                  <span class="dot-red"></span>
                  <a href="javascript:;">更新至 {{book.lastChapter}}</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer" ref="footer">
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
  watch: {
    BookHistory(val, old) {
      if (this.BookHistory.length <= 5) {
        this.$refs["footer"].style.position = "fixed";
        this.$refs["footer"].style.bottom = "0px";
      } else {
        this.$refs["footer"].style.position = "relative";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  .my-default-header {
    display: flex;
    margin: 10px;
    justify-content: space-between;
    .title {
      font-weight: 600;
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
          }
          .book-title-r {
            font-size: 14px;
            color: #bbb;
            margin-right: 10px;
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
          display: flex;
          margin-top: 10px;
          align-items: center;
          .dot-red {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: red;
            margin: 0 2px 0 2px;
          }
          a {
            color: #bbb;
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            letter-spacing: 0.5px;
          }
        }
      }
    }
  }
}
.footer {
  width: 100%;
}
</style>