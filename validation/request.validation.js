import {z} from "zod" ;


//validation schema for signup routes
export const signupPostRequestBodySchema= z.object({
    firstname:z.string(),
    lastname:z.string().optional(),
    email:z.string().email(),
    password:z.string().min(3),
})
// validation schema for login route
export const loginPostRequestBodySchema= z.object({
    email:z.string().email(),
    password:z.string().min(3),
})

// validation schema for shoten url

export const shortenPostRequestBodySchema= z.object({
    url:z.string().url(),

})