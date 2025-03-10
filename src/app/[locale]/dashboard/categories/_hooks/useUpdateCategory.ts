"use client";
import { updateSingleCategoryAction } from "@/server-actions/category/category-action";
import useLanguageStore from "@/stores/language/language-store";
import { CategoryInterface } from "@/ts/interfaces/category.interface";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: updateCategory } = useMutation({
    mutationFn: async (updatedCategory: CategoryInterface) => {
      const res = await updateSingleCategoryAction(updatedCategory);
      return {
        categoryId: updatedCategory._id,
        res,
      };
    },
    onSuccess: async (recivedObj: any) => {
      const resMain: ServerErrorInterface = recivedObj.res;
      if (resMain.ok) {
        toast.success(t(`toasts.${resMain.messageCode}`));
        queryClient.refetchQueries({ queryKey: ["categories"] });
        queryClient.invalidateQueries({
          queryKey: ["categories", recivedObj.categoryId],
        });
      } else {
        toast.error(t(`toasts.${resMain.messageCode}`));
      }
    },
  });

  return { updateCategory };
}
