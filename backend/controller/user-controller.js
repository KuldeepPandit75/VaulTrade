import axios from "axios";
import mongoose from "mongoose";
import User from "../models/user.js";

export const getUserInfo = async (req, res) => {
    
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.token}`
            }
        });
        if (response.ok) {
            const userInfo = await response.json();
            console.log('User Info:', userInfo);
            return res.status(200).send(userInfo);
        } else {
            console.error('Failed to fetch user info:', response.status, response.statusText);
            return res.status(404).json({msg:response.statusText});
        }
    } catch (error) {
        return res.status(500).json({msg:"Error while fetching data"})
    }

}