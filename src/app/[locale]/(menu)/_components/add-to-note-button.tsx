import { Button } from "@/components/ui/button";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import useNoteStore, { NotesInterface } from "@/stores/notes/note-store";
import ExtraItemDrawer from "./drawer/extraItemDrawer";

export default function AddToNoteButton({
  itemData,
  setIsExist,
  cardType,
  checkExtraItems = true,
  itemId,
}: {
  setIsExist?: any;
  itemData: ItemInterface;
  cardType: "itemCard" | "extraItemCard";
  checkExtraItems?: boolean;
  itemId?: string;
}) {
  const addNote = useNoteStore((state: NotesInterface) => state.addNote);
  const addItemHandler = async () => {
    addNote(
      itemData,
      cardType === "itemCard" ? "items" : "extraItems",
      itemId && itemId,
    );
    setIsExist(true);
    toast.success("افزوده شد");
  };
  return (
    <>
      <Button
        onClick={addItemHandler}
        variant={"outline-icon"}
        className="rounded-xs"
        size={"icon-sm"}
      />
      {/* {checkExtraItems ? (
        !itemData.extraItems || itemData.extraItems.length === 0 ? (
          <Button
            onClick={addItemHandler}
            variant={"outline-icon"}
            className="rounded-xs"
            size={"icon-sm"}
          >
            <PlusIcon className="h-5 w-5 text-primary"></PlusIcon>
          </Button>
        ) : (
          <ExtraItemDrawer
            addItemHandler={addItemHandler}
            itemData={itemData}
          />
        )
      ) : (
        <Button
          onClick={addItemHandler}
          variant={"outline-icon"}
          className="rounded-xs"
          size={"icon-sm"}
        >
          <PlusIcon className="h-5 w-5 text-primary"></PlusIcon>
        </Button>
      )} */}
    </>
  );
}
