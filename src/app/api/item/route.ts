"use server";
import connectToDB from "@/lib/db";
import itemModel from "@/models/itemModel";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  connectToDB();
  const items = await itemModel
    .find({ project: "menubar" })
    .populate("category")
    .sort("order");

  return NextResponse.json(
    { message: "Successfully Get items.", data: items },
    { status: 200 },
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  connectToDB();
  const orderNumber = req.nextUrl.searchParams.get("orderNumber");
  const items = await itemModel
    .find({ project: "menubar" })
    .populate("category")
    .sort("order")
    .exec();
  // Filter items based on the orderNumber in req.body
  const filteredItems: any = await items.filter(
    (item) => item.category && item.category.order == orderNumber,
  );
  return NextResponse.json(
    { message: "Successfully Get items.", data: filteredItems },
    { status: 200 },
  );
}
