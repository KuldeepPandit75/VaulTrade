import express from "express";
import "dotenv/config"

const app=express();
const port= 2020 || process.env.PORT

app.listen(port,()=>{
    console.log("listening on port, ", port);
})