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

function drawExit(filename) {
  var rstream = fs.createReadStream(filename);
  var content = '';
  var finalContent = '';
  rstream.on('data', function (chunk) {
    content += chunk.toString(); // console.log(content)
  });

  if (filename === 'data/maps/oval.01.map') {
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

      myWriteFile(filename, finalContent);
    });
  } else {
    rstream.on("end", function () {
      var lines = content.split("\n");
      var positionTwo = -1;
      var positionLineTwo = -1;
      var lineNumber = 27;
      var column = 46;
      var _char = '';
      var newLine = '';

      for (var key in lines) {
        if (lines[key].includes('2')) {
          positionTwo = lines[key].toString().indexOf('2');
          positionLineTwo = parseInt(key);
        }

        if (!lines[key].includes(' ')) {
          finalContent += lines[key] + '\n';
        } else {
          if (parseInt(key) <= 26) {
            // console.log(lines[parseInt(key)+1])
            if (lines[parseInt(key) + 1][positionTwo] === ' ') {
              console.log(key);
              newLine = lines[parseInt(key) + 1].toString().replace(' ', 'v');

              if (lines[parseInt(key)][positionTwo + 1] === ' ') {
                newLine = lines[parseInt(key) + 1].toString().replace(' ', '>');
              }

              finalContent += newLine + '\n'; // if (lines[parseInt(key)][positionTwo + 1] === ' ') {
              //     newLine = lines[parseInt(key) + 1].toString().replace(' ', '>')
              //     finalContent += newLine + '\n'
              // }
            }
          }
        } // if(lines[parseInt(key)+1][positionTwo] === 'x'){
        //     console.log(lines[key])
        // }
        //    if(lines[positionLineTwo+1][positionTwo] === "x"){
        //    }
        // console.log(lines[key])
        // if (lines[key].includes('1')) {
        //     positionOne = lines[key].toString().indexOf('1')
        //     // console.log("positionOne")
        //     for (let i = positionOne; i > 0; i--) {
        //         // console.log(lines[key][i-1])
        //         // if(lines[key][i-1] == ' '){
        //         //     char+= lines[key][i-1].replace(' ',"<")
        //         // }
        //         // char+= lines[key][i].replace(' ',"<")
        //         // char+= lines[key][i].replace(' ',"<")
        //         // if (lines[key][i] == ' ') {
        //         //     newLine = lines[key][i].replace(' ', "<")
        //         //     finalContent += newLine + '\n'
        //         // }
        //     }
        //     // console.log(lines[parseInt(key)+1][positionOne])
        // }

      }

      console.log(finalContent); // console.log(positionTwo);
    });
  }
}

module.exports = {
  drawExit: drawExit
};