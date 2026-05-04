<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
=======
import React from "react";
import "./App.css";
import { CardList } from "./components/CardList";
import type { AppState } from "./types";
import type { PokemonDetail } from "./types";
import { Input } from "./components/input";

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
    this.setState({ loading: true, error: null });

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
  componentDidUpdate(_: object, prevState: Readonly<AppState>): void {
    if (this.state.pokemon !== prevState.pokemon) {
      localStorage.setItem("pokemon", this.state.pokemon);
    }
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
>>>>>>> Stashed changes
