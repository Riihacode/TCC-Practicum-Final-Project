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

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.delete("/users/logout", logoutUser);
router.get("/users/:user_id", getUserById);  // Tambahan route GET
router.delete("/users/:user_id", deleteUser);
router.put("/users/:user_id/username", updateUsername);

// Profile picture
router.post("/users/:user_id/profile-picture", uploadProfilePic);
router.put("/users/:user_id/profile-picture", updateProfilePic);
router.delete("/users/:user_id/profile-picture", deleteProfilePic);

// implementasi token
router.get("/token", refreshToken);

export default router;