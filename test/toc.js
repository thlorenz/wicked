'use strict';

var test = require('tap').test
var rmrf = require('rimraf')
var ncp  = require('ncp')
var fs   = require('fs')

var toc = require('../lib/run-doctoc')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('\nsetup fixture copy', function (t) {
  rmrf.sync(__dirname + '/toc-copy');
  ncp(__dirname + '/toc', __dirname + '/toc-copy', function (err) {
    if (err) { t.fail(err); return t.end(); }
    t.end()
  })
})

test('\nwhen told to toc a dir with a .API.md file, another file and a dir', function (t) {
  var expectedToc = [
      '<!-- START doctoc generated TOC please keep comment here to allow auto update -->'
    , '<!-- DON\'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->'
    , '**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*'
    , ''
    , '- [Namespace: Internal](#namespace-internal)'
    , '  - ['
    , 'Internal'
    , '](#internal)'
    , '    - [Methods](#methods)'
    , '      - [<static> cloneWiki(cb)](#static-clonewikicb)'
    , '      - [<static> commitWiki(repo, cb)](#static-commitwikirepo-cb)'
    , '      - [<static> removeFiles(root, fileFilter, cb)](#static-removefilesroot-filefilter-cb)'
    , '      - [<static> run(bin, args, cwd, cb) → {Object}](#static-runbin-args-cwd-cb-→-object)'
    , '      - [<static> runJsdoc(projectroot, wikiroot, jsdocargs, cb)](#static-runjsdocprojectroot-wikiroot-jsdocargs-cb)'
    , '    - [Note about jsdocargs](#note-about-jsdocargs)'
    , '      - [<static> sidebar(wikidir, apifiles, cb)](#static-sidebarwikidir-apifiles-cb)'
    , '      - [<static> sidebarAddApi(sidebar, linkedfiles) → {String}](#static-sidebaraddapisidebar-linkedfiles-→-string)'
    , '      - [<static> wikify(wikidir, jsdocsdir, cb)](#static-wikifywikidir-jsdocsdir-cb)'
    , ''
    , '<!-- END doctoc generated TOC please keep comment here to allow auto update -->'
  ]

  var expectedOther = [
      '## Some other md'
    , ''
    , 'Toccing shouldn\'t touch this file.'
    , ''
  ]
  
  toc(__dirname + '/toc-copy', function (err) {
    if (err) { t.fail(err); return t.end(); }
    var apimd = fs.readFileSync(__dirname + '/toc-copy/Internal.API.md', 'utf8');
    var toclines = apimd.split('\n').slice(0, expectedToc.length);
    
    t.deepEqual(toclines, expectedToc, 'generates table of contents for Internal.API.md')

    var othermd = fs.readFileSync(__dirname + '/toc-copy/SomeOther.md', 'utf8');
    t.deepEqual(othermd.split('\n'), expectedOther, 'does not change other md')

    t.end()
  })
})


test('\ncleanup fixture copy', function (t) {
  rmrf.sync(__dirname + '/toc-copy');
  t.end() 
})
