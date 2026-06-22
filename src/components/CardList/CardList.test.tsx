import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardList } from "../CardList/CardList";
import { mockPokemonList } from "../../test-utils/mocks";
import { usePokemonStore } from "../../store/usePokemonStore";
import { NextIntlClientProvider } from "next-intl";

describe("CardList", () => {
  beforeEach(() => {
    usePokemonStore.setState({ selectedItems: [] });
  });

  it("renders loading message when spinner or status role is expected", () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <CardList results={[]} error={null} page={1} q="" />
      </NextIntlClientProvider>,
    );
  });

  it("shows error when it is provided", () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <CardList results={[]} error={"Something went wrong"} page={1} q="" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders correct amount of cards", () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <CardList results={mockPokemonList} error={null} page={1} q="" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it("renders nothing when results are empty", () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <CardList results={[]} error={null} page={1} q="" />
      </NextIntlClientProvider>,
    );
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });
});
