import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPokemon } from "./test-utils/mocks";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MemoryRouter } from "react-router-dom";

const renderApp = () => {
  return render(
    <MemoryRouter initialEntries={["/?page=1"]}>
      <App />
    </MemoryRouter>,
  );
};

const mockAPIError = () => {
  vi.spyOn(window, "fetch").mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => ({
      message: "Internal Server Error",
    }),
  } as Response);
};
const mockListFetch = () => {
  vi.spyOn(window, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ url: "https://pokeapi.co/api/v2/pokemon/1" }],
      }),
    } as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    } as Response);
};
const mockSingleFetch = () => {
  vi.spyOn(window, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => mockPokemon,
  } as Response);
};
beforeEach(() => {
  localStorage.clear();
  mockListFetch();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("App", () => {
  it("renders search input and button", () => {
    renderApp();
    expect(
      screen.getByPlaceholderText("Search for pokemon..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("fetches and displays pokemon on mount", async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
  });

  it("error API response", async () => {
    vi.restoreAllMocks();
    mockAPIError();
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
  it("shows error when specific pokemon is not found", async () => {
    localStorage.setItem("pokemon", "pikachu");
    vi.restoreAllMocks();
    vi.spyOn(window, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/pokemon not found/i)).toBeInTheDocument();
    });
  });
  it("reads from localStorage on mount", async () => {
    vi.restoreAllMocks();
    mockSingleFetch();
    localStorage.setItem("pokemon", "pikachu");
    renderApp();
    await waitFor(() => {
      expect(screen.getByDisplayValue("pikachu")).toBeInTheDocument();
    });
  });

  it("writes and updates localStorage after search", async () => {
    renderApp();
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Search for pokemon...");
    const button = screen.getByRole("button", { name: "Search" });

    await user.type(input, "pikachu");
    await user.click(button);
    expect(localStorage.getItem("pokemon")).toBe("pikachu");

    await user.clear(input);
    await user.type(input, "charizard");
    await user.click(button);
    expect(localStorage.getItem("pokemon")).toBe("charizard");
  });
  it("handles network failure", async () => {
    vi.restoreAllMocks();
    vi.spyOn(window, "fetch").mockRejectedValueOnce(new Error("Network error"));
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
  it("throws error when Trigger Error button is clicked", async () => {
    render(
      <ErrorBoundary>
        <MemoryRouter initialEntries={["/?page=1"]}>
          <App />
        </MemoryRouter>
      </ErrorBoundary>,
    );
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Trigger Error" });
    await user.click(button);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
