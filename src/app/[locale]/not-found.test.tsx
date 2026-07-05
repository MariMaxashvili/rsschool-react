import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";
import { NextIntlClientProvider } from "next-intl";
import { vi, describe, it, expect } from "vitest";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("NotFound Component", () => {
  it("renders 404 status and return navigation link", () => {
    const messages = {
      NotFoundPage: {
        title: "Page Not Found",
        description: "Oops! The page you are looking for doesn't exist.",
        backHome: "Return to Dashboard",
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NotFound />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Return to Dashboard/i }),
    ).toBeInTheDocument();
  });
});
