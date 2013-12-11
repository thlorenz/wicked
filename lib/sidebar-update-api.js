'use strict';

var updateSection = require('update-section')
  , start = '<!-- START wicked generated API -- please keep comment here to allow auto update -->'
  , end = '<!-- END wicked generated API -- please keep comment here to allow auto update -->'
  ;

function matchesStart(line) {
  return (/<!-- START wicked generated API --/).test(line);
}

function matchesEnd(line) {
  return (/<!-- END wicked generated API --/).test(line);
}

/**
 * Updates the sidebar's links to API wiki pages
 * 
 * @name sidebarAddApi
 * @memberof Internal
 * @function
 * @param {String} sidebar current sidebar content
 * @param {Array.<String>} linkedfiles API wiki pages
 * @return {String} sidebar with updated API links
 */
var go = module.exports = function sidebarAddApi(sidebar, linkedfiles) {
  
  var apiDoc = 
    [ start 
    , ''
    , '#### API'
    , ''
    ]
    .concat(linkedfiles)
    .concat([
      ''
    , end 
    ])
    .join('\n');

  if (!sidebar) return apiDoc;

  return updateSection(sidebar, apiDoc, matchesStart, matchesEnd);
};
