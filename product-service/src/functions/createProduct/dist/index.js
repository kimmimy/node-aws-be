"use strict";
exports.__esModule = true;
var handlerResolver_1 = require("../../libs/handlerResolver");
var createProduct = {
    handler: handlerResolver_1.handlerPath(__dirname) + "/handler.main",
    events: [
        {
            http: {
                method: 'post',
                path: 'products',
                cors: true
            }
        }
    ]
};
exports["default"] = createProduct;
