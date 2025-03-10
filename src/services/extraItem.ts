import { BASE_URL } from "./config";

export const fetchExtraItemsAPI = async () => {
  const res = await fetch(`${BASE_URL}/extra-item`, {
    next: { tags: ["extraItems"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((data) => data.data);
};