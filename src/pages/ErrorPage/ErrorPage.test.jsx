import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, useRouteError, isRouteErrorResponse } from "react-router";
import ErrorPage from ".";

// Mock React Router hooks
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
  };
});

describe("ErrorPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders correctly with a standard Route Error (404)", () => {
    // Setup mock values for a 404 response
    const mockError = { status: 404, statusText: "Not Found" };
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go home/i })).toHaveAttribute("href", "/");
  });

  it("renders correctly with a generic Error object", () => {
    // Setup mock values for a generic JS error
    const mockError = new Error("Data fetch failed");
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Data fetch failed")).toBeInTheDocument();
  });

  it("initializes theme from localStorage", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "getItem");
    localStorage.setItem("theme", "dark");

    vi.mocked(useRouteError).mockReturnValue({ message: "Err" });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(setItemSpy).toHaveBeenCalledWith("theme");
  });

  it("displays 'Unknown Error' if no message is provided", () => {
    vi.mocked(useRouteError).mockReturnValue({});
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Unknown Error")).toBeInTheDocument();
  });
});
