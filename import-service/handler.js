const AWS = require('aws-sdk')

import { BUCKET } from "../contsnts"


module.exports = {
  thumbnailsList: async function () {
      const s3 = new AWS.S3({ region: 'eu-west-1' });
      let status = 200;
      let thumbnails = [];

      const params = {
        Bucket: BUCKET,
        Prefix: 'thumbnails/', 
      };

      try{
        const s3Response = await s3.listObjectsV2(params).promise();
        thumbnails = s3Response.Contents
      } catch( error ){
        console.log(error)
        status = 500
      }

      const response = {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(
          thumbnails
          .filter(t=>t.Size)
          .map(t=>`https://${BUCKET}.s3.amazon.com/${t.Key}`)
        )
      };

      return response;
    },
  }