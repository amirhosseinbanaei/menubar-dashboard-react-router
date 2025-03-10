"use client";
import { useTranslation } from "@/app/i18n/client";
import ItemsContainer from "./_components/item/itemsContainer";
import useLanguageStore from "@/stores/language/language-store";
import { useState } from "react";
import CategoriesContainer from "./_components/category/categoriesContainer";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = useTranslation(locale, "menu_index");
  const [activeCategoryOrder, setActiveCategoryOrder] = useState<number>(1);
  const setTFunction = useLanguageStore((state) => state.setTFunction);
  setTFunction(t);

  const setCategoryOrderHandler = (order: number) => {
    setActiveCategoryOrder(order);
  };
  return (
    <main>
      <div className="h-full w-full py-5">
        <CategoriesContainer
          activeCategory={activeCategoryOrder}
          setCategoryOrderHandler={setCategoryOrderHandler}
        />
        <ItemsContainer activeCategoryOrder={activeCategoryOrder} />
      </div>
    </main>
  );
}
