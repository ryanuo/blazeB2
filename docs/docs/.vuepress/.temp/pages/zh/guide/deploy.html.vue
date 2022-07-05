<template><div><!--
 * @Author: Harry
 * @Date: 2022-07-02 21:47:34
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-05 21:35:55
 * @FilePath: \docs\docs\zh\guide\deploy.md
-->
<hr>
<h2 id="lang-zh-cntitle-一键部署description-将blazeb2图床一键部署" tabindex="-1"><a class="header-anchor" href="#lang-zh-cntitle-一键部署description-将blazeb2图床一键部署" aria-hidden="true">#</a> lang: zh-CN
title: 一键部署
description: 将blazeB2图床一键部署</h2>
<h2 id="腾讯云部署" tabindex="-1"><a class="header-anchor" href="#腾讯云部署" aria-hidden="true">#</a> 腾讯云部署</h2>
<p><a href="https://console.cloud.tencent.com/scf/list-create?rid=1&amp;ns=default&amp;createType=empty" target="_blank" rel="noopener noreferrer"><img src="/img/txy.svg" alt=""><ExternalLinkIcon/></a></p>
<ol>
<li>创建web函数</li>
</ol>
<p><img src="https://cloud.mr90.top/hexo/4/bfdb068c-a2c1-472c-990a-6f4420ee7cf7.png" alt=""></p>
<ol start="2">
<li>将原有的文件删除，新建一个空的src文件</li>
</ol>
<p><img src="https://cloud.mr90.top/hexo/4/5a0fb26f-b137-4dda-a4f0-704cc23ad279.png" alt=""></p>
<ol start="3">
<li>然后将<a href="https://github.com/Rr210/blazeB2/tree/master/api" target="_blank" rel="noopener noreferrer">api<ExternalLinkIcon/></a>文件上传到src文件中</li>
</ol>
<p><img src="https://cloud.mr90.top/hexo/4/bf923231-d1cd-4312-ada0-fa786c775b76.png" alt=""></p>
<ol start="4">
<li>点击终端安装依赖</li>
</ol>
<ul>
<li>必须执行 修改文件权限</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>cd src<span class="token operator">/</span>
pip3 install Flask requests <span class="token operator">-</span>t <span class="token punctuation">.</span>
chmod <span class="token number">755</span> scf_bootstrap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>注意： 启动文件可能存在权限不足问题
<img src="https://cloud.mr90.top/hexo/4/23b26647-97b8-4e64-aa05-2bee84666277.png" alt="">
<img src="https://cloud.mr90.top/hexo/4/d89e5329-bd8b-4100-956b-1cf1b38965ad.png" alt=""></li>
</ul>
<ol>
<li>点击依赖完成部署，下滑找到部署地址访问</li>
</ol>
<p><img src="https://cloud.mr90.top/hexo/4/55fc7bf3-c8fe-45af-ace3-da9e7d582452.png" alt=""></p>
<h2 id="vercel一键秒部署" tabindex="-1"><a class="header-anchor" href="#vercel一键秒部署" aria-hidden="true">#</a> vercel一键秒部署</h2>
<ul>
<li>点击一键部署 <a href="https://vercel.com/new/clone?s=https://github.com/Rr210/blazeB2.git" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&amp;logo=vercel&amp;logoColor=white" alt="Vercel"><ExternalLinkIcon/></a></li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/38c9dcba-97bc-413d-a6a7-c8681937fa59.png" alt=""></p>
<Comments /></div></template>
