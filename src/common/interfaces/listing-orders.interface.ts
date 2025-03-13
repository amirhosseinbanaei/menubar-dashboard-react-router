interface Order {
  id: number;
  order: number;
}

export type ListingOrders = {
  orders: Order[];
};

export type ListingSubcategoryOrders = Partial<ListingOrders> & {
  category_id: number;
};
