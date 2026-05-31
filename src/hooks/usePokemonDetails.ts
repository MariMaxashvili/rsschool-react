import { useFetch } from "./useFetch";
import { PokemonService } from "../services/pokemon";

export const usePokemonDetails = (id: string | undefined) => {
  const {
    data: detailData,
    loading,
    error,
  } = useFetch(
    async (signal) => {
      if (!id) return null;
      await new Promise((resolve) => setTimeout(resolve, 800));
      return PokemonService.getDetails(id, signal);
    },
    [id],
  );

  return { detailData, loading, error };
};
