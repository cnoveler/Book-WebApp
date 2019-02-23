<template>
  <div>
    <div class="search-header">
      <SearchHeader v-model="keywords" :results.sync="results"/>
    </div>
    <div class="search-result" v-show="isCloseFill">
      <ul>
        <router-link :to="'/search?kw='+item" v-for="(item, index) in results" :key="index">
          <li>
            <i class="search-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-search"></use>
              </svg>
            </i>
            <p>{{item}}</p>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="search-filter" v-show="!isCloseFill">
      <div class="filter-header">
        <a href="javascript:;" class="active">人气</a>
        <a href="javascript:;">时间</a>
        <a href="javascript:;">字数</a>
        <a href="javascript:;">收藏</a>
        <a href="javascript:;">推荐</a>
      </div>
      <div class="book-list">
        <ul>
          <li class="book-li" v-for="item in result" :key="item._id">
            <a @click="click_book(item._id)">
              <img :src="decodeURIComponent((item.cover).replace('/agent/',''))" :alt="item.title">
              <div class="book-info">
                <div :class="['book-title',{active:item.title == query}]">
                  <h3>{{item.title}}</h3>
                </div>
                <div class="book-intro">{{item.shortIntro}}</div>
                <div class="book-meta">
                  <div class="book-author">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-user"></use>
                    </svg>
                    <span>{{item.author}}</span>
                  </div>
                  <div class="book-tags">
                    <div class="gray">{{item.cat}}</div>
                    <div class="red">连载</div>
                    <div class="blue">{{ parseInt((item.wordCount / 10000) * 10) / 10 + "万字"}}</div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/http_";
import SearchHeader from "@/components/Search-header";
export default {
  components: {
    SearchHeader
  },
  data() {
    return {
      query: "", //  搜索关键字
      result: [], // 搜索结果数据
      keywords: "",
      results: []
    };
  },
  computed: {
    isCloseFill() {
      if (this.keywords.length > 0) return true;
      return false;
    },
    wordCount() {
      console.log(val);
    }
  },
  created() {
    // 获取传参query值
    this.query = this.$route.query.kw;
    // 请求搜索结果数据
    request.get(this.$config.SEARCH_KEWORD_RESULT + this.query).then(res => {
      this.result = res.data.books;
    });
  },
  methods: {
    click_book(_id) {
      this.$router.push(`/book/${_id}`);
    }
  }
};
</script>

<style scoped lang="scss">
.search-header {
  position: fixed;
  width: 100%;
  top: 0px;
  align-items: center;
  background: #fff;
  z-index: 2;
}
.search-result {
  width: 100%;
  a {
    text-decoration: none;
    outline: none;
    color: black;
  }
  li {
    width: 100%;
    height: 50px;
    display: flex;
    // border-top: 1px solid #ccc;
    border-bottom: 1px solid #eee;
    line-height: 50px;
    align-items: baseline;
    text-decoration: none;
    i {
      margin-left: 15px;
      margin-right: 10px;
      svg {
        height: 20px;
        font-size: 24px;
        color: #aaa;
      }
    }
    p {
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
}

.search-filter {
  width: 100%;
  margin-top: 10px;
  .filter-header {
    position: fixed;
    width: 100%;
    height: 50px;
    display: flex;
    top: 50px;
    align-items: center;
    background: #fff;
    z-index: 2;
  }
  a {
    outline: none;
    height: 15px;
    line-height: 15px;
    text-decoration: none;
    color: black;
    border: none;
    padding: 2px 10px 2px 10px;
    border-radius: 20px;
    color: #969ba3;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;
  }
  a.active {
    color: #ed424b;
    border: 1px solid #ed424b;
  }
  .book-list {
    width: calc(100% - 15px);
    margin-top: 100px;
    .book-li {
      width: 100%;
      margin: 10px 0 10px 0;
      display: flex;
      border-bottom: 1px solid #f0f1f2;
      a {
        width: 100%;
        height: 110px;
        display: flex;
        img {
          width: 4.823rem;
          height: 6.5rem;
        }
        .book-info {
          width: 100%;
          margin-left: 10px;
          color: black;
          display: flex;
          flex-direction: column;
          letter-spacing: 1px;
          .book-title {
            position: relative;
            top: 7px;
            line-height: 1.4;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .book-title.active {
            color: #ed424b;
          }
          .book-intro {
            margin-top: 10px;
            margin-bottom: 5px;
            font-size: 16px;
            color: #969ba3;
            text-indent: 10px;
            overflow: hidden;
            line-height: 20px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          .book-meta {
            display: flex;
            color: #969ba3;
            justify-content: space-between;
            .book-tags {
              display: flex;
              font-size: 11px;
              align-content: center;
              letter-spacing: 1px;
              div {
                margin-left: 5px;
              }
              .gray {
                color: #969ba3;
                box-shadow: 0px 0px 1px 0px #969ba3;
              }
              .red {
                color: red;
                box-shadow: 0px 0px 1px 0px red;
              }
              .blue {
                color: blue;
                box-shadow: 0px 0px 1px 0px blue;
              }
            }
          }
        }
      }
    }
  }
}
</style>