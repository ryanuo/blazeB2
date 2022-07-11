# 镜像环境，我们要 python 3.8.0
FROM python:3.8.0
# 这句话可有可无，标识你是编写这个 Dockerfile 的作者信息
MAINTAINER "Harry<iui9@qq.com>" 

ADD . /code
# 配置工作目录
WORKDIR /code

# 拷贝当前目录所有的文件，进入 docker 镜像中.

# 执行安装 Python 环境依赖
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt


# 使用 gunicorn 运行 Flask 项目，最后一个命令： app:app  前者对应的是flask 启动 文件，后面不要乱改
CMD gunicorn  -c gun.conf index:app