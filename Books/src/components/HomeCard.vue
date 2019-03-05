<template>
  <div>
    <div class="module">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">
            <slot name="left-red">
              <span class="left-red"></span>
            </slot>
            <slot name="title">
              <h3>热门小说</h3>
            </slot>
            <slot name="title-desc"></slot>
          </span>
          <slot name="more">
            <span class="more">
              更多
              <i class="el-icon-arrow-right"></i>
            </span>
          </slot>
        </div>
        <slot name="content"></slot>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.module {
  width: 100%;
  .box-card {
    .clearfix {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .more {
        color: #969ba3;
        cursor: pointer;
      }
      .title {
        display: flex;
        align-items: center;
        h3 {
          margin-right: 5px;
        }
      }
      .left-red::before {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        width: 0.625rem;
        height: 1.25em;
        content: "";
        color: transparent;
        border-left: 3px solid #ed424b;
      }
    }
  }
}
</style>