import express from "express";
import "dotenv/config"
import Connection from "./database/db.js"
import router from "./routes/route.js";
import cors from "cors"

const app=express();
const port= 2020 || process.env.PORT;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/",router)

app.listen(port,()=>{
    console.log("listening on port, ", port);
});

Connection();

