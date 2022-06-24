#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @File  : img.py
# @Author: Harry
# @Date  : 30/5/2022
# @Desc  :
import uuid
from b2sdk.v2 import *


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
