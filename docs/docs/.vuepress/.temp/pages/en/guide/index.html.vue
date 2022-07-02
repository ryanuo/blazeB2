<template><div><h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h1>
<ul>
<li>注册 BackBlaze <a href="https://www.backblaze.com/b2/sign-up.html?referrer=nopref" target="_blank" rel="noopener noreferrer">传送门<ExternalLinkIcon/></a></li>
</ul>
<h2 id="新建存储桶" tabindex="-1"><a class="header-anchor" href="#新建存储桶" aria-hidden="true">#</a> 新建存储桶</h2>
<ol>
<li>打开 <strong>Backblaze B2</strong> 云存储官网 ，进行注册登录，在右下角切换语言为 <strong>简体中文</strong>。</li>
<li><strong>My Account</strong> ==&gt; <strong>桶</strong> ==&gt; <strong>创作一个桶</strong> ==&gt; <strong>设置存储桶名称（唯一）</strong>  ==&gt; <strong>设为（公开public）</strong></li>
</ol>
<p><img src="https://cloud.mr90.top/file/imagecloud/hexo/4/e615dd65-19af-42a6-826f-cf62f53f751c.png" alt=""></p>
<ul>
<li>创建完成后如图所示</li>
</ul>
<p><img src="https://cloud.mr90.top/file/imagecloud/hexo/4/2ccb3d00-0ccf-48a1-bceb-c92d4861ad06.png" alt=""></p>
<h2 id="桶设定" tabindex="-1"><a class="header-anchor" href="#桶设定" aria-hidden="true">#</a> 桶设定</h2>
<ul>
<li>设置缓冲，桶信息设置为{&quot;cache-control&quot;:&quot;max-age=43200&quot;}，默认不会进行缓冲。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token string-property property">"cache-control"</span><span class="token operator">:</span><span class="token string">"max-age=43200"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cloud.mr90.top/file/imagecloud/hexo/4/30cfef4b-3111-48b4-ac88-762e600aa618.png" alt=""></p>
<ul>
<li>CORS规则跨域配置可根据需要进行配置</li>
</ul>
<h2 id="查看b2桶域名" tabindex="-1"><a class="header-anchor" href="#查看b2桶域名" aria-hidden="true">#</a> 查看B2桶域名</h2>
<ul>
<li>配置完成，点击 “Upload/Download(上传/下载)”，上传一个临时的测试文件到存储桶中，然后在你刚上传的文件处，点击 “i(information，信息)”. 这是为了获取下一步需要的信息，你的存储桶处于哪台服务器上。</li>
</ul>
<p><img src="https://cloud.mr90.top/file/imagecloud/hexo/4/a30a1d56-54fa-4d29-bddb-a4c860755e14.png" alt="">
<img src="https://cloud.mr90.top/file/imagecloud/hexo/4/45890fbe-3237-48d5-97c1-7cff4ce9e30c.png" alt=""></p>
<h2 id="cloudflare配置-非必要" tabindex="-1"><a class="header-anchor" href="#cloudflare配置-非必要" aria-hidden="true">#</a> Cloudflare配置（非必要）</h2>
<ul>
<li>准备：域名 可使用cf域名【<a href="https://blog.csdn.net/pqowlaksmznx/article/details/124911996" target="_blank" rel="noopener noreferrer">cf免费域名<ExternalLinkIcon/></a>】</li>
<li>登录【<a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">cloudflare<ExternalLinkIcon/></a>】，给你的域名添加一个子域名，并新增一条cname记录，指向文件地址中的域名。</li>
</ul>
<p><img src="https://cloud.mr90.top/file/imagecloud/hexo/4/1501d938-a4e2-47c2-a2ee-b49169e3e487.png" alt=""></p>
<h3 id="重定向-缓冲处理" tabindex="-1"><a class="header-anchor" href="#重定向-缓冲处理" aria-hidden="true">#</a> 重定向&amp;&amp;缓冲处理</h3>
<ul>
<li>使用cloudflare 重定向 规则设定 缓冲处理 （按照图片配置操作）</li>
</ul>
<p><img src="https://cloud.mr90.top/file/imagecloud/hexo/4/e729288c-06a6-4992-a850-ce41f54c5ca9.png" alt=""></p>
</div></template>
