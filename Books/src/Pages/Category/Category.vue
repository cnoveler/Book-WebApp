<template>
  <div>
    <Header :isHis="isMale?'male':'female'" v-model="isSearch">
      <div slot="left-icon" onclick="history.back(-1)">
        <i class="el-icon-arrow-left"></i>
        <span>分类</span>
      </div>
      <div slot="tit1" @click="click_p('male')">男生</div>
      <div slot="tit2" @click="click_p('female')">女生</div>
    </Header>
    <div class="content">
      <article class="card" v-for="(item, index) in gcatBooks" :key="index">
        <section>
          <HomeCard>
            <span slot="left-red"></span>
            <div slot="title" class="title">
              <h3>{{item.name}}</h3>
            </div>
            <span slot="title-desc" class="title-desc">共 {{item.bookCount}} 本作品</span>
            <span slot="more" class="more">
              <i class="el-icon-arrow-right"></i>
            </span>
            <div slot="content" class="body">
              <ul>
                <li
                  class="body-tags"
                  v-for="(k,index) in gcatBooksLv2"
                  :key="index"
                  v-show="k.major === item.name"
                >
                  <div
                    @click="click_tags(item.name,i)"
                    class="tags"
                    v-for="i in k.mins"
                    :key="i"
                  >{{i}}</div>
                </li>
              </ul>
            </div>
          </HomeCard>
        </section>
      </article>
    </div>
    <div class="footer">
      <Footer/>
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
import HomeCard from "@/components/HomeCard";
import request from "@/http_";
export default {
  components: {
    Header,
    Search,
    Footer,
    HomeCard
  },
  data() {
    return {
      catBooks: [], // 总分类
      catBooksLv2: [], // 二级分类
      isMale: true, // 是否是男频
      isSearch: false // 是否开启搜索
    };
  },
  computed: {
    gcatBooks() {
      if (this.isMale) {
        return this.catBooks.male;
      } else {
        return this.catBooks.female;
      }
    },
    gcatBooksLv2() {
      if (this.isMale) {
        return this.catBooksLv2.male;
      } else {
        return this.catBooksLv2.female;
      }
    }
  },
  methods: {
    // 点击标签,跳转分类详情
    click_tags(major, minor) {
      this.$router.push({
        // gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=20
        name: "CategoryDetails",
        query: {
          gender: this.isMale ? "male" : "female",
          type: "hot",
          major,
          minor,
          start: 0,
          limit: 20
        }
      });
      console.log(major, minor);
    },
    // 切换频道
    click_p(t) {
      if (t === "male") {
        this.isMale = true;
        this.$router.push({ path: "/catrgory#male" });
      } else {
        this.isMale = false;
        this.$router.push({ path: "/catrgory#female" });
      }
    },
    // 获取总分类
    async getBooksCats() {
      const res = await request.get(this.$config.CATBOOKS);
      this.catBooks = res.data;
    },
    // 获取二级分类
    async getBooksCatsLv2() {
      const res = await request.get(this.$config.CATBOOKS_LV2);
      this.catBooksLv2 = res.data;
    }
  },
  created() {
    if (this.$route.hash === "#male") {
      this.isMale = true;
    }
    if (this.$route.hash === "#female") {
      this.isMale = false;
    }
    this.getBooksCats();
    this.getBooksCatsLv2();
  }
};
</script>

<style scoped lang="scss">
.content {
  margin-top: 50px;
  .card {
    ul,
    li {
      list-style: none;
    }
    .body {
      display: flex;
      justify-content: space-between;
    }
    .body-tags {
      width: 100%;
      display: inline-flex;
      flex-wrap: wrap;
      color: #aaa;
      .tags {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        padding: 5px;
        margin-left: 20px;
        margin-top: 5px;
        font-size: 0.7655rem;
        border-radius: 20px;
        border: 1px solid #aaa;
      }
    }
    .title {
      font-size: 14px;
    }
    .title-desc {
      margin-left: 10px;
      color: #aaa;
    }
    .more {
      color: #aaa;
    }
  }
}
</style>