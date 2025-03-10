import { useState, useEffect } from "react";
export default function useSessionStorage(
  key: string,
  initialValue: any | false | any[] = [],
) {
  const [value, setValue] = useState<any>(
    () => JSON.parse(sessionStorage.getItem(key)) || initialValue,
  );
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return [value, setValue];
}
