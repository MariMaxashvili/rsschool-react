import { useState, useEffect } from "react";
import "./App.css";
import { CardList } from "./components/CardList";
import { Input } from "./components/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { AppState, PokemonDetail } from "./types";

const App = () => {
  const [pokemon, setPokemon] = useLocalStorage("pokemon", "");
  const [results, setResults] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppState["error"]>(null);
  const [throwError, setThrowError] = useState(false);

  const getPokemon = async (search: string) => {
    const trimmed = search.trim();
    setPokemon(trimmed);
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
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10`,
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const savedPokemon = localStorage.getItem("pokemon") ?? "";
    const trimmed = savedPokemon.trim();

    const fetchInitial = async () => {
      // Move them here! Now they execute cleanly within the async flow
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
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=10`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);
  if (throwError) throw new Error("Test error!");

  return (
    <div className="app">
      <Input
        pokemon={pokemon}
        onChange={setPokemon}
        onSearch={() => getPokemon(pokemon)}
      />
      <CardList results={results} loading={loading} error={error} />
      <button className="error-btn" onClick={() => setThrowError(true)}>
        Trigger Error
      </button>
    </div>
  );
};

export { App };
