'use strict';

var log = require('npmlog')
  , runnel = require('runnel')
  , run = require('./run')

/**
 * Commits all changes that were applied to the wiki due to re-generating the API docs.
 * 
 * @name commitWiki
 * @function
 * @memberof Internal
 * @private
 * @param {Object} repo     information about the wiki repo to be committed
 * @param {String} repo.url github url to the repo
 * @param {String} repo.dir directory into which the repo is currenly checked out
 * @param {Function(Error)} cb called back when wiki is committed
 */
var go = module.exports = function commitWiki(repo, cb) {
  
  var cwd = repo.dir;
  log.info('wicked', 'Committing wiki changes to', repo.url);
  runnel(
      run.bind(null, 'git', [ 'add', '-A', '.' ], cwd)
    , run.bind(null, 'git', [ 'commit', '-m', 're-generated API docs with wicked' ], cwd)
    , run.bind(null, 'git', [ 'push', 'origin', 'master' ], cwd)
    , cb
  )
}
