"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TUNDA DULU
lib / redisClient.js;
var redis = new _ioredis["default"]({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379 // password: process.env.REDIS_PASSWORD // jika pakai auth

});
var _default = redis;
exports["default"] = _default;