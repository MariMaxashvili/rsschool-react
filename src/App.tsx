import React from "react";
import "./App.css";
import { CardList } from "./components/CardList";
import type { AppState } from "./types";
import type { PokemonDetail } from "./types";
import { Input } from "./components/Input";

export class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemon: "",
      results: [],
      loading: false,
      error: null,
      throwError: false,
    };
  }
  async getPokemon() {
    const { pokemon } = this.state;
    const trimmed = pokemon.trim();
    localStorage.setItem("pokemon", trimmed);
    this.setState({ pokemon: trimmed, loading: true, error: null });
    try {
      const { pokemon } = this.state;

      if (pokemon.trim()) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase().trim()}`,
        );
        if (!response.ok) throw new Error("Pokemon not found!");
        const data: PokemonDetail = await response.json();
        this.setState({ results: [data], loading: false });
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
        this.setState({ results: details, loading: false });
      }
    } catch (err) {
      this.setState({ error: (err as Error).message, loading: false });
    }
  }

  componentDidMount(): void {
    const savedPokemon = localStorage.getItem("pokemon") || "";
    this.setState({ pokemon: savedPokemon }, () => {
      this.getPokemon();
    });
  }

  render() {
    if (this.state.throwError) {
      throw new Error("Test error!");
    }
    const { pokemon, results, loading, error } = this.state;
    return (
      <div className="app">
        <Input
          pokemon={pokemon}
          onChange={(value: string) => this.setState({ pokemon: value })}
          onSearch={() => this.getPokemon()}
        />
        <CardList results={results} loading={loading} error={error} />
        <button
          className="error-btn"
          onClick={() => this.setState({ throwError: true })}
        >
          Trigger Error
        </button>
      </div>
    );
  }
}
