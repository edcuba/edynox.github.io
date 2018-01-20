// Add preamble attribute to posts
const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.dirname(__dirname) + '/_posts'
const attr_key = 'archived'
const attr_value = 'yes'

function readdir(path, pat, fn) {
  return fs.readdirSync(path).forEach(function (f, i) {
    var m = f.match(pat);
    if (m) {
      fn(f, m, i);
    }
  })
}

readdir(POSTS_DIR, /^(\d{4})-(\d{2})-(\d{2})-(.+)\.([^\.]+)$/, function(filename, m) {
  var oldURLPath = '/' + m[1] + '/' + m[2] + '/' + m[3] + '/' + m[4] + '.html';
  //if (filename.substr(0,13) !== '2009-01-09-hu') { return; } // XXX DEBUG

  var path = POSTS_DIR + '/' + filename;
  var src = fs.readFileSync(path, 'utf8');
  if (src.substr(0,4) !== '---\n') {
    console.error(path, 'does not begin with ---<LF>');
    process.exit(1);
    return;
  }

  var endFrontMatter = src.indexOf('\n---\n', 4);
  if (endFrontMatter === -1) {
    console.error(path, 'missing terminating front matter "---"');
    process.exit(1);
    return;
  }

  console.log(filename, '('+oldURLPath+')');
  var fmSrc = src.substring(4, endFrontMatter+1);

  // make sure there's not a redirect_from already
  var pat = /([^:]+)\:\s*([^\n]+)\s*\n/g, kv;
  while((kv = pat.exec(fmSrc)) !== null) {
    var k = kv[1], v = kv[2];
    //console.log('**', k, '=', v)
    if (k === attr_key) {
      console.warn('[warn] ignoring post with existing attribute in', filename);
      return;
    }
  }

  fmSrc += attr_key + ': ' + attr_value + '\n';

  // Glue back together and write
  src = src.substr(0, 4) + fmSrc + src.substr(endFrontMatter+1);
  // console.log(src); process.exit(0); // dry run
  fs.writeFileSync(path, src, 'utf8');
});
