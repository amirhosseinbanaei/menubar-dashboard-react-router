import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import categoryModel from "@/models/categoryModel";

export async function GET(req: NextRequest, res: NextResponse) {
  connectToDB();
  const categories = await categoryModel
    .find({ project: "menubar" })
    .sort("order");

  return NextResponse.json(
    { message: "Successfully Get Categories.", data: categories },
    { status: 200 },
  );
}

// export async function POST(request: Request) {
//   const { itemId } = request.body;
//   try {
//     if (mongoose.isValidObjectId(itemId)) {
//       const singleItem = await itemModel.findById(itemId).populate("category");
//       console.log(singleItem);
//       if (!singleItem) {
//         return {
//           ok: false,
//           error: "Item not found !!",
//           messageCode: "notFound",
//         };
//       }
//       const data = Object.assign(singleItem);
//       return data;
//     } else {
//       return {
//         ok: false,
//         error: "Inavalid item ID !!",
//         messageCode: "invalidId",
//       };
//     }
//   } catch (error) {
//     return NextResponse.json({
//       ok: false,
//       error: "Internal Server Error !!!",
//       messageCode: "internalError",
//     });
//   }
// }

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
