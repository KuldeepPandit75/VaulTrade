import express from "express";
import validateAccessToken from "../controller/auth-controller.js";
import { getUserInfo } from "../controller/user-controller.js";
import { getStocks } from "../controller/stock-controller.js";

const router=express.Router();

router.post("/userinfo",validateAccessToken,getUserInfo);
router.post("/stocks",getStocks);

export default router;