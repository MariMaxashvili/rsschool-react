import { useState } from "react";

export type LocalStorageKey = "pokemon";

const useLocalStorage = ({
  key,
  initialValue,
}: {
  key: LocalStorageKey;
  initialValue: string;
}) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
