import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRouter from "react-router";
import NumberInput from "./index";

// Mock the useOutletContext hook
vi.mock("react-router", () => ({
  useOutletContext: vi.fn(),
}));

describe("NumberInput", () => {
  const mockDispatch = vi.fn();
  const mockCart = { 1: 5 };

  beforeEach(() => {
    vi.clearAllMocks();
    // Provide the mock implementation for the context
    reactRouter.useOutletContext.mockReturnValue({
      dispatch: mockDispatch,
      cart: mockCart,
    });
  });

  it("renders with the initial value from context", () => {
    render(<NumberInput productId="1" />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("5");
  });

  it("accepts only numeric input (prevents 'abc')", async () => {
    const user = userEvent.setup();
    render(<NumberInput productId="1" />);
    const input = screen.getByRole("textbox");

    await user.clear(input);
    await user.type(input, "abc123");

    expect(input.value).toBe("123");
  });

  it("dispatches the numeric value on blur", async () => {
    const user = userEvent.setup();
    render(<NumberInput productId="1" />);
    const input = screen.getByRole("textbox");

    await user.clear(input);
    await user.type(input, "10");
    await user.tab(); // Blur

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "set_count",
      count: "10",
      productId: "1",
    });
  });
});
