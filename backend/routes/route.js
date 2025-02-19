import express from "express";
import validateAccessToken from "../controller/auth-controller.js";
import { addMoney, buyStock, createUser, getUserInfo, getUserInvestments } from "../controller/user-controller.js";
import { getStockData, getStocks } from "../controller/stock-controller.js";

const router=express.Router();

router.post("/login",createUser);
router.post("/addmoney",validateAccessToken,addMoney);
router.post("/userinfo",validateAccessToken,getUserInfo);
router.post("/stocks",validateAccessToken,getStocks);
router.post("/stock",validateAccessToken,getStockData);
router.post("/buyStock",validateAccessToken,buyStock);
router.post("/getUserInvestments",validateAccessToken,getUserInvestments);

export default router;