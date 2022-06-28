#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @File  : app.py
# @Author: Harry
# @Date  : 24/6/2022
# @Desc  :
import datetime
import pyperclip, requests, webbrowser, json, threading
import time
import tkinter.font as tf
import tkinter.messagebox
from io import BytesIO
from tkinter import *
from tkinter.filedialog import askopenfilename
from tkinter.ttk import Progressbar
from PIL import ImageTk, Image
import os, uuid
from b2sdk.v2 import *

'''
图片Api
'''


class UploadB2:
    def __init__(self):
        self.application_key_id = 'keyid'
        self.application_key = 'key'
        self.bucket_name = 'bname'
        self.tofile = 'hexo/4'
        self.host_url = ''
        self.is_stop_thread_upd = False

    # 链接存储桶地址
    def main(self):
        c_ = self.read_config()
        info = InMemoryAccountInfo()
        b2_api = B2Api(info)
        b2_api.authorize_account("production", c_['application_key_id'], c_['application_key'])
        b2_api.list_buckets()
        return b2_api

    # 可视化界面编写
    def tkinterUI(self):
        window.title('Backblaze_B2图床 @Harry')
        # 设置窗口的长度和宽度
        window.geometry('720x500')
        # 禁止用户调整窗口大小
        window.resizable(False, False)
        center_window(720, 500)
        label = tkinter.Label(window, text='上传进度:', font=('黑体', 10))
        label.place(x=150, y=50)
        # 进度条
        self.progressbar = Progressbar(window)
        self.progressbar.place(x=220, y=50)
        # 设置进度条最大值为100
        self.progressbar['maximum'] = 100
        # 设置进度条长度
        self.progressbar['length'] = 280
        add_config = Button(window, text='填写配置文件', foreground='red', font=('Arial', 10), width=10, height=1,
                            command=lambda: thread_it(self.write_config))
        open_config = Button(window, text='打开配置文件', foreground='red', font=('Arial', 10), width=10, height=1,
                             command=lambda: thread_it(self.open_file))
        add_config.place(x=220, y=10)
        open_config.place(x=380, y=10)
        canv = Canvas(window, width=500, height=300, bg='white')
        canv.place(x=110, y=75)
        canv.create_image(0, 0, anchor='nw', image=image_file)
        ft = tf.Font(family='黑体', size=10, underline=1)
        today = datetime.datetime.today()
        rb_right_Label = Label(window, foreground='blue',
                               text=f'Copyright © 2020-{today.year} Harry. All rights reserved.',
                               font=ft)
        rb_right_Label.place(x=190, y=440)
        img_label = Label(window, image=img, width=100, height=100)
        img_label.place(x=20, y=380)
        # 绑定label单击时间
        rb_right_Label.bind("<Button-1>", self.open_url)
        canv.bind("<Button-1>", lambda event: thread_it(self.dqFile, event))
        return

    # 调用上传文件的接口
    def dqFile(self, event):
        a = askopenfilename(title='请选择图片文件上传',
                            initialdir='/', filetypes=[('Image source file', '*.jpg'), ('Image source file', '*.png'),
                                                       ('Image source file', '*.jpeg'), ('Image source file', '*.gif'),
                                                       ('Image source file', '*.webp')])
        if a:
            format_ = a.split('.')[-1]
            t = self.uploadLocalImg(a, format_)
            if t:
                self.copyurl(t)
            else:
                tkinter.messagebox.showerror(title='提示', message='上传失败，结果为空!!')
            return
        else:
            return

            # 调用复制事件

    def copyurl(self, msg):
        status = tkinter.messagebox.askokcancel('提示', '您的远程链接为：' + msg)
        if status:
            if len(msg) > 1:
                pyperclip.copy(msg)
                tkinter.messagebox.showinfo(title='提示', message='复制成功')
            else:
                tkinter.messagebox.showerror(title='提示', message='上传失败，结果为空!!')
        return

    # 上传图片
    def uploadLocalImg(self, file_, format_):
        # a = str(uuid.uuid4()) + '.' + img.format
        thread_it(self._update_)
        c_ = self.read_config()
        b2_file_name = c_['b2_file_path'] + str(uuid.uuid4()) + '.' + format_
        bucket = self.main().get_bucket_by_name(c_['bucket_name'])

        t = bucket.upload_local_file(
            local_file=file_,
            file_name=b2_file_name
        )
        print(t)
        print('图片地址\n' + c_['remote_host_url'] + b2_file_name)
        self.is_stop_thread_upd = True
        return c_['remote_host_url'] + b2_file_name

    def _update_(self):
        self.progressbar['value'] = 0
        while not self.is_stop_thread_upd:
            if self.progressbar['value'] == 100:
                self.progressbar['value'] = 0
            else:
                self.progressbar['value'] += 1
            time.sleep(0.01)
        self.progressbar['value'] = 0

    # 进度条
    def progressRun(self):
        # 标签
        return

    def read_config(self):
        file_config = os.getcwd() + '/config.json'
        if os.path.exists('config.json'):
            with open(file_config) as f:
                f_ = f.read()
                t_ = judgeVal(
                    ['application_key_id', 'application_key', 'bucket_name', 'remote_host_url', 'b2_file_path'],
                    json.loads(f_))
                print(t_)
                f.close()
                return json.loads(f_)
        else:
            with open(file_config, 'w+') as f:
                default_config = {
                    "application_key_id": "",
                    "application_key": "",
                    "bucket_name": "",
                    "remote_host_url": "",
                    "b2_file_path": ""
                }
                f.write(json.dumps(default_config, ensure_ascii=False))

    # 填写配置信息
    def write_config(self):
        status = tkinter.messagebox.askokcancel('确认操作', '待制作，目前只支持文件编辑')
        # if status:
        #     config_json = {
        #         "application_key_id": "",
        #         "application_key": "",
        #         "bucket_name": "",
        #         "remote_host_url": "",
        #         "b2_file_path": ""
        #     }
        #     with open(os.getcwd() + '/config.json', 'w+', encoding="utf-8") as f:
        #         f.write(json.dumps(config_json, ensure_ascii=False))
        #         f.close()
        #     tkinter.messagebox.showinfo(title='提示', message='更新appid和key值成功')
        return

    # 打开配置文件
    def open_file(self):
        os.startfile(os.getcwd())

    def open_url(self, event):
        webbrowser.open("https://u.mr90.top/", new=0)


