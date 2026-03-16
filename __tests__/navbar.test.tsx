import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar, { navItems } from "@/components/navbar";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("navItems", () => {
  it("contains Home, Projects, and About", () => {
    const names = navItems.map((item) => item.name);
    expect(names).toEqual(["Home", "Projects", "About"]);
  });

  it("has correct hrefs", () => {
    expect(navItems[0].href).toBe("/");
    expect(navItems[1].href).toBe("/categories");
    expect(navItems[2].href).toBe("/about");
  });
});

describe("Navbar", () => {
  it("renders the site title", () => {
    render(<Navbar />);
    const titles = screen.getAllByText("Rimaki's Projects");
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all nav items in desktop menu", () => {
    render(<Navbar />);
    for (const item of navItems) {
      const links = screen.getAllByText(item.name);
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders Status button", () => {
    render(<Navbar />);
    const buttons = screen.getAllByText("Status");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("toggles mobile menu on hamburger click", () => {
    render(<Navbar />);
    const hamburger = document.querySelector("nav > div > button") as HTMLElement;
    expect(hamburger).not.toBeNull();

    // Mobile menu should start closed (translated off-screen)
    const mobileMenu = document.querySelector(".fixed.top-0.left-0.h-full.w-64");
    expect(mobileMenu?.className).toContain("-translate-x-full");

    fireEvent.click(hamburger);

    expect(mobileMenu?.className).toContain("translate-x-0");
  });

  it("opens status page on Status button click", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<Navbar />);

    const statusButtons = screen.getAllByText("Status");
    fireEvent.click(statusButtons[0]);

    expect(openSpy).toHaveBeenCalledWith(
      "https://status.rimaki.net/status/rimakisystem",
      "_blank"
    );
    openSpy.mockRestore();
  });
});
