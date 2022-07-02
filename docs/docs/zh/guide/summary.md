---
lang: zh-CN
title: 概述
description: 图床功能的介绍
---

## 项目介绍

1. **backblaze**：又叫b2，是一家云存储平台，可以把自己的文件上传至云端，同时提供一个可以在外界访问的url地址。
2. **cloudflare**：CDN，缓存网页，我们的目的是缓存backblaze的图片,并且做CDN加速，使用户看图的流量不走 backblaze，走 cloudflare。backblaze 在 cloudflare 的带宽联盟中，二者之间的流量免费，在这里使用backblaze，使用户流量全部走带宽联盟。

## 功能支持

[![Author](https://img.shields.io/badge/author-Rr210-violet.svg)](https://github.com/Rr210)  [![Release](https://img.shields.io/github/release/Rr210/blazeB2.svg)](https://github.com/Rr210/blazeB2/releases)  [![License](https://img.shields.io/github/license/Rr210/blazeB2.svg)](https://github.com/Rr210/blazeB2/blob/master/LICENSE)  [![Stars](https://img.shields.io/github/stars/Rr210/blazeB2)](https://github.com/Rr210/blazeB2)   [![Issues](https://img.shields.io/github/issues/Rr210/blazeB2)](https://github.com/Rr210/blazeB2/issues)


- [x] 支持 **拖拽**、**复制粘贴**、**选择文件** 等方式进行选择图片
- [x] 支持 图片名称**唯一性**，可**设置命名前缀**
- [x] 支持 **一键复制** 图片外链和支持多种格式(**MarkDown**，**html**,**自定义**)
- [x] 支持 **一键部署**（vercel,腾讯云serverless）查看部署方法
- [ ] 支持 **图床管理**（对仓库图片的 **增删改查**）
- [ ] 支持 **暗夜模式** (自由切换 / 自动切换)
- [ ] 支持 **PWA**
- [ ] 支持 **图片压缩**
- [ ] 支持 **批量上传图片**、**批量删除图片** 和 **批量复制图片外链**
- [ ] 设置图片水印