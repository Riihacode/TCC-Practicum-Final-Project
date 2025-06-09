"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllerVideo = require("../apiControllers/controllerVideo.js");

var _middlewareRateLimit = _interopRequireDefault(require("../apiMiddleware/rateLimit/middlewareRateLimit.js"));

var _middlewareVideo = _interopRequireDefault(require("../apiMiddleware/video/middlewareVideo.js"));

var _middlewareUserValidateUserId = _interopRequireDefault(require("../apiMiddleware/user/middlewareUserValidateUserId.js"));

var _middlewareVideoValidateVideoId = _interopRequireDefault(require("../apiMiddleware/video/middlewareVideoValidateVideoId.js"));

var _middlewareVideoSyncWithStorage = _interopRequireDefault(require("../apiMiddleware/video/middlewareVideoSyncWithStorage.js"));

var _verifyToken = require("../apiMiddleware/token/verifyToken.js");

var _middlewareUserCheckMatch = require("../apiMiddleware/user/middlewareUserCheckMatch.js");

var _middlewareVideoOwnership = require("../apiMiddleware/video/middlewareVideoOwnership.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var router = _express["default"].Router();

console.log(_typeof(_controllerVideo.uploadVideo)); // Harus "function"

console.log(_typeof(_middlewareUserValidateUserId["default"])); // Harus "function"

console.log(_typeof(_middlewareVideo["default"].single)); // Harus "function"
// [ CONTENT CREATOR ]
// Video

router.post("/users/:user_id/videos", _verifyToken.verifyToken, _middlewareUserCheckMatch.checkUserIdMatch, _middlewareRateLimit["default"], _controllerVideo.uploadVideo);
router.put("/videos/:video_id", _verifyToken.verifyToken, _middlewareVideoOwnership.checkVideoOwnership, _controllerVideo.updateVideoMetadata);
router["delete"]("/videos/:video_id", _verifyToken.verifyToken, _middlewareVideoOwnership.checkVideoOwnership, _middlewareVideoValidateVideoId["default"], _controllerVideo.deleteVideo); // Thumbnail

router.post("/users/:user_id/videos/:video_id/thumbnail", _verifyToken.verifyToken, _middlewareVideoOwnership.checkVideoOwnership, _middlewareVideoValidateVideoId["default"], _controllerVideo.uploadVideoThumbnail);
router.put("/videos/:video_id/thumbnail", _verifyToken.verifyToken, _middlewareVideoOwnership.checkVideoOwnership, _middlewareVideoValidateVideoId["default"], _controllerVideo.updateVideoThumbnail);
router["delete"]("/videos/:video_id/thumbnail", _verifyToken.verifyToken, _middlewareVideoOwnership.checkVideoOwnership, _middlewareVideoValidateVideoId["default"], _controllerVideo.deleteVideoThumbnail);
router.get("/videos/:video_id/thumbnail", _middlewareVideoValidateVideoId["default"], _controllerVideo.getVideoThumbnail); // untuk memudahkan content creator untuk mengecek thumbnail sebelumnya untuk memutuskan akan diganti atau tidak
// [ VIEWER ]
// Videos

router.get("/videos", _controllerVideo.getAllVideos); // Get seluruh video yang nanti ditampilkan di homepage

router.get("/videos/:video_id", _middlewareVideoValidateVideoId["default"], _controllerVideo.getVideoId); // Get suatu video ketika viewer mengeklik salah satu video-nya
// Channel

router.get("/channels/:slug/videos", _controllerVideo.getVideosBySlug); // Get seluruh video ketika menekan suatu channel

router.get("/channels/:slug/profile", _controllerVideo.getUserBySlug); // untuk profil channel publik ketika dicek viewer

var _default = router;
exports["default"] = _default;