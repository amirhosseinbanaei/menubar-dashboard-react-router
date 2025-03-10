"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/ui/card";

import useLanguageStore from "@/stores/language/language-store";
import AddToNoteButton from "../add-to-note-button";
import QuantityButton from "../quantity-button";
import useExistingItemInStorage from "../../_hooks/useExistingItemInStorage";
import { ReactNode } from "react";

export default function ExtraItemDrawerCard({
  cardData,
  children,
  itemId,
}: {
  cardData: any;
  children?: ReactNode;
  itemId?: string;
}) {
  const locale = useLanguageStore((state) => state.language);
  const [isExistingExtraItem, setIsExistingExtraItem] =
    useExistingItemInStorage("extraItems", cardData._id);

  return (
    <Card>
      <CardImage src={`/default/no-preview.png`}></CardImage>
      <CardContent className="w-[calc(100%-80px)]">
        <CardTitle>{cardData.name[locale]}</CardTitle>
      </CardContent>
      <CardFooter className="flex w-20 items-center justify-end gap-x-2">
        {children && children}

        {!children && (
          <>
            {!isExistingExtraItem ? (
              <AddToNoteButton
                itemData={cardData}
                cardType="extraItemCard"
                setIsExist={setIsExistingExtraItem}
                itemId={itemId}
              />
            ) : (
              <QuantityButton
                cardType="extraItemCard"
                itemId={cardData._id}
                setIsExist={setIsExistingExtraItem}
              />
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
