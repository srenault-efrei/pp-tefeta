"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var fs = require('fs');

function transformLine(str, index, _char) {
  var start = str.slice(0, index);
  var end = str.slice(index, str.length);
  return "".concat(start).concat(_char).concat(end);
}

function myWriteFile(filename, finalContent) {
  fs.writeFile(filename, finalContent, {
    encoding: 'utf8'
  }, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(_chalk["default"].green.bold("Successfully, you found the way from the path " + filename));
    }
  });
}

function drawExit() {
  var tabFile = ["data/maps/oval.01.map", "data/maps/rect.02.map", "data/maps/rect.03.map", "data/maps/rect.04.map", "data/maps/rect.05.map", "data/maps/rect.06.map", "data/maps/rect.07.map", "data/maps/rect.08.map"];

  var _loop = function _loop() {
    var filename = _tabFile[_i];
    var content = '';
    var finalContent = '';
    var rstream = null;

    if (!fs.existsSync(filename)) {
      console.log(_chalk["default"].red("The file ".concat(filename, " does not exist.")));
      process.exit(-1);
    } else {
      if (filename === 'data/maps/oval.01.map') {
        rstream = fs.createReadStream(filename);
        rstream.on('data', function (chunk) {
          content += chunk.toString();
        });
        rstream.on("end", function () {
          var lines = content.split("\n");
          var positionOne = lines[1].toString().indexOf('1');
          var newLine = '';

          for (var key in lines) {
            if (lines[key] == lines[0] || lines[key] == lines[1] || lines[key] == lines[lines.length - 1]) {
              finalContent += lines[key] + '\n';
            } else {
              newLine = transformLine(lines[key], positionOne, "v");
              finalContent += newLine + '\n';
            }
          }

          myWriteFile(filename, finalContent);
        });
      } else {
        rstream = fs.createReadStream(filename);
        rstream.on('data', function (chunk) {
          content += chunk.toString();
        });
        rstream.on("end", function () {
          var lines = content.split("\n");
          var positionOne = -1;
          var positionTwo = -1;
          var lineNumber = -1;
          var column = -1;
          var newLine = '';

          for (var key in lines) {
            if (parseInt(key) === 0) {
              column = parseInt(lines[0].slice(0, 2));
              lineNumber = parseInt(lines[0].slice(3));
            }

            if (lines[key].includes("1")) {
              positionOne = lines[key].indexOf('1');
            }

            if (lines[key].includes("2")) {
              positionTwo = lines[key].indexOf('2');
            }

            if (lines[key].includes(' ')) {
              // for(let i=0; i<13; i++){
              if (lines[parseInt(key) + 1][positionOne] === ' ') {
                newLine = transformLine(lines[parseInt(key) + 1], positionOne, "v");
                finalContent += newLine + '\n';
              }
            } else {
              finalContent += lines[key] + '\n';
            }
          }

          myWriteFile(filename, finalContent);
        });
      }
    }
  };

  for (var _i = 0, _tabFile = tabFile; _i < _tabFile.length; _i++) {
    _loop();
  }
}

module.exports = {
  drawExit: drawExit
};