<template>
  <div>
    <SearchHeader v-model="keywords" :results.sync="results" :isSearched.sync="isSearched"/>
    <div v-show="!isCloseFill">
      <div class="search-popular">
        <div class="search-title-bar">
          <span>大家都在搜</span>
          <div class="delete" v-show="isDelShow">
            <i class></i>
            <p>清空</p>
          </div>
        </div>
        <div class="search-tags">
          <ul>
            <li
              @click="click_words(item.word)"
              v-for="(item ,index) in searchHotWords"
              :key="index"
            >
              <a>{{item.word}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-popular" v-show="SearchHistory.length > 0">
        <div class="search-title-bar">
          <span>搜索历史</span>
          <div class="delete" v-show="!isDelShow">
            <i class></i>
            <p @click="click_clear">清空</p>
          </div>
        </div>
        <div class="search-tags">
          <ul>
            <li v-for="(item ,index) in SearchHistory" @click="click_words(item)" :key="index">
              <a href="javascript:;">{{item}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="isCloseFill">
      <ul>
        <router-link :to="'/search?kw='+ item" v-for="(item, index) in results" :key="index">
          <li @click="click_words(item)">
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
  </div>
</template>

<script>
import axios from "axios";
import request from "@/http_";
import SearchHeader from "@/components/Search-header";
let temp = [];
export default {
  props: ["value"],
  components: {
    SearchHeader
  },
  data() {
    return {
      searchHotWords: [],
      isSearched: this.isSearch,
      keywords: "", // 搜索字符串
      isDelShow: false,
      results: [], // 搜索返回列表
      SearchHistory: [] // 搜索历史
    };
  },
  computed: {
    isCloseFill() {
      if (this.keywords.length > 0) return true;
      return false;
    }
  },
  watch: {
    value(val, old) {
      this.isSearched = val;
    },
    isSearched(val) {
      this.$emit("input", val);
    }
  },
  created() {
    // this.searchHotWords = temp;
    const data = localStorage.getItem("SEARCH_HISTORY");
    if (data != null) {
      this.SearchHistory = data.split(",");
    }
    this.getSearchHotWords();
  },
  methods: {
    // 请求搜索热词
    async getSearchHotWords() {
      // 请求 最新热词
      let temp = Math.floor(Math.random() * 80 + 1);
      const res = await request.get(this.$config.SEARCH_HOT_URL);
      this.searchHotWords = res.data.searchHotWords.slice(temp, temp + 7);
    },
    // 清空全部搜索历史
    click_clear() {
      localStorage.removeItem("SEARCH_HISTORY");
      this.SearchHistory = [];
    },
    click_words(word) {
      console.log(word);
      this.keywords = word;
      localStorage.removeItem("SEARCH_HISTORY");
      this.SearchHistory = [
        ...new Set(this.SearchHistory.concat(word.split()))
      ];
      localStorage.setItem("SEARCH_HISTORY", this.SearchHistory);
    }
  }
};
</script>

<style scoped lang="scss">
.search-popular {
  width: 100%;
  margin-top: 10px;
  .search-title-bar {
    width: 100%;
    height: 50px;
    background: rgb(248, 248, 248);
    font-size: 12px;
    color: #aaa;
    display: flex;
    align-items: flex-end;
    letter-spacing: 2px;
    justify-content: space-between;
    span {
      margin: 0 0 10px 10px;
    }
    .delete {
      display: flex;
      color: black;
      align-items: baseline;
      margin-right: 10px;
      i {
        margin-right: 3px;
        display: block;
        width: 8px;
        height: 11px;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(../assets/image/delete.png);
      }
      p {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
  .search-tags {
    width: 100%;
    ul,
    li {
      list-style: none;
    }
    li {
      display: inline-flex;
      padding: 3px 10px 3px 10px;
      border: 1px solid #ccc;
      margin-top: 10px;
      border-radius: 20px;
      margin-left: 20px;
    }
    a {
      outline: none;
      text-decoration: none;
      color: #aaa;
      cursor: pointer;
    }
  }
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
</style>