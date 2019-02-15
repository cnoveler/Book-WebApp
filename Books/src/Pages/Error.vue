<template>
  <div class="error">
    <Header>
      <div slot="left-icon">
        <div class="left-icon" onclick="history.back(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-left"></use>
          </svg>
          <span class="error-title">出错了</span>
        </div>
      </div>
      <div slot="header-content"></div>
    </Header>
    <div class="content">
      <div class="error-content">
        <div class="error-img">
          <img src="//qidian.gtimg.com/qdm/img/error.3131c.svg">
        </div>
        <div class="error-text">很抱歉，此页面不存在或已删除。</div>
        <div class="btn-return">
          <button>返回首页</button>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped lang="scss">
.error {
  width: 100%;
  background-color: rgba(250, 247, 247, 0.993);
  font-weight: 100;
  font-size: 18px;
}
.content {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-content {
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 51px;
      height: 69px;
    }
    .error-text {
      margin: 10px;
      color: #aaa;
    }
    .btn-return {
      margin: 10px;
      button {
        width: 300px;
        height: 40px;
        color: #fff;
        background-color: #ed424b;
        border: none;
        font-size: 16px;
        border-radius: 20px;
        outline: none;
      }
    }
  }
}
</style>