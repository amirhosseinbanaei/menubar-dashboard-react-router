import { getSingleItemAction } from "@/server-actions/item/item-action";
import { useQuery } from "@tanstack/react-query";

export function useSingleItem(itemId: string) {
  const { data: item, isLoading: isLoadingItem } = useQuery({
    queryKey: ["items", itemId],
    queryFn: async () => await getSingleItemAction(itemId),
  });

  return { item, isLoadingItem };
}
