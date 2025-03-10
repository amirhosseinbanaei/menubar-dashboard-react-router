import useNoteStore from "@/stores/notes/note-store";
import { calculateDiscount } from "@/utils/calculateDiscount";
import React, { useEffect, useState } from "react";

export default function useCalculateFinalPrice() {
  const notes = useNoteStore((state) => state.notes);
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
    const sumItems: any[] = [];
    if (notes) {
      notes.forEach((eachNote: any) => {
        let itemPrice: number;
        switch (eachNote.discount) {
          case 0:
            itemPrice = eachNote.price * eachNote.quantity;
            break;
          default:
            itemPrice =
              calculateDiscount(eachNote.discount, eachNote.price) *
              eachNote.quantity;
            break;
        }
        return sumItems.push(itemPrice);
      });
      const finalP = sumItems.length && sumItems.reduce((a, b) => a + b);
      setFinalPrice(finalP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);
  return { finalPrice };
}
