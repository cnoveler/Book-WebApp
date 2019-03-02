<template>
  <div>
    <footer>
      <ul class="footer-text">
        <li>客户端</li>
        <li class="active">触屏版</li>
        <li>电脑版</li>
        <li>帮助</li>
        <li>反馈</li>
      </ul>
      <div class="footer-copy">Copyright © 2002-2019 m.qidian.com</div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  bottom: 0;
  color: #aaa;
  font-size: 0.79rem;
  -moz-user-select: none; /* Firefox私有属性 */
  -webkit-user-select: none; /* WebKit内核私有属性 */
  -ms-user-select: none; /* IE私有属性(IE10及以后) */
  -khtml-user-select: none; /* KHTML内核私有属性 */
  -o-user-select: none; /* Opera私有属性 */
  user-select: none; /* CSS3属性 */
  ul,
  li {
    list-style: none;
  }
  .footer-text {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .footer-copy {
    margin-top: -20px;
    font-size: 12px;
  }
  .active {
    color: black;
  }
}
</style>