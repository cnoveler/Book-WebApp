// 用于保存一些 请求api url
const BASE_URL = "/api"
const SEARCH_HOT_URL = BASE_URL + "/search-hotwords" // 请求热词
const SEARCH_COMPLETE_QUERY = BASE_URL + "/auto-complete?query=" // 搜索补全
const SEARCH_KEWORD_RESULT = BASE_URL + "/search?keyword=" // 搜索结果

export default {
  SEARCH_HOT_URL,
  SEARCH_COMPLETE_QUERY,
  SEARCH_KEWORD_RESULT
}
