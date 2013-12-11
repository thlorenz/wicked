'use strict';

var log       =  require('npmlog')
  , cloneWiki =  require('./lib/clone-wiki')
  , runJsdoc  =  require('./lib/run-jsdoc')
  , wikify    =  require('./lib/wikify')
  , sidebar   =  require('./lib/sidebar')

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
  jsdocargs = jsdocargs || [];

  // Not ideal to use cwd here, but resolve-github-(remote|branch) run git in current dir
  // So before we can actually override the root properly those tools need a PR
  var projectRoot = process.cwd();

  // TODO: runnel will fix this staircase
  cloneWiki(function (err, info) {
    if (err) return cb(err);
    runJsdoc(projectRoot, info.root, jsdocargs, function (err, jsdocdir) {
      if (err) return cb(err);

      wikify(info.repo.dir, jsdocdir, function (err, apifiles) {
        if (err) return cb(err);

        sidebar(info.repo.dir, apifiles, function (err) {
          if (err) return cb(err);
          
          // TODO: git add, commit, push
          cb();
        });
      });
    });
  })
};

/** @namespace Internal
 *  @desc Internal wicked functions
 */

// Test
if (!module.parent && typeof window === 'undefined') {
  log.level = 'silly';
  go([], [], function (err) {
    if (err) return console.error(err);
    console.log('done');  
  });
}
