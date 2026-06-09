import { usePokemonStore } from "../../store/usePokemonStore";

export const useHandleDownload = () => {
  const selectedItems = usePokemonStore((state) => state.selectedItems);
  const handleDownload = () => {
    const header = "name,types,abilities,base_experience,details_url";
    const rows = selectedItems.map((p) => {
      const types = p.types.map((t) => t.type.name).join("|");
      const abilities = p.abilities.map((a) => a.ability.name).join("|");
      const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${p.name}`;
      return `${p.name},${types},${abilities},${p.base_experience},${detailsUrl}`;
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return { handleDownload };
};
