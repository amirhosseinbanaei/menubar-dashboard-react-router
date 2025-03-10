import useLanguageStore from "@/stores/language/language-store";
import useNoteStore from "@/stores/notes/note-store";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { splitNumber } from "@/utils/spliteNumber";
import { useEffect, useState } from "react";
import useCalculateFinalPrice from "../../_hooks/useCalculateFinalPrice";

export default function PriceTable() {
  const language = useLanguageStore((state) => state.language);
  const notes = useNoteStore((state) => state.notes);
  const { finalPrice } = useCalculateFinalPrice();
  return (
    <>
      <div className="flex h-auto w-full flex-col gap-y-3 rounded-md p-4">
        {notes.map((eachNote: any) => {
          const { price, quantity, name, id, discount } = eachNote;
          let eachItemFinalPrice;
          switch (eachNote.discount) {
            case 0:
              eachItemFinalPrice = price * quantity;
              break;
            default:
              eachItemFinalPrice =
                calculateDiscount(discount, price) * quantity;
              break;
          }
          return (
            <span key={id} className="flex w-full justify-between">
              <p className="text-sm font-bold text-text">{name[language]}</p>
              <p className="font-bold text-text">
                {splitNumber(eachItemFinalPrice)}{" "}
                <span className="mx-[1px] text-xs text-primary">تومان</span>
              </p>
            </span>
          );
        })}

        <span className="flex w-full justify-between">
          <p className="text-typography-700 text-sm font-bold">{"مجموع"}</p>
          <p className="text-primary-500 font-bold">
            {splitNumber(finalPrice)}{" "}
            <span className="mx-[1px] text-xs text-primary">تومان</span>
          </p>
        </span>
      </div>
    </>
  );
}
