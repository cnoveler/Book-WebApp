// 书架
<template>
  <div>
    <div class="edit-header" v-show="isEdit">
      <div class="checkall">全选</div>
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
    <Header v-show="!isEdit"/>
    <div class="content">
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
      <div class="book-list" v-if="BookData.length > 0">
        <ul>
          <li class="book-li" v-for="book in BookData" :key="book.id">
            <i class="radio" v-show="isEdit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-check"></use>
              </svg>
            </i>
            <div class="book-layout">
              <a href="javascript:;">
                <img :src="book.cover">
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
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      isDefaultshelf: false, // 选中默认书架
      isEdit: false, // 是否编辑书架
      BookData: JSON.parse(localStorage.getItem("data"))
    };
  },
  components: {
    Header,
    Footer
  },
  created() {
    // console.log(this.BookData);
    const data = [
      {
        _id: "5702151c1c8e4db9483762d6",
        title: "放开那个女巫",
        author: "二目",
        shortIntro:
          "程岩原以为穿越到了欧洲中世纪，成为了一位光荣的王子。但这世界似乎跟自己想的不太一样？女巫真实存在，而且还真具有魔力？女巫种田文，将种田进行到底。",
        cover:
          "http://img.1391.com/api/v1/bookcenter/cover/1/1130743/1130743_42e9200c279a48b7a31001d363ba401c.jpg/",
        site: "zhuishuvip",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 14347,
        retentionRatio: 53.41,
        lastChapter: "第1392章 协同作战",
        tags: ["种田文"]
      }
    ];
    // localStorage.setItem("data", JSON.stringify(data));
  },
  mounted() {}
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
.mask-bookshelf {
  ul,
  li {
    list-style: none;
  }
  .list {
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
    margin-top: 20px;
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
            font-size: 16px;
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
            width: 250px;
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
.edit-header {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  div {
    margin: 0 20px 0 20px;
  }
  .book-count {
    font-weight: 700;
  }
}
</style>