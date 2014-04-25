'use strict';

var log        = require('npmlog')
  , rmrf       = require('rimraf')
  , runnel     = require('runnel')
  , cloneWiki  = require('./lib/clone-wiki')
  , runJsdoc   = require('./lib/run-jsdoc')
  , wikify     = require('./lib/wikify')
  , sidebar    = require('./lib/sidebar')
  , commitWiki = require('./lib/commit-wiki')
  , runDoctoc  = require('./lib/run-doctoc')


function clean(tmpdir, cb) {
  log.info('wicked', 'Cleaning up ...');
  log.verbose('wicked', 'Removing tmp dir', tmpdir);
  rmrf(tmpdir, cb);
}

function tellmeWhere(repodir, cb) {
  log.info('wicked', 'Wiki cloned to and upated at', repodir);
  cb();
}

/** @namespace Public
 *  @desc Public wicked API
 */

/**
 * Generates jsdoc wiki pages for project of current working directory and updates github wiki with them.
 *
 * ##### Note
 *
 * It is assumed that this is run from the root of the project whose wiki should be generated.
 * Additionally the currently checked out branch will be used when generating blob urls to link source examples.
 *
 * However the github remote and branch can also be set via environment vars as explained in the
 * [documentation of jsdoc-githubify]{@link https://github.com/thlorenz/jsdoc-githubify#note} which is used
 * by wicked under the hood.
 *
 * @name wicked
 * @memberof Public
 * @function
 * @param {Object} args consumed by wicked
 * @param {Boolean=} args.noclean (false) if true, the temp directory into which wiki is checked out will **not be removed** when done
 * @param {Boolean=} args.nocommit(false)  if true, the updated wiki will **not be committed automatically**
 * @param {String=} args.loglevel (info) level at which to log: silly|verbose|info|warn|error|silent
 * @param {Array.<String>} jsdocargs consumed by jsdoc
 * @param {Function(Error)} cb called back when wicked finished generating the wiki page
 */
var go = module.exports = function wicked(args, jsdocargs, cb) {
  args = args || {};
  jsdocargs = jsdocargs || [];

  log.level = args.loglevel || 'info';

  // Not ideal to use cwd here, but resolve-github-(remote|branch) run git in current dir
  // So before we can actually override the root properly those tools need a PR
  var projectRoot = process.cwd();
  
  function updateWiki(info, cb) {
    var tasks = [
        runJsdoc.bind(null, projectRoot, info.root, jsdocargs)
      , wikify.bind(null, info.repo.dir)
      , sidebar.bind(null, info.repo.dir)
    ];

    if (args.toc) tasks.push(function (cb_) {
      runDoctoc(info.repo.dir, cb_);
    })

    tasks.push(args.nocommit ? tellmeWhere.bind(null, info.repo.dir) : commitWiki.bind(null, info.repo));
    if (!args.noclean && !args.nocommit) tasks.push(clean.bind(null, info.root));
    tasks.push(cb);
                                 
    runnel(tasks);
  }

  cloneWiki(function (err, info) {
    if (err) return cb(err);
    updateWiki(info, cb);
  })
};

/** @namespace Internal
 *  @desc Internal wicked functions
 *  @private
 */
