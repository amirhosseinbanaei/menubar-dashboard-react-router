"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useExtraItems } from "../_hooks/useExtraItems";
import ExtraItemCard from "./addExtraItem-card";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ScrollArea } from "@/components/ui/scroll-area";
import useLanguageStore from "@/stores/language/language-store";

export default function AddExtraItems() {
  const { data: extraItems, isLoading: isLoadingExtraItems } = useExtraItems();
  const direction = useLanguageStore((state) => state.dir);
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            variant={"outline-icon"}
            className="rounded-xs"
            size={"icon-sm"}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>تستی</DialogTitle>
            <ScrollArea className="h-72 w-full px-4">
              <div
                className="flex h-auto w-full flex-shrink-0 flex-col gap-5"
                dir={`${direction}`}
              >
                {isLoadingExtraItems ? (
                  <h1>loaidng ...</h1>
                ) : (
                  extraItems.map((extraItemData: ExtractItemInterface) => {
                    return (
                      <ExtraItemCard
                        key={extraItemData._id}
                        extraItemData={extraItemData}
                      />
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild className="w-1/2">
              <Button
                type="button"
                className="w-full p-5"
                variant={"secondary"}
              >
                انصراف
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
