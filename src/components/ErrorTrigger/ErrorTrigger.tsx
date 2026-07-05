"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ErrorTrigger() {
  const t = useTranslations("HomePage");
  const [throwError, setThrowError] = useState(false);
  if (throwError) throw new Error("Test error!");
  return (
    <button className="error-btn" onClick={() => setThrowError(true)}>
      {t("triggerError")}
    </button>
  );
}
