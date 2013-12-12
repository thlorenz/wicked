'use strict';

var path           =  require('path')
  , log            =  require('npmlog')
  , mutiny         =  require('mutiny')
  , jsdocGithubify =  require('jsdoc-githubify')
  , through        =  require('through2')
 
var removeFiles = require('./remove-files')
  , common = require('./common')

var header = '<!-- GENERATED WITH WICKED. Don\'t edit this file directly, instead run wicked again to regenerate API docs -->\n'
  , footer = '\n<br>\n<h6><em>Generated with <a href="https://github.com/thlorenz/wicked">wicked</a>.</em></h6>';

function rename(file, dir, relative) {
  var extlen = path.extname(file).length;
  return file.slice(0, -extlen) + common.extension;
}

function wrap(file) {
  var body = ''
  var stream = through(ondata, onend);
  return stream;

  function ondata(d, enc, cb) {
    body += d;  
    cb();
  }

  function onend(cb) {
    stream.push(header + body + footer);
    cb();
  }
}

function removeOldApiFiles(dir, cb) {
  log.info('wicked', 'Cleaning out old wicked API files');
  removeFiles(dir, '*' + common.extension, cb)
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

    var nonempties = processed
      .map(function (x) { return x.outfile })
      .map(path.basename.bind(path))
      .filter(function (x) { return !~empties.indexOf(x) })

    log.silly('wicked', 'Removing empties', empties);
    removeEmptyFiles(wikidir, empties, function (err) {
      if (err) return cb(err);
        
      cb(null, nonempties);
    });
  }

  log.info('wicked', 'Generating wicked API files');
  mutiny(
      { outdir: wikidir, transform: [ jsdocGithubify, markEmpties, wrap ], rename: rename }
    , { root: jsdocsdir, fileFilter: '*.html' })
    .on('error', cb)
    .on('data', function (d) { 
      log.verbose('wicked', 'Processed:\n', d); 
      processed.push(d);
    })
    .on('end', onend);
}

/**
 * Generates wiki compatible `*.API.md` files from `*.html` jsdoc files
 * 
 * @name wikify
 * @function
 * @memberof Internal
 * @private
 * @param {String} wikidir where the generated `*.API.md` files will be stored
 * @param {String} jsdocsdir where the `*.html` files where output by jsdoc
 * @param {Function} cb called back with the names of generated .API.md files
 */
var go = module.exports = function wikify(wikidir, jsdocsdir, cb) {
  removeOldApiFiles(wikidir, function (err) {
    if (err) return cb(err);
    createApiFiles(wikidir, jsdocsdir, cb);
  });
};
