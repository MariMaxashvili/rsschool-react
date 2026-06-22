"use client";

import { useEffect } from "react";
import "@/components/ErrorBoundary/ErrorBoundary.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="error-container">
      <h2 className="error-container__header">⚠️ Something went wrong!</h2>
      <button className="error-container__btn" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
