import Container from "@/components/ui/container";
import ContainerTitle from "@/components/ui/container-title";
import { useItems } from "@/hooks/useItems";
import { ItemInterface } from "@/ts/interfaces/item.interface";
import React from "react";
import ItemCard from "./itemCard";
import ItemContainerLayout from "./itemContainerLayout";
export default function ItemsContainer({
  activeCategoryOrder,
}: {
  activeCategoryOrder: number;
}) {
  const { data: items, isLoading: isLoadingItems } =
    useItems(activeCategoryOrder);
  return (
    <Container>
      <ContainerTitle title="آیتم ها" />
      <ItemContainerLayout>
        {isLoadingItems ? (
          <h1>loaiding</h1>
        ) : (
          <>
            {items.map((item: ItemInterface) => {
              return <ItemCard key={item._id} itemData={item} />;
            })}
          </>
        )}
      </ItemContainerLayout>
    </Container>
  );
}
