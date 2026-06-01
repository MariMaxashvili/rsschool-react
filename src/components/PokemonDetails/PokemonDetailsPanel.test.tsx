import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PokemonDetailsPanel } from "./PokemonDetailsPanel";
import { mockPokemon } from "../../test-utils/mocks";

const renderWithRoute = (initialEntry = "/pokemon/bulbasaur") => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/pokemon/:id" element={<PokemonDetailsPanel />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("PokemonDetailsPanel Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the loading state initially", async () => {
    vi.spyOn(window, "fetch").mockReturnValue(new Promise(() => {}));

    renderWithRoute();

    expect(document.querySelector(".spinner")).toBeInTheDocument();
  });

  it("fetches and displays pokemon details successfully", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockPokemon,
    } as Response);

    renderWithRoute();
    await waitFor(
      () => {
        expect(screen.getByText("BULBASAUR")).toBeInTheDocument();
        expect(screen.getByText("Types")).toBeInTheDocument();
        expect(screen.getByText("grass")).toBeInTheDocument();
        expect(screen.getByText("Abilities")).toBeInTheDocument();
        expect(screen.getByText("overgrow")).toBeInTheDocument();
      },
      { timeout: 1500 },
    );
  });

  it("renders error message and handles close navigation when fetch fails", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    const user = userEvent.setup();
    renderWithRoute();

    await waitFor(
      () => {
        expect(
          screen.getByText(/failed to load pokémon details/i),
        ).toBeInTheDocument();
      },
      { timeout: 1500 },
    );

    const closeBtn = screen.getByRole("button", { name: /Close/i });
    await user.click(closeBtn);
  });

  it("handles the close layout action via close icon button click", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockPokemon,
    } as Response);

    const user = userEvent.setup();
    renderWithRoute("/pokemon/bulbasaur?page=1");

    await waitFor(
      () => {
        expect(screen.getByText("BULBASAUR")).toBeInTheDocument();
      },
      { timeout: 1500 },
    );

    const closeIconBtn = screen.getByRole("button", { name: "×" });
    await user.click(closeIconBtn);
  });
});
