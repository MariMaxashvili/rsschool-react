import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { mockPokemon } from "../../test-utils/mocks";
import { MemoryRouter } from "react-router-dom";
import { usePokemonStore } from "../../store/usePokemonStore";
import userEvent from "@testing-library/user-event";
describe("Card", () => {
  beforeEach(() => {
    usePokemonStore.setState({ selectedItems: [] });
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>,
    );
  });
  it("renders pokemon name", () => {
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });
  it("renders pokemon types", () => {
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
  });

  it("renders pokemon abilities", () => {
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();
  });
  it("renders a checkbox", () => {
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
  it("checkbox is unchecked by default", () => {
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
  it("checking the checkbox selects the pokemon", async () => {
    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(usePokemonStore.getState().selectedItems).toHaveLength(1);
  });
  it("unchecking the checkbox unselects the pokemon", async () => {
    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(usePokemonStore.getState().selectedItems).toHaveLength(0);
  });
});
