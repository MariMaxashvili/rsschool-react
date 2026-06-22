import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LanguageSwitcher } from "./LanguageSwitcher";
import * as nextIntl from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

vi.mock("next-intl", () => ({
  useLocale: vi.fn(),
}));

vi.mock("@/i18n/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("@/i18n/routing", () => ({
  routing: { locales: ["en", "fr"] },
}));

describe("LanguageSwitcher Component", () => {
  it("changes language when a new option is selected", () => {
    const mockReplace = vi.fn();
    vi.mocked(nextIntl.useLocale).mockReturnValue("en");
    vi.mocked(useRouter).mockReturnValue({ replace: mockReplace } as any);
    vi.mocked(usePathname).mockReturnValue("/");
    render(<LanguageSwitcher />);
    const select = screen.getByLabelText("Select language");
    fireEvent.change(select, { target: { value: "fr" } });
    expect(mockReplace).toHaveBeenCalledWith("/", { locale: "fr" });
  });
});
