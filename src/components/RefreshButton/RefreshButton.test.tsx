import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RefreshButton } from "./RefreshButton";
import * as nextIntl from "next-intl";
import { useRouter } from "@/i18n/navigation";

vi.mock("next-intl", () => ({
  useTranslations: vi.fn(),
}));

vi.mock("@/i18n/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("RefreshButton Component", () => {
  it("calls router.refresh when clicked", () => {
    const mockRefresh = vi.fn();
    vi.mocked(nextIntl.useTranslations).mockReturnValue(
      (() => "Refresh") as unknown as ReturnType<
        typeof nextIntl.useTranslations
      >,
    );
    vi.mocked(useRouter).mockReturnValue({ refresh: mockRefresh } as any);

    render(<RefreshButton />);
    const button = screen.getByRole("button", { name: /Refresh/i });
    fireEvent.click(button);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
