import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  it("manages loading and success states", async () => {
    const mockData = { name: "Pikachu" };
    const mockFn = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetch(mockFn, []));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("handles error state", async () => {
    const errorMsg = "API Error";
    const mockFn = vi.fn().mockRejectedValue(new Error(errorMsg));

    const { result } = renderHook(() => useFetch(mockFn, []));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(errorMsg);
  });

  it("aborts the request on unmount", () => {
    const abortSpy = vi.fn();
    vi.stubGlobal(
      "AbortController",
      vi.fn(() => ({
        signal: {},
        abort: abortSpy,
      })),
    );

    const { unmount } = renderHook(() => useFetch(vi.fn(), []));
    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});
