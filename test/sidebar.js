'use strict';
/*jshint asi: true */

var test = require('tap').test
  , fs = require('fs')
  , path = require('path')
  , sidebar = require('../lib/sidebar')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

function safeUnlink(file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

test('\nwhen updating wiki with existing sidebar', function (t) {
  var wikidir = path.join(__dirname, 'sidebar', 'existing')
    , sidebarBak = path.join(wikidir, '_Sidebar.bak.md')
    , sidebarFile = path.join(wikidir, '_Sidebar.md')

  fs.createReadStream(sidebarBak)
    .on('end', onend)
    .pipe(fs.createWriteStream(sidebarFile))

  function onend() {
    sidebar(wikidir, [ 'PageUno.API.md', 'PageDos.API.md' ], function (err) {
      if (err) { t.fail(err); t.end(); }
      var result = fs.readFileSync(sidebarFile, 'utf8');
      safeUnlink(sidebarFile);

      t.deepEqual(
          result.split('\n')
        , [ '#### Navigation',
            '',
            '- some other [links](links)',
            '- and [pointers](pointers)',
            '',
            '<!-- START wicked generated API -- please keep comment here to allow auto update -->',
            '',
            '#### API',
            '',
            '- [[PageUno|PageUno.API]]',
            '- [[PageDos|PageDos.API]]',
            '',
            '<!-- END wicked generated API -- please keep comment here to allow auto update -->',
            '',
            '#### Disclaimer',
            '',
            'This is for a test',
            '' ]
          , 'replaces old API links with new ones'
      )
      t.end()
    });
  }
})

test('\nwhen updating wiki without existing sidebar', function (t) {
  var wikidir = path.join(__dirname, 'sidebar', 'new')
    , sidebarFile = path.join(wikidir, '_Sidebar.md')

  safeUnlink(sidebarFile);
  sidebar(wikidir, [ 'PageUno.API.md', 'PageDos.API.md' ], function (err) {
    if (err) { t.fail(err); t.end(); }


    var result = fs.readFileSync(sidebarFile, 'utf8');
    safeUnlink(sidebarFile);

    t.deepEqual(
        result.split('\n')
      , [ '<!-- START wicked generated API -- please keep comment here to allow auto update -->',
          '',
          '#### API',
          '',
          '- [[PageUno|PageUno.API]]',
          '- [[PageDos|PageDos.API]]',
          '',
          '<!-- END wicked generated API -- please keep comment here to allow auto update -->' ]
      , 'generates new _Sidebar.md that only contains API pages links'
    )
    t.end()
  })
})
