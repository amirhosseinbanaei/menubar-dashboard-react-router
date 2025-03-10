import connectToDB from "@/lib/db";
import extraItmeModel from "@/models/extraItemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  connectToDB();
  const extraItems = await extraItmeModel.find({ project: "menubar" });

  return NextResponse.json(
    { message: "Successfully Get Categories.", data: extraItems },
    { status: 200 },
  );
}
