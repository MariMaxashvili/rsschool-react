import { useState, useEffect, type DependencyList } from "react";

export const useFetch = <T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn(controller.signal);
        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    execute();

    return () => {
      controller.abort();
    };
  }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData, loading, error };
};
