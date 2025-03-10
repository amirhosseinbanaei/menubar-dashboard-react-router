import { BASE_URL } from "./config";

export const fetchProjectAPI = async () => {
  const res = await fetch(`${BASE_URL}/project`, {
    next: { tags: ["projects"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((data) => data.data);
};
