# @huangang/cordova-plugin-webview-x5-static

把``Cordova``的``WebView``替换为腾讯的[X5](http://x5.tencent.com/)。使用腾讯浏览服务TBS完整版SDK。    
静态集成版本

## 支持环境

- cordova-android > 4
- Android > 4.0

## 安装

1. ```cordova plugin add @huangang/cordova-plugin-webview-x5-static```

## 环境

### 当前版本

内核:46140    
sdk:44153     
获取内核的[方法](https://mp.weixin.qq.com/s/SQ5y3n_yM2iIBYX0hx-PmA)     

## 感谢

此项目继承自项目：https://github.com/runner525/x5webview-cordova-plugin.git

此项目参照的互联网上若干项目

## 技术支持

与本项目有关的问题，如加载后无法正常启动，在本项目Issue区内提交新Issue即可。

X5相关问题，请参阅：[X5技术指南](http://x5.tencent.com/tbs/guide.html)

### 常见问题

#### 为什么X5内核没有被成功加载

请使用官方TBS Studio测试，如其安装的TBS Demo左上角仍显示``Sys core``，证明X5内核可能无法被第三方App调用。请参阅X5技术指南或反馈到X5官方。


#### 用户的手机上必须要安装微信、qq、qq浏览器等app才能真正使用到X5内核吗？

当手机上有宿主（QQ、微信或QQ空间）时，其他AP只要接入了x5的SDK就会去共享宿主的内核，当没有宿主或是宿主都没有可用的内核时会自己去下载内核

### 常用链接如下：

官网(https://x5.tencent.com/tbs/)

常见问题(https://x5.tencent.com/tbs/faq.html)

广告变现(https://x5.tencent.com/tbs/ad.html)
