import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { PokemonDetailsPanel } from "./components/PokemonDetails/PokemonDetailsPanel";
import { About } from "./components/About/About";
import { NotFound } from "./components/NotFound/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(import.meta.env.VITE_CACHE_TTL ?? 5 * 60 * 1000),
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "pokemon/:id",
        element: <PokemonDetailsPanel />,
      },
    ],
  },
  {
    path: "/about",
    element: (
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
