"use strict";

var AWS = require('aws-sdk');

var BUCKET = 'rsschool-nodejs-aws-task5';
module.exports = {
  thumbnailsList: function thumbnailsList() {
    var s3, status, thumbnails, params, s3Response, response;
    return regeneratorRuntime.async(function thumbnailsList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            s3 = new AWS.S3({
              region: 'eu-west-1'
            });
            status = 200;
            thumbnails = [];
            params = {
              Bucket: BUCKET,
              Prefix: 'thumbnails/'
            };
            _context.prev = 4;
            _context.next = 7;
            return regeneratorRuntime.awrap(s3.listObjectsV2(params).promise());

          case 7:
            s3Response = _context.sent;
            thumbnails = s3Response.Contents;
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            status = 500;

          case 15:
            response = {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify(thumbnails.filter(function (t) {
                return t.Size;
              }).map(function (t) {
                return "https://".concat(BUCKET, ".s3.amazon.com/").concat(t.Key);
              }))
            };
            return _context.abrupt("return", response);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 11]]);
  }
};