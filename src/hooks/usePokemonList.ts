import { useState, useEffect } from "react";
import type { PokemonDetail } from "../types";
import { BASE_URL } from "../constants";

const ITEMS_PER_PAGE = 10;

export const usePokemonList = (pokemon: string, page: number) => {
  const [results, setResults] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    const controller = new AbortController();
    const trimmed = pokemon.trim();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (trimmed) {
          const response = await fetch(`${BASE_URL}/${trimmed.toLowerCase()}`, {
            signal: controller.signal,
          });
          if (!response.ok) {
            setError("Pokemon not found!");
            setResults([]);
            return;
          }
          const data: PokemonDetail = await response.json();
          setResults([data]);
          setError("");
        } else {
          const offset = (page - 1) * ITEMS_PER_PAGE;
          const response = await fetch(
            `${BASE_URL}?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
          );
          if (!response.ok) throw new Error("Something went wrong!");
          const data = await response.json();
          setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
          const details: PokemonDetail[] = await Promise.all(
            data.results.map((p: { url: string }) =>
              fetch(p.url).then((r) => r.json()),
            ),
          );
          setResults(details);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [page, pokemon]);

  return { results, loading, error, totalPages };
};
