"use client";
import { addItemAction } from "@/server-actions/item/item-action";
import useLanguageStore from "@/stores/language/language-store";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddItem() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: addItem } = useMutation({
    mutationFn: async (newItem: ItemInterface) => await addItemAction(newItem),
    onSuccess: (recivedObj) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { addItem };
}
