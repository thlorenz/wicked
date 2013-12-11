'use strict';

var path           =  require('path')
  , fs = require('fs')
  , log            =  require('npmlog')
  , mutiny         =  require('mutiny')
  , jsdocGithubify =  require('jsdoc-githubify')
  , readdirp = require('readdirp')
  , through = require('through2')

var extension = '.API.md'
  , footer = '\n<br>\n<h6><em>Generated with <a href="https://github.com/thlorenz/wicked">wicked</a>.</em></h6>';

function rename(file, dir, relative) {
  var extlen = path.extname(file).length;
  return file.slice(0, -extlen) + extension;
}

function addFooter(file) {
  var body = ''
  var stream = through(ondata, onend);
  return stream;

  function ondata(d, enc, cb) {
    body += d;  
    cb();
  }

  function onend(cb) {
    stream.push(body + footer);
    cb();
  }
}

function removeOldApiFiles(dir, cb) {
  log.info('wicked', 'Cleaning out old wicked API files');
  readdirp({ root: dir, fileFilter: '*' + extension })
    .on('warn', function (err) { log.warn('wicked', err) })
    .on('error', cb)
    .on('end', cb)
    .pipe(through({ objectMode: true }, onentry))
    .on('error', cb)

  function onentry(entry, enc, cb) {
    fs.unlink(entry.fullPath, cb);
  }
}

function createApiFiles(wikidir, jsdocsdir, cb) {
  var processed = [];
  log.info('wicked', 'Generating wicked API files');
  mutiny(
      { outdir: wikidir, transform: [ jsdocGithubify, addFooter ], rename: rename }
    , { root: jsdocsdir, fileFilter: '*.html' })
    .on('error', cb)
    .on('data', function (d) { 
      log.verbose('wicked', 'Processed:\n', d); 
      processed.push(d);
    })
    .on('end', function () {
      cb(null, processed);
    });
}


var go = module.exports = function (wikidir, jsdocsdir, cb) {
  removeOldApiFiles(wikidir, function (err) {
    if (err) return cb(err);
    createApiFiles(wikidir, jsdocsdir, cb);
  });
  
};

// Test
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

if (!module.parent && typeof window === 'undefined') {
  var jsdocsdir = '/var/folders/7j/w1lzc1ds7z1fyhw9xsflqgcc0000gn/T/thlorenz-wicked/out'
    , wikidir = '/var/folders/7j/w1lzc1ds7z1fyhw9xsflqgcc0000gn/T/thlorenz-wicked/wiki'

  log.level = 'silly';

  go(wikidir, jsdocsdir, function (err, processed) {
    if (err) return console.error(err);
    inspect(processed);  
  });
}
