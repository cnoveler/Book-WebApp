<template>
  <div class="bookdetails">
    <header>
      <Header>
        <span class="left-header-text" slot="left-text">武神大主播</span>
        <p slot="header-content"></p>
      </Header>
      <div class="book-info">
        <div class="book-cover">
          <img src="//bookcover.yuewen.com/qdbimg/349573/1011879207/300" alt>
        </div>
        <div class="book-meta">
          <div class="book-title">
            <h3>重生之武神大主播</h3>
          </div>
          <div class="book-author">
            <a href="javascript:;">忘川三途</a>
            <span>
              <i>Lv.4</i>
            </span>
          </div>
          <div class="rate">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            ></el-rate>
            <!-- <span class="span-text">5.8分/95人评过</span> -->
          </div>
          <!-- <div class="rate">
            <span>☆☆☆☆☆</span>
            <div class="hollow" :style="style">★★★★★</div>
            <span class="span-text">5.8分/95人评过</span>
          </div>-->
          <div class="book-cat">玄幻/东方玄幻</div>
          <div class="book-count-status">
            <div class="book-word-count">118.23万字|</div>
            <div class="book-status">连载</div>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button size="medium " class="btn-red">点击阅读</el-button>
        <el-button size="medium " disabled plain>加入书架</el-button>
        <el-button size="medium " plain>VIP订阅</el-button>
      </div>
    </header>
    <div class="content">
      <div class="books-intro">
        <el-card
          class="box-card"
          shadow="never"
        >钟离重生了，重生到了十年之前，那并不美好的学生时代。那时诸神未临，百王未醒，地球还未沦为宇宙杀戮的战场，尘封于远古遗迹之中的武道众圣也未复苏。而他，却回来了，带着未来科技的完美结晶，承载人族武道传承的武神智脑，回到了这大世将启的十年之前。在百慕大三角力搏深海巨兽在撒拉哈沙漠探寻古神遗迹在法老金字塔灭杀远古亡灵在浩瀚宇宙中决战星空诸神……扶大厦之将倾，挽狂澜于即倒。这一世，不留遗憾，只手擎天！</el-card>
        <div class="book-directory">
          <a href="javascript:;">
            <p>目录</p>
            <div class="right-text">
              <span>11小时前·连载至永夜之王旗飞扬 终章 美丽新世界</span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right"></use>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
    <article>
      <div class="modul">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">书友评价</span>
            <small>共111条评论</small>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <ul class="book-reviews">
            <li>
              <div class="author-cover">
                <img
                  src="http://statics.zhuishushenqi.com/avatar/37/55/3755b7f598fb7f4ebf06b89287f1a8cb"
                  alt
                >
              </div>
              <div class="author-info">
                <div class="nickname">看见维护🐶就想骂</div>
                <el-rate v-model="value" disabled></el-rate>
                <div class="author-content">求大神写一本重生仙逆的书 这本仙逆我都看了十几变了 还是觉得好看 求大神一定要看到 你写的书真的太好看了 拜托了</div>
                <div class="updated">2019-01-12 12:08:40</div>
              </div>
            </li>
          </ul>
        </el-card>
      </div>
    </article>
    <article>
      <div class="modul">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">本书作者</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="book-x-author">
            <div class="author-cover">
              <img src="//facepic.qidian.com/qd_face/349573/a402632010/0" alt>
              <span>
                <i>Lv.4</i>
              </span>
            </div>
            <div class="author-meta">
              <div class="author-title">
                <h3>鱼跃冲顶</h3>
                <p class="book-desc">暂无作者简介</p>
              </div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right"></use>
              </svg>
            </div>
          </div>
        </el-card>
      </div>
    </article>
    <article>
      <div class="modul">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">本书标签</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="book-x-tags">
            <el-tag>孤儿</el-tag>
            <el-tag type="success">技术流</el-tag>
            <el-tag type="info">霸道</el-tag>
            <el-tag type="warning">扮猪吃老虎</el-tag>
            <el-tag type="danger">后宫</el-tag>
          </div>
        </el-card>
      </div>
    </article>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
