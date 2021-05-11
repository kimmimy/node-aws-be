"use strict";

var AWS = require('aws-sdk');

var _require = require('../contsnts'),
    REGION = _require.REGION,
    BUCKET = _require.BUCKET;

var catalogUpload = function catalogUpload(event) {
  var catalogName, catalogPath, s3, params;
  return regeneratorRuntime.async(function catalogUpload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          catalogName = event.queryStringParameters.name;
          catalogPath = "uploaded/".concat(catalogName);
          console.log('REGION', REGION);
          console.log('BUCKET', BUCKET);
          console.log('Incoming catalogName ---', catalogName);
          s3 = new AWS.S3({
            region: REGION,
            signatureVersion: 'v4'
          });
          params = {
            Bucket: BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv',
            ACL: 'public-read'
          };
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            s3.getSignedUrl('putObject', params, function (error, url) {
              if (error) {
                return reject(error);
              }

              console.log('in Promise  URL -------', url);
              resolve({
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                body: url
              });
            });
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  catalogUpload: catalogUpload
};