import { usePokemonStore } from "../../store/usePokemonStore";
import { generateCsvAction } from "@/actions/downloadAction";
export const useHandleDownload = () => {
  const selectedItems = usePokemonStore((state) => state.selectedItems);
  const handleDownload = async () => {
    if (selectedItems.length === 0) return;
    try {
      const csvContent = await generateCsvAction(selectedItems);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedItems.length}_items.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate CSV on server:", error);
    }
  };
  return { handleDownload };
};
