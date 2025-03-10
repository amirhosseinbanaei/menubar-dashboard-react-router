"use client";

import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { addExtraItemAction } from "@/server-actions/extra item/extraItem-action";
import toast from "react-hot-toast";
import useLanguageStore from "@/stores/language/language-store";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";

export function useAddExtraItem() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: addExtraItem } = useMutation({
    mutationFn: async (newItem: ExtractItemInterface) => await addExtraItemAction(newItem),
    onSuccess: (recivedObj) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        toast.success(t(`toasts.${res.messageCode}`));
        queryClient.invalidateQueries({ queryKey: ["extraItems"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { addExtraItem };
}
