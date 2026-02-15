import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRouter from "react-router";
import QuantityInput from ".";

// Mock the context hook
vi.mock("react-router", () => ({
  useOutletContext: vi.fn(),
}));

describe("QuantityInput", () => {
  // The Setup Function
  const setup = (cartState = {}) => {
    const user = userEvent.setup();
    const mockDispatch = vi.fn();

    reactRouter.useOutletContext.mockReturnValue({
      cart: cartState,
      dispatch: mockDispatch,
    });

    render(<QuantityInput productId="p1" />);

    return { user, mockDispatch };
  };

  it("renders 'Add to Cart' button when product is not in cart", () => {
    setup({}); // Empty cart
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders counter controls when product is in cart", () => {
    setup({ p1: 1 }); // Product p1 is in cart
    expect(screen.getByRole("button", { name: /decrement quantity/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /increment quantity/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove from cart/i })).toBeInTheDocument();
  });

  it("dispatches 'added_to_cart' when Add button is clicked", async () => {
    const { user, mockDispatch } = setup({});
    const addButton = screen.getByRole("button", { name: /add to cart/i });

    await user.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "added_to_cart",
      productId: "p1",
    });
  });

  it("dispatches 'incremented_count' when + is clicked", async () => {
    const { user, mockDispatch } = setup({ p1: 1 });
    const plusButton = screen.getByRole("button", { name: /increment quantity/i });

    await user.click(plusButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "incremented_count",
      productId: "p1",
    });
  });

  it("dispatches 'decremented_count' when - is clicked", async () => {
    const { user, mockDispatch } = setup({ p1: 1 });
    const minusButton = screen.getByRole("button", { name: /decrement quantity/i });

    await user.click(minusButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "decremented_count",
      productId: "p1",
    });
  });

  it("dispatches 'removed_from_cart' when Delete is clicked", async () => {
    const { user, mockDispatch } = setup({ p1: 1 });
    const deleteButton = screen.getByRole("button", { name: /remove from cart/i });

    await user.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "removed_from_cart",
      productId: "p1",
    });
  });
});
