const AWS = require('aws-sdk');
const сsv = require('csv-parser');
const { REGION, BUCKET } = require('../contsnts');

const parseCSVFile = (name) => {
  console.log("Parse CSV ---");

  const results = [];

  const s3 = new AWS.S3({ region: REGION });

  return new Promise((res, rej) => {
    s3.getObject({
      Bucket: BUCKET,
      Key: name,
    })
      .createReadStream()
      .pipe(сsv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log('Parse result----', results);
        res();
      })
      .on("error", (error) => {
        console.error("CSV parse error");
        rej(error);
      });
  });
}

const moveFileToParsed = async (name) => {
  console.log("move file to parsed", name);
  const s3 = new AWS.S3({ region: REGION });

  console.log('name----', name);

  await s3.copyObject({
    Bucket: BUCKET,
    CopySource: BUCKET + "/" + name,
    Key: name.replace("uploaded", "parsed"),
  })
    .promise();

  console.log("File added to 'parced folder", name.replace("uploaded", "parsed"));

  await s3.deleteObject({
    Bucket: BUCKET,
    Key: name,
  })
    .promise();

  console.log("Deleted file from uploaded folder", name);
}

const importFileParser = async (event) => {
  try {
    console.log('event-----', event)

    for await (const record of event.Records) {
      await parseCSVFile(record.s3.object.key);
      await moveFileToParsed(record.s3.object.key);
    }
  } catch (error) {
    console.error("Parse and remove error---", error);

    return {
      statusCode: 500,
      body: `Error: ${error.message || error}`,
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
      isBase64Encoded: false
    }
  }
}

module.exports = { importFileParser };