import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

describe("AboutPage", () => {
  it("renders the About heading", () => {
    render(<AboutPage />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders the welcome message", () => {
    render(<AboutPage />);
    expect(screen.getByText("Welcome to Rimaki's Projects.")).toBeInTheDocument();
  });
});
