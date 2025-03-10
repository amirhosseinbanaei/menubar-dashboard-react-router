"use client";

import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { deleteExtraItemAction } from "@/server-actions/extra item/extraItem-action";
import toast from "react-hot-toast";
import useLanguageStore from "@/stores/language/language-store";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteExtraItem(extraItemId: string) {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: deleteExtraItem } = useMutation({
    mutationFn: async () => await deleteExtraItemAction(extraItemId),
    onSuccess: async (recivedObj: any) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({ queryKey: ["extraItems"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { deleteExtraItem };
}
