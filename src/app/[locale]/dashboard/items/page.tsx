"use client";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import SortableList from "../_components/sortablejs";
import CardLoading from "../_components/card-loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ButtonLoading from "../_components/button-loading";
import { useUpdateItemOrder } from "./_hooks/useUpdateItemOrder";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useItems } from "@/hooks/useItems";
import { useTranslation } from "@/app/i18n/client";
import useLanguageStore from "@/stores/language/language-store";
import CategoriesContainer from "./_components/categoriesContainer";
import ExtraItemContainer from "./_components/exteraItemContainer";

export default function Items(): JSX.Element {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const locale = useLanguageStore((state) => state.language);

  const [shouldSort, setShouldSort] = useState<boolean>(false);
  const allowSortHandler = () => {
    setShouldSort(!shouldSort);
  };

  const { t } = useTranslation(locale, "item");
  const setTFunction = useLanguageStore((state) => state.setTFunction);
  setTFunction(t);

  const { updateItemOrder } = useUpdateItemOrder();

  const [activeCategory, setActiveCategory] = useState<number>(1);
  const { data: items, isLoading: isLoadingItems } = useItems(activeCategory);
  const setCategoryOrderHandler = async (order: number) => {
    setActiveCategory(order);
  };
  return (
    <>
      <Container className="flex flex-grow flex-col gap-5 overflow-y-auto">
        <ContainerTitle title={t("container_text")} />
        <CategoriesContainer
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          activeCategory={activeCategory}
          setCategoryOrderHandler={setCategoryOrderHandler}
        />

        <div className="mt-3 flex w-full flex-col gap-5 md:flex-row">
          {isLoadingItems ? (
            <>
              <ButtonLoading className="w-full md:w-40" />
              <ButtonLoading className="w-full md:w-40" />
            </>
          ) : (
            <>
              <Button
                onClick={allowSortHandler}
                variant={shouldSort ? "default" : "secondary"}
                size="lg"
              >
                {t(shouldSort ? "buttons.acceptOrder" : "buttons.changeOrder")}
              </Button>
              {!shouldSort && (
                <Link
                  href={`/${locale}/dashboard/items/add`}
                  className="w-full md:w-auto"
                >
                  <Button className="w-full md:px-8">{t("buttons.cta")}</Button>
                </Link>
              )}
            </>
          )}
        </div>

        {categories &&
          (isLoadingItems ? (
            [
              ...Array.from({ length: 5 }).map((_, index) => {
                return <CardLoading key={index} />;
              }),
            ]
          ) : (
            <>
              <div className="my-3 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl">
                <SortableList
                  sortList={items}
                  sortListType="product"
                  shouldSort={shouldSort}
                  mutateFn={updateItemOrder}
                />
              </div>
            </>
          ))}
      </Container>
      <Container className="mt-5">
        <ContainerTitle title="آیتم های اضافی" />
        <ExtraItemContainer />
      </Container>
    </>
  );
}
