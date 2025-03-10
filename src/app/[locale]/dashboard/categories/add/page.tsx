"use client";
import Container from "@/components/ui/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { categoryValidateSchema } from "@/validators/category-validator";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAddCategory } from "../_hooks/useAddCategory";
import { uploadAPI } from "@/services/upload";
import ContainerTitle from "@/components/ui/container-title";
import CategoryForm from "../_components/categoryForm";
import { useTranslation } from "@/app/i18n/client";
import useLanguageStore from "@/stores/language/language-store";
import FormSubmitButton from "../../_components/form-submit-button";
import SubCategoryContainer from "../_components/subCategoryContainer";

export default function AddCategory() {
  const { addCategory } = useAddCategory();

  const locale = useLanguageStore((state) => state.language);
  const { t } = useTranslation(locale, "add-edit-category");

  const setTFunction = useLanguageStore((state) => state.setTFunction);
  setTFunction(t);

  const [orderNumber, setOrderNumber] = useLocalStorage("OrderNumber", 0);

  const laguages = ["fa", "en"];
  const setDefaultValues = (key: string) => {
    return laguages.includes(key) ? "" : "default";
  };

  const form = useForm<z.infer<typeof categoryValidateSchema>>({
    mode: "onChange",
    defaultValues: {
      name: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
      },
      image: "",
      subCategory: [],
      order: 0,
    },
    resolver: zodResolver(categoryValidateSchema),
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Get domain to save the image address in DB
    const domain = location.origin;

    const formData = new FormData();
    const sendingData = {
      ...form.getValues(),
      order: Number(orderNumber),
    };

    sendingData.subCategory.forEach((el) => delete el.isNew);

    if (!sendingData.image || sendingData.image === "") {
      sendingData.image = `${domain}/default/no-preview.png`;
    } else {
      formData.append("file", sendingData.image);
      const imageName = await uploadAPI(formData, "filePath=images/category");
      sendingData.image = `${domain}/uploads/images/category/${imageName}.jpeg`;
    }
    
    await addCategory(sendingData);
    form.reset();
    setOrderNumber(orderNumber + 1);
  };
  return (
    <Container>
      <ContainerTitle title={t("container_text_add")} />
      <CategoryForm form={form} languages={laguages} />
      <SubCategoryContainer form={form} t={t} languages={laguages} />
      <FormSubmitButton t={t} buttonTitle="buttons.add" onSubmit={onSubmit} />
    </Container>
  );
}
