"use client";
import { addCategoryAction } from "@/server-actions/category/category-action";
import useLanguageStore from "@/stores/language/language-store";
import { CategoryInterface } from "@/ts/interfaces/category.interface";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddCategory() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: addCategory } = useMutation({
    mutationFn: async (newCategory: CategoryInterface) =>
      await addCategoryAction(newCategory),
    onSuccess: (recivedObj) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { addCategory };
}
