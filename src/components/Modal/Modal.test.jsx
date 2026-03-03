import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Modal from ".";
import styles from "./Modal.module.css";

describe("Modal Component", () => {
  const onCloseMock = vi.fn();
  const modalText = "Modal Content";

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it("does not render when isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <div>{modalText}</div>
      </Modal>,
    );

    expect(queryByText(modalText)).not.toBeInTheDocument();
  });

  it("renders children when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>{modalText}</div>
      </Modal>,
    );

    expect(screen.getByText(modalText)).toBeInTheDocument();
  });

  it("is rendered inside document.body (Portal check)", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div data-testid="modal-child">{modalText}</div>
      </Modal>,
    );

    const child = screen.getByTestId("modal-child");
    expect(child.closest("body")).toBe(document.body);
  });

  it("calls onClose when clicking the overlay", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>{modalText}</div>
      </Modal>,
    );

    const overlay = document.querySelector(`.${styles.overlay}`);
    await user.click(overlay);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking the modal content", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <button data-testid="inner-button">Inside</button>
      </Modal>,
    );

    const innerButton = screen.getByTestId("inner-button");
    await user.click(innerButton);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
