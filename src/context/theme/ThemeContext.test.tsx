import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";

const Consumer = () => {
  const ctx = useContext(ThemeContext);
  return <button onClick={ctx?.toggleTheme}>{ctx?.theme}</button>;
};

test("ThemeProvider provides and toggles theme", () => {
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>,
  );

  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(btn.textContent).toBe("dark");
});
