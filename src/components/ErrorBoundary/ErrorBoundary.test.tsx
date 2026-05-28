import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";
import userEvent from "@testing-library/user-event";
import { CardList } from "../CardList/CardList";
import { mockPokemonList } from "../../test-utils/mocks";
import { MemoryRouter } from "react-router-dom";
const ThrowError = () => {
  throw new Error("Test error!");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("renders children normally when there is no error", () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <CardList results={mockPokemonList} loading={false} error={null} />
        </MemoryRouter>
      </ErrorBoundary>,
    );
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });
  it("shows fallback UI when a child throws and hides children when error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
        <p>visible content</p>
      </ErrorBoundary>,
    );
    expect(screen.queryByText(/visible content/i)).not.toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it("renders try again button in fallback UI", async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    const button = screen.getByRole("button", { name: /try again/i });
    await user.click(button);
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it("calls console.error when error is caught", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(console.error).toHaveBeenCalled();
  });
});
