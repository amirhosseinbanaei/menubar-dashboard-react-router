import { fetchItemsAPI } from "@/services/item";
import { useQuery } from "@tanstack/react-query";

export const useItems = (orderNumber?: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items", orderNumber],
    queryFn: () => fetchItemsAPI(orderNumber),
  });

  return { data, isLoading, error };
};
