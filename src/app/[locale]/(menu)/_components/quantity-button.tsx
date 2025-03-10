import {
  MinusCircleIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import useNoteStore from "@/stores/notes/note-store";
import { Component } from "react";
import { DrawerClose } from "@/components/ui/drawer";
export default function QuantityButton({
  itemId,
  setIsExist,
  cardType,
}: {
  itemId: string;
  setIsExist?: any;
  cardType: "itemCard" | "extraItemCard";
}) {
  const notes = useNoteStore((state) => state.notes);
  const extraItems = useNoteStore((state) => state.extraItems);
  const increaseQuantity = useNoteStore((state) => state.increaseQuantity);
  const decreaseQuantity = useNoteStore((state) => state.decreaseQuantity);
  const removeNote = useNoteStore((state) => state.removeNote);
  const storageKey: "items" | "extraItems" =
    cardType === "itemCard" ? "items" : "extraItems";
  let itemIndex;
  switch (cardType) {
    case "itemCard":
      itemIndex = notes.findIndex((note: any) => note.id == itemId);
      break;
    default:
      itemIndex = extraItems.findIndex((note: any) => note.id == itemId);
      break;
  }
  return (
    <div className="flex h-full w-full flex-row-reverse items-center gap-2">
      {itemIndex !== -1 &&
      (cardType === "itemCard"
        ? notes[itemIndex].quantity === 1
        : extraItems[itemIndex].quantity === 1) ? (
        <>
          <Button variant={"pure"} size={"icon"}>
            <TrashIcon
              className="h-5 w-5 text-destructive hover:cursor-pointer"
              onClick={() => {
                removeNote(itemId, storageKey);
                setIsExist(false);
              }}
            />
          </Button>
        </>
      ) : (
        <Button variant={"pure"} size={"icon"}>
          <MinusCircleIcon
            className="h-6 w-6 text-text-light hover:cursor-pointer"
            onClick={() => decreaseQuantity(itemId, storageKey)}
          />
        </Button>
      )}
      <p className="text-sm font-bold text-primary">
        {itemIndex !== -1 &&
          (cardType === "itemCard"
            ? notes[itemIndex].quantity
            : extraItems[itemIndex].quantity)}
      </p>
      <Button variant={"pure"} size={"icon"}>
        <PlusCircleIcon
          className="h-6 w-6 text-text-light"
          onClick={() => increaseQuantity(itemId, storageKey)}
        />
      </Button>
    </div>
  );
}
