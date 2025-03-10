import { create } from "zustand";
import { ItemInterface } from "@/ts/interfaces/item.interface";

interface StorageItemInterFace {
  id: string;
  quantity: number;
  extraItemId?: string;
  name: {
    fa: string;
    en: string;
    ar: string;
  };
  image: string;
  unit: string;
  price: number | string;
}

type StorageKeyTypes = "items" | "extraItems";

export interface NotesInterface {
  notes: StorageItemInterFace[];
  extraItems: StorageItemInterFace[];
  addNote: (
    note: any,
    storageKey: StorageKeyTypes,
    extraItemItemId?: string,
  ) => void;
  increaseQuantity: (itemId: string, storageKey: StorageKeyTypes) => void;
  decreaseQuantity: (itemId: string, storageKey: StorageKeyTypes) => void;
  removeNote: (itemId: string, storageKey: StorageKeyTypes) => void;
  clearNote: () => void;
}

const useNoteStore = create<NotesInterface>((set) => {
  const initialNotes: ItemInterface[] = JSON.parse(
    sessionStorage.getItem("items") || "[]",
  );
  const initialExtraItems: [] = JSON.parse(
    sessionStorage.getItem("extraItems") || "[]",
  );
  return {
    notes: initialNotes,
    extraItems: initialExtraItems,
    addNote: (
      entryValue: any,
      storageKey: StorageKeyTypes,
      extraItemItemId?: string,
    ) => {
      const storedNote: any = sessionStorage.getItem(storageKey);
      const existingNotes = storedNote ? JSON.parse(storedNote) : [];
      return set(() => {
        const newNoteObject = {
          id: entryValue._id,
          extraItemItemId,
          name: entryValue.name,
          image: entryValue.image || "/default/no-preview.png",
          price: entryValue.price,
          discount: entryValue.discount || 0,
          unit: "tooman",
          quantity: 1,
        };
        if (extraItemItemId) newNoteObject.extraItemItemId = extraItemItemId;
        const newNotes = [...existingNotes, newNoteObject];
        sessionStorage.setItem(storageKey, JSON.stringify(newNotes));

        return storageKey === "items"
          ? { notes: newNotes }
          : { extraItems: newNotes };
      });
    },
    increaseQuantity: (itemId: string, storageKey: StorageKeyTypes) => {
      const increaseQuantityHandler = (
        storageKey: StorageKeyTypes,
        entryId: string,
        stateArr: any[],
      ) => {
        const newNotes = stateArr.map((note) =>
          note.id === entryId ? { ...note, quantity: note.quantity + 1 } : note,
        );
        sessionStorage.setItem(storageKey, JSON.stringify(newNotes));
        return storageKey === "items"
          ? { notes: newNotes }
          : { extraItems: newNotes };
      };
      set((state) => {
        switch (storageKey) {
          case "items":
            return increaseQuantityHandler(storageKey, itemId, state.notes);
          default:
            return increaseQuantityHandler(
              storageKey,
              itemId,
              state.extraItems,
            );
        }
      });
    },
    decreaseQuantity: (itemId: string, storageKey: StorageKeyTypes) => {
      const decreaseQuantityHandler = (
        storageKey: StorageKeyTypes,
        entryId: string,
        stateArr: any[],
      ) => {
        const newNotes = stateArr.map((note) =>
          note.id === entryId ? { ...note, quantity: note.quantity - 1 } : note,
        );
        sessionStorage.setItem(storageKey, JSON.stringify(newNotes));
        return storageKey === "items"
          ? { notes: newNotes }
          : { extraItems: newNotes };
      };
      set((state) => {
        switch (storageKey) {
          case "items":
            return decreaseQuantityHandler(storageKey, itemId, state.notes);
          default:
            return decreaseQuantityHandler(
              storageKey,
              itemId,
              state.extraItems,
            );
        }
      });
    },
    removeNote: (itemId: string, storageKey: StorageKeyTypes) => {
      const removeNoteHandler = (
        storageKey: StorageKeyTypes,
        entryId: string,
        stateArr: any[],
      ) => {
        const filteredNotes = stateArr.filter((note) => note.id !== entryId);
        sessionStorage.setItem(storageKey, JSON.stringify(filteredNotes));
        return storageKey === "items"
          ? { notes: filteredNotes }
          : { extraItems: filteredNotes };
      };
      set((state) => {
        switch (storageKey) {
          case "items":
            return removeNoteHandler(storageKey, itemId, state.notes);
          default:
            return removeNoteHandler(storageKey, itemId, state.extraItems);
        }
      });
    },
    clearNote: () => {
      sessionStorage.setItem("items", "[]");
      sessionStorage.setItem("extraItems", "[]");
      return set(() => ({ notes: [], extraItems: [] }));
    },
  };
});
const notes: any[] = useNoteStore.getState().notes;
const extraItems: any[] = useNoteStore.getState().extraItems;
export default useNoteStore;
