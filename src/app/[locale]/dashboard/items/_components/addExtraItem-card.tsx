import { Button } from "@/components/ui/button";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ExtraItemCard({
  extraItemData,
}: {
  extraItemData: ExtractItemInterface;
}) {
  const form = useFormContext();
  const formExtraItems: string[] = form.getValues("extraItems");

  const addExtraItemHandler = (extraItemId: string | undefined) => {
    form.setValue("extraItems", [...form.getValues("extraItems"), extraItemId]);
  };

  const checkExtraItemAdded = (extraItemId: string) => {
    // console.log(formExtraItems);
    // console.log(extraItemId);
    // return formExtraItems.find((extraItem) => extraItem.id === extraItemId);
    return formExtraItems.includes(extraItemId);
  };
  return (
    <div className="relative flex h-20 w-full justify-between rounded-sm border border-gray-100 px-3">
      {/* Tilte Container */}
      <div className="flex h-full w-[calc(100%-80px)] items-center gap-5 px-3">
        <h1 className="font-bold text-text">{extraItemData.name.fa}</h1>
      </div>
      {/* Add button Container */}
      <div className="flex h-full w-20 items-center justify-end px-2">
        {checkExtraItemAdded(extraItemData._id) ? (
          <p className="text-sm text-text-light">افزوده شده</p>
        ) : (
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => addExtraItemHandler(extraItemData._id)}
            className="text-priborder-primary border-primary hover:bg-primary/20"
          >
            <PlusIcon className="h-4 w-4 font-bold text-primary" />
          </Button>
        )}
      </div>
    </div>
  );
}
