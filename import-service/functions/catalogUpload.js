const AWS =require('aws-sdk');

const { REGION, BUCKET } = require('../contsnts');

const catalogUpload = async (event) => {
  const catalogName = event.queryStringParameters.name;
  const catalogPath = `uploaded/${catalogName}`;
  console.log('REGION', REGION);
  console.log('BUCKET', BUCKET);

  console.log('Incoming catalogName ---', catalogName);

  const s3 = new AWS.S3({ region: REGION, signatureVersion: 'v4' });

  const params = {
    Bucket: BUCKET,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv',
    ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        return reject(error);
      }

      console.log('in Promise  URL -------', url);

      resolve({
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: url
      });
    })
  });
};

module.exports = { catalogUpload };