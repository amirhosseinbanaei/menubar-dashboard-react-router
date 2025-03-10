"use client";
import { Button } from "@/components/ui/button";
import {
  TrashIcon,
  PencilIcon,
  Bars2Icon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardIndex,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDeleteCategory } from "../categories/_hooks/useDeleteCategory";
import { useDeleteItem } from "../items/_hooks/useDeleteItem";
import { useRouter } from "next/navigation";
import useLanguageStore from "@/stores/language/language-store";
import { SyntheticEvent } from "react";
import { cn } from "@/lib/shadcn/utils";

export default function DemoCard({
  index,
  cardType,
  cardData,
  shouldSort,
}: {
  cardData: any;
  index: number;
  shouldSort: boolean;
  cardType: "category" | "product";
}) {
  const locale = useLanguageStore((state) => state.language);
  const router = useRouter();
  return (
    <Card>
      <CardIndex className="test">
        {!shouldSort ? (
          index + 1
        ) : (
          <Button
            variant={"outline-icon"}
            size={"icon"}
            className="hover:bg-transparent"
          >
            <Bars2Icon className="h-5 w-5" />
          </Button>
        )}
      </CardIndex>
      <CardImage src={`${cardData.image}`}></CardImage>
      <CardContent className="w-40">
        <CardTitle>{cardData.name[locale]}</CardTitle>
      </CardContent>
      <CardContent className="hidden w-[calc(100%-272px)] md:block">
        {/* <CardDescription className="text-gray-400">
          {"زیر دسته ها:"}
        </CardDescription> */}
      </CardContent>
      <CardFooter>
        {!shouldSort && (
          <>
            <Button
              onClick={() =>
                router.replace(`${window.location.href}/${cardData._id}`)
              }
              variant={"outline-icon"}
              size={"icon"}
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
            <DeleteCardDialog
              cardTitle={cardData.name.fa}
              cardId={cardData._id}
              cardType={cardType}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function DeleteCardDialog({
  cardTitle,
  cardType,
  cardId,
}: {
  cardTitle: string;
  cardType: string;
  cardId: string;
}) {
  const isCategory = cardType === "category";
  const { deleteCategory } = useDeleteCategory(cardId);
  const { deleteItem } = useDeleteItem(cardId);
  const t = useLanguageStore((state) => state.tFunction);
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"outline"}
          size={"icon"}
          className="border-destructive text-destructive hover:bg-destructive/20"
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dialog.texts.title")}</DialogTitle>
          <DialogDescription>
            {t("dialog.texts.description1")}{" "}
            <span className="mx-[1px] font-bold text-destructive">
              {cardTitle}
            </span>{" "}
            {t("dialog.texts.description2")}
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
                  isCategory ? deleteCategory() : deleteItem();
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
