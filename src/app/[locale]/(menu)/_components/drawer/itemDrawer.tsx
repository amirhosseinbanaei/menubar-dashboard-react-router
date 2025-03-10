import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import ItemInformationDrawer from "./itemInformation-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddToNoteButton from "../add-to-note-button";
import QuantityButton from "../quantity-button";
import ExtraItemDrawer from "./extraItemDrawer";
import useExistingItemInStorage from "../../_hooks/useExistingItemInStorage";
import useCalculateFinalPrice from "../../_hooks/useCalculateFinalPrice";
import { splitNumber } from "@/utils/spliteNumber";
import useLanguageStore from "@/stores/language/language-store";

export default function ItemDrawer({
  itemData,
  children,
}: {
  itemData: ItemInterface;
  children: ReactNode;
}) {
  const [isExistingItem, setIsExistingItem] = useExistingItemInStorage(
    "items",
    itemData._id,
  );
  const { finalPrice } = useCalculateFinalPrice();
  const t = useLanguageStore((state) => state.tFunction);
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="mx-auto flex h-full w-full justify-center xl:h-auto">
        <ScrollArea className="mt-3 h-full w-full xl:h-auto" dir="rtl">
          <ItemInformationDrawer itemData={itemData} />
        </ScrollArea>
        <DrawerFooter className="mx-auto w-full space-y-3 xl:w-1/2">
          {itemData.extraItems.length === 0 ? (
            !isExistingItem ? (
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
            )
          ) : (
            <ExtraItemDrawer
              itemData={itemData}
              isExistingItem={isExistingItem}
              setIsExistingItem={setIsExistingItem}
            >
              {!isExistingItem ? (
                <AddToNoteButton
                  itemData={itemData}
                  cardType="itemCard"
                  setIsExist={setIsExistingItem}
                />
              ) : (
                <div className="flex h-10 w-full items-center justify-center">
                  <div className="flex h-full w-[calc(100%-32px)] items-center">
                    <p className="xl:text-lg text-sm text-text font-bold">
                      قیمت نهایی :
                      <span className="mx-2 text-primary">
                        {splitNumber(finalPrice)}
                        <span className="mx-1">
                        {t(`price.units.${itemData.unit}`)}
                        </span>
                      </span>
                    </p>
                  </div>
                  <Button className="p-5 rounded-sm">مشاهده جزئیات</Button>
                </div>
              )}
            </ExtraItemDrawer>
          )}
          <DrawerClose asChild>
            <Button variant="secondary" size={"lg"}>
              بستن
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
