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
import { SelectFeild, TextFeild } from "../../_components/form-feilds";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ReactNode, SyntheticEvent, useEffect } from "react";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import { extraItemValidateSchema } from "@/validators/extraItem-validator";
import { useAddExtraItem } from "../_hooks/useAddExtraItem";
import { useUpdateExtraItem } from "../_hooks/useUpdateExtraItem";
import useLanguageStore from "@/stores/language/language-store";

export default function ExtraItemForm(props: {
  mainForm: any;
  languages: string[];
  defaultFormValue?: ExtractItemInterface;
  triggerButton?: ReactNode;
}) {
  const { languages, defaultFormValue, triggerButton } = props;
  const t = useLanguageStore((state) => state.tFunction);
  const { addExtraItem } = useAddExtraItem();
  const { updateExtraItem } = useUpdateExtraItem();

  const laguages = ["fa", "en"];
  const setDefaultValues = (key: string) => {
    return laguages.includes(key) ? "" : "default";
  };
  const form = useForm<z.infer<typeof extraItemValidateSchema>>({
    mode: "onChange",
    defaultValues: {
      price: undefined,
      unit: "",
      name: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
      },
    },
    resolver: zodResolver(extraItemValidateSchema),
  });

  useEffect(() => {
    if (defaultFormValue) {
      form.reset(defaultFormValue);
    }
  }, []);

  const addExtraItemHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    await addExtraItem(form.getValues());
    form.reset();
  };

  const updateExtraItemHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    updateExtraItem(form.getValues());
  };

  return (
    <Dialog>
      <DialogTrigger>
        {defaultFormValue ? (
          triggerButton
        ) : (
          <Button size={"lg"}>{"افزودن آیتم اضافی"}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultFormValue
              ? // ? t("dialog.texts.title_edit")
                "ویرایش آیتم اضافی"
              : // : t("dialog.texts.title_add")}
                "افزودن آیتم اضافی"}
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
                    label={"نام آیتم اضافی به فارسی"}
                    placeholder={`سس قرمز`}
                  />
                );
              })}
              <TextFeild
                t={t}
                form={form}
                key={`price`}
                name={`price`}
                label={"قیمت آیتم اضافی"}
                placeholder={"145000"}
              />
              <SelectFeild
                t={t}
                form={form}
                name={"unit"}
                label={"واحد قیمت"}
                selectItems={[{ id: "tooman", value: "تومان" }]}
              />
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
                onClick={(e: SyntheticEvent) => updateExtraItemHandler(e)}
              >
                {/* {t("dialog.buttons.edit")} */}
                اعمال تغییرات
              </Button>
            ) : (
              <Button
                type="submit"
                formState={form.formState}
                className="w-full p-5"
                onClick={(e: SyntheticEvent) => addExtraItemHandler(e)}
              >
                {/* {t("dialog.buttons.add")} */}
                افزودن
              </Button>
            )}
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
