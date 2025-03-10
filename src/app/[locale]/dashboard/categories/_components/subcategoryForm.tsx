"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { TextFeild } from "../../_components/form-feilds";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { subCategoryValidateSchema } from "@/validators/sub-category-validator";
import shortUUID from "short-uuid";
import toast from "react-hot-toast";
import { ReactNode, SyntheticEvent, useEffect } from "react";
import { useUpdateSubCategory } from "../_hooks/useUpdateSubCategory";

export default function SubcategoryForm(props: {
  t: Function;
  mainForm: any;
  languages: string[];
  defaultFormValue?: {
    id: string;
    name: { fa: string; en: string; ar: string };
  };
  triggerButton?: ReactNode;
}) {
  const { t, languages, mainForm, defaultFormValue, triggerButton } = props;
  const { updateSubCategory } = useUpdateSubCategory(mainForm.getValues()._id);
  const laguages = ["fa", "en"];
  const setDefaultValues = (key: string) => {
    return laguages.includes(key) ? "" : "default";
  };
  const form = useForm<z.infer<typeof subCategoryValidateSchema>>({
    mode: "onChange",
    defaultValues: {
      name: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
      },
      isNew: defaultFormValue ? false : true,
    },
    resolver: zodResolver(subCategoryValidateSchema),
  });

  useEffect(() => {
    if (defaultFormValue) {
      form.reset(defaultFormValue);
    }
  }, []);

  const existSubCategory = mainForm.getValues("subCategory");
  const addNewSubcategoryHandler = () => {
    const categoryId = shortUUID.generate();
    const sendingData = {
      ...form.getValues(),
      id: categoryId,
    };
    mainForm.setValue("subCategory", [...existSubCategory, sendingData]);
    toast.success(t("toasts.addSubCategorySuccessfully"));
    form.reset();
  };
  const editSubCategoryHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (defaultFormValue) {
      const selectedSubCategoryIndex = await existSubCategory.findIndex(
        (el: any) => el.id === defaultFormValue.id,
      );
      existSubCategory[selectedSubCategoryIndex] = form.getValues();
      updateSubCategory(existSubCategory);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        {defaultFormValue ? (
          triggerButton
        ) : (
          <Button className="h-10 w-full">{t("dialog.buttons.trigger")}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultFormValue
              ? t("dialog.texts.title_edit")
              : t("dialog.texts.title_add")}
          </DialogTitle>
          <Form {...form}>
            <form className="mb-5 mt-1 flex w-full flex-col gap-5">
              {languages.map((lang) => {
                return (
                  <TextFeild
                    t={t}
                    form={form}
                    key={`name.${lang}`}
                    name={`name.${lang}`}
                    label={`inputs.subCategoryName.${lang}`}
                    placeholder={`inputs.subCategoryName.placeholder.${lang}`}
                  />
                );
              })}
            </form>
          </Form>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild className="w-1/2">
            <Button type="button" className="w-full p-5" variant={"secondary"}>
              {t("dialog.buttons.cancel")}
            </Button>
          </DialogClose>
          <form className="w-full">
            {defaultFormValue ? (
              <Button
                type="submit"
                className="w-full p-5"
                onClick={(e: SyntheticEvent) => editSubCategoryHandler(e)}
              >
                {t("dialog.buttons.edit")}
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full p-5"
                onClick={addNewSubcategoryHandler}
              >
                {t("dialog.buttons.add")}
              </Button>
            )}
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
