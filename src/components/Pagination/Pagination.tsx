import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface Props {
  page: number;
  totalPages: number;
  q?: string;
}

export async function Pagination({ page, totalPages, q }: Props) {
  const t = await getTranslations("HomePage");
  const hrefFor = (p: number) => ({
    pathname: "/",
    query: { page: String(p), ...(q ? { q } : {}) },
  });

  return (
    <div className="pagination-controls">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)}>{t("previous")}</Link>
      ) : (
        <button disabled>{t("previous")}</button>
      )}
      <span>{t("page", { page })}</span>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)}>{t("next")}</Link>
      ) : (
        <button disabled>{t("next")}</button>
      )}
    </div>
  );
}
