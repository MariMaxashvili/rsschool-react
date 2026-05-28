import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardList } from "../CardList/CardList";
import { mockPokemonList } from "../../test-utils/mocks";
import { MemoryRouter } from "react-router-dom";
describe("CardList", () => {
  it("renders loading message when loading is true", () => {
    render(<CardList results={[]} loading={true} error={null} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("shows error when it is provided", () => {
    render(
      <CardList results={[]} loading={false} error={"Something went wrong"} />,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders correct amount of cards", () => {
    render(
      <MemoryRouter>
        <CardList results={mockPokemonList} loading={false} error={null} />
      </MemoryRouter>,
    );
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });
  it("renders nothing when results are empty", () => {
    <CardList results={[]} loading={false} error={null} />;
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });
});
