"use server";

import mongoose from "mongoose";
import connectToDB from "@/lib/db";
import { revalidateTag } from "next/cache";
import categoryModel from "@/models/categoryModel";
import { CategoryInterface } from "@/ts/interfaces/category.interface";
import { categoryValidateSchema } from "@/validators/category-validator";

const Internal_Server_Error_Response = {
  ok: false,
  error: "Internal Server Error !!!",
  messageCode: "internalError",
};

export const addCategoryAction = async (data: CategoryInterface) => {
  try {
    connectToDB();
    const chekcedData = await categoryValidateSchema.parseAsync(data);
    if (chekcedData === null) {
      return {
        ok: false,
        error: "Sen't Inavalid Data !",
        messageCode: "invalidSentData",
      };
    }
    await categoryModel.create({
      ...chekcedData,
      project: "menubar",
    });
    await revalidateTag("categories");
    return {
      ok: true,
      message: "category add successfully",
      messageCode: "addSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const updateCategoryOrderAction = async (order: number[]) => {
  try {
    connectToDB();
    const categories = await categoryModel
      .find({ project: "menubar" })
      .sort("order");

    if (!categories) {
      return {
        ok: false,
        error: "Category not found !!",
        messageCode: "notFound",
      };
    }

    // Params Guide [0, 3] => 0: Old Order Number , 1 : New Order Number
    const [removed] = categories.splice(order[0], 1);
    categories.splice(order[1], 0, removed);
    categories.forEach((category: any, index: number) => {
      category.order = index + 1;
    });

    await categoryModel.bulkSave(categories);
    await revalidateTag("categories");

    return { ok: true, message: "Category order changed" };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const deleteCategoryAction = async (categoryId: string) => {
  try {
    if (mongoose.isValidObjectId(categoryId)) {
      const deleteCategory = await categoryModel.findByIdAndDelete(categoryId);
      if (!deleteCategory) {
        return {
          ok: false,
          error: "Category Not Found !",
          messageCode: "notFound",
        };
      }
      await revalidateTag("categories");
      return {
        ok: true,
        error: "Category deleted successfully !",
        messageCode: "deleteSuccessfully",
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

export const reOrderCategoriesAction = async () => {
  try {
    connectToDB();
    const categories = await categoryModel
      .find({ project: "menubar" })
      .sort("order");

    categories.forEach((category: any, index: number) => {
      category.order = index + 1;
    });

    await categoryModel.bulkSave(categories);
    await revalidateTag("categories");
    return { ok: true, message: "Categories have been re-ordered !" };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const getSingleCategoryAction = async (categoryId: string) => {
  try {
    if (mongoose.isValidObjectId(categoryId)) {
      connectToDB();
      const singleCategory = await categoryModel.findById(categoryId);
      if (!singleCategory) {
        return new Error("Category Not Found !");
      }
      return singleCategory;
    } else {
      throw new Error("Invalid Category Id");
    }
  } catch (error) {
    return { ok: false, message: error };
  }
};

export const updateSingleCategoryAction = async (
  categoryData: CategoryInterface,
) => {
  try {
    connectToDB();
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryData._id,
      { $set: categoryData },
      { new: true },
    );
    if (!updatedCategory) {
      return {
        ok: false,
        message: "Category Not Found !",
        messageCode: "notFound",
      };
    }
    await revalidateTag("categories");
    return {
      ok: true,
      message: "Category updated successfully",
      messageCode: "editSuccessfully",
    };
  } catch (error) {
    return Internal_Server_Error_Response;
  }
};

export const deleteSubCategoryAction = async (
  categoryId: string,
  subCategoryId: string,
) => {
  try {
    if (mongoose.isValidObjectId(categoryId)) {
      const findCategory = await categoryModel.findOne({
        project: "menubar",
        _id: categoryId,
      });

      if (!findCategory) {
        return {
          ok: false,
          error: "Category Not Found !",
          messageCode: "notFound",
        };
      }
      findCategory.subCategory = await findCategory.subCategory.filter(
        (subCategory: any) => subCategory.id !== subCategoryId,
      );

      await categoryModel.updateOne(
        { _id: categoryId },
        { $set: findCategory },
      );
      await revalidateTag("categories");
      return {
        ok: true,
        error: "Category deleted successfully !",
        messageCode: "deleteSubCategorySuccessfully",
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

export const updateSubCategoryAction = async (
  categoryId: string,
  updatedSubCategory: {
    id: string;
    name: { fa: string; en: string; ar: string };
  }[],
) => {
  try {
    if (mongoose.isValidObjectId(categoryId)) {
      const findCategory = await categoryModel.findOne({
        project: "menubar",
        _id: categoryId,
      });

      if (!findCategory) {
        return {
          ok: false,
          error: "Category Not Found !",
          messageCode: "notFound",
        };
      }
      findCategory.subCategory = updatedSubCategory;

      await categoryModel.updateOne(
        { _id: categoryId },
        { $set: findCategory },
      );
      await revalidateTag("categories");
      return {
        ok: true,
        error: "sub Category edited successfully !",
        messageCode: "editSubCategorySuccessfully",
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
