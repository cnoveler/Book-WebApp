// 用于保存一些 请求api url
const BASE_URL = "/api"
const BASE_STATIC_URL = "http://statics.zhuishushenqi.com"
const SEARCH_HOT_URL = BASE_URL + "/search-hotwords" // 请求热词
const SEARCH_COMPLETE_QUERY = BASE_URL + "/auto-complete?query=" // 搜索补全
const SEARCH_KEWORD_RESULT = BASE_URL + "/search?keyword=" // 搜索结果
const BOOK_INFO_URL = BASE_URL + "/book-info/" // 书籍详情
const BOOK_SHORT_REVIEWS = BASE_URL + "/book/short-reviews?book=" // 书籍短评

export default {
  SEARCH_HOT_URL,
  BASE_STATIC_URL,
  SEARCH_COMPLETE_QUERY,
  SEARCH_KEWORD_RESULT,
  BOOK_INFO_URL,
  BOOK_SHORT_REVIEWS
}
