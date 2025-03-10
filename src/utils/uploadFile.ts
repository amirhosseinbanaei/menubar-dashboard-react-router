"use client";

// import { imageUpload } from "@/server-actions/file/file-action";
// import shortUUID from "short-uuid";

// export const uploadFilesToServer = async (
//   file: File,
//   isImage: boolean,
//   pathFolder: "category" | "product" | "file",
//   specificName?: string,
// ) => {
//   try {
//     if (isImage) {
//       const formData = new FormData();
//       formData.append("image", file);
//       const randomId = shortUUID.generate();
//       // const { status } = await imageUpload(
//       //   formData,
//       //   pathFolder,
//       //   specificName ? specificName : randomId,
//       // );
//       // if (status) {
//       //   return randomId;
//       // }
//     }
//   } catch (error) {
//    console.log(error);
//   }
// };

// import { imageUpload } from "@/server-actions/file/file-action";
// import shortUUID from "short-uuid";

// const uploadFile = async (
//   file: File,
//   isImage: boolean,
//   pathFolder: string,
//   specificName?: string,
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (isImage) {
//         const formData = new FormData();
//         formData.append("image", file);
//         const randomId = shortUUID.generate();
//         const { status } = await imageUpload(
//           formData,
//           pathFolder,
//           specificName ? specificName : randomId,
//         );
//         if (status) {
//           resolve(randomId);
//         } else {
//           reject(new Error("Can not upload file"));
//         }
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const uploadFilesToServer = async (
//   files: FileList[],
//   isImage: boolean,
//   pathFolder: "category" | "product" | "file",
//   specificName?: string,
// ) => {
//   const promises = Array.from(files).map((file: any) =>
//     uploadFile(file, isImage, pathFolder, specificName),
//   );

//   try {
//     const fileNames = await Promise.all(promises);
//     return fileNames;
//   } catch (error) {
//     throw error;
//   }
// };

// import { imageUpload } from "@/server-actions/file/file-action";
// import shortUUID from "short-uuid";

// type UploadFileResponse = string;

// const uploadFile = async (
//   file: File,
//   isImage: boolean,
//   pathFolder: "category" | "product" | "file",
//   specificName?: string
// ): Promise<UploadFileResponse> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (isImage) {
//         const formData = new FormData();
//         formData.append("image", file);
//         const randomId = shortUUID.generate();
//         const { status } = await imageUpload(
//           formData,
//           pathFolder,
//           specificName ? specificName : randomId
//         );
//         if (status) {
//           resolve(randomId);
//         } else {
//           reject(new Error("Can not upload file"));
//         }
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const uploadFilesToServer = async (
//   files: FileList,
//   isImage: boolean,
//   pathFolder: "category" | "product" | "file",
//   specificName?: string
// ): Promise<UploadFileResponse[]> => {
//   const fileNames: UploadFileResponse[] = [];

//   const uploadQueue = async () => {
//     for (const file of Array.from(files)) {
//       try {
//         const fileName = await uploadFile(file, isImage, pathFolder, specificName);
//         fileNames.push(fileName);
//       } catch (error) {
//         throw error;
//       }
//     }
//   };

//   await uploadQueue();
//   return fileNames;
// };
