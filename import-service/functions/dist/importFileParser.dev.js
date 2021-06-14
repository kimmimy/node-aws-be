"use strict";

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var AWS = require('aws-sdk');

var сsv = require('csv-parser');

var _require = require('../contsnts'),
    REGION = _require.REGION,
    BUCKET = _require.BUCKET;

var parseCSVFile = function parseCSVFile(name) {
  console.log("Parse CSV ---");
  var results = [];
  var s3 = new AWS.S3({
    region: REGION
  });
  return new Promise(function (res, rej) {
    s3.getObject({
      Bucket: BUCKET,
      Key: name
    }).createReadStream().pipe(сsv()).on("data", function (data) {
      return results.push(data);
    }).on("end", function () {
      console.log('Parse result----', results);
      res();
    }).on("error", function (error) {
      console.error("CSV parse error");
      rej(error);
    });
  });
};

var moveFileToParsed = function moveFileToParsed(name) {
  var s3;
  return regeneratorRuntime.async(function moveFileToParsed$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("move file to parsed", name);
          s3 = new AWS.S3({
            region: REGION
          });
          console.log('name----', name);
          _context.next = 5;
          return regeneratorRuntime.awrap(s3.copyObject({
            Bucket: BUCKET,
            CopySource: BUCKET + "/" + name,
            Key: name.replace("uploaded", "parsed")
          }).promise());

        case 5:
          console.log("File added to 'parced folder", name.replace("uploaded", "parsed"));
          _context.next = 8;
          return regeneratorRuntime.awrap(s3.deleteObject({
            Bucket: BUCKET,
            Key: name
          }).promise());

        case 8:
          console.log("Deleted file from uploaded folder", name);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var importFileParser = function importFileParser(event) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, record;

  return regeneratorRuntime.async(function importFileParser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log('event-----', event);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _context2.prev = 4;
          _iterator = _asyncIterator(event.Records);

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_iterator.next());

        case 8:
          _step = _context2.sent;
          _iteratorNormalCompletion = _step.done;
          _context2.next = 12;
          return regeneratorRuntime.awrap(_step.value);

        case 12:
          _value = _context2.sent;

          if (_iteratorNormalCompletion) {
            _context2.next = 22;
            break;
          }

          record = _value;
          _context2.next = 17;
          return regeneratorRuntime.awrap(parseCSVFile(record.s3.object.key));

        case 17:
          _context2.next = 19;
          return regeneratorRuntime.awrap(moveFileToParsed(record.s3.object.key));

        case 19:
          _iteratorNormalCompletion = true;
          _context2.next = 6;
          break;

        case 22:
          _context2.next = 28;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 28:
          _context2.prev = 28;
          _context2.prev = 29;

          if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
            _context2.next = 33;
            break;
          }

          _context2.next = 33;
          return regeneratorRuntime.awrap(_iterator["return"]());

        case 33:
          _context2.prev = 33;

          if (!_didIteratorError) {
            _context2.next = 36;
            break;
          }

          throw _iteratorError;

        case 36:
          return _context2.finish(33);

        case 37:
          return _context2.finish(28);

        case 38:
          _context2.next = 44;
          break;

        case 40:
          _context2.prev = 40;
          _context2.t1 = _context2["catch"](0);
          console.error("Parse and remove error---", _context2.t1);
          return _context2.abrupt("return", {
            statusCode: 500,
            body: "Error: ".concat(_context2.t1.message || _context2.t1),
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            isBase64Encoded: false
          });

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 40], [4, 24, 28, 38], [29,, 33, 37]]);
};

module.exports = {
  importFileParser: importFileParser
};