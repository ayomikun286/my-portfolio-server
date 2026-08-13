import "./config/env.js";
import express from "express";
import cors from "cors";
import AUTH from "./routers/auth.js";
import mongoose from "mongoose";
import {successResponse} from "./utils/response.js"
import {corsOptions} from "./config/cores.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors(corsOptions));
app.use(AUTH);

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("DBconnected")).catch((err)=> console.log(err));


app.get("/", (req,res)=>{
    return successResponse(res,'server is running')
})

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});