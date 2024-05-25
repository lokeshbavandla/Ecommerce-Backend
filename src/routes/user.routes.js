import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
    getUserDetails,
    changePassword,
    updateUserDetails,
    refreshAccessToken,
    allUsersDetails,
    deleteUser
} from '../controllers/user.controller.js'
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logout);
router.route('/userdetails').get(verifyJWT, getUserDetails);
router.route('/alluserdetails').get(verifyJWT, allUsersDetails);
router.route('/changepassword').patch(verifyJWT, changePassword);
router.route('/updateuserdetails').patch(verifyJWT, updateUserDetails);
router.route('/refreshtoken').post(verifyJWT, refreshAccessToken);
router.route('/delete/:id').delete(verifyJWT, deleteUser);


export default router;