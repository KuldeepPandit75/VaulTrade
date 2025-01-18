import axios from "axios";
import mongoose from "mongoose";
import User from "../models/user.js";

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
        
        return res.status(200).send(stat)
    // } catch (error) {
    //     return res.status(500).json({error})
    // }
}