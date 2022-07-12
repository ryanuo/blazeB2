---
lang: zh-CN
Title: get started quickly
Description: page introduction and its use method
navbar: true
---
# Get started quickly

- Register backblaze [portal](https://www.backblaze.com/b2/sign-up.html?referrer=nopref)

## New bucket

1. Open **backblaze B2** cloud storage official website, register and log in, and switch the language to **simplified Chinese** in the lower right corner.
2. **my account** ==>**bucket**==>**create a bucket** ==>**set the bucket name (unique)** ==>**set to (public)**

![]( https://cloud.mr90.top/hexo/4/e615dd65-19af-42a6-826f-cf62f53f751c.png)

- After creation, it is shown in the figure

![]( https://cloud.mr90.top/hexo/4/2ccb3d00-0ccf-48a1-bceb-c92d4861ad06.png)

## Bucket setting
- Set the buffer, and the bucket information is set to {"cache control": "Max age=43200"}, and the buffer will not be performed by default.
```js
{"cache-control":"max-age=43200"}
```
![]( https://cloud.mr90.top/hexo/4/30cfef4b-3111-48b4-ac88-762e600aa618.png)
- Cross domain configuration of CORS rules can be configured as required
## View B2 bucket domain name
-After the configuration is completed, click "upload/download" to upload a temporary test file to the bucket, and then click "I (information)" at the file you just uploaded This is to get the information you need in the next step, which server your bucket is on.
![]( https://cloud.mr90.top/hexo/4/a30a1d56-54fa-4d29-bddb-a4c860755e14.png)
![]( https://cloud.mr90.top/hexo/4/45890fbe-3237-48d5-97c1-7cff4ce9e30c.png)
## Cloudflare configuration
- Preparation: the domain name can use CF domain name [[CF free domain name](https://blog.csdn.net/pqowlaksmznx/article/details/124911996 )】
- Login [[cloudflare](https://dash.cloudflare.com/)】, add a subdomain name to your domain name, and add a CNAME record, pointing to the domain name in the file address.
![]( https://cloud.mr90.top/hexo/4/1501d938-a4e2-47c2-a2ee-b49169e3e487.png)
### Redirection &amp; &amp; buffering
-Use cloudflare redirection rules to set buffer processing (operate according to image configuration)
![]( https://cloud.mr90.top/hexo/4/e729288c-06a6-4992-a850-ce41f54c5ca9.png)
### Rewrite URL
- Hide * * /file/bucket/* * name hide bucket name
```
concat("/file/bucket", http.request.uri.path)
```
![]( https://cloud.mr90.top/hexo/4/d2b1c6d4-a863-42a8-a3cf-c41034217dd6.png)
- Before optimization, our access path is: https://b2.domain.com/file/bucket/xxx.txt
- The optimized path is: https://b2.domain.com/xxx.txt
- It can be seen that file/bucket is removed/
### Rewrite request header

- Remove unnecessary response headers
- Backblaze B2 will add the following header parameters to the response header of the request

```js
x-bz-content-sha1
x-bz-file-id
x-bz-file-name
x-bz-upload-timestamp
```

- Although the effect is not significant, you can know the B2 you use by looking at these parameters, and these parameter headers are generally useless. We can also remove them through cloudflare's rewrite rules.
- Still in the transformation rule - create the transformation rule - modify the response header.
![]( https://cloud.mr90.top/hexo/4/e0b95f22-0aae-40d0-a6c9-30071bfa8035.png)
![]( https://cloud.mr90.top/hexo/4/084fb813-cd49-47d8-9260-8af6c709e73b.png)