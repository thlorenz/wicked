<!-- GENERATED WITH WICKED. Don't edit this file directly, instead run wicked again to regenerate API docs -->
<div class="jsdoc-githubify">
<h1 class="page-title">Namespace: Internal</h1>
<section>
<header>
<h2>
Internal
</h2>
</header>
<article>
<div class="container-overview">
<div class="description"><p>Internal wicked functions</p></div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/index.js#L79">lineno 79</a>
</li>
</ul></dd>
</dl>
</div>
<h3 class="subsection-title">Methods</h3>
<dl>
<dt>
<h4 class="name" id="cloneWiki"><span class="type-signature">&lt;static> </span>cloneWiki<span class="signature">(cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Clones the wiki project of the project in the current directory</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back info about root dir, wiki dir and wiki repo url</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/clone-wiki.js">lib/clone-wiki.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/clone-wiki.js#L42">lineno 42</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="commitWiki"><span class="type-signature">&lt;static> </span>commitWiki<span class="signature">(repo, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Commits all changes that were applied to the wiki due to re-generating the API docs.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>repo</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>information about the wiki repo to be committed</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>url</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>github url to the repo</p></td>
</tr>
<tr>
<td class="name"><code>dir</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>directory into which the repo is currenly checked out</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back when wiki is committed</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/commit-wiki.js">lib/commit-wiki.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/commit-wiki.js#L7">lineno 7</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="removeFiles"><span class="type-signature">&lt;static> </span>removeFiles<span class="signature">(root, fileFilter, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Removes the files matching the file filter in root and all subdirectories</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>root</code></td>
<td class="type">
<span class="param-type">Stirng</span>
</td>
<td class="description last"><p>directory</p></td>
</tr>
<tr>
<td class="name"><code>fileFilter</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">function</span>
</td>
<td class="description last"><p>needs to return true to cause the file to be deleted</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back when all files were removed</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/remove-files.js">lib/remove-files.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/remove-files.js#L12">lineno 12</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="run"><span class="type-signature">&lt;static> </span>run<span class="signature">(bin, args, <span class="optional">cwd</span>, cb)</span><span class="type-signature"> &rarr; {Object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Spawns the given bin with the given args from the cwd or current working directory.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>bin</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>full path to the binary to run</p></td>
</tr>
<tr>
<td class="name"><code>args</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>the args to pass to the binary</p></td>
</tr>
<tr>
<td class="name"><code>cwd</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>full path to the directory to run bin from, defaults to current directory</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>called back with err and/or program exit code</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/run.js">lib/run.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/run.js#L7">lineno 7</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the spawned binary which exposes stdout and stderr streams</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Object</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="runJsdoc"><span class="type-signature">&lt;static> </span>runJsdoc<span class="signature">(projectroot, wikiroot, jsdocargs, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Runs the jsdoc binary from the projectroot.</p>
<h3>Note about jsdocargs</h3>
<ul>
<li>they shouldn't contain <code>--destination</code> option since destination is always inside wiki dir</li>
<li>if no <code>--configure</code> option is given, the default <code>./config/jsdocrc.json</code> config is passed to jsdoc</li>
</ul>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>projectroot</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>root of project whose jsdoc comments are converted to html</p></td>
</tr>
<tr>
<td class="name"><code>wikiroot</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>in which the out folder with html files is created</p></td>
</tr>
<tr>
<td class="name"><code>jsdocargs</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>extra args for jsdoc supplied via <code>-- --arg one --arg two ...</code></p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back with jsdoc output dir</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/run-jsdoc.js">lib/run-jsdoc.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/run-jsdoc.js#L19">lineno 19</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sidebar"><span class="type-signature">&lt;static> </span>sidebar<span class="signature">(wikidir, apifiles, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Updates _Sidebar.md to link to API wiki pages</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>wikidir</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>in which _Sidebar.md is stored</p></td>
</tr>
<tr>
<td class="name"><code>apifiles</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>API wiki pages</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back when _Sidebar.md was updated</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/sidebar.js">lib/sidebar.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/sidebar.js#L12">lineno 12</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sidebarAddApi"><span class="type-signature">&lt;static> </span>sidebarAddApi<span class="signature">(sidebar, linkedfiles)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Updates the sidebar's links to API wiki pages</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>sidebar</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>current sidebar content</p></td>
</tr>
<tr>
<td class="name"><code>linkedfiles</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>API wiki pages</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/sidebar-update-api.js">lib/sidebar-update-api.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/sidebar-update-api.js#L16">lineno 16</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>sidebar with updated API links</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="wikify"><span class="type-signature">&lt;static> </span>wikify<span class="signature">(wikidir, jsdocsdir, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Generates wiki compatible <code>*.API.md</code> files from <code>*.html</code> jsdoc files</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>wikidir</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>where the generated <code>*.API.md</code> files will be stored</p></td>
</tr>
<tr>
<td class="name"><code>jsdocsdir</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>where the <code>*.html</code> files where output by jsdoc</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back with the names of generated .API.md files</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/wikify.js">lib/wikify.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/lib/wikify.js#L105">lineno 105</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>
<br>
<h6><em>Generated with <a href="https://github.com/thlorenz/wicked">wicked</a>.</em></h6>
