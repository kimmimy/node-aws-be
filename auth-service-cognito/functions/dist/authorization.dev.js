'use strict';

module.exports.get = function (event, context, callback) {
  console.log(context);
  console.log(event);
  var response = {
    statusCode: 200,
    body: JSON.stringify({
      message: event
    })
  };
  callback(null, response);
};

module.exports.post = function (event, context, callback) {
  console.log(context);
  console.log(event);
  var response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Password sent.'
    })
  };
  callback(null, response);
};