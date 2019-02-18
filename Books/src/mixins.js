const mixins = {
  data() {
    return {
      BookData: [], // 全局混入 书架数据
      BookHistory: [] // 全局混入 最近阅读书籍数据
    }
  },
  created() {
    const data = [{
        _id: "5702151c1c8e4db9483762d6",
        title: "放开那个女巫",
        author: "二目",
        shortIntro: "程岩原以为穿越到了欧洲中世纪，成为了一位光荣的王子。但这世界似乎跟自己想的不太一样？女巫真实存在，而且还真具有魔力？女巫种田文，将种田进行到底。",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1130743%2F1130743_42e9200c279a48b7a31001d363ba401c.jpg%2F",
        site: "zhuishuvip",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 14383,
        retentionRatio: 53.85,
        lastChapter: "第1393章 王牌",
        tags: ["种田文"],
        isSelected: false
      },
      {
        _id: "5bcd85971709700e14deae20",
        title: "泰坦与龙之王",
        author: "瑞血丰年",
        shortIntro: "我爸是泰坦，我妈是金龙！来自异界的灵魂穿越到了埃拉西亚世界，在一座海岛上重生，他美滋滋发现自己是拥有着漫长的寿命和与其匹配的强大力量的泰坦与龙之子，于是计划在吃喝玩睡中渡过数百年的时光，躺到传奇。但，“泰坦为战而生，浴血成长！”泰坦之父训斥道。“我以法术为傲，所以你作为我的子嗣，也要好好学习法术。”金龙娘循循教诲。",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F3323195%2F3323195_3adb5b3698f9456182aeb5d3bb7bfae8.jpg%2F",
        site: "zhuishuvip",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 12319,
        retentionRatio: 70.1,
        lastChapter: "正文卷 第两百二十五章 噩梦",
        tags: [],
        isSelected: false
      },
      {
        _id: "58c5548d687871ba11c4a248",
        title: "革命吧女神",
        author: "草上匪",
        shortIntro: "李奇被自称革命女神的少女丢到异世界，这里漫天神魔，超凡如狗，奋斗出个吃香喝辣的前程就很辛苦了，女神却要他在这里掀起轰轰烈烈的凡人革命。没有女巫，只有魔女。枪炮炸药蒸汽机打不过神术魔法灵力，只能运用信仰武器。生长在红旗下的李奇，唯有依靠最先进的思想，在费恩世界诛神屠魔，战天斗地，将红旗插满整个费恩。",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1508677%2F1508677_9a08424cedf449fa9706d5f60cbbab69.jpg%2F",
        site: "zhuishuvip",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 7608,
        retentionRatio: 51.35,
        lastChapter: "黎明之焰 一千一九二 佐尔德的急智与卡琳的触须",
        tags: ["种田文", "轻松"],
        isSelected: false
      },
      {
        _id: "5a95234c25bc374692a42ee4",
        title: "大龙挂了",
        author: "白雨涵",
        shortIntro: "大龙挂了，公主在哪？在山的那边海的那边有一群小精灵，他们喜欢和稀泥，他们还会种玉米。代表宝石与金属的龙，代表花草与树木的精灵，住在城堡里的王子，骑龙炼钢，精灵种田，逍遥又自在。",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2229427%2F2229427_b89561dfb0ff476281e95642b63032e4.jpg%2F",
        site: "zhuishuvip",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 8982,
        retentionRatio: 50.52,
        lastChapter: "第五集 第1075章 皇家蓝",
        tags: ["淡定", "种田文", "豪门", "龙"],
        isSelected: false
      },
      {
        _id: "58f2d63e2e3829ba3c1a907e",
        title: "斩神绝之君临天下",
        author: "殊雨",
        shortIntro: "绝世妖孽钟子浩因跨越域界空间隧道失忆，来到全新的天地后又将如何崛起？且看苏醒后的他如何血腥复仇，君临天下！书中有绝世天才的碰撞，快意恩仇的江湖；有令人眼花缭乱的美女，让人刻骨铭心的感情！一个少年，一段传说；一座洞府，千年企盼。携手红颜，仗剑天下；混沌神珠，破天诛魔！武者修炼境界：练体、聚元、化海、天极、虚空、不朽、神道……",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1505654%2F1505654_7a52c23c70c44e3ebaf027f09588d641.jpg%2F",
        site: "zhuishuvip",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 9209,
        retentionRatio: 56.28,
        lastChapter: "生命之神 第一千四百章 神峰之巅的召唤",
        tags: ["强者回归", "热血", "阵法"],
        isSelected: false
      },
      {
        _id: "5b4dbe8eac035b05d7f23352",
        title: "秘巫之主",
        author: "真愚老人",
        shortIntro: "当持续百年的灵障被神秘的流星撞碎，消失的灵气开始复苏，神秘侧渐渐恢复，魔法、巫术、诅咒、超凡生物、诡秘的传说、异域的魔神……旧秩序轰隆倒塌，新生的秩序却混乱而迷茫。在这一场前所未有的变革即将来临之际，唐奇苏醒过来，他发现自己变成了一个低劣的痛苦魔鬼，而且被挂在了十字架上……。",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2615749%2F2615749_8f98a365308a46c6ab76ce8ac6b57e6e.jpg%2F",
        site: "zhuishuvip",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 8158,
        retentionRatio: 65.27,
        lastChapter: "第464章 天神的绿帽",
        tags: ["坚毅", "法师", "重生"],
        isSelected: false
      },
      {
        _id: "59ef46e24030576960c00ef9",
        title: "极道骑士",
        author: "银霜骑士",
        shortIntro: "肖恩：你好，我对你的仰望如滔滔江水，额，能握个手吗？某天才疑惑地与肖恩握了握手。肖恩转身，心中狂笑：嘿嘿，顶级骑士天赋到手。",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2175456%2F2175456_7382611f184b4427a59c1aa7125614a2.jpg%2F",
        site: "zhuishuvip",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 9271,
        retentionRatio: 58.21,
        lastChapter: "第584章 星空为猎场",
        tags: [],
        isSelected: false
      },
      {
        _id: "5adeeee214ce4173d95edbe0",
        title: "掉入异世界也要努力活下去",
        author: "梦丣",
        shortIntro: "拿到全国前三大学的入取通知书了！贼开心！努力终于有了回报！ 　　这个暑假可要好好刷刷游戏！把这几年的大作统统玩一遍！！ 　　原本是这样打算的…… 　　可一觉醒来，居然穿越了！还是魔法世界！ 　　哟哟哟，不错哦！可是……我这是在什么鬼地方？！ 　　mdzz 　　穿越到魔法世界，一定会有好运？ 　　tan90°！不存在的！ 　　外挂？金手指？天赋灵异？ 　　打住！！不存在的！ 　　羸弱的身体，不能施法的体质，匮乏的知识！ 　　一无是处的主角究竟如何在这个异世界中生活下去？ 　　 　　面对完全崩塌的日常，危机四伏的未来，男主究竟如何走出绝望，走进深渊？ 　　“这一切都是命运啊！我就是幸运e！” 　　于是乎，写作：悲惨，读作：伤之狂想曲的命运，即将展开。 　　——record_of_utmost_future_ⅱ_name.99",
        majorCate: "奇幻",
        minorCate: "西方奇幻",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2286174%2F2286174_4bc4e20b6d4d40a39670561f0fda0023.jpg%2F",
        site: "zhuishuvip",
        sizetype: -1,
        superscript: "",
        contentType: "txt",
        allowMonthly: false,
        banned: 0,
        latelyFollower: 5614,
        retentionRatio: 33.98,
        lastChapter: "第238章 信+回旅馆",
        tags: ["男孩子", "穿越", "转世", "致郁"],
        isSelected: false
      }
    ];
    if (this.BookData.length <= 0) {
      localStorage.setItem("book-data", JSON.stringify(data));
    }
    this.BookData = JSON.parse(localStorage.getItem('book-data'))
    if (this.BookData === null) {
      this.BookData = []
    }
    if (this.BookHistory.length <= 0) {
      localStorage.setItem("RECENTLY_READ", JSON.stringify(data));
    }
    this.BookHistory = JSON.parse(localStorage.getItem('RECENTLY_READ'))
    if (this.BookHistory === null) {
      this.BookHistory = []
    }
  },
}

export default mixins
