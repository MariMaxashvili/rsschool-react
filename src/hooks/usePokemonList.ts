import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "../services/pokemon";
import { QUERY_KEYS } from "../constants";

export const usePokemonList = (pokemon: string, page: number) => {
  const trimmed = pokemon.trim();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.pokemon, trimmed, page],
    queryFn: () => {
      if (trimmed) {
        return PokemonService.getDetails(trimmed).then((detail) => ({
          results: [detail],
          totalPages: 1,
        }));
      }
      return PokemonService.getList(page);
    },
  });

  return {
    results: data?.results ?? [],
    totalPages: data?.totalPages ?? 1,
    loading: isLoading,
    error: error ? "Failed to load Pokémon. Please try again." : null,
    refetch,
  };
};
