"use strict";
exports.__esModule = true;
exports.main = void 0;
var lambda_1 = require("@libs/lambda");
var lambdaFunction_1 = require("./lambdaFunction");
exports.main = lambda_1.middyfy(lambdaFunction_1.createProduct);
