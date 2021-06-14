const { catalogList } = require('./functions/catalogList');
const { importFileParser } = require('./functions/importFileParser');
const {catalogUpload}  = require('./functions/catalogUpload');

require('dotenv').config();

const AWS = require('aws-sdk');


module.exports = {
  catalogList,
  importFileParser,
  catalogUpload
};