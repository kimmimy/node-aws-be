// const AWS =require('aws-sdk');

require('dotenv').config();

const catalogUpload = async (event) => {
  //   const catalogName = event.queryStringParameters.name;
  //   const catalogPath = `uploaded/${catalogName}`;

  //   console.log('Incoming catalogName ---', catalogName);

  //   console.log('process.env.REGION',process.env.REGION);

  //   const s3 = new AWS.S3({ region: process.env.REGION, signatureVersion: 'v4' });

  //   const params = {
  //       Bucket: process.env.BUCKET,
  //       Key: catalogPath,
  //       Expires: 60,
  //       ContentType: 'text/csv',
  //       ACL: 'public-read',
  //   };

  //   return new Promise((resolve, reject) => {
  //       s3.getSignedUrl('putObject', params, (error, url) => {
  //           if (error) {
  //               return reject(error);
  //           }

  //           console.log('in Promise  URL -------', url);

  //           resolve({
  //               statusCode: 200,
  //               headers: { 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Credentials": true },
  //               body: url
  //           });
  //       })
  //   });
};

module.exports = { catalogUpload };