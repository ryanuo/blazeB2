---
lang: zh-cn
title: 项目部署 | 腾讯云serverless部署
description: 使用serverless一键部署balzeb2图床项目
---

# 腾讯云部署

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

[![](/img/txy.svg)](https://console.cloud.tencent.com/scf/list-create?rid=1&ns=default&createType=empty)

## Step. 1: 创建web函数

![](https://cloud.mr90.top/hexo/4/bfdb068c-a2c1-472c-990a-6f4420ee7cf7.png)

## Step. 2: 将原有的文件删除，新建一个空的src文件

![](https://cloud.mr90.top/hexo/4/5a0fb26f-b137-4dda-a4f0-704cc23ad279.png)

## Step. 3: 然后将[api](https://github.com/Rr210/blazeB2/tree/master/deploys/vercel-api)文件上传到src文件中

![](https://cloud.mr90.top/hexo/4/bf923231-d1cd-4312-ada0-fa786c775b76.png)

## Step. 4: 点击终端安装依赖

- 必须执行 修改文件权限

```python
cd src/
pip3 install Flask requests -t .
chmod 755 scf_bootstrap
```
- 注意： 启动文件可能存在权限不足问题 

![](https://cloud.mr90.top/hexo/4/23b26647-97b8-4e64-aa05-2bee84666277.png)
![](https://cloud.mr90.top/hexo/4/d89e5329-bd8b-4100-956b-1cf1b38965ad.png)

## Step. 5: 点击依赖完成部署，下滑找到部署地址访问

![](https://cloud.mr90.top/hexo/4/55fc7bf3-c8fe-45af-ace3-da9e7d582452.png)

