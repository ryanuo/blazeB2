---
lang: zh-CN
title: 快速上手
description: 页面介绍及其使用的方法
navbar: true
---

# 快速上手

- 注册 BackBlaze [传送门](https://www.backblaze.com/b2/sign-up.html?referrer=nopref)

## 新建存储桶

1. 打开 **Backblaze B2** 云存储官网 ，进行注册登录，在右下角切换语言为 **简体中文**。
2. **My Account** ==> **桶** ==> **创作一个桶** ==> **设置存储桶名称（唯一）**  ==> **设为（公开public）**

![](https://cloud.mr90.top/hexo/4/e615dd65-19af-42a6-826f-cf62f53f751c.png)

- 创建完成后如图所示

![](https://cloud.mr90.top/hexo/4/2ccb3d00-0ccf-48a1-bceb-c92d4861ad06.png)

## 桶设定

- 设置缓冲，桶信息设置为{"cache-control":"max-age=43200"}，默认不会进行缓冲。
```js
{"cache-control":"max-age=43200"}
```

![](https://cloud.mr90.top/hexo/4/30cfef4b-3111-48b4-ac88-762e600aa618.png)

- CORS规则跨域配置可根据需要进行配置

## 查看B2桶域名

- 配置完成，点击 “Upload/Download(上传/下载)”，上传一个临时的测试文件到存储桶中，然后在你刚上传的文件处，点击 “i(information，信息)”. 这是为了获取下一步需要的信息，你的存储桶处于哪台服务器上。

![](https://cloud.mr90.top/hexo/4/a30a1d56-54fa-4d29-bddb-a4c860755e14.png)
![](https://cloud.mr90.top/hexo/4/45890fbe-3237-48d5-97c1-7cff4ce9e30c.png)

## Cloudflare配置

- 准备：域名 可使用cf域名【[cf免费域名](https://blog.csdn.net/pqowlaksmznx/article/details/124911996)】
- 登录【[cloudflare](https://dash.cloudflare.com/)】，给你的域名添加一个子域名，并新增一条cname记录，指向文件地址中的域名。

![](https://cloud.mr90.top/hexo/4/1501d938-a4e2-47c2-a2ee-b49169e3e487.png)

### 重定向&&缓冲处理

- 使用cloudflare 重定向 规则设定 缓冲处理 （按照图片配置操作）

![](https://cloud.mr90.top/hexo/4/e729288c-06a6-4992-a850-ce41f54c5ca9.png)


### 重写URL

- 将 **/file/bucket/** 名称隐藏 隐藏桶名称

```
concat("/file/bucket", http.request.uri.path)
```

![](https://cloud.mr90.top/hexo/4/d2b1c6d4-a863-42a8-a3cf-c41034217dd6.png)

- 优化前我们的访问路径为：https://b2.domain.com/file/bucket/xxx.txt
- 优化后的路径为：https://b2.domain.com/xxx.txt
- 可以看出去除了file/bucket/
### 重写请求头

- 去除不必要的响应Header
- Backblaze B2会在请求的响应头中添加以下几个header参数：

```js
x-bz-content-sha1
x-bz-file-id
x-bz-file-name
x-bz-upload-timestamp
```

- 虽然影响不大，但是一看这些参数就知道你用的B2，并且这些参数头一般拿来也没啥用，我们也可以通过CloudFlare的重写规则将其去掉。
- 依然在转换规则那里 - 创建转换规则 - 修改响应头。

![](https://cloud.mr90.top/hexo/4/e0b95f22-0aae-40d0-a6c9-30071bfa8035.png)
![](https://cloud.mr90.top/hexo/4/084fb813-cd49-47d8-9260-8af6c709e73b.png)


<Comments></Comments>