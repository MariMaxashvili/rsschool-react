import { useState } from "react";
import "./App.css";
import { CardList } from "./components/CardList/CardList";
import { Input } from "./components/Input/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Outlet, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePokemonList } from "./hooks/usePokemonList";
import { ROUTES } from "./constants";
const App = () => {
  const [pokemon, setPokemon] = useLocalStorage({
    key: "pokemon",
    initialValue: "",
  });
  const [throwError, setThrowError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  const { results, loading, error, totalPages } = usePokemonList(pokemon, page);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
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
        <Link to={ROUTES.ABOUT} className="link">
          Go to About Page &rarr;
        </Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
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
              <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
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
      <Flyout />
    </div>
  );
};

export { App };
