import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Products from ".";
import useFetch from "../../hooks/useFetch";

// Mocks
vi.mock("../../hooks/useFetch", () => ({
  default: vi.fn(),
}));

vi.mock("./ProductItem", () => ({
  default: ({ product }) => <div data-testid="product-item">{product.title}</div>,
}));
vi.mock("./ProductItem/ProductItemSkeleton", () => ({
  default: () => <div data-testid="skeleton" />,
}));

describe("Products Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows 15 skeletons while loading", () => {
    // Mock loading state
    vi.mocked(useFetch).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Products />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(15);
  });

  it("renders a list of products when data is fetched", () => {
    const mockProducts = [
      { id: 1, title: "foo" },
      { id: 2, title: "bar" },
    ];

    vi.mocked(useFetch).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<Products />);

    const productItems = screen.getAllByTestId("product-item");
    expect(productItems).toHaveLength(2);
    expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument();
  });

  it("throws an error when the fetch fails", () => {
    const errorMessage = "Failed to fetch products";

    vi.mocked(useFetch).mockReturnValue({
      data: null,
      isLoading: false,
      error: errorMessage,
    });

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Products />)).toThrow(errorMessage);

    spy.mockRestore();
  });
});
