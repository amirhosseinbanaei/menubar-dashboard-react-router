"use client";

import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import toast from "react-hot-toast";
import { updateExtraItemAction } from "@/server-actions/extra item/extraItem-action";
import useLanguageStore from "@/stores/language/language-store";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";

export function useUpdateExtraItem() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: updateExtraItem } = useMutation({
    mutationFn: async (updatedItem: ExtractItemInterface) =>
      await updateExtraItemAction(updatedItem),
    onSuccess: async (recivedObj: any) => {
      const resMain: ServerErrorInterface = recivedObj;
      if (resMain.ok) {
        toast.success(t(`toasts.${resMain.messageCode}`));
        queryClient.invalidateQueries({
          queryKey: ["extraItems"],
        });
      } else {
        toast.error(t(`toasts.${resMain.messageCode}`));
      }
    },
  });

  return { updateExtraItem };
}
