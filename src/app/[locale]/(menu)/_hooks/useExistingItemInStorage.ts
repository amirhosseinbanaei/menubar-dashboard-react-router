"use client";
import { useEffect, useState } from "react";
import useSessionStorage from "@/hooks/useSessionStorage";

interface StorageItemInterFace {
  id: string;
  quantity: number;
  name: {
    fa: string;
    en: string;
    ar: string;
  };
  image: string;
  unit: string;
}

export default function useExistingItemInStorage(
  storageKey: string,
  itemId: string | undefined,
) {
  const [storageItem] = useSessionStorage(storageKey, []);
  const [isExisting, setIsExisting] = useState(false);
  useEffect(() => {
    (async () => {
      const findExistingItem = storageItem.find(
        (allStorageItems: StorageItemInterFace) => {
          return allStorageItems.id === itemId;
        },
      );
      !findExistingItem ? setIsExisting(false) : setIsExisting(true);
    })();
  }, [itemId, storageItem]);
  const isExistingItem = isExisting && isExisting;
  return [isExistingItem, setIsExisting];
}
