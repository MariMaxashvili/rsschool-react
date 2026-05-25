import { usePokemonStore } from "../store/usePokemonStore";

const Flyout = () => {
  const { selectedItems, unselectAll } = usePokemonStore();

  if (selectedItems.length === 0) return null; // hidden when nothing selected ✓

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

  return (
    <div className="flyout">
      <span>{selectedItems.length} item(s) selected</span>
      <button className="flyout-unselect" onClick={unselectAll}>
        Unselect all
      </button>
      <button className="flyout-download" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export { Flyout };
