"use client";
import { CategoryInterface } from "@/ts/interfaces/category.interface";
import { useRef } from "react";
import CategoryCard from "./categoryCard";

export default function CategoriesContainer({
  categories,
  isLoadingCategories,
  activeCategory,
  setCategoryOrderHandler,
}: {
  categories: CategoryInterface[];
  isLoadingCategories: boolean;
  activeCategory: number;
  setCategoryOrderHandler: Function;
}) {
  const tabMenuRef = useRef<any>(null);

  const handler = (index: number) => {
    const tabMenu = tabMenuRef.current;
    const tabItem = tabMenu.querySelector(`#tab-item-${index}`);
    setCategoryOrderHandler(index);
    if (tabMenu && tabItem) {
      const containerWidth = tabMenu.offsetWidth;
      const itemOffsetLeft = tabItem.offsetLeft;
      const itemWidth = tabItem.offsetWidth;
      const scrollOffset = itemOffsetLeft - containerWidth / 2 + itemWidth / 2;

      tabMenu.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        ref={tabMenuRef}
        className="no-scrollbar flex w-full items-center justify-center gap-5 overflow-x-auto break-words rounded-sm bg-transparent py-2"
      >
        {isLoadingCategories
          ? Array.from({ length: 6 }).map((_, index: number) => {
              return (
                // <cards.category.loading key={`loadingCategroyCard-${index}`} />
                <h1 key={index}>loading</h1>
              );
            })
          : categories.map((eachCategory: CategoryInterface, index: number) => {
              return (
                <CategoryCard
                  index={index + 1}
                  handler={handler}
                  key={eachCategory._id}
                  categoryData={eachCategory}
                  isActive={activeCategory == index + 1 ? true : false}
                />
              );
            })}
      </div>
    </>
  );
}
