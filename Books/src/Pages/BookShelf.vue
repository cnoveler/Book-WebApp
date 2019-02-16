// 书架
<template>
  <div>
    <div class="edit-header" ref="edit" v-show="isEdit">
      <div class="checkall" @click="checkall">全选</div>
      <div class="book-count">共{{BookData.length}}本</div>
      <div class="close" @click="isEdit=!isEdit">取消</div>
    </div>
    <div class="mask-bookshelf" v-show="isDefaultshelf" @click="isDefaultshelf=!isDefaultshelf">
      <ul class="list">
        <li>
          <span class="title">默认书架({{BookData.length}})</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-check"></use>
          </svg>
        </li>
      </ul>
    </div>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <div class="delete" v-show="selected">
        <button @click="clicked_del">删除</button>
      </div>
    </transition>
    <Header v-show="!isEdit"/>
    <div class="content">
      <div class="my-default-header" v-show="!isEdit">
        <div class="default-selected" @click="isDefaultshelf=!isDefaultshelf">
          <span class="title">默认书架({{BookData.length}})</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caret-down"></use>
          </svg>
        </div>
        <div class="edit" @click="isEdit=!isEdit">编辑</div>
      </div>
      <div class="null" v-if="BookData.length <= 0">默认书架是空的</div>
      <div class="book-list" ref="book-list" v-if="BookData.length > 0">
        <ul>
          <li
            class="book-li"
            v-for="book in BookData"
            :key="book.id"
            @click="selected_book(book._id)"
          >
            <i :class="['radio',{active: book.isSelected}] " v-show="isEdit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-check"></use>
              </svg>
            </i>
            <div class="book-layout">
              <a href="javascript:;">
                <img :src="decodeURIComponent((book.cover).replace('/agent/',''))">
              </a>
              <div class="book-info">
                <div class="book-header">
                  <div class="book-title">{{book.title}}</div>
                  <div class="book-title-r">
                    <span>立即阅读</span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-right"></use>
                    </svg>
                  </div>
                </div>
                <div class="book-meta">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                  </svg>
                  {{book.author}} | 尚未阅读
                </div>
                <div class="book-to-new">
                  <span class="dot-red"></span>
                  <a href="javascript:;">更新至 {{book.lastChapter}}</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      isDefaultshelf: false, // 选中默认书架
      isEdit: false, // 是否编辑书架
      BookData: JSON.parse(localStorage.getItem("data"))
    };
  },
  components: {
    Header,
    Footer
  },
  watch: {
    isEdit(val, old) {
      if (val) {
        this.$refs["book-list"].style.marginTop = "50px";
      } else {
        this.$refs["book-list"].style.marginTop = "0px";
      }
      this.BookData.map(item => (item.isSelected = false));
    }
  },
  computed: {
    selected() {
      const obj = this.BookData.filter(item => item.isSelected === true);
      if (obj.length > 0) return true;
      return false;
    }
  },
  methods: {
    selected_book(_id) {
      if (this.isEdit) {
        const obj = this.BookData.filter(item => {
          if (item._id == _id) {
            return (item.isSelected = !item.isSelected);
          }
        });
        // console.log(obj);
      }
    },
    checkall() {
      this.BookData.map(item => (item.isSelected = !item.isSelected));
    },
    clicked_del() {
      const obj = this.BookData.filter(item => {
        return !item.isSelected;
      });
      this.BookData = obj;
      localStorage.removeItem("data"); // 清楚书架缓存
      localStorage.setItem("data", JSON.stringify(this.BookData));
    }
  },
  created() {
    // console.log(this.BookData);
    // const data = [
    //   {
    //     _id: "5702151c1c8e4db9483762d6",
    //     title: "放开那个女巫",
    //     author: "二目",
    //     shortIntro:
    //       "程岩原以为穿越到了欧洲中世纪，成为了一位光荣的王子。但这世界似乎跟自己想的不太一样？女巫真实存在，而且还真具有魔力？女巫种田文，将种田进行到底。",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1130743%2F1130743_42e9200c279a48b7a31001d363ba401c.jpg%2F",
    //     site: "zhuishuvip",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 14383,
    //     retentionRatio: 53.85,
    //     lastChapter: "第1393章 王牌",
    //     tags: ["种田文"],
    //     isSelected: false
    //   },
    //   {
    //     _id: "5bcd85971709700e14deae20",
    //     title: "泰坦与龙之王",
    //     author: "瑞血丰年",
    //     shortIntro:
    //       "我爸是泰坦，我妈是金龙！来自异界的灵魂穿越到了埃拉西亚世界，在一座海岛上重生，他美滋滋发现自己是拥有着漫长的寿命和与其匹配的强大力量的泰坦与龙之子，于是计划在吃喝玩睡中渡过数百年的时光，躺到传奇。但，“泰坦为战而生，浴血成长！”泰坦之父训斥道。“我以法术为傲，所以你作为我的子嗣，也要好好学习法术。”金龙娘循循教诲。",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F3323195%2F3323195_3adb5b3698f9456182aeb5d3bb7bfae8.jpg%2F",
    //     site: "zhuishuvip",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 12319,
    //     retentionRatio: 70.1,
    //     lastChapter: "正文卷 第两百二十五章 噩梦",
    //     tags: [],
    //     isSelected: false
    //   },
    //   {
    //     _id: "58c5548d687871ba11c4a248",
    //     title: "革命吧女神",
    //     author: "草上匪",
    //     shortIntro:
    //       "李奇被自称革命女神的少女丢到异世界，这里漫天神魔，超凡如狗，奋斗出个吃香喝辣的前程就很辛苦了，女神却要他在这里掀起轰轰烈烈的凡人革命。没有女巫，只有魔女。枪炮炸药蒸汽机打不过神术魔法灵力，只能运用信仰武器。生长在红旗下的李奇，唯有依靠最先进的思想，在费恩世界诛神屠魔，战天斗地，将红旗插满整个费恩。",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1508677%2F1508677_9a08424cedf449fa9706d5f60cbbab69.jpg%2F",
    //     site: "zhuishuvip",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 7608,
    //     retentionRatio: 51.35,
    //     lastChapter: "黎明之焰 一千一九二 佐尔德的急智与卡琳的触须",
    //     tags: ["种田文", "轻松"],
    //     isSelected: false
    //   },
    //   {
    //     _id: "5a95234c25bc374692a42ee4",
    //     title: "大龙挂了",
    //     author: "白雨涵",
    //     shortIntro:
    //       "大龙挂了，公主在哪？在山的那边海的那边有一群小精灵，他们喜欢和稀泥，他们还会种玉米。代表宝石与金属的龙，代表花草与树木的精灵，住在城堡里的王子，骑龙炼钢，精灵种田，逍遥又自在。",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2229427%2F2229427_b89561dfb0ff476281e95642b63032e4.jpg%2F",
    //     site: "zhuishuvip",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 8982,
    //     retentionRatio: 50.52,
    //     lastChapter: "第五集 第1075章 皇家蓝",
    //     tags: ["淡定", "种田文", "豪门", "龙"],
    //     isSelected: false
    //   },
    //   {
    //     _id: "58f2d63e2e3829ba3c1a907e",
    //     title: "斩神绝之君临天下",
    //     author: "殊雨",
    //     shortIntro:
    //       "绝世妖孽钟子浩因跨越域界空间隧道失忆，来到全新的天地后又将如何崛起？且看苏醒后的他如何血腥复仇，君临天下！书中有绝世天才的碰撞，快意恩仇的江湖；有令人眼花缭乱的美女，让人刻骨铭心的感情！一个少年，一段传说；一座洞府，千年企盼。携手红颜，仗剑天下；混沌神珠，破天诛魔！武者修炼境界：练体、聚元、化海、天极、虚空、不朽、神道……",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1505654%2F1505654_7a52c23c70c44e3ebaf027f09588d641.jpg%2F",
    //     site: "zhuishuvip",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 9209,
    //     retentionRatio: 56.28,
    //     lastChapter: "生命之神 第一千四百章 神峰之巅的召唤",
    //     tags: ["强者回归", "热血", "阵法"],
    //     isSelected: false
    //   },
    //   {
    //     _id: "5b4dbe8eac035b05d7f23352",
    //     title: "秘巫之主",
    //     author: "真愚老人",
    //     shortIntro:
    //       "当持续百年的灵障被神秘的流星撞碎，消失的灵气开始复苏，神秘侧渐渐恢复，魔法、巫术、诅咒、超凡生物、诡秘的传说、异域的魔神……旧秩序轰隆倒塌，新生的秩序却混乱而迷茫。在这一场前所未有的变革即将来临之际，唐奇苏醒过来，他发现自己变成了一个低劣的痛苦魔鬼，而且被挂在了十字架上……。",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2615749%2F2615749_8f98a365308a46c6ab76ce8ac6b57e6e.jpg%2F",
    //     site: "zhuishuvip",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 8158,
    //     retentionRatio: 65.27,
    //     lastChapter: "第464章 天神的绿帽",
    //     tags: ["坚毅", "法师", "重生"],
    //     isSelected: false
    //   },
    //   {
    //     _id: "59ef46e24030576960c00ef9",
    //     title: "极道骑士",
    //     author: "银霜骑士",
    //     shortIntro:
    //       "肖恩：你好，我对你的仰望如滔滔江水，额，能握个手吗？某天才疑惑地与肖恩握了握手。肖恩转身，心中狂笑：嘿嘿，顶级骑士天赋到手。",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2175456%2F2175456_7382611f184b4427a59c1aa7125614a2.jpg%2F",
    //     site: "zhuishuvip",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 9271,
    //     retentionRatio: 58.21,
    //     lastChapter: "第584章 星空为猎场",
    //     tags: [],
    //     isSelected: false
    //   },
    //   {
    //     _id: "5adeeee214ce4173d95edbe0",
    //     title: "掉入异世界也要努力活下去",
    //     author: "梦丣",
    //     shortIntro:
    //       "拿到全国前三大学的入取通知书了！贼开心！努力终于有了回报！ 　　这个暑假可要好好刷刷游戏！把这几年的大作统统玩一遍！！ 　　原本是这样打算的…… 　　可一觉醒来，居然穿越了！还是魔法世界！ 　　哟哟哟，不错哦！可是……我这是在什么鬼地方？！ 　　mdzz 　　穿越到魔法世界，一定会有好运？ 　　tan90°！不存在的！ 　　外挂？金手指？天赋灵异？ 　　打住！！不存在的！ 　　羸弱的身体，不能施法的体质，匮乏的知识！ 　　一无是处的主角究竟如何在这个异世界中生活下去？ 　　 　　面对完全崩塌的日常，危机四伏的未来，男主究竟如何走出绝望，走进深渊？ 　　“这一切都是命运啊！我就是幸运e！” 　　于是乎，写作：悲惨，读作：伤之狂想曲的命运，即将展开。 　　——record_of_utmost_future_ⅱ_name.99",
    //     majorCate: "奇幻",
    //     minorCate: "西方奇幻",
    //     cover:
    //       "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2286174%2F2286174_4bc4e20b6d4d40a39670561f0fda0023.jpg%2F",
    //     site: "zhuishuvip",
    //     sizetype: -1,
    //     superscript: "",
    //     contentType: "txt",
    //     allowMonthly: false,
    //     banned: 0,
    //     latelyFollower: 5614,
    //     retentionRatio: 33.98,
    //     lastChapter: "第238章 信+回旅馆",
    //     tags: ["男孩子", "穿越", "转世", "致郁"],
    //     isSelected: false
    //   }
    // ];
    // localStorage.setItem("data", JSON.stringify(data));
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  .my-default-header {
    display: flex;
    margin: 10px;
    justify-content: space-between;
    .title {
      font-weight: 600;
    }
  }
  .null {
    position: relative;
    top: 200px;
    display: flex;
    height: 200px;
    flex-direction: column;
    align-items: center;
    color: #ccc;
    font-weight: 200;
  }
  .null::before {
    display: block;
    width: 2.25rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    content: "";
    background: url(../assets/image/null.svg);
    background-size: 100% 100%;
  }
}
.mask-bookshelf {
  ul,
  li {
    list-style: none;
  }
  .list {
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #fff;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px 0 10px;
    height: 50px;
    line-height: 50px;
    letter-spacing: 1px;
    svg {
      color: #ed424b;
    }
  }
}

