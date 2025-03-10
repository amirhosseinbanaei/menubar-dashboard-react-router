import { Form } from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";

import FormLayout from "@/components/form-layout";
import {
  SelectFeild,
  SwitchFeild,
  TextFeild,
  TextareaFeild,
} from "../../_components/form-feilds";
import DropZone from "../../_components/drop-zone";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguageStore from "@/stores/language/language-store";
import { SelectItem, SelectValue } from "@/components/ui/select";
import AddTags from "./addTags";

export default function ItemForm(props: {
  form: any;
  languages: string[];
  categories?: any;
  selectData: {
    isLoadingCategories: boolean;
    categoryFieldItems: { id: string; value: string }[];
    subCategoryFieldItems: { id: string; value: string }[];
  };
}) {
  const { languages, form, selectData, categories } = props;
  const t = useLanguageStore((state) => state.tFunction);
  // const text = form.formState().isValid();
  const formValues = form.getValues();

  const isEmptyCategory = form.getValues("category") === "";
  const isEmptySubCategory = selectData?.subCategoryFieldItems.length < 1;
  return (
    <Form {...form}>
      <form className="my-3 w-full">
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

        <div className="my-10 flex h-auto w-full flex-col gap-8 ">
          {languages.map((lang) => {
            return (
              <TextareaFeild
                t={t}
                form={form}
                key={`itemDescription.${lang}`}
                name={`itemDescription.${lang}`}
                label={`inputs.itemDescription.${lang}`}
                placeholder={`inputs.itemDescription.placeholder.${lang}`}
              />
            );
          })}
        </div>

        <FormLayout>
          <TextFeild
            t={t}
            form={form}
            name={`price`}
            label={`قیمت محصول`}
            placeholder={`قیمت محصول را وارد نمایید`}
          />
          <TextFeild
            t={t}
            form={form}
            name={`discount`}
            label={`درصد تخفیف`}
            placeholder={`درصد تخفیف محصول را وارد کنید`}
          />
        </FormLayout>

        <FormLayout>
          <SelectFeild
            t={t}
            form={form}
            label={"واحد قیمت"}
            name={"unit"}
            selectItems={[{ id: "tooman", value: "تومان" }]}
          />
          <SelectFeild
            t={t}
            form={form}
            name={"category"}
            label={"inputs.category"}
            selectItems={selectData?.categoryFieldItems}
            setCustomValue={<SelectValue placeholder={"test"}></SelectValue>}
          >
            {!selectData.isLoadingCategories &&
              !selectData.categoryFieldItems && (
                <div className="my-3 flex  flex-col gap-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              )}
          </SelectFeild>
          <SelectFeild
            t={t}
            form={form}
            name={"subCategory"}
            label={"inputs.subCategory.label"}
            placeholder={"inputs.subCategory.placeholder"}
            selectItems={selectData.subCategoryFieldItems}
          >
            {!isEmptyCategory && !isEmptySubCategory && (
              <SelectItem value={"none"}>
                {t("inputs.subCategory.none")}
              </SelectItem>
            )}
            {isEmptyCategory && (
              <div className="flex h-16 w-full items-center justify-center">
                <p className="text-sm font-bold text-text">
                  {t("inputs.subCategory.not_choose_category_field")}
                </p>
              </div>
            )}
            {!isEmptyCategory && isEmptySubCategory && (
              <>
                <div className="flex h-16 w-full items-center justify-center">
                  <p className="text-sm font-bold text-text">
                    {t("inputs.subCategory.empty_field_text")}
                  </p>
                </div>
              </>
            )}
          </SelectFeild>
        </FormLayout>

      </form>
    </Form>
  );
}
