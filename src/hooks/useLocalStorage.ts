"use client";
import { useState, useEffect } from "react";
export default function useLocalStorage(
  key: string,
  initialValue: any | false | any[] = [],
) {
  const [value, setValue] = useState<any>(
    () => JSON.parse(localStorage.getItem(key)) || initialValue,
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return [value, setValue];
}
