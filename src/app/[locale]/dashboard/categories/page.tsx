"use client";
// Next Component :
import Link from "next/link";

// Global components :
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";

// Zustand Store :
import useLanguageStore from "@/stores/language/language-store";

// Specific Dashboard components :
import SortableList from "../_components/sortablejs";
import CardLoading from "../_components/card-loading";
import ButtonLoading from "../_components/button-loading";

// Global Hooks :
import { useCategories } from "@/hooks/useCategories";
import { useUpdateCategoryOrder } from "./_hooks/useUpdateCategoryOrder";
import { useState } from "react";

// i18next Translation :
import { useTranslation } from "@/app/i18n/client";

export default function Categories(): JSX.Element {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { mutate: updateCategoryOrder } = useUpdateCategoryOrder();
  const locale = useLanguageStore((state) => state.language);

  const [shouldSort, setShouldSort] = useState<boolean>(false);
  const allowSortHandler = () => {
    setShouldSort(!shouldSort);
  };

  const { t } = useTranslation(locale, "category");
  const setTFunction = useLanguageStore((state) => state.setTFunction);
  setTFunction(t);
  return (
    <>
      <Container className="flex flex-grow flex-col gap-5 overflow-y-auto">
        <ContainerTitle title={t("container_text")} />

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {isLoadingCategories ? (
            <>
              <ButtonLoading className="w-full md:w-40" />
              <ButtonLoading className="w-full md:w-40" />
            </>
          ) : (
            <>
              <Link
                href={`/${locale}/dashboard/categories/add`}
                className="w-full md:w-auto"
              >
                <Button variant={"default"} className="w-full md:px-8">
                  {t("buttons.cta")}
                </Button>
              </Link>
              <Button
                onClick={allowSortHandler}
                variant={shouldSort ? "default" : "secondary"}
                size="lg"
              >
                {t(shouldSort ? "buttons.acceptOrder" : "buttons.changeOrder")}
              </Button>
            </>
          )}
        </div>

        {isLoadingCategories ? (
          [
            ...Array.from({ length: 5 }).map((_, index) => {
              return <CardLoading key={index} />;
            }),
          ]
        ) : (
          <div className="my-3 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl">
            <SortableList
              sortList={categories}
              sortListType="category"
              shouldSort={shouldSort}
              mutateFn={updateCategoryOrder}
            />
          </div>
        )}
      </Container>
    </>
  );
}
