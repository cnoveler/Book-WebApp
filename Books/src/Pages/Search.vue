<template>
  <div>
    <header>
      <div class="search-header">
        <i class="search-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
        </i>
        <input type="text" ref="search-input" autofocus v-model="keyword">
        <i class="close-circle-fill-icon" v-show="isCloseFill" @click="click_close_fill">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close-circle-fill"></use>
          </svg>
        </i>
        <div class="colse">取消</div>
      </div>
    </header>
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
            <li @click="click_hot(ietm)" v-for="(ietm ,index) in searchHotWords" :key="index">
              <a href="javascript:;">{{ietm}}</a>
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
            <li v-for="(ietm ,index) in SearchHistory" :key="index">
              <a href="javascript:;">{{ietm}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="isCloseFill">
      <ul>
        <li v-for="(item, index) in results" :key="index">
          <i class="search-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-search"></use>
            </svg>
          </i>
          <p>{{item}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import request from "@/http_";
let temp = [];
export default {
  data() {
    return {
      searchHotWords: [
        "系统",
        "重生",
        "武动乾坤",
        "圣墟",
        "剑来",
        "万界",
        "元尊",
        "末日",
        "魔道祖师",
        "重生之都市仙尊"
      ],
      keyword: "", // 搜索字符串
      isDelShow: false,
      results: [], // 搜索返回列表
      SearchHistory: [], // 搜索历史
      r: Math.floor(Math.random() * 10 + 1) // 取得一个随机数 1 - 10
    };
  },
  computed: {
    isCloseFill() {
      if (this.keyword.length > 0) return true;
      return false;
    }
  },
  watch: {
    keyword(val, old) {
      if (val == "") {
        this.results = [];
        return;
      }
      request.get(`/api/auto-complete?query=${this.keyword}`).then(res => {
        this.results = res.data.keywords;
      });
    }
  },
  beforeCreate() {
    // 请求 最新热词
    // let arr = [];
    // request.get("/api/search-hotwords").then(res => {
    //   const data = res.data.searchHotWords;
    //   data.forEach((item, index) => {
    //     arr.push(item);
    //     if (index % 10 == 0) {
    //       temp.push(arr);
    //       arr = [];
    //     }
    //   });
    // });
  },
  created() {
    // this.searchHotWords = temp;
    const data = localStorage.getItem("SEARCH_HISTORY");
    if (data != null) {
      this.SearchHistory = data.split(",");
    }
  },
  methods: {
    click_close_fill() {
      this.keyword = "";
      this.$refs["search-input"].focus();
    },
    // 清空全部搜索历史
    click_clear() {
      localStorage.removeItem("SEARCH_HISTORY");
      this.SearchHistory = [];
    },
    click_hot(word) {
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
header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
}
.search-header {
  margin: 10px;
  width: calc(100% - 20px);
  height: 35px;
  display: flex;
  position: relative;
  justify-content: space-between;
  input {
    width: calc(100% - 100px);
    font-size: scalc(35px);
    font-size: 18px;
    padding-left: 40px;
    border: none;
    border-radius: 5px;
    font-weight: 100;
    background: rgb(248, 248, 248);
  }
  .search-icon {
    svg {
      position: absolute;
      font-size: 26px;
      color: #aaa;
      top: 6px;
      left: 10px;
      height: 24px;
    }
  }
  .close-circle-fill-icon {
    svg {
      position: absolute;
      right: 65px;
      top: 9px;
      color: #aaa;
    }
  }
  .colse {
    width: 50px;
    height: 35px;
    letter-spacing: 2px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
  }
}
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
  li {
    width: 100%;
    height: 50px;
    display: flex;
    // border-top: 1px solid #ccc;
    border-bottom: 1px solid #eee;
    line-height: 50px;
    align-items: baseline;
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