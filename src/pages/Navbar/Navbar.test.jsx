import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from ".";
import styles from "./Navbar.module.css";
import userEvent from "@testing-library/user-event";

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

describe("Navbar mobile screen", () => {
  it("hides menu by default", () => {
    renderNavbar();
    expect(screen.getByRole("list")).not.toHaveClass(styles.open);
  });

  it("toggles the menu", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    // Open menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("list")).toHaveClass(styles.open);

    // Closes menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("list")).not.toHaveClass(styles.open);
  });

  it("closes the menu when a link is clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    const productsLink = screen.getByRole("link", { name: /products/i });

    // Open menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("list")).toHaveClass(styles.open);

    await user.click(productsLink);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("list")).not.toHaveClass(styles.open);
  });
});
