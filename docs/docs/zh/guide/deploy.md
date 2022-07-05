---
lang: zh-CN
title: 一键部署
description: 将blazeB2图床一键部署
---

## 腾讯云部署

[![](/img/txy.svg)](https://console.cloud.tencent.com/scf/list-create?rid=1&ns=default&createType=empty)

1. 创建web函数

![](https://cloud.mr90.top/hexo/4/bfdb068c-a2c1-472c-990a-6f4420ee7cf7.png)

2. 将原有的文件删除，新建一个空的src文件

![](https://cloud.mr90.top/hexo/4/5a0fb26f-b137-4dda-a4f0-704cc23ad279.png)

3. 然后将[api](https://github.com/Rr210/blazeB2/tree/master/api)文件上传到src文件中

![](https://cloud.mr90.top/hexo/4/bf923231-d1cd-4312-ada0-fa786c775b76.png)

4. 点击终端安装依赖

```python
cd src/
pip3 install Flask requests -t .
```

![](https://cloud.mr90.top/hexo/4/d89e5329-bd8b-4100-956b-1cf1b38965ad.png)

5. 点击依赖完成部署，下滑找到部署地址访问

![](https://cloud.mr90.top/hexo/4/55fc7bf3-c8fe-45af-ace3-da9e7d582452.png)

## vercel一键秒部署

- 点击一键部署 [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?s=https://github.com/Rr210/blazeB2.git)

![](https://cloud.mr90.top/hexo/4/38c9dcba-97bc-413d-a6a7-c8681937fa59.png)


<Comments />