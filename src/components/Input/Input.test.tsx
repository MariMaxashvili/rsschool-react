import "@testing-library/jest-dom/vitest";
import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Input pokemon="" onChange={mockOnChange} onSearch={mockOnSearch} />,
    );
  });
  it("renders search input and button", () => {
    expect(
      screen.getByPlaceholderText("Search for pokemon..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });
  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Search for pokemon...");
    await user.type(input, "pikachu");
    expect(mockOnChange).toHaveBeenCalledWith("p");
  });

  it("calls onSearch when search button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Search" });
    await user.click(button);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
