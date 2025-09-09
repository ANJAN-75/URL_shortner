import {pgTable,uuid,varchar,text,timestamp} from "drizzle-orm/pg-core";
import {userTable} from "./user.model.js"
export const urlTables=pgTable("urls",{
    id:uuid().primaryKey().defaultRandom(),
    shortCode:varchar("code",{length:155}).notNull().unique(),
    targetURL:text().notNull(),

    userId:uuid("user_Id").references(()=>userTable.id).notNull(),

    createdAt:timestamp("created_at").defaultNow().notNull(),
    updateAt:timestamp("update_at").$onUpdate(()=> new Date()),
})