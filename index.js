var fs = require('fs'),
    path = require('path'),
    semver = require('semver'),
    existsSync = require('fs').existsSync || path.existsSync;


var getVersions = function () {
    var names = fs.readdirSync('./'), versions = [];
    for (var i = 0; i < names.length; i++) {
        if(names[i].match(/^\d{1,2}\.\d{1,2}\.\d{1,2}$/)) versions.push(names[i]);
    };
    return versions;
};
var versions = getVersions();

var getSatisfyingVersion = function (wanted) {
    var version = semver.maxSatisfying(versions, wanted), parsed;
    if (!version) {
        try {
            parsed = semver(wanted);
            parsed.patch = 'x';
            version = semver.maxSatisfying(versions, parsed.format());
        } catch (err) {
            version = null;
        }
    }
    return version;
};

module.exports.versions = versions;
module.exports.latest = versions[versions.length - 1];
module.exports.load = function(wanted) {
    var version = getSatisfyingVersion(wanted);
    if (!version) {
        throw new Error("Unknown mapnik-reference version: '" + wanted + "'");
    }
    var ref = require(path.join(__dirname, version, 'reference.json'));
    var ds_path = path.join(__dirname, version, 'datasources.json');
    if (existsSync(ds_path)) {
	   ref.datasources = require(ds_path).datasources;
    }
    return ref;
}
