"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./not-found.css";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>{t("title") || "Page Not Found"}</h2>
      <p>
        {t("description") ||
          "Oops! The page you are looking for doesn't exist."}
      </p>
      <Link href="/" className="not-found-home-btn">
        {t("backHome") || "Return to Dashboard"}
      </Link>
    </div>
  );
}
