"use client";
import { useEffect, useState } from "react";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import useSessionStorage from "@/hooks/useSessionStorage";

export default function useExistingItems(itemId: string | undefined) {
  const [storageItem] = useSessionStorage("bookmark", []);
  const [isExisting, setIsExisting] = useState(false);
  useEffect(() => {
    (async () => {
      const findExistingItem = storageItem.find(
        (allCartItems: ItemInterface) => {
          return allCartItems._id === itemId;
        },
      );
      !findExistingItem ? setIsExisting(false) : setIsExisting(true);
    })();
  }, [itemId, storageItem]);
  const isExistingItem = isExisting && isExisting;
  return [isExistingItem, setIsExisting];
}
