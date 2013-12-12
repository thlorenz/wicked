'use strict';

var spawn = require('child_process').spawn
  , log = require('npmlog')
  , through = require('through2') 

/**
 * Spawns the given bin with the given args from the cwd or current working directory.
 *
 * @name run
 * @memberof Internal
 * @private
 * @function
 * @param {String} bin full path to the binary to run
 * @param {Array.<String>} args the args to pass to the binary
 * @param {String=} cwd full path to the directory to run bin from, defaults to current directory
 * @param {Function} cb called back with err and/or program exit code
 * @return {Object} the spawned binary which exposes stdout and stderr streams
 */
module.exports = function run(bin, args, cwd, cb) {
  var stdout = ''
    , stderr = '';

  if (typeof cwd === 'function') {
    cb = cwd;
    cwd = null;
  }

  var prog = spawn(
      bin
    , args
    , { cwd: cwd || process.cwd() }
  )

  log.silly('wicked', 'Running from:', cwd);
  log.verbose('wicked', 'Running:', bin, args.join(' '));

  prog.stdout
    .pipe(through(function (d) { stdout += d.toString() }))
    .pipe(process.stdout);
  prog.stderr
    .pipe(through(function (d) { stderr += d.toString() }))
    .pipe(process.stderr);

  prog.on('close', function (code) {
    var err = new Error('prog ' + args.join(' ') + ' returned with code ' + code);
    err.stdout = stdout;
    err.stderr = stderr;
    if (code !== 0) return cb(err, code);
    cb();
  })

  return prog;
}
