'use strict';

var readdirp =  require('readdirp')
  , fs       =  require('fs')
  , log      =  require('npmlog')
  , runnel   =  require('runnel')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

var go = module.exports = function removeFiles(root, fileFilter, cb) {
  readdirp({ root: root, directoryFilter: [ '!.git', '!node_modules' ], fileFilter: fileFilter }, function (err, res) {
    if (err) return cb(err);

    if (!res.files.length) return cb();

    var tasks = res.files
      .map(function (x) { return x.fullPath })
      .map(function (x) { 
        return function (cb) {
          log.silly('wicked', 'Removing', x);
          fs.unlink(x, cb);
        }
      });

    runnel(tasks.concat([ cb ]));
  });
}
