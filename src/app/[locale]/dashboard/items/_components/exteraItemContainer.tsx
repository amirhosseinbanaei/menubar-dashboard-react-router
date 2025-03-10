import React, { ReactNode, SyntheticEvent } from "react";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { extraItemValidateSchema } from "@/validators/extraItem-validator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExtraItemForm from "./extraItemForm";
import { useExtraItems } from "../_hooks/useExtraItems";
import { ExtractItemInterface } from "@/ts/interfaces/extraItem.interface";
import { useDeleteExtraItem } from "../_hooks/useDeleteExtraItem";
import useLanguageStore from "@/stores/language/language-store";
import { splitNumber } from "@/utils/spliteNumber";

export default function ExtraItemContainer(props: { children?: ReactNode }) {
  const t = useLanguageStore((state) => state.tFunction);
  const { data: extraItems, isLoading: isLoadingExtraItems } = useExtraItems();

  const laguages = ["fa", "en"];
  const setDefaultValues = (key: string) => {
    return laguages.includes(key) ? "" : "default";
  };

  const form = useForm<z.infer<typeof extraItemValidateSchema>>({
    mode: "onChange",
    defaultValues: {
      name: {
        fa: setDefaultValues("fa"),
        en: setDefaultValues("en"),
        ar: setDefaultValues("ar"),
      },
      price: undefined,
    },
    resolver: zodResolver(extraItemValidateSchema),
  });

  return (
    <>
      <div className="col-span-full mb-5 flex w-full flex-col gap-x-5 gap-y-3">
        {isLoadingExtraItems ? (
          <h1>Loading ...</h1>
        ) : (
          <div className="my-3">
            <ExtraItemForm languages={laguages} mainForm={form} />
          </div>
        )}
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 3xl-custom:grid-cols-7">
          {isLoadingExtraItems ? (
            <h1>loding ...</h1>
          ) : (
            <>
              {extraItems.map((extraItem: ExtractItemInterface) => {
                return (
                  extraItem &&
                  extraItem._id && (
                    <div className="flex-auto rounded-sm px-4 py-5 shadow-c-xl">
                      <div className="flex flex-col items-center gap-y-5">
                        <p className="line-clamp-1 text-text">
                          {extraItem.name.fa}
                        </p>
                        <p className="text-primary">
                          {splitNumber(extraItem.price)}
                          <span className="mx-1">{t(`price.units.${extraItem.unit}`)}</span>
                        </p>
                        <div className="flex w-8/12 justify-center gap-x-3">
                          <div className="flex justify-center gap-3">
                            <ExtraItemForm
                              mainForm={form}
                              languages={laguages}
                              defaultFormValue={extraItem}
                              triggerButton={
                                <Button
                                  variant={"outline-icon"}
                                  size={"icon"}
                                  className="hover:bg-primary/20"
                                >
                                  <PencilIcon className="h-4 w-4 text-primary" />
                                </Button>
                              }
                            />
                            <DeleteExtraItemDialog
                              t={t}
                              extraItemId={extraItem._id}
                              extraItemName={extraItem.name.fa}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function DeleteExtraItemDialog({
  t,
  extraItemId,
  extraItemName,
}: {
  t: Function;
  extraItemId: string;
  extraItemName: string;
}) {
  const { deleteExtraItem } = useDeleteExtraItem(extraItemId);
  return (
    <Dialog key={extraItemId}>
      <DialogTrigger>
        <Button
          size={"icon"}
          variant={"outline-icon"}
          className="border-destructive hover:bg-destructive/20"
        >
          <TrashIcon className="h-4 w-4 text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"حذف آیتم اضافی"}</DialogTitle>
          <DialogDescription>
            {/* {t("dialog.texts.delete_description1")}{" "} */}
            آیا از حذف آیتم اضافی{" "}
            <span className="mx-[1px] font-bold text-destructive">
              {extraItemName}{" "}
            </span>
            اطمینان دارید ؟{/* {t("dialog.texts.delete_description2")} */}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild className="w-1/2">
            <Button type="button" className="w-full" variant={"secondary"}>
              {t("dialog.buttons.cancel")}
            </Button>
          </DialogClose>
          <DialogClose asChild className="w-1/2">
            <form>
              <Button
                type="submit"
                className="w-full"
                variant={"destructive"}
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  deleteExtraItem();
                }}
              >
                {t("dialog.buttons.delete")}
              </Button>
            </form>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
