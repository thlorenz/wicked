# wicked [![build status](https://secure.travis-ci.org/thlorenz/wicked.png)](http://travis-ci.org/thlorenz/wicked)

What is wicked?

A tool that generates github wiki compatible API documentation from your project's jsdocs and adds them to your wiki.

And that is wicked!

## Installation

    npm install -g wicked

## Usage

### Most common Steps 

First create a wiki for your project on github and create one page.

Then from the root of your project run:

    wicked
  
### Command Line Options

```txt
usage: wicked <wicked-options> -- <jsdoc-options>

  Generates wiki API docs for the gihub project in the current directory.

  Both options are optional, jsdoc-options get passed to [jsdoc](http://usejsdoc.org/about-commandline.html).

  Note: overriding the jsdoc destination (-d, --destination) is not possible since wicked will write files to a temp dir

OPTIONS:

  --noclean       don't remove the temp directory into which wiki is checked out when finished

  --nocommit      don't commit the updated wiki automatically nor remove the temp directory

  -l, --loglevel  level at which to log: silly|verbose|info|warn|error|silent -- default: info
  
  -h, --help      Print this help message.


EXAMPLES:
  
  Generate with default options:
    
    wicked

  Override [jsdocconf.json](http://usejsdoc.org/about-configuring-jsdoc.html):

    wicked -- --configure ./myconf.json

  Override loglevel and jsoc configuration and don't remove temp directory:

    wicked  --loglevel silly --noclean -- --configure ./myconf.json
```

## API

#### wicked(args, jsdocargs, cb)

```js
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
 * @param {Boolean=} args.noclean (false) if true, the temp directory into which wiki is checked out will **not be removed** when done
 * @param {Boolean=} args.nocommit(false)  if true, the updated wiki will **not be committed automatically**
 * @param {String=} args.loglevel (info) level at which to log: silly|verbose|info|warn|error|silent
 * @param {Array.<String>} jsdocargs consumed by jsdoc
 * @param {Function(Error)} cb called back when wicked finished generating the wiki page
 */
```

## License

MIT
