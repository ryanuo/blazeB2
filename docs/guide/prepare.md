---
lang: zh-cn
title: 使用前准备
description: 待补充
navbar: true
---

# 准备需要

- 一个域名
- 一个 BackBlaze 的桶

## Step. 1: 注册BackBlaze

[传送门](https://www.backblaze.com/b2/sign-up.html?referrer=nopref)

## Step. 2: 创作一个桶

1. 打开[此链接](https://secure.backblaze.com/b2_buckets.htm)

2. 按照此图流程操作


![](https://cloud.mr90.top/hexo/4/e615dd65-19af-42a6-826f-cf62f53f751c.png)

- 创建完成后如图所示

![](https://cloud.mr90.top/hexo/4/2ccb3d00-0ccf-48a1-bceb-c92d4861ad06.png)

## Step. 3: 桶设定

- 设置缓冲，点击桶设定，将桶信息设置为 {"cache-control":"max-age=43200"} 表示默认不会进行缓冲。

```js
{"cache-control":"max-age=43200"}
```

![](https://cloud.mr90.top/hexo/4/30cfef4b-3111-48b4-ac88-762e600aa618.png)

- CORS 规则跨域配置可根据需要进行配置

## Step. 4: 查看桶域名

- 配置完成，点击 **上传/下载(Upload/Download)**，将一个临时的测试文件上传到存储桶中，找到你上传的文件，点击右边的信息。这是为了获取下一步所需要的信息，即你的桶位于哪一台服务器上。

- 记住 **友好 URL** 的链接，我们接下来会用的到

![](https://cloud.mr90.top/hexo/4/a30a1d56-54fa-4d29-bddb-a4c860755e14.png)
![](https://cloud.mr90.top/hexo/5/6e6ceacd-194e-4c7b-978b-40c2acfa417d.png)

## Step. 5: 生成应用密钥

- [申请地址](https://secure.backblaze.com/app_keys.htm)

- 点击 **添加新的应用程序密钥**

密钥的名称：随便填

允许访问 bucket：你刚刚创建的桶

访问类型：读和写

允许列出所有储存桶名称：允许列出所有存储桶名称，包括存储桶创建日期（S3列表存储桶API必需）

![](https://cloud.mr90.top/hexo/4/c85aceb4-475c-450d-8f9b-b26ced99e563.png)

- 将 **keyID** 和 **applicationKey** 保存好，我们接下来用得到

![](https://cloud.mr90.top/hexo/api/4958eea4-be2e-429d-a614-4f74e1d3a3cf.png)