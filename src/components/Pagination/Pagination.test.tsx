import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

vi.mock("next-intl/server", () => ({
  getTranslations: () => (key: string, values?: any) => {
    if (key === "page") return `Page ${values.page}`;
    return key;
  },
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: any) => (
    <a href={JSON.stringify(href)}>{children}</a>
  ),
}));

describe("Pagination Component", () => {
  it("renders correctly for page 1", async () => {
    const Component = await Pagination({ page: 1, totalPages: 5 });
    render(Component);
    expect(screen.getByText("Page 1")).toBeInTheDocument();
    expect(screen.getByText("previous")).toBeDisabled();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });
});
