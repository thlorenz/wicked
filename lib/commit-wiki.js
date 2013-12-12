'use strict';

var log = require('npmlog');

var go = module.exports = function (info, cb) {
  
  log.info('wicked', 'committing wiki changes to', info.repo.url);

  cb();
};
