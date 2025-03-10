import React, { ReactNode, SyntheticEvent } from "react";
import SubcategoryForm from "./subcategoryForm";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteSubCategory } from "../_hooks/useDeleteSubCategory";

export default function SubCategoryContainer(props: {
  form: any;
  t: Function;
  languages: string[];
  children?: ReactNode;
}) {
  const { t, languages, form } = props;
  form.watch("subCategory");
  const removeSubCategoryHandler = (subCategoryId: string) => {
    const subCategories = form.getValues("subCategory");
    const filtered = subCategories.filter((el: any) => el.id !== subCategoryId);
    form.setValue("subCategory", filtered);
  };
  return (
    <>
      <div className="col-span-full mb-5 flex w-full flex-col gap-x-5 gap-y-3">
        <h1 className="px-3 text-text-light">
          {t("container_text_subCategory")}
        </h1>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <SubcategoryForm t={t} languages={languages} mainForm={form} />
          {form.getValues("subCategory").map((subCategory: any) => {
            return (
              subCategory &&
              subCategory.id && (
                <div
                  key={subCategory.id}
                  className={`flex h-10 w-full items-center justify-between rounded-sm border border-primary px-1 text-primary`}
                >
                  <p className="mx-3 text-sm text-primary">
                    {subCategory.name.fa}
                  </p>
                  {subCategory.isNew ? (
                    <Button
                      variant={"pure"}
                      size={"icon"}
                      className="hover:bg-transparent"
                      onClick={() => removeSubCategoryHandler(subCategory.id)}
                    >
                      <XMarkIcon className="h-5 w-5 text-text-light hover:text-destructive" />
                    </Button>
                  ) : (
                    <div className="flex justify-center gap-1">
                      <SubcategoryForm
                        t={t}
                        mainForm={form}
                        languages={languages}
                        defaultFormValue={subCategory}
                        triggerButton={
                          <Button
                            variant={"pure"}
                            size={"icon"}
                            className="hover:bg-transparent"
                          >
                            <PencilIcon className="h-4 w-4 text-primary" />
                          </Button>
                        }
                      />
                      <DeleteSubCategoryDialog
                        t={t}
                        categoryId={form.getValues()._id}
                        subCategoryId={subCategory.id}
                        subCategoryName={subCategory.name.fa}
                      />
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

function DeleteSubCategoryDialog({
  t,
  categoryId,
  subCategoryId,
  subCategoryName,
}: {
  t: Function;
  categoryId: string;
  subCategoryId: string;
  subCategoryName: string;
}) {
  const { deleteSubCategory } = useDeleteSubCategory(categoryId, subCategoryId);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"pure"} size={"icon"} className="hover:bg-transparent">
          <TrashIcon className="h-4 w-4 text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dialog.texts.title_delete")}</DialogTitle>
          <DialogDescription>
            {t("dialog.texts.delete_description1")}{" "}
            <span className="mx-[1px] font-bold text-destructive">
              {subCategoryName}
            </span>{" "}
            {t("dialog.texts.delete_description2")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild className="w-1/2">
            <Button type="button" className="w-full" variant={"secondary"}>
              {t("dialog.buttons.cancel")}
            </Button>
          </DialogClose>
          <DialogClose asChild className="w-1/2">
            <form>
              <Button
                type="submit"
                className="w-full"
                variant={"destructive"}
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  return deleteSubCategory();
                }}
              >
                {t("dialog.buttons.delete")}
              </Button>
            </form>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
