import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SiteHeader from "@/components/siteHeader";

vi.mock("@/components/navbar", () => ({
  default: () => <nav data-testid="navbar">Mocked Navbar</nav>,
}));

describe("SiteHeader", () => {
  it("renders the navbar", () => {
    render(<SiteHeader />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <SiteHeader>
        <div data-testid="child">Child Content</div>
      </SiteHeader>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("renders a sticky header element", () => {
    render(<SiteHeader />);
    const header = document.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.className).toContain("sticky");
  });
});
