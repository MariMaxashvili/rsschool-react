import { BASE_URL } from "../constants";
import type { PokemonDetail } from "../types";

const ITEMS_PER_PAGE = 10;

export const PokemonService = {
  async getDetails(id: string, signal?: AbortSignal): Promise<PokemonDetail> {
    const response = await fetch(`${BASE_URL}/${id.toLowerCase()}`, { signal });
    if (!response.ok) throw new Error("Failed to load details.");
    return response.json();
  },

  async getList(
    page: number,
    signal?: AbortSignal,
  ): Promise<{ results: PokemonDetail[]; totalPages: number }> {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const response = await fetch(
      `${BASE_URL}?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
      { signal },
    );
    if (!response.ok) throw new Error("Something went wrong!");

    const data = await response.json();
    const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

    const results: PokemonDetail[] = await Promise.all(
      data.results.map((p: { url: string }) =>
        fetch(p.url, { signal }).then((r) => r.json()),
      ),
    );

    return { results, totalPages };
  },
};
