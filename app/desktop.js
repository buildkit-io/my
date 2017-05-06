var remote = require('electron').remote;
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var execute = remote.getGlobal('execute');

var getFilePath = function(fileName) {
	const userDataPath = remote.app.getPath('userData');
    return path.join(userDataPath, fileName);
};

var writeFile = function (fileName, data) {
	fs.writeFileSync(fileName, data);
};

var readFile = function (fileName) {
	if (fs.existsSync(fileName)) {
		return fs.readFileSync(fileName, 'utf8');
	}
};

var deleteFile = function (fileName, callback) {
	fs.unlink(fileName, callback);
};