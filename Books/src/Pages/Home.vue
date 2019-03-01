/*
 * @Author: Init 
 * @Date: 2019-02-28 14:53:43 
 * @Last Modified by: Init
 * @Last Modified time: 2019-02-28 17:28:03
 */
<template>
  <div>
    <div v-show="!isSearch" class="content">
      <Header isHis="male" v-model="isSearch">
        <div class="logo" slot="left-icon">
          <img src="https://qidian.gtimg.com/qdm/img/logo-qdm.02fc8.svg" alt>
        </div>
        <div slot="search-user">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user"></use>
          </svg>
        </div>
        <div slot="tit1" @click="$router.push({name:'male'})">男生</div>
        <div slot="tit2" @click="$router.push({name:'female'})">女生</div>
      </Header>
      <div class="module-content">
        <!-- 轮播图 -->
        <div class="banner"></div>
        <!-- 搜索 -->
        <div class="search">
          <input type="text">
        </div>
        <div class="footer">
          <Footer/>
        </div>
      </div>
    </div>
    <div class="search-page" v-show="isSearch">
      <Search v-model="isSearch"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/search";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer,
    Search
  },
  data() {
    return {
      imgArr: [
        "//qidian.qpic.cn/qidian_common/349573/28b9d57602d5f02139787ca9a9e361b6/0",
        "//qidian.qpic.cn/qidian_common/349573/185a83020cf454940b3074ca799e78c7/0",
        "//qidian.qpic.cn/qidian_common/349573/7d08609bf6b6f1370c714d157d43c8b2/0",
        "//qidian.qpic.cn/qidian_common/349573/2adf5c980c73a896b64dff676fb2d49d/0",
        "//qidian.qpic.cn/qidian_common/349573/2198d860477a1951e8e5ff0bb4d54dfd/0"
      ],
      isSearch: false //是否搜索
    };
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
}
.module-content {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 50px;
  .banner {
    position: relative;
    height: 120px;
    display: flex;
    img {
      width: 100%;
      height: 120px;
    }
  }
  .search {
    position: relative;
    top: 20px;
  }
}
.footer {
  width: 100%;
  position: relative;
  top: 100px;
}
</style>