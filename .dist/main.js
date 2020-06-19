"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _require = require("./streambox"),
    drawExit = _require.drawExit;

var fs = require("fs");

var args = process.argv.slice(2);

if (args.length !== 1) {
  console.log(_chalk["default"].red("Usage: yarn start <FILENAME>"));
  process.exit(0);
} else {
  var filename = args[0];

  if (!fs.existsSync(filename)) {
    console.log(_chalk["default"].red("The file ".concat(filename, " does not exist.")));
    process.exit(-1);
  } else {
    drawExit(filename);
  }
}