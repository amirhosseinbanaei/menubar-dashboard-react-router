import { useFormContext } from "react-hook-form";
import AddExtraItems from "./addExtraItems";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/shadcn/utils";
import { useExtraItems } from "../_hooks/useExtraItems";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import useLanguageStore from "@/stores/language/language-store";

export default function ExtraItemsContainer() {
  const { data, isLoading } = useExtraItems();
  const language = useLanguageStore((state) => state.language);
  const form = useFormContext();
  const extraItems = form.watch("extraItems");

  const filteredExtraItems: { id: string; name: string }[] = [];
  data?.filter((extraItem: ExtractItemInterface) => {
    if (extraItems.includes(extraItem._id)) {
      return filteredExtraItems.push({
        id: extraItem._id,
        name: extraItem.name[language],
      });
    }
  });

  const removeExtraItemHandler = (extraItemId: string) => {
    const filteredExtraItems = extraItems.filter(
      (extraItem: any) => extraItem !== extraItemId,
    );
    form.setValue("extraItems", filteredExtraItems);
  };
  return (
    <div
      className={cn("col-span-full flex w-full flex-col gap-5", {
        "mb-10": extraItems.length > 0,
      })}
    >
      <span className="flex items-center">
        <h1 className="px-3 text-text-light">
          {/* {t("container_text_subCategory")} */}
          آیتم های اضافی
        </h1>
        <AddExtraItems />
      </span>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 px-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {extraItems.length !== 0 &&
          (isLoading ? (
            <h1>loading</h1>
          ) : (
            filteredExtraItems.length && (
              <>
                {filteredExtraItems.map(
                  (extraItem: { id: string; name: string }) => {
                    return (
                      <div
                        key={extraItem.id}
                        className={`text-primarborder-primary flex h-10 w-full items-center justify-between rounded-sm border border-primary px-1`}
                      >
                        <p className="mx-3 border-primary text-sm text-primary">
                          {extraItem.name}
                        </p>
                        <Button
                          variant={"pure"}
                          size={"icon"}
                          className="hover:bg-transparent"
                          onClick={() => removeExtraItemHandler(extraItem.id)}
                        >
                          <XMarkIcon className="h-5 w-5 text-text-light hover:text-destructive" />
                        </Button>
                      </div>
                    );
                  },
                )}
              </>
            )
          ))}
      </div>
    </div>
  );
}
