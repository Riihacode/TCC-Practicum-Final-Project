"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllerUser = require("../apiControllers/controllerUser.js");

var _refreshToken = require("../apiMiddleware/token/refreshToken.js");

var _verifyToken = require("../apiMiddleware/token/verifyToken.js");

var _middlewareUserCheckMatch = require("../apiMiddleware/user/middlewareUserCheckMatch.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// implementasi token
var router = _express["default"].Router(); // [ Content Creator Account Data ]


router.post("/users/register", _controllerUser.registerUser); // router.put("/users/:user_id/username", verifyToken, checkUserIdMatch, updateUsername);

router.put("/users/username", _verifyToken.verifyToken, _controllerUser.updateUsername);
router["delete"]("/users/:user_id", _verifyToken.verifyToken, _middlewareUserCheckMatch.checkUserIdMatch, _controllerUser.deleteUser);
router.get("/users/:user_id", _controllerUser.getUserById); // Mempermudah ketika melakukan pengeditan akun
// [ Login State ]

router.post("/users/login", _controllerUser.loginUser);
router["delete"]("/users/logout", _verifyToken.verifyToken, _controllerUser.logoutUser);
router.get("/token", _refreshToken.refreshToken); // Implementasi token
// [ Photo Profile Account File ]

router.post("/users/:user_id/profile-picture", _verifyToken.verifyToken, _middlewareUserCheckMatch.checkUserIdMatch, _controllerUser.uploadProfilePic);
router.put("/users/:user_id/profile-picture", _verifyToken.verifyToken, _middlewareUserCheckMatch.checkUserIdMatch, _controllerUser.updateProfilePic);
router["delete"]("/users/:user_id/profile-picture", _verifyToken.verifyToken, _middlewareUserCheckMatch.checkUserIdMatch, _controllerUser.deleteProfilePic);
var _default = router;
exports["default"] = _default;