# 缓解软件卡顿
def thread_it(func, *args):
    # 创建线程
    t = threading.Thread(target=func, args=args)
    # 守护线程
    t.setDaemon(True)
    # 启动
    t.start()


# 设置打开的位置
def center_window(width=720, height=500):
    # get screen width and height
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()

    # calculate position x and y coordinates
    x = (screen_width / 2) - (width / 2)
    y = (screen_height / 2) - (height / 2)
    window.geometry('%dx%d+%d+%d' % (width, height, x, y))


# 判断文件中是否存在值
def judgeVal(list, obj):
    msg = ''
    if obj:
        for i, n in enumerate(list):
            if obj[n] == '':
                a = '' if i == len(list) - 1 else ','
                msg += n + a
        if msg:
            return msg + '的值为空'
        else:
            return False


# 请求图片
def imgLR(file_path, w, h):
    '''
    :param file_path:
    :param w:
    :param h:
    :return:
    '''
    if file_path.startswith('http'):
        res_img = requests.get(file_path)
        im = Image.open(BytesIO(res_img.content))
        im = im.resize((w, h))
        return ImageTk.PhotoImage(im)
    else:
        im = Image.open(file_path)
        im = im.resize((w, h))
        return ImageTk.PhotoImage(im)


if __name__ == "__main__":
    window = Tk()
    path = "https://gitee.com/rbozo/picgo_image/raw/master/image/0/gzh.png"
    p2 = '2.png'
    img = imgLR(path, 100, 100)
    image_file = imgLR(p2, 500, 300)
    # 0,0 -> 锚定的点, anchor='nw' -> 左上角锚定
    UploadB2().tkinterUI()
    window.mainloop()
