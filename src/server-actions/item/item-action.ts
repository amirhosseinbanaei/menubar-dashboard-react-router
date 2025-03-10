"use server";
import { z } from "zod";
import mongoose from "mongoose";
import connectToDB from "@/lib/db";
import itemModel from "@/models/itemModel";
import { revalidateTag } from "next/cache";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import { itemValidateSchema } from "@/validators/item-validator";

const Internal_Server_Error_Response = {
  ok: false,
  error: "Internal Server Error !!!",
  messageCode: "internalError",
};

export const addItemAction = async (data: ItemInterface) => {
  try {
    connectToDB();
    console.log(data);
    const chekcedData = await itemValidateSchema.parseAsync(data);
    if (!chekcedData) {
      return {
        ok: false,
        message: "Sent invalid data",
        messageCode: "invalidSentData",
      };
    }
    await itemModel.create({
      ...chekcedData,
      project: "menubar",
    });
    await revalidateTag("items");
    return {
      ok: true,
      message: "Item has successfully created",
      messageCode: "addSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const deleteItemAction = async (itemId: string) => {
  try {
    connectToDB();
    if (mongoose.isValidObjectId(itemId)) {
      const deletedItem = await itemModel.findByIdAndDelete(itemId);

      if (!deletedItem) {
        return { ok: false, error: "Item Not Found !" };
      }

      await revalidateTag("items");
      return { ok: true };
    } else {
      return { ok: false, error: "Invalid Item Id" };
    }
  } catch (error) {
    return { ok: false, error: "Internal server error!" };
  }
};

export const updateItemOrderAction = async (order: number[]) => {
  try {
    connectToDB();
    const items: any = await itemModel
      .find({ project: "menubar" })
      .sort("order");

    // Params Guide [0, 3] => 0: Old Order Number , 1 : New Order Number
    const [removed] = items.splice(order[0], 1);
    items.splice(order[1], 0, removed);

    items.forEach((item: any, index: number) => {
      item.order = index + 1;
    });

    await itemModel.bulkSave(items);
    revalidateTag("items");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Internal Server Error!" };
  }
};

export const reOrderItemsAction = async () => {
  try {
    connectToDB();
    const items = await itemModel.find({ project: "menubar" }).sort("order");

    items.forEach((category: any, index: number) => {
      category.order = index + 1;
    });

    await itemModel.bulkSave(items);
    await revalidateTag("items");
    return { ok: true, message: "items have been re-ordered !" };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const getSingleItemAction = async (itemId: string) => {
  try {
    if (mongoose.isValidObjectId(itemId)) {
      connectToDB();
      const singleItem = await itemModel.findById(itemId);
      if (!singleItem) {
        return {
          ok: false,
          error: "Item not found !!",
          messageCode: "notFound",
        };
      }
      return singleItem;
    } else {
      return {
        ok: false,
        error: "Inavalid item ID !!",
        messageCode: "invalidId",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: "Internal Server Error !!!",
      messageCode: "internalError",
    };
  }
};

export const updateSingleItemAction = async (itemData: ItemInterface) => {
  try {
    connectToDB();
    const updatedItem = await itemModel.findByIdAndUpdate(
      itemData._id,
      { $set: itemData },
      { new: true },
    );
    if (!updatedItem) {
      return {
        ok: false,
        message: "Item Not Found !",
        messageCode: "notFound",
      };
    }
    await revalidateTag("items");
    return {
      ok: true,
      message: "Item updated successfully",
      messageCode: "editSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};
