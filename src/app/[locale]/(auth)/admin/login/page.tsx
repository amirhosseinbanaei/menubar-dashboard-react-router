"use client";
import { TextFeild } from "@/app/[locale]/dashboard/_components/form-feilds";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginAction } from "@/server-actions/auth/auth-action";
import { adminLoginValidateSchema } from "@/validators/login-admin-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const Admin = ({ params }: any) => {
  const router = useRouter();
  const { t } = useTranslation(params.locale, "login");
  const form = useForm<z.infer<typeof adminLoginValidateSchema>>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(adminLoginValidateSchema),
  });

  const onSubmit = async (e: SyntheticEvent) => {
    toast.loading(t(`toasts.loading`));
    e.preventDefault();
    const sendingData = form.getValues();
    const { ok, messageCode, message } = await loginAction(sendingData);
    toast.dismiss();
    if (ok) {
      toast.success(t(`toasts.${messageCode}`));
      router.replace(`/${params.locale}/dashboard`);
    } else {
      toast.error(t(`toasts.errors.${messageCode}`));
    }
  };
  return (
    <div className="w-96 rounded-lg bg-white p-5 shadow-c-xl">
      <h1 className="my-5 text-center font-bold text-primary">
        {t("welcome_text")}
      </h1>
      <Form {...form}>
        <form className="my-3 flex w-full flex-col gap-5">
          <TextFeild
            t={t}
            form={form}
            name={`username`}
            label={t(`inputs.username.default`)}
            placeholder={t(`inputs.username.placeholder`)}
          />
          <TextFeild
            t={t}
            form={form}
            type={"password"}
            name={`password`}
            label={t(`inputs.password.default`)}
            placeholder={t(`inputs.password.placeholder`)}
          />
          <div className="flex w-full justify-end">
            <Button
              formState={form.formState}
              type="button"
              className="w-1/3 p-6"
              onClick={(e) => onSubmit(e)}
            >
              ورود به پنل
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Admin;
