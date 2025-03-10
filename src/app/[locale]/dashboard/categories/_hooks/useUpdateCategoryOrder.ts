"use client";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateCategoryOrderAction } from "@/server-actions/category/category-action";
import useLanguageStore from "@/stores/language/language-store";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import toast from "react-hot-toast";

export function useUpdateCategoryOrder() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate } = useMutation({
    mutationFn: async (oldAndNewIndex: number[]) => {
      // Params Guide [0, 3] => 0: Old Order Number , 1 : New Order Number
      return await updateCategoryOrderAction(oldAndNewIndex);
    },
    onSuccess: (recivedObj: any) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { mutate };
}
