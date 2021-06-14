"use strict";

var AWS = require('aws-sdk');

var _require = require('../contsnts'),
    REGION = _require.REGION,
    BUCKET = _require.BUCKET;

var catalogList = function catalogList() {
  var s3, status, data, params, catalogs, response;
  return regeneratorRuntime.async(function catalogList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          s3 = new AWS.S3({
            region: REGION
          });
          status = 200;
          data = [];
          params = {
            Bucket: BUCKET,
            Prefix: 'uploaded/',
            Delimiter: '/'
          };
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(s3.listObjectsV2(params).promise());

        case 7:
          catalogs = _context.sent;
          data = catalogs.Contents;
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.error('error', _context.t0);
          status = 500;

        case 15:
          response = {
            statusCode: status,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data.filter(function (content) {
              return content.Size;
            }).map(function (catalog) {
              return "https://".concat(BUCKET, ".s3.amazonaws.com/").concat(catalog.Key);
            }))
          };
          return _context.abrupt("return", response);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

module.exports = {
  catalogList: catalogList
};