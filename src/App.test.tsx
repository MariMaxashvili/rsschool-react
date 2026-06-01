import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPokemon } from "./test-utils/mocks";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { usePokemonStore } from "./store/usePokemonStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // don't retry on error in tests
        staleTime: 0,
      },
    },
  });
const renderApp = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter initialEntries={["/?page=1"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
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
  usePokemonStore.setState({ selectedItems: [] });
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
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
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
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
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
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });
  it("throws error when Trigger Error button is clicked", async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ThemeProvider>
          <ErrorBoundary>
            <MemoryRouter initialEntries={["/?page=1"]}>
              <App />
            </MemoryRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Trigger Error" }),
      ).toBeInTheDocument();
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Trigger Error" }));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it("renders theme toggle button", () => {
    renderApp();
    expect(
      screen.getByRole("button", { name: /dark mode|light mode/i }),
    ).toBeInTheDocument();
  });
  it("toggles theme when theme button is clicked", async () => {
    renderApp();
    const user = userEvent.setup();
    const themeBtn = screen.getByRole("button", { name: /dark mode/i });
    await user.click(themeBtn);
    expect(
      screen.getByRole("button", { name: /light mode/i }),
    ).toBeInTheDocument();
  });
  it("shows loading state while fetching", async () => {
    vi.restoreAllMocks();
    vi.spyOn(window, "fetch").mockImplementation(() => new Promise(() => {}));
    const { container } = renderApp();
    await waitFor(() => {
      expect(
        container.querySelector(".spinner") || screen.queryByText(/loading/i),
      ).toBeTruthy();
    });
  });
  it("caches data and does not refetch on re-render", async () => {
    const fetchSpy = vi.spyOn(window, "fetch");
    const queryClient = createTestQueryClient();
    const renderWithClient = () =>
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <MemoryRouter initialEntries={["/?page=1"]}>
              <App />
            </MemoryRouter>
          </ThemeProvider>
        </QueryClientProvider>,
      );

    const { unmount } = renderWithClient();
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
    const callCount = fetchSpy.mock.calls.length;
    unmount();
    renderWithClient();
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
    expect(fetchSpy.mock.calls.length).toBe(callCount);
  });
  it("shows error state when fetch fails", async () => {
    vi.restoreAllMocks();
    vi.spyOn(window, "fetch").mockRejectedValueOnce(new Error("Network error"));
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });
});
