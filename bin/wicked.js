#!/usr/bin/env node
'use strict';

var log      =  require('npmlog')
  , wicked   =  require('../')
  , minimist =  require('minimist')
  , path     =  require('path')
  , fs       =  require('fs')
  ;

(function damnYouEsprima() {

var argv = minimist(process.argv.slice(2)
  , { boolean: [ 'noclean', 'nocommit', 'toc', 't', 'h', 'help' ]
    , string: [ 'loglevel', 'l' ]
  });

argv.loglevel = argv.loglevel || argv.l || 'info';

if (argv.h || argv.help) {
  var usage = path.join(__dirname, 'usage.txt');
  fs.createReadStream(usage).pipe(process.stdout);
  return;
}
argv.toc = argv.toc || argv.t;

wicked(argv, argv._, function (err) {
  if (err) return log.error('wicked', err);
  log.info('wicked', 'Everything is OK');
});

})()
