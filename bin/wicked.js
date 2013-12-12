#!/usr/bin/env node

var log = require('npmlog')
  , wicked = require('../')

var wickedArgs = { noclean: false, nocommit: false, loglevel: 'info' } 
  , jsdocArgs = [];

wicked(wickedArgs, jsdocArgs, function (err) {
  if (err) return log.error('wicked', err);

  log.info('wicked', 'Everything is OK');
});
