import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import ProductItem from ".";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";

const mockProduct = {
  id: 3,
  title: "Mens Cotton Jacket",
  price: 55.99,
  image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
  rating: {
    rate: 4.7,
    count: 500,
  },
};

const renderWithContext = (cart = [], dispatch = vi.fn()) => {
  const mockContext = { cart, dispatch };
  return render(
    <MemoryRouter>
      <Routes>
        <Route element={<Outlet context={mockContext} />}>
          <Route path="/" element={<ProductItem product={mockProduct} />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe("ProductItem", () => {
  it("renders product image and title", () => {
    renderWithContext();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute("src", mockProduct.image);
  });

  it("formats the price correctly using the Vedic system", () => {
    renderWithContext();
    expect(screen.getByText(/₹.*5,599/)).toBeInTheDocument();
  });

  it("renders review count", () => {
    renderWithContext();
    expect(screen.getByText(`(${mockProduct.rating.count})`)).toBeInTheDocument();
  });

  it("renders add to cart button when product is not in cart", () => {
    renderWithContext();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("renders counter controls (decrement, NumberInput, increment, delete) when product is in cart", () => {
    const activeCart = { 3: 5 };
    renderWithContext(activeCart);

    expect(screen.getByRole("button", { name: /decrement quantity/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /increment quantity/i })).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("5");

    expect(screen.getByRole("button", { name: /remove from cart/i })).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /add to cart/i })).not.toBeInTheDocument();
  });

  it("dispatches added_to_cart when add to cart button is clicked", async () => {
    const mockDispatch = vi.fn();
    const user = userEvent.setup();

    renderWithContext({}, mockDispatch);

    const addToCart = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addToCart);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "added_to_cart",
      productId: mockProduct.id,
    });
  });

  it("dispatches incremented_count when + button is clicked", async () => {
    const mockDispatch = vi.fn();
    const user = userEvent.setup();

    renderWithContext({ 3: 5 }, mockDispatch);

    const plusButton = screen.getByRole("button", { name: /increment quantity/i });
    await user.click(plusButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "incremented_count",
      productId: mockProduct.id,
    });
  });
});
