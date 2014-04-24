'use strict';

var doctoc      = require('doctoc/lib/transform')
  , fs          = require('fs')
  , path        = require('path')
  , runnel      = require('runnel')
  , asyncreduce = require('asyncreduce')
  , log         = require('npmlog')

var si = typeof setImmediate === 'function' ? setImmediate : function (fn) { setTimeout(fn, 0) }

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

function resolveApiFiles(dir, files, cb) {
  var fullPaths = files.map(function (x) { return path.join(dir, x) });
  asyncreduce(
      fullPaths 
    , [] 
    , function (acc, file, cb_) {
        fs.stat(file, function (err, stat) {
          if (err) return cb_(err);

          var isApiDoc = stat.isFile() && file.slice(-('.API.md'.length)) === '.API.md';

          if (isApiDoc) {
            fs.readFile(file, 'utf8', function (err, content) {
              if (err) return cb_(err);
              acc.push({ file: file, content: content });
              cb_(null, acc);
            })
          } else {
            cb_(null, acc);
          }
        })
      }
    , cb
  );
}

function processApiFiles(files, cb) {
  var tasks = files
    .map(function (x) {
      var ret = doctoc(x.content);
      ret.file = x.file;
      return ret;
    })
    .filter(function (x) {
      return x.transformed;
    })
    .map(function (x) { 
      return function (cb_) {
        log.verbose('wicked', 'Updating table of contents for ', path.basename(x.file));
        fs.writeFile(x.file, x.data, 'utf8', cb_);
      }
    })

  if (!tasks.length) return si(cb);
  runnel(tasks.concat(cb));
}

var go = module.exports = function (dir, cb) {
  runnel(
      fs.readdir.bind(fs, dir)  
    , resolveApiFiles.bind(null, dir) 
    , processApiFiles
    , cb
  );
}
