import {validateUserToken} from "../utils/token.js"
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */


export const authenticationMiddleware=(req,res,next)=>{
    const authHeader=req.headers["authorization"]

    if(!authHeader) return next();
    if(!authHeader.startsWith("Bearer")){
        return res.status(404).json({ error:"authorization must be start with bearer"})
    }
    const [_,token]=authHeader.split(" ")

    const payload=validateUserToken(token)

    req.user=payload;
    next()
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

export const ensureAuthenticated=(req,res,next)=>{
    if(!req.user || !req.user.id){
        return res
        .status(401)
        .json({ error: "You must be logged in" });

    }
    next();
}