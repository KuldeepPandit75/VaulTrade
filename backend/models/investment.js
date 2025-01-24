import mongoose from "mongoose";

const InvestmentSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    stockName:{
        type:String,
        required:true
    },
    buyPrice:{
        type:mongoose.Schema.Types.Decimal128,
        required:true
    },
    dateTime:{
        type: Date,
        required:true
    }
})

const Investment= mongoose.model("Investment",InvestmentSchema)

export default Investment