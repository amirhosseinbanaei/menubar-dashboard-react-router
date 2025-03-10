import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";
import useLanguageStore from "@/stores/language/language-store";

export default function AddTagCard({
  tagInfo,
}: {
  tagInfo: { name: string; image: string };
}) {
  const form = useFormContext();
  const tags: string[] = form.getValues("tags");
  const t = useLanguageStore((state) => state.tFunction);
  const checkTagAdded = (tag: string) => {
    return tags.includes(tag);
  };
  const addTagHandler = (tagName: string) => {
    form.setValue("tags", [...tags, tagName]);
  };
  return (
    <>
      <div className="flex h-20 w-full justify-between rounded-sm border border-gray-100 px-3">
        {/* Image and Tilte Container */}
        <div className="flex h-full w-[calc(100%-80px)] items-center gap-5">
          {/* Image Container */}
          <div className="relative aspect-square h-4/6 w-auto max-w-40">
            <Image
              fill
              src={`${tagInfo.image}`}
              alt={`${tagInfo.name} Tag Image.`}
            />
          </div>
          {/* Text Container */}
          <div className="flex h-4/6 w-full flex-col justify-center">
            <h1 className="font-bold text-text">
              {t(`tags.${tagInfo.name}.title`)}
            </h1>
            <p className="line-clamp-1 text-sm text-text-light">
              {t(`tags.${tagInfo.name}.description`)}
            </p>
          </div>
        </div>
        {/* Add button Container */}
        <div className="flex h-full w-20 items-center justify-end px-2">
          {checkTagAdded(tagInfo.name) ? (
            <p className="text-sm text-text-light">افزوده شده</p>
          ) : (
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => addTagHandler(tagInfo.name)}
              className="text-priborder-primary border-primary hover:bg-primary/20"
            >
              <PlusIcon className="h-4 w-4 font-bold text-primary" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
