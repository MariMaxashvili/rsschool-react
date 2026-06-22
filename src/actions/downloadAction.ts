"use server";

import type { PokemonDetail } from "@/types";

export async function generateCsvAction(
  selectedItems: PokemonDetail[],
): Promise<string> {
  const header = "name,types,abilities,base_experience,details_url";

  const rows = selectedItems.map((p) => {
    const types = p.types.map((t) => t.type.name).join("|");
    const abilities = p.abilities.map((a) => a.ability.name).join("|");
    const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${p.name}`;

    return `${p.name},${types},${abilities},${p.base_experience || 0},${detailsUrl}`;
  });
  return [header, ...rows].join("\n");
}
