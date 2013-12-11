'use strict';

var readdirp =  require('readdirp')
  , fs       =  require('fs')
  , log      =  require('npmlog')
  , runnel   =  require('runnel')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

/**
 * Removes the files matching the file filter in root and all subdirectories
 * 
 * @name removeFiles
 * @function
 * @memberof Internal
 * @param {Stirng} root directory
 * @param {(String|Function(entry:Object))} fileFilter needs to return true to cause the file to be deleted
 * @param {Function({Error})} cb called back when all files were removed 
 */
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
