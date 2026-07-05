import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchForm } from "./SearchForm";
import * as nextIntl from "next-intl";

vi.mock("next-intl", () => ({
  useTranslations: vi.fn(),
}));

vi.mock("@/hooks/useLocalStorage", () => ({
  useLocalStorage: vi.fn(() => ["", vi.fn()]),
}));

vi.mock("@/actions/searchAction", () => ({
  searchAction: vi.fn(),
}));

describe("SearchForm Component", () => {
  it("renders the search input and button", () => {
    vi.mocked(nextIntl.useTranslations).mockReturnValue(
      (() => "Search") as unknown as ReturnType<
        typeof nextIntl.useTranslations
      >,
    );

    render(<SearchForm initialQuery="" locale="en" />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  it("updates value on change", () => {
    const mockSetPokemon = vi.fn();
    vi.mocked(nextIntl.useTranslations).mockReturnValue(
      (() => "Search") as unknown as ReturnType<
        typeof nextIntl.useTranslations
      >,
    );
    vi.mock("@/hooks/useLocalStorage", () => ({
      useLocalStorage: vi.fn(() => ["", mockSetPokemon]),
    }));

    render(<SearchForm initialQuery="" locale="en" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "pikachu" } });

    expect(mockSetPokemon).toHaveBeenCalledWith("pikachu");
  });
});
