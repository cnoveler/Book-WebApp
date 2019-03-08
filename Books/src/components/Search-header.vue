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
        <div class="colse" @click="click_close">取消</div>
      </div>
    </header>
  </div>
</template>

<script>
import request from "@/http_";
export default {
  props: ["value"],
  data() {
    return {
      keyword: "", // 搜索字符串
      results: [], // 搜索返回列表
      isSearch: ""
    };
  },
  watch: {
    keyword(val, old) {
      if (val == "") {
        this.results = [];
        return this.$emit("input", val);
      }
      request
        .get(this.$config.SEARCH_COMPLETE_QUERY + this.keyword)
        .then(res => {
          this.results = res.data.keywords;
        });
      return this.$emit("input", val);
    },
    value(val) {
      this.keyword = val;
    },
    results(val, old) {
      return this.$emit("update:results", val);
    }
  },
  computed: {
    isCloseFill() {
      if (this.keyword.length > 0) return true;
      return false;
    }
  },
  methods: {
    click_close_fill() {
      this.keyword = "";
      this.$refs["search-input"].focus();
    },
    click_close() {
      // if (this.$route.fullPath == "/bookshelf/my") {
      //   return this.$emit("update:isSearched", false);
      // }
      // if (this.$route.fullPath == "/") {
      //   return this.$emit("update:isSearched", false);
      // }
      return this.$emit("update:isSearched", false);
      // this.$router.push({ name: "Home" });
      // history.back(-1);
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
  -moz-user-select: none; /* Firefox私有属性 */
  -webkit-user-select: none; /* WebKit内核私有属性 */
  -ms-user-select: none; /* IE私有属性(IE10及以后) */
  -khtml-user-select: none; /* KHTML内核私有属性 */
  -o-user-select: none; /* Opera私有属性 */
  user-select: none; /* CSS3属性 */
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
    cursor: pointer;
    a {
      text-decoration: none;
      outline: none;
      color: black;
    }
  }
}
</style>