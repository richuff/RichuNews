## 概述

> 本项目使用vue框架和unicloud构建，主要功能类似CSDN等博客社区，可以发布文章，点赞，评论等功能

## 环境

- HBulider X 4.24

>├─pages     #页面结构 <br/>
>│  ├─Add     #添加页面 <br/>
>│  ├─detail    #详情页面 <br/>
>│  ├─Edit    #编辑页面 <br/>
>│  └─index   #索引页面 <br/>
>├─static      #静态图片文件 <br/>
>│  └─images <br/>
>├─uniCloud-alipay  #unicloud云函数 <br/>
>│  ├─cloudfunctions <br/>
>│  │  ├─AddArticle    添加文章 <br/>
>│  │  ├─getArticle    获取文章 <br/>
>│  │  ├─getarticlebyid    获取文章的id <br/>
>│  │  ├─removearticle  移除文章 <br/>
>│  │  └─updateArticle   更新文章 <br/>
>│  └─database<br/>
>
>main.js  入口文件
>
>manifest.js  配置文件
>
>pages.json   页面的配置文件
>
>uni.scss 样式文件
>
>vite.config 配置文件

## 更新日志

v1.0.0

>2024 4 25
> 基本架构的搭建和基本模块的构建

- 文章主页面
- 文章添加页面
- 文章编辑页面
- 文章详情页

v1.1.0
>2024 5 1
> bug修复

- 修复了详情页无法实现换行的bug
- 增加了文章主页面右侧的缩略图
- 增加了发布时间的显示

v1.1.5
>2024 5 15
>bug修复

- 修复了空格无法渲染的问题

v1.2.0
>2024 5 17
> bug修复和模块添加

- 修复了时间显示错误

v1.2.2
>2024 6 1
>bug修复和模块添加

- 修复文本框无法输入

v1.2.5
>2024 7 8
>bug修复和模块添加

- 增加了定位模块，可获取发布者地区的ip

## 交流

1691401076@qq.com   可以通过邮件联系

