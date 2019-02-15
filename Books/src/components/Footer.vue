<template>
  <div>
    <footer>
      <ul>
        <li>
          <a href="javascript:;">客户端</a>
        </li>
        <li>
          <a href="javascript:;" class="active">触屏版</a>
        </li>
        <li>
          <a href="javascript:;">电脑版</a>
        </li>
        <li>
          <a href="javascript:;">帮助</a>
        </li>
        <li>
          <a href="javascript:;">反馈</a>
        </li>
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
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  bottom: 0;
  color: #aaa;
  ul,
  li,
  a {
    list-style: none;
    text-decoration: none;
    font-weight: 100;
    color: #aaa;
    font-family: sans-serif;
  }
  li {
    margin: 0 10px 0 10px;
    display: inline-block;
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