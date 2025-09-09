import jwt from "jsonwebtoken";
import {userTokenSchema} from "../validation/token.validation.js"
const JWT_secret=process.env.SECRET_KEY;

export const  createUserToken=async(payload)=>{
    const validationResult=await userTokenSchema.safeParseAsync(payload)

    if(validationResult.error) throw new Error(validationResult.error.message);
    const payLoadValidate=validationResult.data
    const token =jwt.sign(payLoadValidate,JWT_secret);
    return token ;
}

export const validateUserToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_secret); // ✅ scoped variable
    return payload;
  } catch (e) {
    return null;
  }
};