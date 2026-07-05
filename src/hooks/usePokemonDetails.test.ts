import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { usePokemonDetails } from "./usePokemonDetails";
import { useFetch } from "./useFetch";

vi.mock("./useFetch", () => ({
  useFetch: vi.fn(),
}));

vi.mock("../services/pokemon", () => ({
  PokemonService: {
    getDetails: vi.fn(),
  },
}));

describe("usePokemonDetails", () => {
  it("returns null data when no id is provided", () => {
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => usePokemonDetails(undefined));

    expect(result.current.detailData).toBeNull();
  });

  it("calls useFetch with a function that executes the PokemonService", async () => {
    vi.mocked(useFetch).mockReturnValue({
      data: { name: "Pikachu" },
      loading: false,
      error: null,
    } as any);

    renderHook(() => usePokemonDetails("pikachu"));
    expect(useFetch).toHaveBeenCalledWith(expect.any(Function), ["pikachu"]);
  });
});
