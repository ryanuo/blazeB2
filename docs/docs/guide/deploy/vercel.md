---
lang: zh-cn
title: 项目部署 | vercel部署
description: 使用vercel一键部署balzeb2图床项目
---

# vercel部署

注：若 **一键部署** 失效，请使用手动部署

## 项目文件结构

```js
api
    └─static  // 静态文件
    └─index.py  // 启动文件
requirements.txt   // 文件依赖
package.json    // 必须存在 项目依赖
vercel.json    // vercel 相关配置
```

## 一键部署

- 点击一键部署 [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?s=https://github.com/Rr210/blazeB2/tree/master/deploys/vercel-api)
![](https://cloud.mr90.top/hexo/4/38c9dcba-97bc-413d-a6a7-c8681937fa59.png)

## 手动部署

- 【[仓库地址](https://github.com/Rr210/blazeB2)】

1. 第一步：[fork](https://github.com/Rr210/blazeB2) `blazeb2` 仓库
2. 第二步：在 `https://vercel.com/dashboard` 中点击 `New Project`
3. 第三步：在左侧选择刚刚 `fork` 的 `blazeb2` 仓库，点击 `Import`
4. 第四步：点击 `FRAMEWORK PRESET` 选择 `Other`
5. 第五步：点击 `ROOT DIRECTORY` 右侧的 `Edit`，选择 `deploys/vercel-api`
6. 第六步：点击 `Deploy`

![](https://imgcdn.admirelight.com/img/f62063d6-855b-4d5f-b12d-4e743ea03e4d.png)

## 自定义域名

按如图所示操作

![](https://imgcdn.admirelight.com/img/4963379c-1aa5-4921-b47c-76f011565a02.png)

在DNS中添加一条CNAME记录

![](https://imgcdn.admirelight.com/img/da2725eb-1190-4fbc-b034-77c37ba25fdb.png)

域名即可访问

![](https://imgcdn.admirelight.com/img/e8e5ceef-191a-47ce-92ff-570a605317c6.png)
>参考文章：[使用Cloudflare加速vercel](https://hin.cool/posts/cfvercel.html)