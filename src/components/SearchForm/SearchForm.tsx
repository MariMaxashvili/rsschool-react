"use client";

import { useTranslations } from "next-intl";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { searchAction } from "@/actions/searchAction";

interface Props {
  initialQuery: string;
  locale: string;
}

export function SearchForm({ initialQuery, locale }: Props) {
  const t = useTranslations("HomePage");
  const [pokemon, setPokemon] = useLocalStorage({
    key: "pokemon",
    initialValue: initialQuery,
  });

  return (
    <section className="search-section">
      <form action={searchAction}>
        <h1>{t("title")}</h1>
        <input type="hidden" name="locale" value={locale} />
        <div className="search-bar">
          <input
            type="text"
            name="q"
            placeholder={t("searchPlaceholder")}
            value={pokemon}
            onChange={(e) => setPokemon(e.target.value)}
          />
          <button type="submit">{t("searchButton")}</button>
        </div>
      </form>
    </section>
  );
}
