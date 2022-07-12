<template><div><h1 id="get-started-quickly" tabindex="-1"><a class="header-anchor" href="#get-started-quickly" aria-hidden="true">#</a> Get started quickly</h1>
<ul>
<li>Register backblaze <a href="https://www.backblaze.com/b2/sign-up.html?referrer=nopref" target="_blank" rel="noopener noreferrer">portal<ExternalLinkIcon/></a></li>
</ul>
<h2 id="new-bucket" tabindex="-1"><a class="header-anchor" href="#new-bucket" aria-hidden="true">#</a> New bucket</h2>
<ol>
<li>Open <strong>backblaze B2</strong> cloud storage official website, register and log in, and switch the language to <strong>simplified Chinese</strong> in the lower right corner.</li>
<li><strong>my account</strong> ==&gt;<strong>bucket</strong>==&gt;<strong>create a bucket</strong> ==&gt;<strong>set the bucket name (unique)</strong> ==&gt;<strong>set to (public)</strong></li>
</ol>
<p><img src="https://cloud.mr90.top/hexo/4/e615dd65-19af-42a6-826f-cf62f53f751c.png" alt=""></p>
<ul>
<li>After creation, it is shown in the figure</li>
</ul>
<p><img src="https://cloud.mr90.top/hexo/4/2ccb3d00-0ccf-48a1-bceb-c92d4861ad06.png" alt=""></p>
<h2 id="bucket-setting" tabindex="-1"><a class="header-anchor" href="#bucket-setting" aria-hidden="true">#</a> Bucket setting</h2>
<ul>
<li>Set the buffer, and the bucket information is set to {&quot;cache control&quot;: &quot;Max age=43200&quot;}, and the buffer will not be performed by default.</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token string-property property">"cache-control"</span><span class="token operator">:</span><span class="token string">"max-age=43200"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cloud.mr90.top/hexo/4/30cfef4b-3111-48b4-ac88-762e600aa618.png" alt=""></p>
<ul>
<li>Cross domain configuration of CORS rules can be configured as required</li>
</ul>
<h2 id="view-b2-bucket-domain-name" tabindex="-1"><a class="header-anchor" href="#view-b2-bucket-domain-name" aria-hidden="true">#</a> View B2 bucket domain name</h2>
<p>-After the configuration is completed, click &quot;upload/download&quot; to upload a temporary test file to the bucket, and then click &quot;I (information)&quot; at the file you just uploaded This is to get the information you need in the next step, which server your bucket is on.
<img src="https://cloud.mr90.top/hexo/4/a30a1d56-54fa-4d29-bddb-a4c860755e14.png" alt="">
<img src="https://cloud.mr90.top/hexo/4/45890fbe-3237-48d5-97c1-7cff4ce9e30c.png" alt=""></p>
<h2 id="cloudflare-configuration" tabindex="-1"><a class="header-anchor" href="#cloudflare-configuration" aria-hidden="true">#</a> Cloudflare configuration</h2>
<ul>
<li>Preparation: the domain name can use CF domain name [<a href="https://blog.csdn.net/pqowlaksmznx/article/details/124911996" target="_blank" rel="noopener noreferrer">CF free domain name<ExternalLinkIcon/></a>】</li>
<li>Login [<a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">cloudflare<ExternalLinkIcon/></a>】, add a subdomain name to your domain name, and add a CNAME record, pointing to the domain name in the file address.
<img src="https://cloud.mr90.top/hexo/4/1501d938-a4e2-47c2-a2ee-b49169e3e487.png" alt=""></li>
</ul>
<h3 id="redirection-buffering" tabindex="-1"><a class="header-anchor" href="#redirection-buffering" aria-hidden="true">#</a> Redirection &amp; &amp; buffering</h3>
<p>-Use cloudflare redirection rules to set buffer processing (operate according to image configuration)
<img src="https://cloud.mr90.top/hexo/4/e729288c-06a6-4992-a850-ce41f54c5ca9.png" alt=""></p>
<h3 id="rewrite-url" tabindex="-1"><a class="header-anchor" href="#rewrite-url" aria-hidden="true">#</a> Rewrite URL</h3>
<ul>
<li>Hide * * /file/bucket/* * name hide bucket name</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>concat("/file/bucket", http.request.uri.path)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cloud.mr90.top/hexo/4/d2b1c6d4-a863-42a8-a3cf-c41034217dd6.png" alt=""></p>
<ul>
<li>Before optimization, our access path is: https://b2.domain.com/file/bucket/xxx.txt</li>
<li>The optimized path is: https://b2.domain.com/xxx.txt</li>
<li>It can be seen that file/bucket is removed/</li>
</ul>
<h3 id="rewrite-request-header" tabindex="-1"><a class="header-anchor" href="#rewrite-request-header" aria-hidden="true">#</a> Rewrite request header</h3>
<ul>
<li>Remove unnecessary response headers</li>
<li>Backblaze B2 will add the following header parameters to the response header of the request</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>x<span class="token operator">-</span>bz<span class="token operator">-</span>content<span class="token operator">-</span>sha1
x<span class="token operator">-</span>bz<span class="token operator">-</span>file<span class="token operator">-</span>id
x<span class="token operator">-</span>bz<span class="token operator">-</span>file<span class="token operator">-</span>name
x<span class="token operator">-</span>bz<span class="token operator">-</span>upload<span class="token operator">-</span>timestamp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Although the effect is not significant, you can know the B2 you use by looking at these parameters, and these parameter headers are generally useless. We can also remove them through cloudflare's rewrite rules.</li>
<li>Still in the transformation rule - create the transformation rule - modify the response header.
<img src="https://cloud.mr90.top/hexo/4/e0b95f22-0aae-40d0-a6c9-30071bfa8035.png" alt="">
<img src="https://cloud.mr90.top/hexo/4/084fb813-cd49-47d8-9260-8af6c709e73b.png" alt=""></li>
</ul>
</div></template>
