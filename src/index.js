
var resolve = require('resolve');
var path = require('path');

module.exports = function(url, file, done) {
  var object;

  if( url[0] === '~' ) {

    var route = url.split(path.sep);
    var fileImport = route.pop();
    fileImport = fileImport[0] === '_' ? fileImport : '_' + fileImport;
    fileImport = fileImport.indexOf('.scss') !== -1 ? fileImport : fileImport + '.scss';

    url = route.concat([fileImport]).join(path.sep);

    object = {
      file: resolve.sync(url.slice(1), { basedir: __dirname + '/../src'})
    };
  } else {
    object = { file: url };
  }

  return done( object );
};