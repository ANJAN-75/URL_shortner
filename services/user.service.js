import {db} from "../db/index.js";
import { userTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const getUserByEmail=async(email)=>{
    const [existingUser]=await db
       .select({
        id:userTable.id,
        firstname:userTable.firstname,
        lastname:userTable.lastname,
        email:userTable.email,
        password:userTable.password,
        salt:userTable.salt
       })
       .from(userTable)
       .where(eq(userTable.email,email));
       return existingUser;
}

export const createUser = async (email, firstname, lastname, salt, password) => {
  const [user] = await db.insert(userTable).values({
    email,
    firstname,
    lastname,
    salt,
    password,  
  }).returning({ id: userTable.id });

  return user;
};