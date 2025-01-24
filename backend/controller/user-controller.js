import axios from "axios";
import mongoose from "mongoose";
import User from "../models/user.js";
import Investment from "../models/investment.js";
import Transaction from "../models/transaction.js";

export const getUserInfo = async (req, res) => {
    
    try {
        const {email}=req.body;
        const user=await User.find({email});
        if(user.length==0){
            return res.status(404).json({message:"No User Found!"});
        }
        return res.status(200).send(user[0])
    } catch (error) {
        return res.status(500).json({msg:"Error while fetching data"})
    }

}

export const createUser= async(req,res)=>{
    try {
        const {data}=req.body;

        console.log(data)

        const user=await User.find({email:data.email});

        if(user.length!=0){
            return res.status(200).send(user[0])
        }

        const newUser= new User({
            ...data
        })

        const stat=await newUser.save();


        

        return res.status(201).send(stat)

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

export const addMoney=async(req,res)=>{
    // try {
        const {email,addAmount}=req.body;
    
        const user=await User.find({email});
    
        let id=user[0]._id
        
        let stat=await User.findByIdAndUpdate(id,{balance:Number(user[0].balance)+Number(addAmount)},{new:true});
        console.log(stat);

        const newTransaction=new Transaction({
            email,
            amount:addAmount,
            dateTime: new Date(),
            categ: "addMoney"
        })

        await newTransaction.save()
        
        return res.status(200).send(stat)
    // } catch (error) {
    //     return res.status(500).json({error})
    // }
}

export const buyStock=async(req,res)=>{
    try {
        const {email,stockName,buyPrice}=req.body;

        const newInvestment= new Investment({
            email,
            buyPrice,
            stockName,
            dateTime: new Date()
        })

        const newTransaction=new Transaction({
            email,
            amount:buyPrice,
            dateTime: new Date(),
            categ: "stockBuy"
        })

        const user=await User.find({email});
    
        let id=user[0]._id

        if(user[0].balance-buyPrice<0){
            return res.status(404).json({message:"Insufficient Balance!"})
        }

        let stat=await User.findByIdAndUpdate(id,{balance: user[0].balance-buyPrice});

        await newInvestment.save();
        await newTransaction.save();

        return res.status(200).send(stat);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}