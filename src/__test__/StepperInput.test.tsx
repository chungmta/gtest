import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, it, describe, afterEach } from "vitest";
import StepperInput from "../components/StepperInput";

afterEach(cleanup);

describe("StepperInput", () => {
  it("renders with initial value", () => {
    render(<StepperInput initialValue={5} />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("5");
  });

  it("increments value when increment button is clicked", () => {
    render(<StepperInput initialValue={5} />);
    const incrementButton = screen.getByLabelText("Increase value");
    fireEvent.click(incrementButton);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("6");
  });

  it("decrements value when decrement button is clicked", () => {
    render(<StepperInput initialValue={5} />);
    const decrementButton = screen.getByLabelText("Decrease value");
    fireEvent.click(decrementButton);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("4");
  });

  it("respects minimum value constraint for percentage", () => {
    render(<StepperInput initialValue={0} />);
    const decrementButton = screen.getByLabelText("Decrease value");
    fireEvent.click(decrementButton);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("0");
  });

  it("respects maximum value constraint for percentage", () => {
    render(<StepperInput initialValue={100} />);
    const incrementButton = screen.getByLabelText("Increase value");
    fireEvent.click(incrementButton);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("100");
  });

  it("validates input on blur - extracts number", () => {
    render(<StepperInput initialValue={10} />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "15abc" } });
    fireEvent.blur(input);
    expect(input.value).toBe("15");
  });

  it("validates input on blur - handles comma", () => {
    render(<StepperInput initialValue={10} />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12,5" } });
    fireEvent.blur(input);
    expect(input.value).toBe("12.5");
  });

  it("validates input on blur - reverts invalid input", () => {
    render(<StepperInput initialValue={10} />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc123" } });
    fireEvent.blur(input);
    expect(input.value).toBe("10"); // reverts to last valid
  });

  it("validates input on blur - clamps to max for percentage", () => {
    render(<StepperInput initialValue={10} />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.blur(input);
    expect(input.value).toBe("100");
  });

  it("handles disabled state", () => {
    render(<StepperInput initialValue={5} disabled />);
    const incrementButton = screen.getByLabelText("Increase value") as HTMLButtonElement;
    const decrementButton = screen.getByLabelText("Decrease value") as HTMLButtonElement;
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    
    expect(incrementButton.disabled).toBe(true);
    expect(decrementButton.disabled).toBe(true);
    expect(input.disabled).toBe(true);
  });
});
