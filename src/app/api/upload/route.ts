import path from "path";
import sharp from "sharp";
import shortUUID from "short-uuid";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const files = (await req.formData()).getAll("file");
    const filePath = req.nextUrl.searchParams.get("filePath");
    const specificFileName = req.nextUrl.searchParams.get("fileName");
    const fileDestination = filePath
      ? `./public/uploads/${filePath}`
      : "./public/uploads/";

    const sendingFileNames: string[] = [];
    specificFileName && sendingFileNames.push(specificFileName);

    files.forEach(async (file: any) => {
      const randomId = shortUUID.generate();
      !specificFileName && sendingFileNames.push(randomId);

      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes);
      const fileName = specificFileName || randomId;

      const finalFileInfo = (fileType: string) =>
        path.join(fileDestination, fileName + fileType);

      if (file.type.includes("image")) {
        return await sharp(base64)
          .resize(500, 500)
          .jpeg({ quality: 95 })
          .toFile(finalFileInfo(".jpeg"));
      } else {
        const fileType = `.${file.name.split(".")[1]}`;
        return await writeFile(finalFileInfo(fileType), base64);
      }
    });

    return NextResponse.json(
      { message: "Successfully upload image.", data: sendingFileNames  },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to upload file", error },
      { status: 404 },
    );
  }
}