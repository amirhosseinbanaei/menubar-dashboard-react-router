"use client";
import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import React from "react";
import RowCard from "../_components/note/row-card";
import useNoteStore from "@/stores/notes/note-store";
import PriceTable from "../_components/note/price-calculation";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const notes = useNoteStore((state) => state.notes);
  const clearNote = useNoteStore((state) => state.clearNote);
  return (
    <div className="mt-5 flex h-auto w-full flex-col gap-10 xl:flex-row">
      <div className="3xl:w-9/12 w-full xl:w-10/12">
        <Container className="flex flex-col gap-5">
          <div className="flex w-full justify-between">
            <ContainerTitle title="آیتم های افزوده شده" />
            <Button
              onClick={clearNote}
              variant="outline-icon"
              className="border-destructive"
              size={"icon"}
            >
              <TrashIcon className="h-5 w-5 text-destructive" />
            </Button>
          </div>
          <div className="flex w-full flex-col gap-5">
            {notes.map((el: any, index: number) => (
              <RowCard key={el._id} cardData={el} index={index} />
            ))}
          </div>
        </Container>
      </div>

      <div className="3xl:w-3/12 w-full xl:w-4/12">
        <Container>
          <ContainerTitle title="محاسبه هزینه" />
          <PriceTable />
        </Container>
      </div>
    </div>
  );
}
