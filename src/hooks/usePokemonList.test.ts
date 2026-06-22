import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { usePokemonList } from "./usePokemonList";
import { PokemonService } from "../services/pokemon";
import { useQuery } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../services/pokemon", () => ({
  PokemonService: {
    getDetails: vi.fn(),
    getList: vi.fn(),
  },
}));

describe("usePokemonList", () => {
  it("uses getList when search query is empty", async () => {
    vi.mocked(useQuery).mockImplementation((options: any) => {
      if (options.queryFn) {
        options.queryFn();
      }
      return { data: { results: [], totalPages: 1 }, isLoading: false } as any;
    });

    renderHook(() => usePokemonList("", 1));

    expect(PokemonService.getList).toHaveBeenCalledWith(1);
    expect(PokemonService.getDetails).not.toHaveBeenCalled();
  });

  it("uses getDetails when search query exists", async () => {
    vi.mocked(useQuery).mockImplementation((options: any) => {
      if (options.queryFn) {
        options.queryFn();
      }
      return { data: { results: [], totalPages: 1 }, isLoading: false } as any;
    });

    renderHook(() => usePokemonList("pikachu", 1));

    expect(PokemonService.getDetails).toHaveBeenCalledWith("pikachu");
    expect(PokemonService.getList).not.toHaveBeenCalled();
  });
});
