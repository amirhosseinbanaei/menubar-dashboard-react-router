"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  deleteItemAction,
  reOrderItemsAction,
} from "@/server-actions/item/item-action";
import useLanguageStore from "@/stores/language/language-store";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteItem(itemId: string) {
  const queryClient = useQueryClient();
  const [orderNumber, setOrderNumber] = useLocalStorage("OrderNumber");
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: deleteItem } = useMutation({
    mutationFn: async () => await deleteItemAction(itemId),
    onSuccess: async (recivedObj: any) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        await reOrderItemsAction();
        await setOrderNumber(orderNumber - 1);
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { deleteItem };
}
