import ImageWithLoader from "@/components/skeleton-loaders";
import { cn } from "@/lib/shadcn/utils";
import useLanguageStore from "@/stores/language/language-store";
import { CategoryInterface } from "@/ts/interfaces/category.interface";

export default function CategoryCard({
  index,
  handler,
  isActive,
  categoryData,
}: {
  index: number;
  handler: Function;
  isActive: boolean;
  categoryData: CategoryInterface;
}) {
  const language = useLanguageStore((state) => state.language);
  return (
    <>
      <div
        id={`tab-item-${index}`}
        onClick={() => handler(index)}
        className={cn(
          `flex flex-col items-center gap-2 rounded-sm p-4 shadow hover:cursor-pointer`,
          {
            "bg-primary text-white": isActive,
            "bg-white text-text": !isActive,
          },
        )}
      >
        <div className="h-14 w-14">
          <ImageWithLoader src={`${categoryData.image}`} />
        </div>
        <h1
          className={`tracking-none mx-2 flex-shrink-0 whitespace-nowrap text-[13.5px] font-semibold md:text-[14.2px]`}
        >
          {categoryData.name[language]}
        </h1>
      </div>
    </>
  );
}
