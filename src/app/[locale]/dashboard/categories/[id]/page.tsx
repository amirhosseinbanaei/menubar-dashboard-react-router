"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryForm from "../_components/categoryForm";
import { useSingleCategory } from "../_hooks/useSingleCategory";
import { categoryValidateSchema } from "@/validators/category-validator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import { uploadAPI } from "@/services/upload";
import { useTranslation } from "@/app/i18n/client";
import useLanguageStore from "@/stores/language/language-store";
import { useUpdateCategory } from "../_hooks/useUpdateCategory";
import SubCategoryContainer from "../_components/subCategoryContainer";
import FormSubmitButton from "../../_components/form-submit-button";

export default function EditCategory({ params }: { params: { id: string } }) {
  const { category, isLoadingCategory } = useSingleCategory(params.id);
  const { updateCategory } = useUpdateCategory();
  const locale = useLanguageStore((state) => state.language);
  const setTFunction = useLanguageStore((state) => state.setTFunction);

  const { t } = useTranslation(locale, "add-edit-category");
  setTFunction(t);

  const laguages = ["fa", "en"];

  const form = useForm<z.infer<typeof categoryValidateSchema>>({
    mode: "onChange",
    resetOptions: {
      keepErrors: true, // input errors will be retained with value update
    },
    defaultValues: {
      name: {
        fa: "",
        en: "",
        ar: "",
      },
      image: "",
      subCategory: [],
      order: 0,
    },
    resolver: zodResolver(categoryValidateSchema),
  });

  useEffect(() => {
    if (category) {
      const newFormData = { ...category };
      delete newFormData.__v;
      delete newFormData.project;
      form.reset(newFormData);
    }
  }, [category, form]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Get domain to save the image address in DB
    const domain = location.origin;

    const formData = new FormData();
    const sendingData = {
      ...form.getValues(),
    };

    sendingData.subCategory.forEach((el) => delete el.isNew);

    if (!sendingData.image || sendingData.image === "") {
      sendingData.image = `${domain}/default/no-preview.png`;
    } else {
      if (typeof sendingData.image === "object") {
        formData.append("file", sendingData.image);
        const imageName = await uploadAPI(formData, "filePath=images/category");
        sendingData.image = `${domain}/uploads/images/category/${imageName}.jpeg`;
      }
    }
    await updateCategory(sendingData);
  };
  return (
    <>
      <Container>
        <ContainerTitle title={t("container_text_edit")} />
        {isLoadingCategory ? (
          <h1>looading...</h1>
        ) : (
          <>
            <CategoryForm form={form} languages={laguages} />
            <SubCategoryContainer form={form} t={t} languages={laguages} />
            <FormSubmitButton
              t={t}
              buttonTitle="buttons.edit"
              onSubmit={onSubmit}
            />
          </>
        )}
      </Container>
    </>
  );
}
