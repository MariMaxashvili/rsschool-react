import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { mockPokemon } from "../../test-utils/mocks";
import { MemoryRouter } from "react-router-dom";

describe("Card", () => {
  beforeEach(() => {
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
});
