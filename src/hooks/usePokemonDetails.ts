import { useState, useEffect } from "react";
import type { PokemonDetail } from "../types";
import { BASE_URL } from "../constants";

export const usePokemonDetails = (id: string | undefined) => {
  const [detailData, setDetailData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = await fetch(`${BASE_URL}/${id.toLowerCase()}`);
        if (!response.ok) throw new Error("Failed to load details.");
        const data = await response.json();
        setDetailData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { detailData, loading, error };
};
