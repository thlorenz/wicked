'use strict';

var path           =  require('path')
  , log            =  require('npmlog')
  , mutiny         =  require('mutiny')
  , jsdocGithubify =  require('jsdoc-githubify')
  , through        =  require('through2')
 
var removeFiles = require('./remove-files');

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
  removeFiles(dir, '*' + extension, cb)
}

function removeEmptyFiles(dir, files, cb) {
  function filter(entry) {
    return ~files.indexOf(entry.name);
  }
  removeFiles(dir, filter, cb);
}

function getOutfile(processed, file) {
  for (var i  = 0; i < processed.length; i++) {
    if (processed[i].file === file) return processed[i].outfile;
  }
}

function createApiFiles(wikidir, jsdocsdir, cb) {
  var processed = []
    , empties = [];

  function markEmpties(file) {
    var body = '';
    var stream = through(ondata, onend);
    return stream;

    function ondata(d, enc, cb) {
      body += d;  
      cb();
    }

    function onend(cb) {
      if (!body.trim().length) empties.push(file);
      stream.push(body);
      cb();
    }
  }

  function onend() {
    empties = empties
      .map(getOutfile.bind(null, processed))
      .map(path.basename.bind(path));

    log.silly('wicked', 'Removing empties', empties);
    removeEmptyFiles(wikidir, empties, function (err) {
      if (err) return cb(err);
        
      cb(null, processed);
    });
  }

  log.info('wicked', 'Generating wicked API files');
  mutiny(
      { outdir: wikidir, transform: [ jsdocGithubify, markEmpties, addFooter ], rename: rename }
    , { root: jsdocsdir, fileFilter: '*.html' })
    .on('error', cb)
    .on('data', function (d) { 
      log.verbose('wicked', 'Processed:\n', d); 
      processed.push(d);
    })
    .on('end', onend);
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
