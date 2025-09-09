import { error } from "console";
import express from "express";
import {db} from "../db/index.js";
import { userTable } from "../models/user.model.js";
import {getUserByEmail,createUser} from "../services/user.service.js";
import {hashedPasswordWithSalt} from "../utils/hash.js";
import {signupPostRequestBodySchema,loginPostRequestBodySchema} from "../validation/request.validation.js";
import jwt from "jsonwebtoken";
import {createUserToken} from "../utils/token.js"

const router = express.Router();
// signup route
router.post("/signup",async(req,res)=>{
    const validationResult=await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({error:validationResult.error.format()})
    }
    const {firstname,lastname,email,password}=validationResult.data;
 
    const existingUser=await getUserByEmail(email);

if(existingUser){
    return res.status(404).json({error:`user with this email ${email} already exist`});
}


const{salt,password:hashedPassword}=hashedPasswordWithSalt(password)


   const user= await createUser(
    email,
    firstname,
    lastname,
    salt,
    hashedPassword,
   )

    return res.status(201).json({data:{userId:user.id}})
})

// login route
router.post("/login",async(req,res)=>{
    const validationResult=await loginPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        res.status(404).json({error:validationResult.error.format()})
    }
    const {email,password}=validationResult.data;
    const user=await getUserByEmail(email);
    if(!user){
        return res.status(404).json({error:`user with this email ${email} not exist`})
    }
    const{password:hashedPassword}=hashedPasswordWithSalt(password,user.salt) ;

    if(user.password !== hashedPassword){
        return res.status(400).json({error:"Invalid password"})
    }
    // const token=jwt.sign({id:user.id},process.env.SECRET_KEY);
    const token= await createUserToken({id:user.id})

    return res.json({token});
})



export default router;
