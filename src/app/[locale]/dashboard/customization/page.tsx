"use client";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import DropZone from "../_components/drop-zone";
import { FormProvider, useForm } from "react-hook-form";
import FormSubmitButton from "../_components/form-submit-button";
import { useTranslation } from "@/app/i18n/client";
import { uploadAPI } from "@/services/upload";

export default function Customization() {
  const { t } = useTranslation("fa", "customization");
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      image: "",
    },
  });
  return (
    <div className="flex w-full flex-col gap-10">
      <FormProvider {...form}>
        <ThemeAndColors />
        <ProjectName />
        <LogoUploader t={t} form={form} />
      </FormProvider>
    </div>
  );
}

function ThemeAndColors() {
  return (
    <Container>
      <ContainerTitle title="رنگ و پوسته ها" />
    </Container>
  );
}

function ProjectName() {
  return (
    <Container>
      <ContainerTitle title="اطلاعات نمایشی مجموعه" />
    </Container>
  );
}

function LogoUploader({ form, t }: { form: any; t: Function }) {
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // // Get domain to save the image address in DB
    const domain = location.origin;

    const formData = new FormData();
    const sendingData = {
      ...form.getValues(),
    };

    // sendingData.extraItems = sendingData.extraItems.map((el: any) => el.id);

    if (!sendingData.image || sendingData.image === "") {
      sendingData.image = `${domain}/default/no-preview.png`;
    } else {
      formData.append("file", sendingData.image);
      await uploadAPI(
        formData,
        "filePath=images&fileName=logo",
      );
    }
  };
  return (
    <Container>
      <ContainerTitle title="لوگو و نماد مجموعه" />
      <form className="my-5 w-full">
        <DropZone
          maxFiles={1}
          formKey="image"
          setFiles={form.setValue}
          files={form.watch("image")}
          accept={{}}
        />
      </form>
      <FormSubmitButton
        t={t}
        buttonTitle={"buttons.edit"}
        onSubmit={onSubmit}
      />
    </Container>
  );
}
