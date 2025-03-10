"use client";
import Container from "@/components/ui/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import ContainerTitle from "@/components/ui/container-title";
import { itemValidateSchema } from "@/validators/item-validator";
import { uploadAPI } from "@/services/upload";
import { useEffect, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import ItemForm from "../_components/itemForm";
import FormSubmitButton from "../../_components/form-submit-button";
import { useTranslation } from "@/app/i18n/client";
import useLanguageStore from "@/stores/language/language-store";
import { useSingleItem } from "../_hooks/useSingleItem";
import { useUpdateItem } from "../_hooks/useUpdateItem";
import { SwitchFeild } from "../../_components/form-feilds";
import TagsContainer from "../_components/tagsContainer";
import ExtraItemsContainer from "../_components/extraItemsContainer";

export default function EditItem({ params }: { params: { id: string } }) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { item, isLoadingItem } = useSingleItem(params.id);
  const locale = useLanguageStore((state) => state.language);
  const { t } = useTranslation(locale, "add-edit-item");
  const setTFunction = useLanguageStore((state) => state.setTFunction);
  setTFunction(t);

  const [categoryFieldItems, setCategoryFieldItems] = useState<
    { id: string; value: string }[]
  >([]);
  const [subCategoryFieldItems, setSubCategoryFieldItems] = useState<
    { id: string; value: string }[]
  >([]);

  const { updateItem } = useUpdateItem();

  const laguages = ["fa"];

  const setDefaultValues = (key: string) => {
    return laguages.includes(key) ? "" : "default";
  };

  const form = useForm<z.infer<typeof itemValidateSchema>>({
    mode: "onChange",
    resetOptions: {
      keepErrors: true, // input errors will be retained with value update
    },
    defaultValues: {
      name: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
      },
      itemDescription: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
      },
      image: "",
      category: "",
      subCategory: "",
      order: 0,
      isAvailable: true,
      isHidden: false,
      price: undefined,
      discount: 0,
      unit: "",
      tags: [],
      extraItems: [],
    },
    resolver: zodResolver(itemValidateSchema),
  });

  // Set Categories When getting Categories from server :
  useEffect(() => {
    if (categories) {
      (async () => {
        const pushedArr: { id: string; value: string }[] = [];
        await categories.forEach((category: any) => {
          return pushedArr.push({
            id: category._id,
            value: category.name.fa,
          });
        });
        return await setCategoryFieldItems(pushedArr);
      })();
    }
  }, [categories, form]);

  useEffect(() => {
    if (categories) {
      (async () => {
        const pushedArr: { id: string; value: string }[] = [];
        const currentCategoryField = await form.getValues("category");
        const currentCategory = await categories.filter(
          (category: any) => currentCategoryField === category._id,
        );
        if (currentCategory) {
          await currentCategory[0]?.subCategory.forEach((subCategory: any) => {
            return pushedArr.push({
              id: subCategory.id,
              value: subCategory.name.fa,
            });
          });
          return await setSubCategoryFieldItems(pushedArr);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("category")]);

  useEffect(() => {
    if (item) {
      const newFormData = { ...item };
      delete newFormData.__v;
      delete newFormData.project;
      form.reset({
        ...newFormData,
      });
    }
  }, [item, form]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // // Get domain to save the image address in DB
    const domain = location.origin;

    const formData = new FormData();
    const sendingData = {
      ...form.getValues(),
    };

    if (!sendingData.image || sendingData.image === "") {
      sendingData.image = `${domain}/default/no-preview.png`;
    } else {
      if (typeof sendingData.image === "object") {
        formData.append("file", sendingData.image);
        const imageName = await uploadAPI(formData, "filePath=images/product");
        sendingData.image = `${domain}/uploads/images/product/${imageName}.jpeg`;
      }
    }
    await updateItem(sendingData);
    form.reset();
  };
  return (
    <Container>
      <ContainerTitle title={t("container_text_edit")} />
      {isLoadingItem ? (
        <h1>lll</h1>
      ) : (
        <>
          <FormProvider {...form}>
            <ItemForm
              form={form}
              languages={laguages}
              selectData={{
                categoryFieldItems,
                subCategoryFieldItems,
                isLoadingCategories,
              }}
            />
            <ExtraItemsContainer />
            <TagsContainer />

            <div className="mb-10 mt-5 flex w-full flex-col gap-7">
              <SwitchFeild
                t={t}
                form={form}
                name="isAvailable"
                label={"inputs.isAvailable"}
              />
              <SwitchFeild
                t={t}
                form={form}
                name="isHidden"
                label={"inputs.isHidden"}
              />
            </div>
            <FormSubmitButton
              t={t}
              buttonTitle="buttons.edit"
              onSubmit={onSubmit}
            />
          </FormProvider>
        </>
      )}
    </Container>
  );
}
