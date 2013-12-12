'use strict';

var log = require('npmlog')
  , runnel = require('runnel')
  , run = require('./run')

var go = module.exports = function (info, cb) {
  
  log.info('wicked', 'Committing wiki changes to', info.repo.url);
  runnel(
      run.bind(null, 'git', [ 'add', '-A', '.' ])
    , run.bind(null, 'git', [ 'commit', '-m', 're-generated API docs with wicked' ])
    , run.bind(null, 'git', [ 'push', 'origin', 'master' ])
    , cb
  )
}
