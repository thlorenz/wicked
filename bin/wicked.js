#!/usr/bin/env node

var log      =  require('npmlog')
  , wicked   =  require('../')
  , minimist =  require('minimist')
  , path     =  require('path')
  , fs       =  require('fs')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

var argv = minimist(process.argv.slice(2)
  , { boolean: [ 'noclean', 'nocommit', 'h', 'help' ]
    , string: [ 'loglevel', 'l' ]
  });

argv.loglevel = argv.loglevel || argv.l || 'info';

if (argv.h || argv.help) {
  var usage = path.join(__dirname, 'usage.txt');
  fs.createReadStream(usage).pipe(process.stdout);
  process.exit(0);
}

wicked(argv, argv._, function (err) {
  if (err) return log.error('wicked', err);
  log.info('wicked', 'Everything is OK');
});