.mask-bookshelf::before {
  content: "";
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.book-list {
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  ul,
  li {
    list-style: none;
  }
  .book-li {
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    .radio {
      margin: 0 15px 0 15px;
      display: inherit;
      width: 15px;
      height: 15px;
      border: 1px solid #c0c5cc;
      border-radius: 50%;
      color: #fff;
      font-size: 15px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .radio.active {
      background: #ed424b;
    }
    .book-layout {
      width: 100%;
      display: flex;
      flex-direction: row;
      img {
        width: 60px;
        height: 80px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      .book-info {
        display: flex;
        width: 100%;
        flex-direction: column;
        margin-left: 15px;
        overflow: hidden;
        font-size: 14px;
        .book-header {
          width: 100%;
          height: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 200;
          .book-title {
            font-weight: 600;
          }
          .book-title-r {
            font-size: 14px;
            color: #bbb;
            margin-right: 10px;
            svg {
              margin-left: -3px;
            }
          }
        }
        .book-meta {
          color: #bbb;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .book-to-new {
          display: flex;
          margin-top: 10px;
          align-items: center;
          .dot-red {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: red;
            margin: 0 2px 0 2px;
          }
          a {
            color: #bbb;
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            letter-spacing: 0.5px;
          }
        }
      }
    }
  }
}
.edit-header {
  display: flex;
  height: 50px;
  width: 100%;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  background: #fff;
  div {
    margin: 0 20px 0 20px;
  }
  .book-count {
    font-weight: 700;
  }
}
.delete {
  width: 100%;
  position: fixed;
  bottom: 0;
  button {
    border: none;
    width: 100%;
    height: 40px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    outline: none;
    background: #ed424b;
    color: #fff;
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 16px;
  }
}
</style>