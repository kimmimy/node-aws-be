"use strict";
exports.__esModule = true;
var handlerResolver_1 = require("../../libs/handlerResolver");
exports["default"] = {
    handler: handlerResolver_1.handlerPath(__dirname) + "/handler.main",
    events: [
        {
            http: {
                method: 'get',
                path: 'token',
                cors: true
            }
        }
    ]
};
