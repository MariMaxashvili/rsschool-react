import { useCallback, useEffect, useState } from "react";

export type LocalStorageKey = "pokemon";

const IS_SERVER = typeof window === "undefined";

const useLocalStorage = ({
  key,
  initialValue,
}: {
  key: LocalStorageKey;
  initialValue: string;
}) => {
  const readValue = useCallback((): string => {
    if (IS_SERVER) return initialValue;
    try {
      return localStorage.getItem(key) ?? initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  const setValue = (value: string) => {
    setStoredValue(value);
    if (!IS_SERVER) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }
  };

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
