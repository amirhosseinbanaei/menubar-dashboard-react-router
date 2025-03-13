import { useState, useEffect } from 'react';
import { localStorageAction } from '../utils/localstorage.util';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    return localStorageAction.get(key, initialValue);
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorageAction.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
