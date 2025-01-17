import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    data:{
        type:Object,
        required:true
    }
})

const User=mongoose.model("User",UserSchema);

export default User;