import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ErrorTrigger } from "./ErrorTrigger";
import * as nextIntl from "next-intl";

// Mock the useTranslations hook
vi.mock("next-intl", () => ({
  useTranslations: vi.fn(),
}));

describe("ErrorTrigger Component", () => {
  it("triggers an error when the button is clicked", () => {
    vi.mocked(nextIntl.useTranslations).mockReturnValue(
      (() => "Trigger Error") as unknown as ReturnType<
        typeof nextIntl.useTranslations
      >,
    );
    render(<ErrorTrigger />);
    const button = screen.getByRole("button", { name: /Trigger Error/i });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => fireEvent.click(button)).toThrow("Test error!");

    consoleSpy.mockRestore();
  });
});
