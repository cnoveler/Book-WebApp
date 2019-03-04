// 用于保存一些 请求api url
const BASE_URL = "/api"
const BASE_URL_V2 = "/zhuishu"
const BASE_STATIC_URL = "http://statics.zhuishushenqi.com" // 默认请求 静态资源地址
const BASE_CHAPTER_CONTENT = "/chapter" // 获取章节内容



// https://novel.juhe.im/
const BOOK_SHORT_REVIEWS = BASE_URL + "/book/short-reviews?book=" // 书籍短评

// 追书神器
const BOOK_CHAPTERS_URL = BASE_URL_V2 + "/mix-atoc/" // 书籍目录
const BOOK_INFO_URL = BASE_URL_V2 + "/book/" // 书籍详情
const SEARCH_HOT_URL = BASE_URL_V2 + "/book/search-hotwords" // 请求搜索热词
const SEARCH_COMPLETE_QUERY = BASE_URL_V2 + "/book/auto-complete?query=" // 搜索补全
const SEARCH_KEWORD_RESULT = BASE_URL_V2 + "/book/fuzzy-search?query=" // 搜索结果
const LIST_URL = BASE_URL_V2 + "/ranking/" // 榜单


const FIRSTBOOKCATEGORIE = BASE_URL_V2 + "/book/by-categories?gender=male&type=hot&major=" // 分类
const ENDBOOKCATEGORIE = "&minor=&start=0&limit="

const LISTID = {
  // male
  _TOPID: "54d42d92321052167dfb75e3", // 追书最热榜 Top100
  _PRAISEID: "5a6844aafc84c2b8efaa6b6e", // 好评榜
  _HOTSEARCHID: "5a6844f8fc84c2b8efaa8bc5", // 热搜榜
  _POTENTIALID: "54d42e72d9de23382e6877fb", // 本周潜力榜
  _THEENDID: "564eb878efe5b8e745508fde", // 完结榜
  _VIPID: "57eb86f0ef9e5a8f20543d7d", // vip 排行榜 
  _RENTENTION: "564547c694f1c6a144ec979b", // 读者存留率top100 

  // picture
  _SENTIMENTID: "5a322ef4fc84c2b8efaa8335", // 人气榜
  _HOTSELLID: "5a68296bfc84c2b8ef9efdb0", // 热销榜
  _BASETSELLID: "5a39ca20fc84c2b8ef82c9ed", // 畅销榜
  _NEWBOOKID: "5a39ca3ffc84c2b8ef82da82", // 新书榜
  _ENDID: "5a39ca59fc84c2b8ef82e96c", // 完结榜
  _FREEID: "5a39ca7dfc84c2b8ef82ff4f", // 免费榜
}


export default {
  SEARCH_HOT_URL,
  BASE_STATIC_URL,
  SEARCH_COMPLETE_QUERY,
  SEARCH_KEWORD_RESULT,
  BOOK_INFO_URL,
  BOOK_SHORT_REVIEWS,
  BOOK_CHAPTERS_URL,
  BASE_CHAPTER_CONTENT,
  LIST_URL,
  LISTID,
  FIRSTBOOKCATEGORIE,
  ENDBOOKCATEGORIE
}
