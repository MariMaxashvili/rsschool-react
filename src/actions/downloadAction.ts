"use server";

import type { PokemonDetail } from "@/types";
import { BASE_URL } from "@/constants";
const header = "name,types,abilities,base_experience,details_url";
export async function generateCsvAction(
  selectedItems: PokemonDetail[],
): Promise<string> {
  const rows = selectedItems.map((p) => {
    const types = p.types.map((t) => t.type.name).join("|");
    const abilities = p.abilities.map((a) => a.ability.name).join("|");
    const detailsUrl = `${BASE_URL}/${p.name}`;

    return `${p.name},${types},${abilities},${p.base_experience || 0},${detailsUrl}`;
  });
  return [header, ...rows].join("\n");
}
