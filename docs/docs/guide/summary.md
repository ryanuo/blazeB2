---
lang: zh-CN
title: 概述
description: 图床功能的介绍
layout: doc
---

## 视频展示


<iframe height=400px width=100% src="//player.bilibili.com/player.html?bvid=BV1fv4y1T72e&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 项目介绍

1. **backblaze**：又叫b2，是一家云存储平台，可以把自己的文件上传至云端，同时提供一个可以在外界访问的url地址。
2. **cloudflare**：CDN，缓存网页，我们的目的是缓存backblaze的图片,并且做CDN加速，使用户看图的流量不走 backblaze，走 cloudflare。backblaze 在 cloudflare 的带宽联盟中，二者之间的流量免费，在这里使用backblaze，使用户流量全部走带宽联盟。

## 功能支持

[![Author](https://img.shields.io/badge/author-Rr210-violet.svg)](https://github.com/Rr210)  [![Release](https://img.shields.io/github/release/Rr210/blazeB2.svg)](https://github.com/Rr210/blazeB2/releases)  [![License](https://img.shields.io/github/license/Rr210/blazeB2.svg)](https://github.com/Rr210/blazeB2/blob/master/LICENSE)  [![Stars](https://img.shields.io/github/stars/Rr210/blazeB2)](https://github.com/Rr210/blazeB2)   [![Issues](https://img.shields.io/github/issues/Rr210/blazeB2)](https://github.com/Rr210/blazeB2/issues)


- 支持 **拖拽**、**复制粘贴**、**选择文件** 等方式进行选择图片
- 支持 **一键复制** 图片外链支持多种格式(**MarkDown**、**HTML**、**自定义**)
- 支持 **一键部署**（Vercel,ServerLess,Heroku,Docker）[查看部署方法](https://blazeb2.js.org/zh/guide/deploy.html)
- 支持 图片名称 **唯一性** 后端生成 **uuid** 字符串，暂不支持自定义名称
- 支持 **显示仓库下所有文件夹名称** 支持自定义默认搜索仓库名
- 支持 **图片压缩** 可自定义压缩等级 默认关闭，开启默认(**0.8**)
- 支持 快捷键(图床管理界面，**全选，删除，复制**) Shift点击批量选择
- 支持 **批量上传图片**、**批量删除图片** 和 **批量复制图片外链**
- 支持 **图床管理**（对仓库图片的 **增删改查** 放大预览）
- 支持 **自定义上传文件夹** 可自动生成文件夹
- 支持 自定义 **检索** 某个指定文件夹或图片
- 支持 **图片水印** 单张处理上传,**文字 / 图片**
- 支持 **暗夜模式** (自由切换 / 自动切换)
- 支持 **PWA**

## 预览功能

<table>
<tr>
<td>
<strong>上传图片</strong>
</td>
<td>
<img src="https://cloud.mr90.top/hexo/5/d15c17f1-b06f-4560-a363-dd9adce488b2.gif" />
</td>
</tr>
<tr>
<td>
<strong>水印上传</strong>
</td>
<td>
<img src="https://cloud.mr90.top/hexo/5/c8f15ba7-b934-4ef6-afb2-22dd472fb4d2.gif" />
</td>
</tr>
<tr>
<td>
<strong>图床管理</strong>
</td>
<td>
<img src="https://cloud.mr90.top/hexo/5/1d146393-3012-4b55-8083-01b8c0e562c8.gif" />
</td>
</tr>
</table>

