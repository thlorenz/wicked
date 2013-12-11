'use strict';

var path = require('path')
  , fs = require('fs')
  , log = require('npmlog')

var common = require('./common');

var go = module.exports = function (wikidir, apifiles, cb) {
  // TODO: read original sidebar and replace only API entries
   
  log.info('wicked', 'Updating sidebar with API doc files');
  var sidebarFile = path.join(wikidir, '_Sidebar.md')
    , linkedfiles = apifiles.map(function (x) { 
        var linkname = x.slice(0, -common.extension.length)
          , link = x.slice(0, -('.md'.length));

        return '- [[' + linkname + '|' + link  + ']]' 
      });


  var apiDoc = 
    [ '<!-- START wicked generated API -- please keep comment here to allow auto update -->'
    , '#### API'
    , ''
    ]
    .concat(linkedfiles)
    .concat([
      ''
    , '<!-- END wicked generated API -- please keep comment here to allow auto update -->' 
    ])
    .join('\n');

  fs.writeFile(sidebarFile, apiDoc, 'utf8', cb);
};

if (!module.parent && typeof window === 'undefined') {
  var wikidir = '/var/folders/7j/w1lzc1ds7z1fyhw9xsflqgcc0000gn/T/thlorenz-wicked/wiki'

  log.level = 'silly';

  go(wikidir, [ 'API.API.md', 'Internal.API.md' ], function (err) {
    if (err) return console.error(err);
    console.log('sidebar generated');
  });
}
