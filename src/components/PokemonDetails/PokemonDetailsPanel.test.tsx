import { render, screen } from "@testing-library/react";
import { PokemonDetailsPanel } from "./PokemonDetailsPanel";
import { PokemonService } from "@/services/pokemon";
import * as nextIntlServer from "next-intl/server";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { mockPokemon } from "../../test-utils/mocks";

vi.mock("@/services/pokemon");
vi.mock("next-intl/server");
interface MockTranslator {
  (key: string): string;
}
describe("PokemonDetailsPanel (Server Component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const mockT: MockTranslator = (key: string) => key;
    vi.mocked(nextIntlServer.getTranslations).mockResolvedValue(
      mockT as unknown as Awaited<
        ReturnType<typeof nextIntlServer.getTranslations>
      >,
    );
  });

  it("fetches and displays pokemon details successfully", async () => {
    vi.mocked(PokemonService.getDetails).mockResolvedValue(mockPokemon);
    const ui = await PokemonDetailsPanel({ id: "bulbasaur", page: 1 });
    render(ui);

    expect(screen.getByText(/BULBASAUR/i)).toBeInTheDocument();
    expect(screen.getByText("grass")).toBeInTheDocument();
  });

  it("renders error message on failure", async () => {
    vi.mocked(PokemonService.getDetails).mockRejectedValue(new Error("Failed"));
    const ui = await PokemonDetailsPanel({ id: "error", page: 1 });
    render(ui);
    expect(await screen.findByText("detailsLoadError")).toBeInTheDocument();
  });
});
