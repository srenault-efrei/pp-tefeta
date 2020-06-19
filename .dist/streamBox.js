"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var fs = require('fs');

var path = require('path');

var _require = require('stream'),
    Transform = _require.Transform;

function transformLine(str, index) {
  var start = str.slice(0, index);
  var end = str.slice(index, str.length);
  return "".concat(start, "v").concat(end);
}

function drawExit(filename) {
  var rstream = fs.createReadStream(filename);
  var content = '';
  var finalContent = '';
  rstream.on('data', function (chunk) {
    content += chunk.toString();
  });
  rstream.on("end", function () {
    var lines = content.split("\n");
    var positionOne = lines[1].toString().indexOf('1');
    var newLine = '';

    for (var key in lines) {
      if (lines[key] == lines[0] || lines[key] == lines[lines.length - 1]) {
        finalContent += lines[key] + '\n';
      } else {
        newLine = transformLine(lines[key], positionOne);
        finalContent += newLine + '\n';
      }
    }

    fs.writeFile(filename, finalContent, {
      encoding: 'utf8'
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log(_chalk["default"].green.bold("Successfully, you found the way from the path " + filename));
      }
    });
  });
}

module.exports = {
  drawExit: drawExit
};