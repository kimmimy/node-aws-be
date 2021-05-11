const AWS = require('aws-sdk');

require('dotenv').config();

const catalogList = async () => {
  const s3 = new AWS.S3({ region: process.env.REGION });

  let status = 200;
  let data = [];

  const params = {
    Bucket: process.env.BUCKET,
    Prefix: 'uploaded/',
    Delimiter: '/'
  };

  try {
    const catalogs = await s3.listObjectsV2(params).promise();

    data = catalogs.Contents;
  } catch (err) {
    console.error('error', err);
    status = 500;
  }

  const response = {
    statusCode: status,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data
      .filter(content => content.Size)
      .map(catalog => `https://${process.env.BUCKET}.s3.amazonaws.com/${catalog.Key}`))
  };

  return response;
};

module.exports = { catalogList };