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
        const {email,stockName,buyPrice,stockQuantity}=req.body;

        const exists=await Investment.findOne({email,stockName});

        if(exists){
            const user=await User.find({email});
            
            await Investment.findOneAndUpdate({email,stockName},{stockQuantity: exists.stockQuantity+stockQuantity})

            let id=user[0]._id
    
            if(user[0].balance-buyPrice*stockQuantity<0){
                return res.status(404).json({message:"Insufficient Balance!"})
            }
    
            let stat=await User.findByIdAndUpdate(id,{balance: user[0].balance-buyPrice*stockQuantity});

            res.status(200).send(stat);
        }else{
            const newInvestment= new Investment({
                email,
                buyPrice,
                stockName,
                stockQuantity,
                dateTime: new Date()
            })
    
            await newInvestment.save();
            
            const newTransaction=new Transaction({
                email,
                amount:buyPrice,
                dateTime: new Date(),
                categ: "stockBuy"
            })
    
            const user=await User.find({email});
        
            let id=user[0]._id
    
            if(user[0].balance-buyPrice*stockQuantity<0){
                return res.status(404).json({message:"Insufficient Balance!"})
            }
    
            let stat=await User.findByIdAndUpdate(id,{balance: user[0].balance-buyPrice*stockQuantity});
    
            await newTransaction.save();
    
            return res.status(200).send(stat);
            
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}

export const sellStock=async(req,res)=>{
    try {
        const {email,sellQty,stockName,sellPrice}=req.body;
        const sellingAmount=sellQty*sellPrice;

        const client= await User.findOne({email});

        const sellingStock= await Investment.findOne({stockName,email});
        
        if(sellQty>sellingStock.stockQuantity){
            return res.status(400).json({msg:"Insufficient Stocks to Sell"});
        }else if(sellQty==sellingStock.stockQuantity){
            let stat=await User.findByIdAndUpdate(client._id,{balance: Number(client.balance)+sellingAmount});
            await Investment.findOneAndDelete({stockName,email});
            return res.status(200).send(stat);
        }else{
            let stat=await User.findByIdAndUpdate(client._id,{balance: Number(client.balance)+sellingAmount});
            await Investment.findOneAndUpdate({stockName,email},{stockQuantity: sellingStock.stockQuantity-sellQty});
            return res.status(200).send(stat);
        }

    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

export const getUserInvestments=async(req,res)=>{
    try {
        const {email}=req.body

        const investments= await Investment.find({email});
        if(investments.length==0){
            return res.status(404).json({message:"User have no Investments!"})
        }
        
        return res.status(200).send(investments)

    } catch (error) {
        return res.status(500).json({msg: "Error while fetching investments of user."})
    }
}