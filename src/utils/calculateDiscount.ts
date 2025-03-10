type FunctionParams = number | string | null;
export const calculateDiscount = (
  discount: FunctionParams,
  price: FunctionParams,
) => {
  const dis = Number(discount);
  const p = Number(price);
  return Math.round(p - (dis * p) / 100);
};
