import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PokemonService } from "@/services/pokemon";

interface Props {
  id: string;
  page: number;
  q?: string;
}

export async function PokemonDetailsPanel({ id, page, q }: Props) {
  const t = await getTranslations("HomePage");
  const closeHref = {
    pathname: "/",
    query: { page: String(page), ...(q ? { q } : {}) },
  };

  try {
    const detail = await PokemonService.getDetails(id);
    return (
      <div className="details-card">
        <div className="details-header">
          <h2>{detail.name.toUpperCase()}</h2>
          <Link href={closeHref} className="close-btn">
            &times;
          </Link>
        </div>
        <div className="details-body">
          <h3>{t("types")}</h3>
          <ul className="details-list">
            {detail.types.map((type, i) => (
              <li key={i}>{type.type.name}</li>
            ))}
          </ul>
          <h3>{t("abilities")}</h3>
          <ul className="details-list">
            {detail.abilities.map((ability, i) => (
              <li key={i}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="details-error">
        <p>{t("detailsLoadError")}</p>
        <Link href={closeHref}>{t("close")}</Link>
      </div>
    );
  }
}
