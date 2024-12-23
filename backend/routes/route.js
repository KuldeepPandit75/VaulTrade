import express from "express";
import validateAccessToken from "../controller/auth-controller.js";
import { getUserInfo } from "../controller/user-controller.js";

const router=express.Router();

router.post("/userinfo",validateAccessToken,getUserInfo);

export default router;