import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "@radix-ui/react-icons";
import ExtraItemDrawerCard from "./extraItem-drawer-card";
import { useExtraItems } from "@/app/[locale]/dashboard/items/_hooks/useExtraItems";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import useExistingItemInStorage from "../../_hooks/useExistingItemInStorage";
import AddToNoteButton from "../add-to-note-button";
import { ReactNode } from "react";
import QuantityButton from "../quantity-button";

export default function ExtraItemDrawer({
  itemData,
  children,
  isExistingItem,
  setIsExistingItem,
}: {
  itemData: ItemInterface;
  children: ReactNode;
  isExistingItem: any;
  setIsExistingItem: any;
}) {
  const { data: extraItems, isLoading: isLoadingExtraItems } = useExtraItems();
  const itemExtraItems: any[] = [];
  extraItems?.filter((extraItem: ExtractItemInterface) => {
    if (itemData.extraItems.includes(extraItem._id)) {
      return itemExtraItems.push(extraItem);
    }
  });
  return (
    <>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="w-full px-4">
          <div className="my-7 flex h-auto w-full flex-col gap-7">
            <ExtraItemDrawerCard cardData={itemData}>
              {!isExistingItem ? (
                <AddToNoteButton
                  itemData={itemData}
                  cardType="itemCard"
                  setIsExist={setIsExistingItem}
                />
              ) : (
                <QuantityButton
                  cardType="itemCard"
                  itemId={itemData._id}
                  setIsExist={setIsExistingItem}
                />
              )}
            </ExtraItemDrawerCard>

            <div className="flex h-auto w-full items-center justify-center gap-x-3">
              <div className="h-1 w-12 rounded bg-primary"></div>
              <h1 className="text-lg font-bold tracking-normal text-text">
                آیتم های اضافی
              </h1>
              <div className="h-1 w-12 rounded bg-primary"></div>
            </div>

            <div className="flex w-full flex-col gap-y-5">
              {isLoadingExtraItems ? (
                <h1>loading</h1>
              ) : (
                itemExtraItems.length !== 0 &&
                itemExtraItems.map((data) => {
                  return (
                    <ExtraItemDrawerCard
                      key={data._id}
                      cardData={data}
                      itemId={itemData._id}
                    />
                  );
                })
              )}
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" size={"lg"}>
                بستن
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
