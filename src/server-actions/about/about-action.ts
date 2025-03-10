import connectToDB from "@/lib/db";
import projectModel from "@/models/projectModel";
import { revalidateTag } from "next/cache";

const Internal_Server_Error_Response = {
  ok: false,
  error: "Internal Server Error !!!",
  messageCode: "internalError",
};

export const updateAboutAction = async (data: any) => {
  try {
    connectToDB();
    const updateExtraItem = await projectModel.findOneAndUpdate(
      {
        project: "menubar",
      },
      { $set: data },
    );

    if (!updateExtraItem) {
      return {
        ok: false,
        error: "Inavalid category ID !!",
        messageCode: "invalidId",
      };
    }

    await revalidateTag("projects");
    return {
      ok: true,
      error: "Extra Item edited successfully !",
      messageCode: "editProjectSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};
