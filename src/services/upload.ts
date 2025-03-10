import { BASE_URL } from "./config";

export const uploadAPI = async (formData: FormData, queries?: string) => {
  const res = await fetch(`${BASE_URL}/upload?${queries}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload");
  }

  return res.json().then((data) => data.data);
};
