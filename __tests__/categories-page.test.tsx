import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoriesPage from "@/app/categories/page";

describe("CategoriesPage", () => {
  it("renders the Categories heading", () => {
    render(<CategoriesPage />);
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("renders 3 placeholder cards", () => {
    render(<CategoriesPage />);
    const cards = screen.getAllByText(/Placeholder \d/);
    // 3 cards * 2 (title + description) = 6
    expect(cards.length).toBe(6);
  });
});
