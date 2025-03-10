import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateItemOrderAction } from "@/server-actions/item/item-action";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import toast from "react-hot-toast";
import useLanguageStore from "@/stores/language/language-store";

export function useUpdateItemOrder() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: updateItemOrder } = useMutation({
    mutationFn: async (oldAndNewIndex: number[]) => {
      // Params Guide [0, 3] => 0: Old Order Number , 1 : New Order Number
      return await updateItemOrderAction(oldAndNewIndex);
    },
    onSuccess: (recivedObj: any) => {
      const res: ServerErrorInterface = recivedObj;
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error(t(`toasts.${res.messageCode}`));
      }
    },
  });

  return { updateItemOrder };
}
