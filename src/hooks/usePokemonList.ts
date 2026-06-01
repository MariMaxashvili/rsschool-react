import { useFetch } from "./useFetch";
import { PokemonService } from "../services/pokemon";

export const usePokemonList = (pokemon: string, page: number) => {
  const trimmed = pokemon.trim();

  const { data, loading, error } = useFetch(
    async (signal) => {
      if (trimmed) {
        const detail = await PokemonService.getDetails(trimmed, signal);
        return { results: [detail], totalPages: 1 };
      }

      return PokemonService.getList(page, signal);
    },
    [trimmed, page],
  );

  return {
    results: data?.results ?? [],
    totalPages: data?.totalPages ?? 1,
    loading,
    error,
  };
};
