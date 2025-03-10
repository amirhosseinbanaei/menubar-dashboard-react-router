"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import AddTagCard from "./addTag-card";

const tagsInformation = [
  { name: "vegan", image: `/tags/vegan.png` },
  { name: "laccatose", image: `/tags/laccatose.png` },
  { name: "spicy", image: `/tags/spicy.png` },
];

export default function AddTags() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            variant={"outline-icon"}
            className="rounded-xs"
            size={"icon-sm"}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>تستی</DialogTitle>

            {tagsInformation.map((tagInfo) => {
              return <AddTagCard key={tagInfo.name} tagInfo={tagInfo} />;
            })}
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild className="w-1/2">
              <Button
                type="button"
                className="w-full p-5"
                variant={"secondary"}
              >
                انصراف
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
