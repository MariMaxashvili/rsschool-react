import { useState, useEffect } from "react";
import "./App.css";
import { CardList } from "./components/CardList";
import { Input } from "./components/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { AppState, PokemonDetail } from "./types";
import { Outlet, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
const ITEMS_PER_PAGE = 10;

const App = () => {
  const [pokemon, setPokemon] = useLocalStorage("pokemon", "");
  const [results, setResults] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppState["error"]>(null);
  const [throwError, setThrowError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  useEffect(() => {
    const trimmed = pokemon.trim();

    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url.toString());

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (trimmed) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${trimmed.toLowerCase()}`,
          );
          if (!response.ok) throw new Error("Pokemon not found!");
          const data: PokemonDetail = await response.json();
          setResults([data]);
        } else {
          const offset = (page - 1) * ITEMS_PER_PAGE;
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
          );
          if (!response.ok) throw new Error("Something went wrong!");
          const data = await response.json();
          const details: PokemonDetail[] = await Promise.all(
            data.results.map((p: { url: string }) =>
              fetch(p.url).then((r) => r.json()),
            ),
          );
          setResults(details);
        }
      } catch (err) {
        setError((err as Error).message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pokemon]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setSearchParams({ page: newPage.toString() });
  };

  const handleInputChange = (value: string) => {
    setPokemon(value);
    setSearchParams({ page: "1" });
  };

  if (throwError) throw new Error("Test error!");
  return (
    <div className="app">
      <header className="header">
        <Link to="/about" className="link">
          Go to About Page &rarr;
        </Link>
      </header>
      <Input
        pokemon={pokemon}
        onChange={handleInputChange}
        onSearch={() => setSearchParams({ page: "1" })}
      />

      <div className="main-layout-container">
        <div className="master-panel">
          <CardList results={results} loading={loading} error={error} />

          {!loading && !error && !pokemon.trim() && (
            <div className="pagination-controls">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
          )}
        </div>

        <div className="detail-panel">
          <Outlet />
        </div>
      </div>

      <button className="error-btn" onClick={() => setThrowError(true)}>
        Trigger Error
      </button>
    </div>
  );
};

export { App };
