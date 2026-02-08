import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from ".";

const renderNavbar = (route = "/") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar", () => {
  it("renders title", () => {
    renderNavbar();
    expect(screen.getByRole("heading", { name: /linen/i })).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderNavbar();
    const homeLink = screen.getByRole("link", { name: /home/i });
    const productsLink = screen.getByRole("link", { name: /products/i });
    const cartLink = screen.getByRole("link", { name: /cart/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(productsLink).toHaveAttribute("href", "/products");
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("highlights the active link", () => {
    renderNavbar("/products");
    const productsLink = screen.getByRole("link", { name: /products/i });

    expect(productsLink).toHaveAttribute("aria-current", "page");
  });
});
