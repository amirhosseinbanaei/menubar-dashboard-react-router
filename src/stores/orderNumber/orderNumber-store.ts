import { create } from "zustand";

export interface OrderNumberState {
  orderNumber: number;
  setOrderNumber: (newOrderNumber: number) => void;
  increment: () => void;
  resetNumber: () => void;
}

const useOrderNumberStore = create<OrderNumberState>((set) => ({
  orderNumber: 0,
  setOrderNumber: (newNumber) => set(() => ({ orderNumber: newNumber })),
  increment: () =>
    set((state) => {
      console.log("call");
      return {
        orderNumber: state.orderNumber + 1
      }
    }),
  resetNumber: () => set(() => ({ orderNumber: 0 })),
}));
export default useOrderNumberStore;
