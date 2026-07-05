"use client";
import { usePokemonStore } from "../../store/usePokemonStore";
import { useTranslations } from "next-intl";
import { useHandleDownload } from "./useHandleDownload";
import "./Flyout.styles.css";
const Flyout = () => {
  const t = useTranslations("Flyout");
  const { selectedItems, unselectAll } = usePokemonStore();
  const { handleDownload } = useHandleDownload();
  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <span>{t("itemsSelected", { count: selectedItems.length })}</span>
      <button className="flyout-unselect" onClick={unselectAll}>
        {t("unselectAll")}
      </button>
      <button className="flyout-download" onClick={handleDownload}>
        {t("download")}
      </button>
    </div>
  );
};

export { Flyout };
