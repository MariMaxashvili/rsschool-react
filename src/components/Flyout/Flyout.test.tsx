import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flyout } from "./Flyout";
import { usePokemonStore } from "../../store/usePokemonStore";
import { mockPokemon } from "../../test-utils/mocks";

const renderFlyout = () => render(<Flyout />);

describe("Flyout", () => {
  beforeEach(() => {
    usePokemonStore.setState({ selectedItems: [] });
  });

  it("renders nothing when no items are selected", () => {
    renderFlyout();
    expect(screen.queryByText(/item\(s\) selected/i)).not.toBeInTheDocument();
  });

  it("renders flyout when items are selected", () => {
    usePokemonStore.setState({ selectedItems: [mockPokemon] });
    renderFlyout();
    expect(screen.getByText("1 item(s) selected")).toBeInTheDocument();
  });

  it("renders Unselect all and Download buttons", () => {
    usePokemonStore.setState({ selectedItems: [mockPokemon] });
    renderFlyout();
    expect(
      screen.getByRole("button", { name: /unselect all/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download/i }),
    ).toBeInTheDocument();
  });

  it("unselects all items when Unselect all is clicked", async () => {
    usePokemonStore.setState({ selectedItems: [mockPokemon] });
    renderFlyout();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /unselect all/i }));
    expect(usePokemonStore.getState().selectedItems).toHaveLength(0);
  });

  it("triggers download when Download is clicked", async () => {
    usePokemonStore.setState({ selectedItems: [mockPokemon] });

    const createObjectURL = vi.fn(() => "blob:mock-url");
    const revokeObjectURL = vi.fn();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === "a") {
        vi.spyOn(el as HTMLAnchorElement, "click").mockImplementation(() => {});
      }
      return el;
    });

    renderFlyout();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /download/i }));

    expect(createObjectURL).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });

  it("displays correct count for multiple selected items", () => {
    usePokemonStore.setState({ selectedItems: [mockPokemon, mockPokemon] });
    renderFlyout();
    expect(screen.getByText("2 item(s) selected")).toBeInTheDocument();
  });
});
