"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function RefreshButton() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  return (
    <button className="refresh-btn" onClick={() => router.refresh()}>
      {t("refresh")}
    </button>
  );
}
