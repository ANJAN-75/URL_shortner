import { db } from "../db/index.js";
import { urlTables } from "../models/url.model.js";
import { nanoid } from "nanoid";

export const addUrl = async (userId, url, code) => {
  const [result] = await db
    .insert(urlTables)
    .values({
      shortCode: code ?? nanoid(6), // use provided code or generate one
      targetURL: url,
      userId,
    })
    .returning({
      id: urlTables.id,
      shortCode: urlTables.shortCode,
      targetURL: urlTables.targetURL,
    });

  return result;
};
