import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { About } from "./About";

describe("About Component", () => {
  it("renders the about page info and course link", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
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
