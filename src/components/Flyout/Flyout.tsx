"use client";
import { usePokemonStore } from "../../store/usePokemonStore";
import { useHandleDownload } from "./useHandleDownload";
import "./Flyout.styles.css";
const Flyout = () => {
  const { selectedItems, unselectAll } = usePokemonStore();
  const { handleDownload } = useHandleDownload();
  if (selectedItems.length === 0) return null;

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
