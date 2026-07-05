import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";
import { NextIntlClientProvider } from "next-intl";

describe("About Page Route", () => {
  it("renders the about page info and course link", () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <AboutPage />
      </NextIntlClientProvider>,
    );
    screen.debug();
    expect(screen.getByText("About This Application")).toBeInTheDocument();
    expect(screen.getByText("Author Information")).toBeInTheDocument();
    expect(screen.getByText(/Mari Makhashvili/i)).toBeInTheDocument();

    const courseLink = screen.getByRole("link", {
      name: /RS School React Course/i,
    });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      "href",
      "https://rs.school/courses/reactjs",
    );
  });
});
