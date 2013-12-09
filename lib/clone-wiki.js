'use strict';

var run  =  require('./run')
  , path =  require('path')
  , os   =  require('os')
  , log  =  require('npmlog')

var resolveGitRemote = require('resolve-git-remote')
  , mkdir = require('fs').mkdir
  , rmrf = require('rimraf')

function getWikiRepo(cb) {
  resolveGitRemote(function (err, remote) {
    if (err) return cb(err);
    var wikiUrl = 'git@github.com:' + remote + '.wiki.git'  
    cb(null, { remote: remote, url: wikiUrl });    
  });
}

function initWikiDir (dirname, cb) {
  var dir = path.join(os.tmpdir(), dirname);

  rmrf(dir, function (err) {
    if (err) return cb(err);
    mkdir(dir, function (err) {
      if (err) return cb(err);
      cb(null, dir);
    });
  });
}

function clone(remote, url, cb) {
  var dirname = remote.replace('/', '-');

  initWikiDir(dirname, function (err, dir) {
    if (err) return cb(err);
    run('git', [ 'clone', url , 'wiki' ], dir, function (err) {
      if (err) return cb(err);
      cb(null, path.join(dir, 'wiki')); 
    });
  });
}

/**
 * Clones the wiki project of the project in the current directory
 * @name cloneWiki
 * @function
 * @param {Function} cb called back with directory to which wiki was cloned 
 */
var go = module.exports = function cloneWiki(cb) {
  getWikiRepo(function (err, repo) {
    if (err) return cb(err);
    clone(repo.remote, repo.url, cb);
  });
};

// Test
if (!module.parent && typeof window === 'undefined') {
  log.level = 'silly';
  go(function (err, dir) {
    if (err) return console.error(err);
    console.log('Cloned to', dir);
  });
}
