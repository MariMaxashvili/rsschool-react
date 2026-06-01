import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "../services/pokemon";

export const usePokemonList = (pokemon: string, page: number) => {
  const trimmed = pokemon.trim();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pokemon", trimmed, page],
    queryFn: () => {
      if (trimmed) {
        return PokemonService.getDetails(trimmed).then((detail) => ({
          results: [detail],
          totalPages: 1,
        }));
      }
      return PokemonService.getList(page);
    },
    staleTime: Number(import.meta.env.VITE_CACHE_TTL ?? 5 * 60 * 1000),
  });

  return {
    results: data?.results ?? [],
    totalPages: data?.totalPages ?? 1,
    loading: isLoading,
    error: error ? "Failed to load Pokémon. Please try again." : null,
    refetch,
  };
};
