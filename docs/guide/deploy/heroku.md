---
lang: zh-cn
title: 项目部署 | Heroku部署
description: 使用Heroku一键部署balzeb2图床项目
---


# Heroku 部署 

## 项目文件结构

```js
└─static  // 存放静态文件
    ├─css
    ├─fonts
    ├─img
    │  └─icons
    └─js
└─index.py  // 项目启动文件
└─Procfile  // Heroku启动文件
└─requirements.txt //项目依赖库
└─scf_bootstrap  // 腾讯云部署启动文件
└─docker-compose.yml  // Docker启动文件
└─Dockerfile  // docker相关配置
└─gun.conf  // 保障程序运行
```

##  方式一

1. 如果 您还没有 `Heroku` 帐户，可前往 [Heroku](https://dashboard.heroku.com/login) 注册一个免费帐户。
2. 注册邮箱建议使用`谷歌邮箱`（qq,163无法注册）
3. 创建新的 `Heroku App`
4. 拉取代码部署（或者直接[fork](https://github.com/Rr210/blazeB2)本仓库）

```js
git clone -b build https://github.com/Rr210/blazeB2.git
```
- fork无需拉取上传
- 将代码创建并保存到自己的`github`仓库

5. 开始部署

- 选择`github`方式部署，绑定自己的仓库

![](https://cloud.mr90.top/hexo/4/abf21307-628b-4b03-80d1-202a3a83a605.png)

- 选择下面手动部署 选择分支build 如果是fork项目，根据情况选择

![](https://cloud.mr90.top/hexo/4/56144394-87f5-43ca-b149-855b7251f273.png)

## 方式二

- [使用Herku cli](https://www.jianshu.com/p/b3478aaa82d3)

![](https://cloud.mr90.top/hexo/4/182df770-6256-4589-8b54-50593c7bd7e0.png)

