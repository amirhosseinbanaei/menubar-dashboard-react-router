"use server";

import connectToDB from "@/lib/db";
import { extraItemValidateSchema } from "@/validators/extraItem-validator";
import extraItmeModel from "@/models/extraItemModel";
import itemModel from "@/models/itemModel";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";

const Internal_Server_Error_Response = {
  ok: false,
  error: "Internal Server Error !!!",
  messageCode: "internalError",
};

export const addExtraItemAction = async (data: ExtractItemInterface) => {
  try {
    connectToDB();
    const chekcedData = await extraItemValidateSchema.parseAsync(data);
    if (!chekcedData) {
      return {
        ok: false,
        message: "Sent invalid data",
        messageCode: "invalidSentData",
      };
    }
    await extraItmeModel.create({
      ...chekcedData,
      project: "menubar",
    });
    await revalidateTag("extraItems");
    return {
      ok: true,
      message: "Extra Item has successfully created",
      messageCode: "addExtraItemSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const deleteExtraItemAction = async (extraItemId: string) => {
  try {
    if (mongoose.isValidObjectId(extraItemId)) {
      const deleteExtraItem =
        await extraItmeModel.findByIdAndDelete(extraItemId);
      if (!deleteExtraItem) {
        return {
          ok: false,
          error: "Extra item Not Found !",
          messageCode: "notFound",
        };
      }
      await revalidateTag("extraItems");
      return {
        ok: true,
        error: "Extra Item deleted successfully !",
        messageCode: "deleteExtraItemSuccessfully",
      };
    } else {
      return {
        ok: false,
        error: "Inavalid category ID !!",
        messageCode: "invalidId",
      };
    }
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const updateExtraItemAction = async (
  updatedExtraItem: ExtractItemInterface,
) => {
  try {
    connectToDB();
    const extraItemId = updatedExtraItem._id;
    const updateExtraItem = await extraItmeModel.findOneAndUpdate(
      {
        project: "menubar",
        _id: extraItemId,
      },
      { $set: updatedExtraItem },
    );

    if (!updateExtraItem) {
      return {
        ok: false,
        error: "Inavalid category ID !!",
        messageCode: "invalidId",
      };
    }

    await revalidateTag("extraItems");
    return {
      ok: true,
      error: "Extra Item edited successfully !",
      messageCode: "editExtraItemSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};
