// "use server";
// import path from "path";
// import sharp from "sharp";
// import { writeFile } from "fs/promises";

// export const fileUpload = async (
//   data: any,
//   pathFolder: string,
//   imageName: string,
// ) => {
//   const file: File | null = data.get("file") as unknown as File;
//   const bytes = await file.arrayBuffer();
//   const base64 = Buffer.from(bytes);
//   const finalPath = path.join(
//     "/public/uploads/files",
//     pathFolder,
//     imageName + file.type,
//   );
//   await writeFile(finalPath, base64);
// };

// export const imageUpload = async (
//   data: any,
//   pathFolder: string,
//   imageName: string,
// ) => {
//   const image: File | null = data.get("image") as unknown as File;
//   if (!image) {
//     return { status: false };
//   }
//   const bytes = await image.arrayBuffer();
//   const base64 = Buffer.from(bytes);
//   const finalPath = path.join(
//     "public/uploads/images",
//     pathFolder,
//     imageName + ".jpeg",
//   );
//   await sharp(base64).resize(500, 500).jpeg({ quality: 95 }).toFile(finalPath);
//   return {
//     status: true,
//   };
// };

// export const testUpload = async (data: FormData) => {
//   const test = data.getAll("images");
//   // console.log(test);
//   test.forEach((el) => console.log(el));
// };
