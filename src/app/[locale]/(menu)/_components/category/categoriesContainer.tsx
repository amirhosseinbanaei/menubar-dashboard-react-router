import { useCategories } from "@/hooks/useCategories";
import { CategoryInterface } from "@/ts/interfaces/category.interface";
import { useRef } from "react";
import CategoryCard from "./categoryCard";

export default function CategoriesContainer({
  activeCategory,
  setCategoryOrderHandler,
  className,
}: {
  activeCategory: number;
  setCategoryOrderHandler: Function;
  className?: string;
}) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
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
      <div className="bg-category-background z-110 sticky top-0 mb-6 flex min-w-0 flex-col gap-y-5 break-words rounded-sm border-0 border-solid border-transparent bg-white bg-clip-border pt-3 shadow-c-2xl backdrop:blur-md">
        <div
          ref={tabMenuRef}
          className="no-scrollbar sticky top-2 z-40 flex gap-x-4 overflow-x-auto px-4 pb-3"
        >
          {isLoadingCategories
            ? Array.from({ length: 6 }).map((_, index: number) => {
                return (
                  // <cards.category.loading key={`loadingCategroyCard-${index}`} />
                  <h1 key={index}>loading</h1>
                );
              })
            : categories.map(
                (eachCategory: CategoryInterface, index: number) => {
                  return (
                    <CategoryCard
                      index={index + 1}
                      handler={handler}
                      key={eachCategory._id}
                      categoryData={eachCategory}
                      isActive={activeCategory == index + 1 ? true : false}
                    />
                  );
                },
              )}
        </div>
      </div>
    </>
  );
}
