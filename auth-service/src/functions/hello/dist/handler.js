"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.main = void 0;
require("source-map-support/register");
var lambda_1 = require("@libs/lambda");
var tokenAuthorizer = function (event, _, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var token, creds, _a, username, password, storedPassword, effect, policy;
    return __generator(this, function (_b) {
        console.log(JSON.stringify(event), 'events');
        if (event.type !== 'TOKEN') {
            console.log(event.type, 'TYPE');
            callback('Unauthorized');
            return [2 /*return*/];
        }
        try {
            token = event.authorizationToken;
            creds = token.split(' ')[1];
            _a = Buffer.from(creds, 'base64').toString('utf-8').split(':'), username = _a[0], password = _a[1];
            console.log('password', password);
            console.log('username', username);
            storedPassword = process.env[username];
            console.log('storedPassword', storedPassword);
            effect = 'test_password' !== password ? 'Deny' : 'Allow';
            console.log('effect', effect);
            console.log('---------------');
            console.log('creds', creds);
            console.log('event.methodArn', event.methodArn);
            console.log('effect', effect);
            policy = generatePolicy(creds, event.methodArn, effect);
            console.log(policy, "policy");
            callback(null, policy);
        }
        catch (err) {
            callback("Unauthorized: " + (err.message || err));
        }
        return [2 /*return*/];
    });
}); };
function generatePolicy(principalId, resource, effect) {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };
}
exports.main = lambda_1.middyfy(tokenAuthorizer);
