import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";
import * as themeContext from "@/context/theme/useTheme";

vi.mock("@/context/theme/useTheme", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle Component", () => {
  it("displays correct label and calls toggleTheme on click", () => {
    const mockToggleTheme = vi.fn();
    vi.mocked(themeContext.useTheme).mockReturnValue({
      theme: "light",
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /Dark Mode/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("displays 'Light Mode' when theme is 'dark'", () => {
    vi.mocked(themeContext.useTheme).mockReturnValue({
      theme: "dark",
      toggleTheme: vi.fn(),
    });

    render(<ThemeToggle />);
    expect(screen.getByText(/Light Mode/i)).toBeInTheDocument();
  });
});
