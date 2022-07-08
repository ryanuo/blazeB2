#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @File  : index.py
# @Author: Harry
# @Date  : 24/6/2022
# @Desc  :
import hashlib, uuid, base64, json, requests
from flask import Flask, render_template, request

app = Flask(__name__, template_folder='static', static_url_path='', static_folder='static')


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/upload', methods=['POST', 'GET'])
def upload():
    if request.method == 'POST':
        file_ = request.files['file_']
        upload_url = request.form['uploadUrl']
        upload_authorization_token = request.form['authorizationToken']
        tofile = request.form['tofile']
        file_format = file_.content_type.split('/')[1]
        try:
            t = B2().uploadSource(upload_url,
                                  upload_authorization_token,
                                  file_.stream.read(), tofile,
                                  file_format)
            return t
        except:
            return json.dumps({"msg": "上传失败", "status_code": -1})


# 授权信息接口
@app.route('/auth', methods=['POST'])
def auth():
    if request.method == 'POST':
        application_key_id = request.json.get('application_key_id')
        application_key = request.json.get('application_key')
        res = B2().getuploadurl(application_key_id, application_key)
        return res


# 获取图床列表
@app.route('/list', methods=["GET"])
def list():
    if request.method == 'GET':
        api_url = request.args.get('api_url')
        bucketId = request.args.get('bucketId')
        init_token = request.args.get('init_token')
        startFileName = request.args.get('startFileName')
        maxFileCount = request.args.get('maxFileCount')
        prefix = request.args.get('prefix')
        delimiter = request.args.get('delimiter')
        return B2().cList(api_url, bucketId, init_token, startFileName, int(maxFileCount), prefix, delimiter)


# 删除单个图片
@app.route('/img', methods=['DELETE'])
def imglist():
    if request.method == 'DELETE':
        api_url = request.args.get('api_url')  # Provided by b2_authorize_account
        init_token = request.args.get('init_token')  # Provided by b2_authorize_account
        file_name = request.args.get('file_name')  # The name of the file you want to delete
        file_id = request.args.get('file_id')  # The fileId of the file you want to delete
        res = requests.post('%s/b2api/v2/b2_delete_file_version' % api_url,
                            json.dumps({'fileName': file_name, 'fileId': file_id}),
                            headers={'Authorization': init_token})
        return res.json()


# 登录后请求接口

class B2:
    def __init__(self):
        self.application_key_id = 'application_key_id'
        self.application_key = 'application_key'
        self.bucket_name = 'bucket_name'

    # 授权登录
    def main(self):
        id_and_key = f'{self.application_key_id}:{self.application_key}'
        a = base64.b64encode(id_and_key.encode('utf8'))
        basic_auth_string = 'Basic ' + str(a, 'utf-8')
        headers = {'Authorization': basic_auth_string}
        url_ = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'
        r = requests.get(url_, headers=headers)
        print(r.json())
        return r.json()

    # 开始获取授权地址
    def getuploadurl(self, application_key_id, application_key):
        self.application_key_id = application_key_id
        self.application_key = application_key
        t_ = self.main()
        api_url = t_['apiUrl']  # Provided by b2_authorize_account
        account_authorization_token = t_['authorizationToken']  # Provided by b2_authorize_account
        bucket_id = t_['allowed']['bucketId']  # The ID of the bucket you want to upload your file to
        res = requests.post('%s/b2api/v2/b2_get_upload_url' % api_url, json.dumps({'bucketId': bucket_id}),
                            headers={'Authorization': account_authorization_token})
        t = res.json()
        t['api_url'] = api_url
        t['init_token'] = account_authorization_token
        t['downloadUrl'] = t_['downloadUrl']
        t['s3ApiUrl'] = t_['s3ApiUrl']
        return t

    def uploadSource(self, upload_url, upload_authorization_token, filedata, to_file, format_):
        b2_file_name = to_file + str(uuid.uuid4()) + '.' + format_
        content_type = "b2/x-auto"
        sha1_of_file_data = hashlib.sha1(filedata).hexdigest()

        headers = {
            'Authorization': upload_authorization_token,
            'X-Bz-File-Name': b2_file_name,
            'Content-Type': content_type,
            'X-Bz-Content-Sha1': sha1_of_file_data,
            'X-Bz-Info-Author': 'unknown',
            'X-Bz-Server-Side-Encryption': 'AES256'
        }
        res = requests.post(upload_url, data=filedata, headers=headers)
        return res.json()

    # 查询列表
    def cList(self, api_url, bucket_id, account_authorization_token, startFileName='', maxFileCount=10, prefix='',
              delimiter=''):
        '''
        :param api_url: 初始api
        :param bucket_id: 桶id
        :param account_authorization_token: 初始token
        :param startFileName: 获得已某个文件开头的
        :param maxFileCount: 获取的数量
        :param prefix: 指定前缀文件夹
        :param delimiter: 文件分隔符
        :return:
        '''
        params = {'bucketId': bucket_id, 'startFileName': startFileName, 'maxFileCount': maxFileCount, 'prefix': prefix}
        if delimiter:
            params['delimiter'] = delimiter
        res = requests.post('%s/b2api/v2/b2_list_file_names' % api_url,
                            data=json.dumps(params),
                            headers={'Authorization': account_authorization_token})
        print(res.json())
        return json.dumps(res.json(), ensure_ascii=False)

if __name__ == '__main__':
   app.run(host='0.0.0.0',port=9000)
