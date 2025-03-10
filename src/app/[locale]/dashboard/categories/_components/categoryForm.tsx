"use client";
import { Form } from "@/components/ui/form";
import FormLayout from "@/components/form-layout";
import { TextFeild } from "../../_components/form-feilds";
import DropZone from "../../_components/drop-zone";
import useLanguageStore from "@/stores/language/language-store";

export default function CategoryForm(props: {
  form: any;
  languages: string[];
}) {
  const { form, languages } = props;
  const t = useLanguageStore((state) => state.tFunction);
  return (
    <Form {...form}>
      <form className="mt-3 w-full">
        <DropZone
          maxFiles={1}
          formKey="image"
          setFiles={form.setValue}
          files={form.watch("image")}
          accept={{}}
        />
        <FormLayout>
          {languages.map((lang) => {
            return (
              <TextFeild
                t={t}
                form={form}
                key={`name.${lang}`}
                name={`name.${lang}`}
                label={`inputs.name.${lang}`}
                placeholder={`inputs.name.placeholder.${lang}`}
              />
            );
          })}
        </FormLayout>
      </form>
    </Form>
  );
}
