# 仿 · 起点阅读 WebApp
 
##### 注：纯属共享学习之用, 不用于任何商业用途。

 项目相关API
 -- 
-  [API文档-1](https://xiadd.github.io/zhuishushenqi/#/?id=%E8%BF%BD%E4%B9%A6%E7%A5%9E%E5%99%A8%E6%8E%A5%E5%8F%A3)
- [API文档-2](https://github.com/jianhui1012/bookreader/blob/master/docs/zh_doc.md)

开发环境
--
-  Windows10
-  VS Code
-  Node  @v10.13.0
-  Yarn  @1.13.0

使用到的相关技术知识
--
- Vue
- Sass
- Axios
- Vue-cli
- Vue-router
- Element-UI
- Vue-awesome-swiper


项目运行
--
```shell
    git clone git@github.com:moxier/Book-WebApp.git
    cd Books
    yarn install
    yarn start
```

实现的功能
- 小说书架 （缓存于本地客户端, 会记录阅读的章节，书架上书籍的增删）
- 最近阅读  （待完成存入本地缓存）
- 分类查询
- 书籍详情
- 书籍评论
- 搜索（搜索历史，自动补全，搜索结果筛选[待完成]）
- 书籍阅读
- 添加书签（待完成存入缓存）
- 书籍阅读相关设置（字体大小设置，阅读背景色设置）
- 书籍分类（性别分类：男，女， 书籍类别：大分类，小分类）
- 书籍总排行榜（书籍单个排行榜详情分类筛选）
-  ……

后续待优化
--
- 使用上Vuex
- 实现懒加载
- 优化项目的性能方面
- 解决其中部分Bug
- 优化项目中的部分组件设计不规范，不完善问题
- 实现阅读小说时左右翻页（目前只实现上下翻页）
- 优化项目中CSS的冗余，JS方法函数的命名不规范等等，简化，优化它们，使代码更美观。
- 其他想到再补充……

项目截图
--

##### 书籍排行榜
![](https://github.com/moxier/Book-WebApp/blob/master/img/ranking.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/ranking-details.png)

##### 书籍分类
![](https://github.com/moxier/Book-WebApp/blob/master/img/category.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/category-details.png)

##### 书籍阅读
![](https://github.com/moxier/Book-WebApp/blob/master/img/read.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/read-options.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/read-option-font.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/read-chapter.png)

##### 书架
![](https://github.com/moxier/Book-WebApp/blob/master/img/bookcase.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/bookcase-del.png)

##### 搜索
![](https://github.com/moxier/Book-WebApp/blob/master/img/search.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/search-word.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/search-result.png)

##### 书籍详情
![](https://github.com/moxier/Book-WebApp/blob/master/img/bookdetails.png)

##### 书籍章节
![](https://github.com/moxier/Book-WebApp/blob/master/img/bookchapter.png)

##### 首页
![](https://github.com/moxier/Book-WebApp/blob/master/img/home.png)
![](https://github.com/moxier/Book-WebApp/blob/master/img/home-header.png)
