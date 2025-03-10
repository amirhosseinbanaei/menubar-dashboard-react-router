"use client";
import { updateSingleCategoryAction } from "@/server-actions/category/category-action";
import { updateSingleItemAction } from "@/server-actions/item/item-action";
import useLanguageStore from "@/stores/language/language-store";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: updateItem } = useMutation({
    mutationFn: async (updatedItem: ItemInterface) => {
      const res = await updateSingleItemAction(updatedItem);
      return {
        itemId: updatedItem._id,
        res,
      };
    },
    onSuccess: async (recivedObj: any) => {
      const resMain: ServerErrorInterface = recivedObj.res;
      if (resMain.ok) {
        toast.success(t(`toasts.${resMain.messageCode}`));
        queryClient.refetchQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({
          queryKey: ["items", recivedObj.itemId],
        });
      } else {
        toast.error(t(`toasts.${resMain.messageCode}`));
      }
    },
  });

  return { updateItem };
}
