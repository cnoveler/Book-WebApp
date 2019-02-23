const mixins = {

  data() {
    return {
      BookData: [], // 全局混入 书架数据
      BookHistory: [], // 全局混入 最近阅读书籍数据
    }
  },
  created() {
    this.BookData = JSON.parse(localStorage.getItem('book-data'))
    if (this.BookData === null) {
      localStorage.setItem("book-data", JSON.stringify([]));
      this.BookData = []
    }
    // if (this.BookHistory.length <= 0) {
    //   localStorage.setItem("RECENTLY_READ", JSON.stringify(data));
    // }
    ;
    this.BookHistory = JSON.parse(localStorage.getItem('RECENTLY_READ'))
    if (this.BookHistory === null) {
      localStorage.setItem("RECENTLY_READ", JSON.stringify([]))
      this.BookHistory = []
    }
  },
}

export default mixins
