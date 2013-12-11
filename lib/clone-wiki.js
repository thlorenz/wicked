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

function initRootDir (dirname, cb) {
  var dir = path.join(os.tmpdir(), dirname);

  rmrf(dir, function (err) {
    if (err) return cb(err);
    mkdir(dir, function (err) {
      if (err) return cb(err);
      cb(null, dir);
    });
  });
}

function clone(dirname, url, cb) {
  initRootDir(dirname, function (err, dir) {
    if (err) return cb(err);
    run('git', [ 'clone', url , 'wiki' ], dir, function (err) {
      if (err) return cb(err);
      cb(null, { root: dir, repo: { dir: path.join(dir, 'wiki'), url: url } } ); 
    });
  });
}

/**
 * Clones the wiki project of the project in the current directory
 *
 * @name cloneWiki
 * @memberof Internal
 * @function
 * @param {Function} cb called back info about root dir, wiki dir and wiki repo url
 */
var go = module.exports = function cloneWiki(cb) {
  getWikiRepo(function (err, repo) {
    if (err) return cb(err);

    var dirname = repo.remote.replace('/', '-');
    clone(dirname, repo.url, cb);
  });
};
