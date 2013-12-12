'use strict';

var log        =  require('npmlog')
  , rmrf       =  require('rimraf')
  , runnel     =  require('runnel')
  , cloneWiki  =  require('./lib/clone-wiki')
  , runJsdoc   =  require('./lib/run-jsdoc')
  , wikify     =  require('./lib/wikify')
  , sidebar    =  require('./lib/sidebar')
  , commitWiki =  require('./lib/commit-wiki')

/** @namespace Public
 *  @desc Public wicked API
 */

function clean(tmpdir, cb) {
  log.info('wicked', 'Cleaning up ...');
  log.verbose('wicked', 'Removing tmp dir', tmpdir);
  rmrf(tmpdir, cb);
}

function tellmeWhere(repodir, cb) {
  log.info('wicked', 'Wiki cloned to and upated at', repodir);
  cb();
}

/**
 * Generates jsdoc wiki pages for project of current working directory and updates github wiki with them.
 *
 * ##### Note
 *
 * It is assumed that this is run from the root of the project whose wiki should be generated.
 * Additionally the currently checked out branch will be used when generating blob urls to link source examples.
 *
 * However the github remote and branch can also be set via environment vars as explained in the
 * [documentation of jsdoc-githubify]{@link https://github.com/thlorenz/jsdoc-githubify#note) which is used
 * by wicked under the hood.
 *
 * @name wicked
 * @memberof Public
 * @function
 * @param {Array.<String>} args consumed by wicked
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

    if (!args.noclean && !args.nocommit) tasks.push(clean.bind(null, info.root));
    tasks.push(args.nocommit ? tellmeWhere.bind(null, info.repo.dir) : commitWiki.bind(null, info));
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
 */
