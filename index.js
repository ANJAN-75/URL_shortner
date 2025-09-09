import "dotenv/config";
import express from "express"
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import {authenticationMiddleware} from "./middleware/auth.middleware.js"
const port= process.env.port ?? 8000
const app=express()
app.use(express.json());
app.use(authenticationMiddleware)


app.get("/",(req,res)=>{
    return  res.json({sucess:"server was running"});
})

app.use("/user",userRouter);
app.use(urlRouter);
app.listen(port,(req,res)=>{
    console.log("server is listning on 8000 port")
})