import { cn } from "@/lib/shadcn/utils";
import AddTags from "./addTags";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import useLanguageStore from "@/stores/language/language-store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function TagsContainer() {
  const form = useFormContext();
  const tags = form.watch("tags");
  const t = useLanguageStore((state) => state.tFunction);
  const removeTagHandler = (tag: string) => {
    const filteredTags = tags.filter((eachTag: string) => eachTag !== tag);
    form.setValue("tags", filteredTags);
  };
  return (
    <div
      className={cn("col-span-full flex w-full flex-col gap-5", {
        "mb-10": tags.length > 0,
      })}
    >
      <span className="flex items-center">
        <h1 className="px-3 text-text-light">
          {/* {t("container_text_subCategory")} */}
          برچسب ها
        </h1>
        <AddTags />
      </span>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 px-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tags.length > 0 &&
          tags.map((tag: string) => {
            return (
              <>
                <div
                  key={tag}
                  className={`text-primarborder-primary flex h-10 w-full items-center justify-between rounded-sm border border-primary px-1`}
                >
                  <p className="mx-3 border-primary text-sm text-primary">
                    {t(`tags.${tag}.title`)}
                  </p>
                  <Button
                    variant={"pure"}
                    size={"icon"}
                    className="hover:bg-transparent"
                    onClick={() => removeTagHandler(tag)}
                  >
                    <XMarkIcon className="h-5 w-5 text-text-light hover:text-destructive" />
                  </Button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
