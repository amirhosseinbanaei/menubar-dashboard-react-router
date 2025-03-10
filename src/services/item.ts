import { BASE_URL } from "./config";

export const fetchItemsAPI = async (orderNumber?: number) => {
  const res = await fetch(`${BASE_URL}/item?orderNumber=${orderNumber}`, {
    next: { tags: ["items"] },
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((data) => data.data);
};