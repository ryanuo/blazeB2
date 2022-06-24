#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @File  : index.py
# @Author: Harry
# @Date  : 24/6/2022
# @Desc  :
import json
import uuid

from flask import Flask, render_template, request
import os
from python import B2

app = Flask(__name__, template_folder='static', static_url_path='', static_folder='static')


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/api', methods=['POST', 'GET'])
def upload():
    if request.method == 'POST':
        file_ = request.files['file_']
        application_key_id = request.form['application_key_id']
        application_key = request.form['application_key']
        bucket_name = request.form['bucket_name']
        host_url = request.form['host_url']
        tofile = request.form['tofile']
        received_dirPath = '/static/img/'
        file_dir_path = os.getcwd() + received_dirPath
        if not os.path.isdir(file_dir_path):
            os.makedirs(file_dir_path)
        file_format = file_.content_type.split('/')[1]
        str_name = str(uuid.uuid4()) + '.' + file_format
        saveFile = f'{file_dir_path}/{str_name}'
        file_.save(saveFile)
        try:
            t = B2(application_key_id, application_key, bucket_name, host_url).uploadLocalImg(saveFile, tofile,
                                                                                              file_format)
            os.remove(saveFile)
            return t
        except:
            return json.dumps({"msg": "上传失败", "status_code": -1})


if __name__ == "__main__":
    app.run('127.0.0.1', port=501)