// import Search from "@/components/Search";
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      value: 3.5
    };
  },
  components: {
    Header,
    // Search,
    Footer
  },
  computed: {
    style() {
      return `width:${5.8 / 2.5}rem`;
    }
  }
};
</script>

<style scoped lang="scss">
.bookdetails {
  background: #f6f7f9;
}
header {
  background: rgba(242, 236, 230, 0.4);
  background: -webkit-linear-gradient(rgba(242, 236, 230, 0.4), #fff);
  height: 330px;
  .left-header-text {
    font-size: 16px;
    font-weight: 100;
  }
  .book-info {
    width: calc(100% - 30px);
    display: flex;
    height: 200px;
    margin-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    img {
      width: 8.6rem;
      height: 11.2rem;
    }
    .book-meta {
      margin-left: 10px;
      display: flex;
      font-size: 14px;
      flex-direction: column;
      div {
        margin-bottom: 10px;
      }
      .book-title {
        margin-top: 10px;
        font-weight: 900;
        line-height: 1.4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .book-author {
        display: flex;
        align-items: baseline;
        a {
          text-decoration: none;
          outline: none;
          color: #aaa;
        }
        span {
          transform: scale(0.7);
          background: #f0643a;
          border: none;
          color: #fff;
          display: inline-block;
          width: 20px;
          height: 8px;
          border-radius: 2px;
          font-size: 12px;
          text-align: center;
          line-height: 8px;
          font-weight: 500;
          padding: 5px;
        }
      }
      // .rate {
      //   margin-bottom: 10px;
      // }
      .book-cat {
        letter-spacing: 1px;
      }
      .book-count-status {
        height: 30px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
      }
    }
  }
  .btn {
    width: calc(100% - 20px);
    margin: 10px;
    display: flex;
    justify-content: space-between;
    .btn-red {
      background: #ed424b;
      color: #fff;
    }
  }
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  background: #fff;
  .book-intro {
    width: 100%;
  }
  .box-card {
    margin-top: 10px;
    text-indent: 30px;
    width: calc(100% - 10px);
    font-size: 14px;
    letter-spacing: 1px;
    height: 120px;
    line-height: 20px;
    margin-left: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
  .book-directory {
    a {
      display: flex;
      height: 30px;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      color: black;
      text-decoration: none;
      p {
        font-size: 16px;
        font-weight: 900;
      }
      .right-text {
        width: 200px;
        display: flex;
        span {
          width: 200px;
          font-size: 12px;
          letter-spacing: 1px;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
          color: #aaa;
        }
        svg {
          color: #aaa;
          margin-left: -5px;
        }
      }
    }
  }
}
.modul {
  margin: 10px 0 10px 0;
  .box-card {
    .book-x-author {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .author-cover {
        position: relative;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        span {
          position: absolute;
          background: #f0643a;
          border: none;
          left: 2px;
          bottom: 3px;
          color: #fff;
          width: 35px;
          height: 10px;
          border-radius: 20px;
          font-size: 12px;
          text-align: center;
          line-height: 10px;
          font-weight: 500;
          padding: 5px;
        }
      }
      .author-meta {
        margin-left: 10px;
        width: calc(100% - 50px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .book-desc {
          margin-top: 5px;
          color: #ccc;
          font-size: 14px;
        }
        svg {
          color: #aaa;
        }
      }
    }
  }
  .clearfix {
    .title {
      font-size: 16px;
      font-weight: 900;
    }
    small {
      color: #aaa;
    }
  }
  .book-reviews {
    ul,
    li {
      list-style: none;
    }
    li {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #f0f1f2;
      .author-cover {
        position: relative;
        top: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .author-info {
        width: calc(100% - 50px);
        margin-left: 10px;
        font-size: 14px;
        padding-bottom: 10px;

        div {
          margin-top: 5px;
        }
        .nickname {
          font-size: 16px;
          letter-spacing: 1px;
          color: #aaa;
        }
        .author-content {
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
        .updated {
          color: #aaa;
        }
      }
    }
  }
}
</style>