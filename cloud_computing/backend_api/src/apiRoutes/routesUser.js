import express from "express";
import {
    registerUser, 
    loginUser, 
    logoutUser,
    getUserById,
    deleteUser, 
    updateUsername,
    uploadProfilePic, 
    deleteProfilePic, 
    updateProfilePic 
} from "../apiControllers/controllerUser.js";
// implementasi token
import { refreshToken } from "../apiMiddleware/token/refreshToken.js";
import { verifyToken } from "../apiMiddleware/token/verifyToken.js";
import { checkUserIdMatch } from "../apiMiddleware/user/middlewareUserCheckMatch.js";

const router = express.Router();

// [ Content Creator Account Data ]
router.post("/users/register", registerUser);
// router.put("/users/:user_id/username", verifyToken, checkUserIdMatch, updateUsername);
router.put("/users/username", verifyToken, updateUsername);
router.delete("/users/:user_id", verifyToken, checkUserIdMatch, deleteUser);
router.get("/users/:user_id", getUserById);  // Mempermudah ketika melakukan pengeditan akun

// [ Login State ]
router.post("/users/login", loginUser);
router.delete("/users/logout", verifyToken, logoutUser);
router.get("/token", refreshToken); // Implementasi token

// [ Photo Profile Account File ]
router.post("/users/:user_id/profile-picture", verifyToken, checkUserIdMatch, uploadProfilePic);
router.put("/users/:user_id/profile-picture", verifyToken, checkUserIdMatch, updateProfilePic);
router.delete("/users/:user_id/profile-picture", verifyToken, checkUserIdMatch, deleteProfilePic);

export default router;