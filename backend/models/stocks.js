import mongoose from 'mongoose'

const StockSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    marketPrice:{
        type:String,
        required:true,
    },
    priceChange:{
        type:String,
        required:true,
    },
    closePrice:{
        type:String,
        required:true,
    },
    marketCap:{
        type:String,
        required:true,
    },
    companyLink:{
        type:String,
        required:true,
    },
})

const Stock=mongoose.model("Stock",StockSchema);

export default Stock