var fs = require('fs');
try {
    var path = require('path');
} catch (e) {
    // ringo compatibility
    var path = require('fs');
    var __dirname = module.resolve("./");
}

var existsSync = fs.existsSync || path.existsSync || fs.exists;

var versions = [
 '2.0.0',
 '2.0.1',
 '2.0.2',
 '2.1.0',
 '2.1.1',
 '2.2.0',
 '2.3.0',
 '3.0.0',
 '3.0.3',
 '3.0.4',
 '3.0.5'
];

module.exports.versions = versions;

module.exports.load = function(version) {
    if (versions.indexOf(version) <= -1) {
	throw new Error("Unknown mapnik-reference version: '" + version + "'");
    }
    var ref = require(path.join(__dirname, version, 'reference.json'));
    var ds_path = path.join(__dirname, version, 'datasources.json');
    if (existsSync(ds_path)) {
	ref.datasources = require(ds_path).datasources;
    }
    return ref;
}
