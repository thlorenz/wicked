'use strict';

var path = require('path')
  , fs = require('fs')
  , log = require('npmlog')

var common = require('./common')
  , updateApi = require('./sidebar-update-api') 

var go = module.exports = 

/**
 * Updates _Sidebar.md to link to API wiki pages
 *
 * @name sidebar 
 * @memberof Internal
 * @function
 * @param {String} wikidir in which _Sidebar.md is stored
 * @param {Array.<String>} apifiles API wiki pages
 * @param {Function} cb called back when _Sidebar.md was updated
 */
function sidebar(wikidir, apifiles, cb) {
   
  log.info('wicked', 'Updating sidebar with API doc files');
  var sidebarFile = path.join(wikidir, '_Sidebar.md')
    , linkedfiles = apifiles.map(function (x) { 
        var linkname = x.slice(0, -common.extension.length)
          , link = x.slice(0, -('.md'.length));

        return '- [[' + linkname + '|' + link  + ']]' 
      });

  fs.exists(sidebarFile, function (exists) {
    if (!exists) return update(null);
    fs.readFile(sidebarFile, 'utf8', function (err, sidebar) {
      if (err) return cb(err);
      update(sidebar);  
    });
  });

  function update(sidebar) { 
    var apiDoc = updateApi(sidebar, linkedfiles);
    fs.writeFile(sidebarFile, apiDoc, 'utf8', cb);
  }
};

if (!module.parent && typeof window === 'undefined') {
  var projectroot = path.join(__dirname, '..')
    , wikiroot = path.join(projectroot, 'tmp')

  log.level = 'silly';

  go(wikiroot, [ 'Public.API.md', 'Internal.API.md' ], function (err) {
    if (err) return console.error(err);
    console.log('sidebar generated');
  });
}
