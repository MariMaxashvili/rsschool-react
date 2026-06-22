import { getTranslations } from "next-intl/server";
import { PokemonService } from "@/services/pokemon";
import { SearchForm } from "@/components/SearchForm/SearchForm";
import { RefreshButton } from "@/components/RefreshButton/RefreshButton";
import { ErrorTrigger } from "@/components/ErrorTrigger/ErrorTrigger";
import { Pagination } from "@/components/Pagination/Pagination";
import { CardList } from "@/components/CardList/CardList";
import { PokemonDetailsPanel } from "@/components/PokemonDetails/PokemonDetailsPanel";
import { Flyout } from "@/components/Flyout/Flyout";
import type { PokemonDetail } from "@/types";
import { notFound } from "next/navigation";
export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  const pageParam = typeof sp.page === "string" ? sp.page : undefined;
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  const q = typeof sp.q === "string" ? sp.q : "";
  const selectedId = typeof sp.id === "string" ? sp.id : undefined;

  const t = await getTranslations("HomePage");

  let results: PokemonDetail[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    if (q.trim()) {
      const detail = await PokemonService.getDetails(q.trim());
      results = [detail];
      totalPages = 1;
    } else {
      const data = await PokemonService.getList(page);
      results = data.results;
      totalPages = data.totalPages;
    }
  } catch {
    notFound();
  }

  return (
    <div className="app">
      <h1>{t("title")}</h1>
      <SearchForm initialQuery={q} locale={locale} />
      <RefreshButton />
      <div className="main-layout-container">
        <div className="master-panel">
          <CardList results={results} error={error} page={page} q={q} />

          {!error && !q.trim() && (
            <Pagination page={page} totalPages={totalPages} q={q} />
          )}
        </div>

        <div className="detail-panel">
          {selectedId && (
            <PokemonDetailsPanel id={selectedId} page={page} q={q} />
          )}
        </div>
      </div>
      <ErrorTrigger />
      <Flyout />
    </div>
  );
}
