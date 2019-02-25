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


export default {
  SEARCH_HOT_URL,
  BASE_STATIC_URL,
  SEARCH_COMPLETE_QUERY,
  SEARCH_KEWORD_RESULT,
  BOOK_INFO_URL,
  BOOK_SHORT_REVIEWS,
  BOOK_CHAPTERS_URL,
  BASE_CHAPTER_CONTENT
}
