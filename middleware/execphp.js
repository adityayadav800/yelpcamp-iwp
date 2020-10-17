let execPHP = {};

execPHP.phpFolder = '';
execPHP.parseFile = function(fileName, callback) {
    var realFileName = this.phpFolder + fileName;

    console.log("Parsing php file...");
    var exec = require('child_process').exec;
    var cmd = 'php' + ' ' + realFileName;

    exec(cmd, function (error, stdout, stderr) {
        callback(stdout);
    });
}

module.exports = execPHP;