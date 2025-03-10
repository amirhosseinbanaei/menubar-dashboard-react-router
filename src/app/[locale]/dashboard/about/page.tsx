"use client";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import FormSubmitButton from "../_components/form-submit-button";
import { useTranslation } from "@/app/i18n/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutValidateSchema } from "@/validators/about-validator";
import { SyntheticEvent, useEffect } from "react";
import {
  SelectFeild,
  TextFeild,
  TextareaFeild,
} from "../_components/form-feilds";
import { usePorjects } from "@/hooks/useProjects";
import { useUpdateProject } from "./_hooks/useUpdateProject";

function WorkingHours({ t, form }: { t: Function; form: any }) {
  const dayHours: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      dayHours.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  const test = {
    weekdays: [
      { name: "WeekDays O", type: "selectBox" },
      { name: "WeekDays C", type: "selectBox" },
    ],
    friday: [
      { name: "Friday O", type: "selectBox" },
      { name: "Friday C", type: "selectBox" },
    ],
  };
  return (
    <>
      {Object.keys(test).map((key, index) => {
        return (
          <div key={index} className="my-3 flex h-auto w-full flex-col gap-5">
            <h1 className="tracking-none text-sm font-medium text-text">
              {t(`sections.${key}`)}
            </h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 pb-5 md:grid-cols-2">
              {test[key].map((inputData: { name: string }) => {
                return (
                  <SelectFeild
                    t={t}
                    form={form}
                    key={inputData.name}
                    name={inputData.name}
                    label={`inputs.${inputData.name}`}
                    selectItems={dayHours}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function AboutText({
  t,
  form,
  languages,
}: {
  t: Function;
  form: any;
  languages: string[];
}) {
  return (
    <>
      <h1 className="text-typography-700 tracking-none my-5 font-bold">
        {t("sections.about")}
      </h1>

      <div className="mb-10 flex w-full flex-col gap-y-5">
        {languages.map((lang: string) => {
          return (
            <TextareaFeild
              t={t}
              form={form}
              key={`about.${lang}`}
              name={`about.${lang}`}
              label={`inputs.name.${lang}`}
              placeholder={`inputs.name.placeholder.${lang}`}
              className="h-80"
            />
          );
        })}
      </div>
    </>
  );
}

function Socials({ t, form }: { t: Function; form: any }) {
  const socials = [
    { name: "phone", type: "tel" },
    { name: "instagram", type: "text" },
    { name: "googlemap", type: "text" },
    { name: "waze", type: "text" },
    { name: "neshan", type: "text" },
    { name: "balad", type: "text" },
  ];
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 py-5 md:grid-cols-2 lg:md:grid-cols-3">
        {socials.map((inputData: { name: string; type: string }) => {
          return (
            <TextFeild
              t={t}
              form={form}
              key={inputData.name}
              name={inputData.name}
              type={inputData.type}
              label={`inputs.${inputData.name}`}
              placeholder={`inputs.placeholder.${inputData.name}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default function About() {
  const { t } = useTranslation("fa", "about");
  const { data: projectData, isLoading: isLoadingProject } = usePorjects();
//   const { updateProject } = useUpdateProject();
  const laguages = ["fa"];
  const setDefaultValues = (key: string) => {
    return laguages.includes(key) ? "" : "default";
  };
  const form = useForm({
    mode: "onChange",
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
    defaultValues: {
      about: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
        fr: setDefaultValues("fr"),
      },
      "WeekDays O": "",
      "WeekDays C": "",
      "Friday C": "",
      "Friday O": "",
      phone: "",
      instagram: "",
      googlemap: "",
      neshan: "",
      balad: "",
      waze: "",
    },
    resolver: zodResolver(aboutValidateSchema),
  });

  useEffect(() => {
    if (projectData) console.log(projectData);
  }, [projectData]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const sendingData = { ...form.getValues() };
   //  updateProject(sendingData);
  };
  return (
    <div className="flex flex-col gap-10">
      <Container>
        <ContainerTitle title="اطلاعات مجموعه" />
        <FormProvider {...form}>
          <WorkingHours t={t} form={form} />
          <AboutText t={t} form={form} languages={laguages} />
        </FormProvider>
        <FormSubmitButton onSubmit={onSubmit} buttonTitle="اعمال تغییرات" t={t} />
      </Container>
      <Container>
        <ContainerTitle title="ارتباط" />
        <FormProvider {...form}>
          <Socials t={t} form={form} />
        </FormProvider>
        <FormSubmitButton onSubmit={onSubmit} buttonTitle="اعمال تغییرات" t={t} />
      </Container>
    </div>
  );
}
