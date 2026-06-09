import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    const BrokenComponent = () => {
      useTheme();
      return null;
    };
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<BrokenComponent />)).toThrow(
      "useTheme must be used within ThemeProvider",
    );
    spy.mockRestore();
  });
});
