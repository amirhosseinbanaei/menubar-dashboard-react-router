"use client";
import { updateSubCategoryAction } from "@/server-actions/category/category-action";
import useLanguageStore from "@/stores/language/language-store";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateSubCategory(categoryId: string) {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: updateSubCategory } = useMutation({
    mutationFn: async (updatedSubCategory: any) =>
      await updateSubCategoryAction(categoryId, updatedSubCategory),
    onSuccess: async (recivedObj: any) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({
          queryKey: ["categories", categoryId],
        });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { updateSubCategory };
}
