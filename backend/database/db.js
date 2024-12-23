import mongoose from "mongoose";
import "dotenv/config"


const connection=async()=>{
    const USERNAME=process.env.MDB_USERNAME;
    const PASSWORD=process.env.MDB_PASSWORD;
    try {
        await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster1.rbtvmid.mongodb.net/VaulTrade`);
        console.log("Database Connected Successfully!")
    } catch (error) {
        console.log("Error Connecting to Database!",error);
    }
}

export default connection;