---
lang: zh-cn
title: 配置环境
description: Cloudflare配置 将你的图床地址进行重写
---

# Cloudflare配置

- 域名：域名需要使用 Cloudflare 的 NS服务器 

## Step. 1: DNS配置

如：我将 `imgcdn.admirelight.com` 作为我的图床链接。那么我就要在DNS中添加一条CNAME记录，并指向[文件地址](/guide/prepare.html#step-4-查看桶域名)中的域名。

![](https://imgcdn.admirelight.com/img/da2725eb-1190-4fbc-b034-77c37ba25fdb.png)

## Step. 2: 重定向&&缓冲处理

- 在 **规则** --> **页面规则** 中，添加以下内容。

```
imgcdn.admirelight.com/file/你的桶名称/*

https://f004.backblazeb2.com/file/你的桶名称/$1)
```

![](https://imgcdn.admirelight.com/img/23d417d2-9b26-449e-9dc7-8dd8b47b06f1.png)


## Step. 3: 重写URL

- 将 **/file/bucket/** 名称隐藏 隐藏桶名称

```
concat("/file/bucket", http.request.uri.path)
```

![](https://imgcdn.admirelight.com/img/890b5149-05f8-46c6-baa4-b0e91b4a6e03.png)

- 优化前访问路径为：https://imgcdn.admirelight.com/file/桶名字/xxx.txt
- 优化后访问路径为：https://imgcdn.admirelight.comm/xxx.txt
- 去除了：file/bucket/

## Step. 3: 重写响应头

- 去除不必要的响应Header
- Backblaze B2会在请求的响应头中添加以下几个header参数：

```js
x-bz-content-sha1
x-bz-file-id
x-bz-file-name
x-bz-upload-timestamp
```

- 虽然影响不大，但是一看这些参数就知道你用的B2，并且这些参数头一般拿来也没啥用，可以通过CloudFlare的重写规则将其去掉。
- 转换规则 --> 创建转换规则 --> 修改响应头

![](https://cloud.mr90.top/hexo/4/e0b95f22-0aae-40d0-a6c9-30071bfa8035.png)
![](https://imgcdn.admirelight.com/img/8a0f1f51-962c-4128-840d-65c3e003c883.png)