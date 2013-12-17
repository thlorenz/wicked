# wicked [![build status](https://secure.travis-ci.org/thlorenz/wicked.png)](http://travis-ci.org/thlorenz/wicked)

A tool that generates github wiki compatible API documentation from your project's jsdocs and adds them to your wiki.

![wicked.wiki](https://raw.github.com/thlorenz/wicked/master/assets/wicked.wiki.gif)

**That is wicked!**

## Installation

    npm install -g wicked

## Usage

### Steps 

1. Create wiki by checking `wiki` in your project **Features** settings
2. Initialize wiki by accessing the wiki (the book icon in the navbar) which links to `http://github.com/yourname/yourproject/wiki`
3. Install wicked `npm install -g wicked`
4. Go to the root of your github project on your machine
5. Run `wicked`

Steps **4 - 5** can be repeated everytime you want to re-generate API docs for your project.
 
**wicked does not overwrite other pages you created in your wiki** so keep running wicked all you need. 

More specifically **wicked only removes old `*.API.md` files** from your wiki and updates the links `_Sidebar.md` **without affecting any other links in the sidebar**.

See an example of API docs added by `wicked` in its own [wiki](https://github.com/thlorenz/wicked/wiki).
  
### Command Line Options

```
usage: wicked <wicked-options> -- <jsdoc-options>

  Generates wiki API docs for the gihub project in the current directory.

  Both options are optional, jsdoc-options get passed to [jsdoc](http://usejsdoc.org/about-commandline.html).

  Note: overriding the jsdoc destination (-d, --destination) is not possible since wicked will write files to a temp dir

OPTIONS:

  --noclean       don't remove the temp directory into which wiki is checked out when finished

  --nocommit      don't commit the updated wiki automatically nor remove the temp directory

  -l, --loglevel  level at which to log: silly|verbose|info|warn|error|silent -- default: info
  
  -h, --help      Print this help message.


EXAMPLES:
  
  Generate with default options:
    
    wicked

  Override [jsdocconf.json](http://usejsdoc.org/about-configuring-jsdoc.html):

    wicked -- --configure ./myconf.json

  Override loglevel and jsoc configuration and don't remove temp directory:

    wicked  --loglevel silly --noclean -- --configure ./myconf.json
```

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<div class="description"><p>Public wicked API</p></div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/index.js#L23">lineno 23</a>
</li>
</ul></dd>
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="wicked"><span class="type-signature">&lt;static> </span>wicked<span class="signature">(args, jsdocargs, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Generates jsdoc wiki pages for project of current working directory and updates github wiki with them.</p>
<h5>Note</h5>
<p>It is assumed that this is run from the root of the project whose wiki should be generated.
Additionally the currently checked out branch will be used when generating blob urls to link source examples.</p>
<p>However the github remote and branch can also be set via environment vars as explained in the
<a href="https://github.com/thlorenz/jsdoc-githubify#note">documentation of jsdoc-githubify</a> which is used
by wicked under the hood.</p>
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
<td class="name"><code>args</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>consumed by wicked</p>
<h6>Properties</h6>
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
<td class="name"><code>noclean</code></td>
<td class="type">
<span class="param-type">Boolean</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>(false) if true, the temp directory into which wiki is checked out will <strong>not be removed</strong> when done</p></td>
</tr>
<tr>
<td class="name"><code>nocommit(false)</code></td>
<td class="type">
<span class="param-type">Boolean</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>if true, the updated wiki will <strong>not be committed automatically</strong></p></td>
</tr>
<tr>
<td class="name"><code>loglevel</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>(info) level at which to log: silly|verbose|info|warn|error|silent</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="name"><code>jsdocargs</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>consumed by jsdoc</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back when wicked finished generating the wiki page</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/wicked/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/wicked/blob/master/index.js#L27">lineno 27</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT

