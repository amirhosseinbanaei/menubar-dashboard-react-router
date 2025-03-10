"use client";
import { updateAboutAction } from "@/server-actions/about/about-action";
import useLanguageStore from "@/stores/language/language-store";
import ServerErrorInterface from "@/ts/interfaces/serverError.interface";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const t = useLanguageStore((state) => state.tFunction);
  const { mutate: updateProject } = useMutation({
    mutationFn: async (updateProject: any) =>
      await updateAboutAction(updateProject),
    onSuccess: async (recivedObj: any) => {
      const resMain: ServerErrorInterface = recivedObj.res;
      if (resMain.ok) {
        toast.success(t(`toasts.${resMain.messageCode}`));
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
      } else {
        toast.error(t(`toasts.${resMain.messageCode}`));
      }
    },
  });

  return { updateProject };
}
