"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardIndex,
  CardTitle,
} from "@/components/ui/card";

import QuantityButton from "../quantity-button";
import useLanguageStore from "@/stores/language/language-store";

export default function RowCard({
  index,
  cardData,
}: {
  cardData: any;
  index: number;
}) {
  const locale = useLanguageStore((state) => state.language);
  return (
    <Card>
      <CardIndex>{index + 1}</CardIndex>
      <CardImage src={`${cardData.image}`}></CardImage>
      <CardContent className="w-40">
        <CardTitle>{cardData.name[locale]}</CardTitle>
      </CardContent>
      <CardContent className="hidden w-[calc(100%-272px)] md:block"></CardContent>
      <CardFooter className="flex flex-row-reverse items-center gap-x-2">
        {/* <PlusCircleIcon
              className="text-typography-500 h-5 w-5 hover:cursor-pointer"
              // onClick={() => increaseQuantity(productData._id)}
            /> */}
        <QuantityButton cardType="itemCard" itemId={cardData.id} />
      </CardFooter>
    </Card>
  );
}
