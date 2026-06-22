import { describe, it, expect, vi, beforeEach } from "vitest";
import { PokemonService } from "./pokemon";
import { BASE_URL } from "../constants";

global.fetch = vi.fn();

describe("PokemonService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getDetails returns data on success", async () => {
    const mockData = { id: 1, name: "pikachu" };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await PokemonService.getDetails("pikachu");
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/pikachu`,
      expect.any(Object),
    );
    expect(result).toEqual(mockData);
  });

  it("getDetails throws error on failure", async () => {
    (fetch as any).mockResolvedValue({ ok: false });
    await expect(PokemonService.getDetails("invalid")).rejects.toThrow(
      "Failed to load details.",
    );
  });
  it("throws an error when the API returns a 500 status", async () => {
    (global.fetch as any).mockResolvedValue({ ok: false });
    await expect(PokemonService.getList(1)).rejects.toThrow(
      "Something went wrong!",
    );
  });
});
