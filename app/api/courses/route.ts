import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

import db from "@/database/drizzle";
import { courses } from "@/database/schema";

export const GET = async () => {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.query.courses.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .insert(courses)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
