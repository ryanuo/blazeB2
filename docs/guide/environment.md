---
lang: zh-cn
title: 配置环境
description: Cloudflare配置 将你的图床地址进行重写
---

# Cloudflare配置

- 域名：域名需要使用 Cloudflare 的 NS服务器 

## Step. 1: DNS配置

如：我将 `imgcdn.admirelight.com` 作为我的图床链接。那么我就要在DNS中添加一条CNAME记录，并指向[文件地址](/guide/prepare.html#step-4-查看桶域名)中的域名。

![](https://cloud.mr90.top/hexo/api/0c69f9ba-b516-4799-9dba-1353e6d9e5df.png)

## Step. 2: 重定向&&缓冲处理

- 在 **规则** --> **页面规则** 中，添加以下内容。

```
imgcdn.admirelight.com/file/你的桶名称/*

https://f004.backblazeb2.com/file/你的桶名称/$1)
```

![](https://cloud.mr90.top/hexo/api/68091800-449a-4daa-848b-e6c59d8d77b7.png)


## Step. 3: 重写URL

- 将 **/file/bucket/** 名称隐藏 隐藏桶名称

```
concat("/file/bucket", http.request.uri.path)
```

![](https://cloud.mr90.top/hexo/api/53b05dc8-180d-48d0-8460-e91dd2933de8.png)

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
![](https://cloud.mr90.top/hexo/api/759fa15d-d7b2-414b-bc30-f44af6c61ef9.png)