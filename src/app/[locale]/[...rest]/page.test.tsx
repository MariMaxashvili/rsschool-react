import { describe, it, expect, vi } from "vitest";
import CatchAllUnknownRoutes from "./page";
import { notFound } from "next/navigation";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("CatchAllUnknownRoutes", () => {
  it("calls notFound when rendered", () => {
    CatchAllUnknownRoutes();
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
