import express from "express";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { db } from "../db/index.js";
import { urlTables } from "../models/url.model.js";
import { nanoid } from "nanoid";
import {ensureAuthenticated} from "../middleware/auth.middleware.js"
import {addUrl} from "../services/url.service.js"
import { userTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";


const router = express.Router();




// this route for we give a url and its return a shorcode
router.post("/shorten",ensureAuthenticated, async (req, res) => {
  

  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { url, code } = validationResult.data;

   const result = await addUrl(req.user.id, url, code);

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});
//fetching all code by user
router.get("/codes",ensureAuthenticated,async(req,res)=>{
  const codes=await db.select()
  .from(urlTables)
  .where(eq(urlTables.userId,req.user.id));

  return res.json({codes})
})


//redirecting the main url using short code 

router.get("/:shortCode",async(req,res)=>{
  const code =req.params.shortCode;
  const[result]= await db
  .select({
    targetURL:urlTables.targetURL
  })
  .from(urlTables)
  .where(eq(urlTables.shortCode,code))

  if(!result){
    return res.status(404).json({error:"invalid code"})
  }

  return res.redirect(result.targetURL)
})

export default router;
