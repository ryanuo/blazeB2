<template><div><h2 id="项目文件结构" tabindex="-1"><a class="header-anchor" href="#项目文件结构" aria-hidden="true">#</a> 项目文件结构</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>└─<span class="token keyword">static</span>  <span class="token comment">// 存放静态文件</span>
    ├─css
    ├─fonts
    ├─img
    │  └─icons
    └─js
└─index<span class="token punctuation">.</span>py  <span class="token comment">// 项目启动文件</span>
└─Procfile  <span class="token comment">// Heroku启动文件</span>
└─requirements<span class="token punctuation">.</span>txt <span class="token comment">//项目依赖库</span>
└─scf_bootstrap  <span class="token comment">// 腾讯云部署启动文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2>
<h3 id="heroku-部署" tabindex="-1"><a class="header-anchor" href="#heroku-部署" aria-hidden="true">#</a> Heroku 部署</h3>
<ul>
<li>方式一：</li>
</ul>
<ol>
<li>如果 您还没有 Heroku 帐户，可前往 <a href="https://dashboard.heroku.com/login" target="_blank" rel="noopener noreferrer">Heroku<ExternalLinkIcon/></a> 注册一个免费帐户。</li>
<li>注册邮箱建议使用谷歌邮箱（qq,163无法注册）</li>
<li>创建新的 Heroku App</li>
<li>拉取代码部署（或者直接<a href="https://github.com/Rr210/blazeB2" target="_blank" rel="noopener noreferrer">fork<ExternalLinkIcon/></a>本仓库）</li>
</ol>
<div class="language-git ext-git line-numbers-mode"><pre v-pre class="language-git"><code>git clone -b build https://github.com/Rr210/blazeB2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>fork无需拉取上传</li>
<li>将代码创建并保存到自己的github仓库</li>
</ul>
<ol start="5">
<li>开始部署</li>
</ol>
<ul>
<li>选择github方式部署，绑定自己的仓库</li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/abf21307-628b-4b03-80d1-202a3a83a605.png" alt=""></p>
<ul>
<li>选择下面手动部署 选择分支build 如果是fork项目，根据情况选择</li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/56144394-87f5-43ca-b149-855b7251f273.png" alt=""></p>
<ul>
<li>
<p>方式二:</p>
</li>
<li>
<p><a href="https://www.jianshu.com/p/b3478aaa82d3" target="_blank" rel="noopener noreferrer">使用Herku cli<ExternalLinkIcon/></a></p>
</li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/182df770-6256-4589-8b54-50593c7bd7e0.png" alt=""></p>
<h3 id="腾讯云部署" tabindex="-1"><a class="header-anchor" href="#腾讯云部署" aria-hidden="true">#</a> 腾讯云部署</h3>
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
<li>注意： 启动文件可能存在权限不足问题</li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/23b26647-97b8-4e64-aa05-2bee84666277.png" alt="">
<img src="https://cloud.mr90.top/hexo/4/d89e5329-bd8b-4100-956b-1cf1b38965ad.png" alt=""></p>
<ol start="5">
<li>点击依赖完成部署，下滑找到部署地址访问</li>
</ol>
<p><img src="https://cloud.mr90.top/hexo/4/55fc7bf3-c8fe-45af-ace3-da9e7d582452.png" alt=""></p>
<h3 id="vercel一键秒部署" tabindex="-1"><a class="header-anchor" href="#vercel一键秒部署" aria-hidden="true">#</a> vercel一键秒部署</h3>
<ul>
<li>点击一键部署 <a href="https://vercel.com/new/clone?s=https://github.com/Rr210/blazeB2.git" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&amp;logo=vercel&amp;logoColor=white" alt="Vercel"><ExternalLinkIcon/></a></li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/38c9dcba-97bc-413d-a6a7-c8681937fa59.png" alt=""></p>
<ul>
<li>可能会存在以下问题</li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/179e261a-b2e6-4116-97b1-7984086f6d28.png" alt=""></p>
<ul>
<li>
<p>受限制服务 vercel 同一个项目只能部署12次  建议fork本仓库后再去使用</p>
</li>
<li>
<p>【<a href="https://github.com/Rr210/blazeB2" target="_blank" rel="noopener noreferrer">仓库地址<ExternalLinkIcon/></a>】</p>
</li>
</ul>
<Comments /></div></template>
