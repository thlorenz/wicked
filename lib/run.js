'use strict';

var spawn = require('child_process').spawn
  , log = require('npmlog')

var go = module.exports = function run(bin, args, cwd, cb) {

  if (typeof cwd === 'function') {
    cb = cwd;
    cwd = null;
  }

  var prog = spawn(
      bin
    , args
    , { cwd: cwd || process.cwd }
  )

  log.verbose('run', bin, args);

  prog.stdout.pipe(process.stdout);
  prog.stderr.pipe(process.stderr);

  prog.on('close', function (code) {
    if (code !== 0) return cb(new Error('prog ' + args.join(' ') + ' returned with code ' + code), code);
    cb(null, code);
  })

  return prog;
}
