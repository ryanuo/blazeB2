<template><div><h2 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍" aria-hidden="true">#</a> 项目介绍</h2>
<ol>
<li><strong>backblaze</strong>：又叫b2，是一家云存储平台，可以把自己的文件上传至云端，同时提供一个可以在外界访问的url地址。</li>
<li><strong>cloudflare</strong>：CDN，缓存网页，我们的目的是缓存backblaze的图片,并且做CDN加速，使用户看图的流量不走 backblaze，走 cloudflare。backblaze 在 cloudflare 的带宽联盟中，二者之间的流量免费，在这里使用backblaze，使用户流量全部走带宽联盟。</li>
</ol>
<h2 id="功能支持" tabindex="-1"><a class="header-anchor" href="#功能支持" aria-hidden="true">#</a> 功能支持</h2>
<p><a href="https://github.com/Rr210" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/author-Rr210-violet.svg" alt="Author"><ExternalLinkIcon/></a>  <a href="https://github.com/Rr210/blazeB2/releases" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/release/Rr210/blazeB2.svg" alt="Release"><ExternalLinkIcon/></a>  <a href="https://github.com/Rr210/blazeB2/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/license/Rr210/blazeB2.svg" alt="License"><ExternalLinkIcon/></a>  <a href="https://github.com/Rr210/blazeB2" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/Rr210/blazeB2" alt="Stars"><ExternalLinkIcon/></a>   <a href="https://github.com/Rr210/blazeB2/issues" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/issues/Rr210/blazeB2" alt="Issues"><ExternalLinkIcon/></a></p>
<ul>
<li>支持 <strong>拖拽</strong>、<strong>复制粘贴</strong>、<strong>选择文件</strong> 等方式进行选择图片</li>
<li>支持 图片名称<strong>唯一性</strong> 后端生成uuid字符串，暂不支持自定义名称</li>
<li>支持 自定义<strong>检索</strong>某个指定文件夹</li>
<li>支持 <strong>一键复制</strong> 图片外链和支持多种格式(<strong>MarkDown</strong>，<strong>html</strong>,<strong>自定义</strong>)</li>
<li>支持 <strong>一键部署</strong>（vercel,腾讯云serverless，Heroku）查看部署方法</li>
<li>支持 <strong>图床管理</strong>（对仓库图片的 <strong>增删查</strong> 预览）</li>
<li>支持 <strong>暗夜模式</strong> (自由切换 / 自动切换)</li>
<li>支持 <strong>图片压缩</strong> 可自定义压缩等级 默认关闭，开启默认(0.8)</li>
<li>支持 <strong>PWA</strong>  待完成</li>
<li>支持 <strong>批量上传图片</strong>、<strong>批量删除图片</strong> 和 <strong>批量复制图片外链</strong> 待完成</li>
<li>支持 <strong>图片水印</strong> 待完成</li>
</ul>
<Comments /></div></template>
