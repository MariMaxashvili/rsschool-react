import { vi, describe, it, expect, beforeEach } from "vitest";
import { searchAction } from "./searchAction";
import { redirect } from "next/navigation";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("searchAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect to the correct URL with search query and page 1", async () => {
    const formData = new FormData();
    formData.append("q", "pikachu");
    formData.append("locale", "en");
    await searchAction(formData);
    expect(redirect).toHaveBeenCalledWith("/en?q=pikachu&page=1");
  });

  it("should default to locale 'en' and empty query if inputs are missing", async () => {
    const formData = new FormData();
    await searchAction(formData);
    expect(redirect).toHaveBeenCalledWith("/en?page=1");
  });
});
