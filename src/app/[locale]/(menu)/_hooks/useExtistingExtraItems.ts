"use client";
import { useEffect, useState } from "react";
import useSessionStorage from "@/hooks/useSessionStorage";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";

export default function useExistingExtraItem(extraItemId: string | undefined) {
  const [storageItem] = useSessionStorage("extraItems", []);
  const [isExisting, setIsExisting] = useState(false);
  useEffect(() => {
    (async () => {
      const findExistingItem = storageItem.find(
        (allCartItems: ExtractItemInterface) => {
          return allCartItems._id === extraItemId;
        },
      );
      !findExistingItem ? setIsExisting(false) : setIsExisting(true);
    })();
  }, [extraItemId, storageItem]);
  const isExistingItem = isExisting && isExisting;
  return [isExistingItem, setIsExisting];
}
