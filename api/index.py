#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @File  : index.py
# @Author: Harry
# @Date  : 24/6/2022
# @Desc  :
import json
from flask import Flask, render_template, request
import os
import uuid
from b2sdk.v2 import *

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

class B2:
    def __init__(self, application_key_id, application_key, bucket_name, host_url):
        self.application_key_id = application_key_id
        self.application_key = application_key
        self.bucket_name = bucket_name
        self.host_url = host_url

    def main(self):
        info = InMemoryAccountInfo()
        b2_api = B2Api(info)
        b2_api.authorize_account("production", self.application_key_id, self.application_key)
        b2_api.list_buckets()
        return b2_api

    def uploadLocalImg(self, local_file_path, to_file, format_):
        b2_file_name = to_file + str(uuid.uuid4()) + '.' + format_
        bucket = self.main().get_bucket_by_name(self.bucket_name)
        t = bucket.upload_local_file(
            local_file=local_file_path,
            file_name=b2_file_name
        )
        print(t)
        print('图片地址\n' + self.host_url + b2_file_name)
        return {"msg": "上传成功", "status_code": 1, 'link': self.host_url + b2_file_name}
    def uploadSource(self,fileA, to_file,format_):
        b2_file_name = to_file + str(uuid.uuid4()) + '.' + format_
        bucket = self.main().get_bucket_by_name(self.bucket_name)
        print(fileA)
        t = bucket.upload_bytes(
            data_bytes=fileA,
            file_name=b2_file_name
        )
        print(t)
        return {"msg": "上传成功", "status_code": 1, 'link': self.host_url + b2_file_name}

# if __name__ == "__main__":
#     app.run('127.0.0.1', port=501)
