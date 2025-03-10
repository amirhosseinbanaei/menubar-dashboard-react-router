import { BASE_URL } from "./config";

export const fetchCategoriesAPI = async () => {
  const res = await fetch(`${BASE_URL}/category`, {
    next: { tags: ["categories"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((data) => data.data);
};
