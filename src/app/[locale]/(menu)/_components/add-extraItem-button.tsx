"use client";
import { Button } from "@/components/ui/button";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import useNoteStore from "@/stores/notes/note-store";
import ItemDrawer from "./item/itemDrawer";

export default function AddExtraItemButton({
  itemData,
  setIsExist,
  openDrawer = true,
}: {
  itemData: ItemInterface;
  setIsExist: any;
  openDrawer?: boolean;
}) {
  const addNote = useNoteStore((state) => state.addNote);
  const addItemHandler = async () => {
    addNote(itemData);
    setIsExist(true);
    toast.success("افزوده شد");
  };
  return (
    <>
      {openDrawer ? (
        <>
          {itemData.extraItems.length === 0 ? (
            <Button
              onClick={addItemHandler}
              variant={"outline-icon"}
              className="rounded-xs"
              size={"icon-sm"}
            >
              <PlusIcon className="h-5 w-5 text-primary"></PlusIcon>
            </Button>
          ) : (
            <ItemDrawer itemData={itemData} />
          )}
        </>
      ) : (
        <Button
          onClick={addItemHandler}
          variant={"outline-icon"}
          className="rounded-xs"
          size={"icon-sm"}
        >
          <PlusIcon className="h-5 w-5 text-primary"></PlusIcon>
        </Button>
      )}
    </>
  );
}
