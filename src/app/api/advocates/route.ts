import db from "../../../db";
import { advocates, type Advocate } from "../../../db/schema";

export async function GET() {
  const data = await db.select().from(advocates);
  return Response.json({ data: data as Advocate[] });
}
