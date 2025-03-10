"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  deleteCategoryAction,
  reOrderCategoriesAction,
} from "@/server-actions/category/category-action";
import useLanguageStore from "@/stores/language/language-store";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCategory(categoryId: string) {
  const queryClient = useQueryClient();
  const [orderNumber, setOrderNumber] = useLocalStorage("OrderNumber");
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: deleteCategory } = useMutation({
    mutationFn: async () => await deleteCategoryAction(categoryId),
    onSuccess: async (recivedObj: any) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        await reOrderCategoriesAction();
        await setOrderNumber(orderNumber - 1);
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { deleteCategory };
}
