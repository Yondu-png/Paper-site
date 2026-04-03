import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders course navigation, main landmark, and skip link", () => {
    render(
      <MemoryRouter initialEntries={["/course/abstract"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /skip to main content/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /course sections/i })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
