<template>
  <div>
    <div class="go-top" ref="gotop" @click="goTop">
      <span>─</span>
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0, //当前滚动条高度
      clientHeight: 0, //可视区高度
      scrollHight: 0 //   滚动条总高度
    };
  },
  watch: {
    scrollTop(val) {
      if (val > this.clientHeight) {
        this.$refs["gotop"].style.opacity = 1;
      } else {
        this.$refs["gotop"].style.opacity = 0;
      }
    }
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    // 检测浏览器滚动条
    window.addEventListener("scroll", e => {
      // 当前滚动条高度
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = scrollTop;
      // 可视区高度
      const clientHeight = document.documentElement.clientHeight;
      this.clientHeight = clientHeight;
      // 滚动条总高度
      const scrollHight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      this.scrollHight = scrollHight;
      //   // 判断是否触底
      //   if (this.clientHeight + this.scrollTop >= this.scrollHight - 100) {
      //   }
    });
  }
};
</script>

<style scoped lang="scss">
.go-top {
  position: fixed;
  z-index: 1;
  right: 1rem;
  bottom: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-transition: opacity 0.25s, visibility 0.25s;
  transition: opacity 0.25s, visibility 0.25s;
  opacity: 0;
  color: #fff;
  border-radius: 99px;
  font-size: 1.225rem;
  background-color: rgba(0, 0, 0, 0.5);
  span {
    display: inline;
    position: absolute;
    top: 2px;
  }
}
</style>