import mongoose from "mongoose";

const TransactionSchema= new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    amount:{
        type: mongoose.Schema.Types.Decimal128,
        required:true,
    },
    dateTime:{
        type:Date,
        required:true
    },
    categ:{
        type:String,
        required:true
    }
})

const Transaction= mongoose.model("Transaction",TransactionSchema)

export default Transaction