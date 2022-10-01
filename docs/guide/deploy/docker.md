---
lang: zh-cn
title: 项目部署 | docker+nginx部署
description: 使用docker+nginx一键部署balzeb2图床项目
---

# 基于docker + nginx 部署


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

## Step. 1: 环境安装

- docker 安装 【[传送](https://blog.csdn.net/weixin_40118894/article/details/117221102)】

## Step. 2: 拉取代码

- 拉取代码到服务端

```js
// github
git clone -b build https://github.com/Rr210/blazeB2.git
// gitee
git clone -b build https://gitee.com/rbozo/blazeB2.git
```

## Step. 3: 修改默认配置信息

- 打开 `docker-compose.yml` 文件修改映射端口号

```js
version: "3"
services:
  flask_test:
    image: flask-test:1.0 # 生成的镜像的名称 和 tag
    build: . # 一键构建镜像  =================  以上为构建命令，以下为运行命令
    restart: always # 总是重启
    container_name: flask_v1 # 运行后的容器的名称
    ports:
      - "7008:9000" # 端口映射， 这里是将 docker 容器内的 9000 端口映射到云服务器的 7008 端口  7008为外网端口号
```

## Step. 4: 运行项目

- 在当前目录下执行

```
docker-compose up -d --build
```

- 检查项目是否启动

```python
#检查是否启动
docker-compose ps 
# 查看端口是否启动占用
netstat -nltp
# 查看日志是否报错
docker logs flask_v1
```

## Step. 5: 配置nginx

- 可以开启gzip加速

```js
server {
    listen  80; # 监听80端口
    root       /www/wwwroot/b2.mr90.top; 
    server_name b2.mr90.top; # 配置域名
    # 处理静态资源:
    location ~ ^\/static\/.*$ {
        root /www/wwwroot/b2.mr90.top/static/;
    }
    fastcgi_param   HTTPS    on;
	fastcgi_param   HTTP_SCHEME   https;
	gzip_static on;
    gzip_proxied expired no-cache no-store private auth;
    gzip on;
    gzip_min_length 1k;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    # 动态请求转发到7008端口(gunicorn):
    location / {
        proxy_pass       http://127.0.0.1:7008;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
