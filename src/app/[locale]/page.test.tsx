import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "./page";
import { PokemonService } from "@/services/pokemon";

vi.mock("@/services/pokemon", () => ({
  PokemonService: {
    getList: vi.fn(),
    getDetails: vi.fn(),
  },
}));

vi.mock("next-intl/server", () => ({
  getTranslations: () => () => "Home Title",
}));

vi.mock("@/components/CardList/CardList", () => ({
  CardList: () => <div>CardList</div>,
}));
vi.mock("@/components/Pagination/Pagination", () => ({
  Pagination: () => <div>Pagination</div>,
}));

describe("HomePage", () => {
  it("renders the page and fetches data", async () => {
    vi.mocked(PokemonService.getList).mockResolvedValue({
      results: [],
      totalPages: 1,
    });
    const params = Promise.resolve({ locale: "en" });
    const searchParams = Promise.resolve({ page: "1" });

    const Component = await HomePage({ params, searchParams });
    render(Component);

    expect(screen.getByText("Home Title")).toBeInTheDocument();
    expect(screen.getByText("CardList")).toBeInTheDocument();
  });
});
