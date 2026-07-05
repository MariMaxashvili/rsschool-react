import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ErrorComponent from "./error";

describe("Error Component", () => {
  it("renders the error message and handles reset", () => {
    const mockReset = vi.fn();
    const mockError = new Error("Test error");
    render(<ErrorComponent error={mockError} reset={mockReset} />);
    expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /Try again/i });
    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
