import React, { useState, useEffect } from "react";
import { cn } from "../../utils/style";
import { extractNumber, clampValue } from "./valueUtils";
import Tooltip from "../Tooltip";

// Constants
const PERCENTAGE_MAX = 100;
const MIN_VALUE = 0;

interface ValueStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  unit?: string;
  disabled?: boolean;
}

const ValueStepper: React.FC<ValueStepperProps> = ({
  value,
  onValueChange,
  unit = "",
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const [lastValidValue, setLastValidValue] = useState(value);

  useEffect(() => {
    setInputValue(value.toString());
    setLastValidValue(value);
  }, [value]);

  const maxValue = unit === "%" ? PERCENTAGE_MAX : Number.MAX_SAFE_INTEGER;

  const handleIncrement = () => {
    if (disabled) return;
    const newValue = clampValue(value + 1, unit);
    onValueChange(newValue);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const newValue = Math.max(MIN_VALUE, value - 1);
    onValueChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    const extractedNumber = extractNumber(inputValue);

    let finalValue;
    if (extractedNumber !== null) {
      finalValue = clampValue(extractedNumber, unit);
    } else {
      finalValue = lastValidValue;
    }

    onValueChange(finalValue);
    setInputValue(finalValue.toString());
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setInputValue(value.toString());
  };

  const isIncrementDisabled = disabled || value >= maxValue;
  const isDecrementDisabled = disabled || value <= MIN_VALUE;

  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-[#AAAAAA]">Value</label>

      <div
        className={cn(
          "w-[140px] h-[36px] flex items-center rounded-lg overflow-hidden",
          isHovered ? "bg-[#3b3b3b]" : "bg-[#212121]",
          isFocused ? "outline outline-[#3C67FF]" : ""
        )}
      >
        <Tooltip
          content="Value must be greater than 0"
          isShow={isDecrementDisabled}
        >
          <button
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
            aria-label="Decrease value"
            className="w-[36px] min-w-[36px] h-[36px] flex justify-center items-center text-lg border-none bg-transparent text-[#F9F9F9] cursor-pointer disabled:text-[#AAA] disabled:hover:bg-transparent hover:bg-[#3b3b3b]"
          >
            −
          </button>
        </Tooltip>
        <input
          role="spinbutton"
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="size-full text-center bg-transparent border-none text-[#F9F9F9] text-sm focus:outline-none"
        />
        <Tooltip
          content="Value must be smaller than 100"
          isShow={unit === "%" && isIncrementDisabled}
        >
          <button
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
            aria-label="Increase value"
            className="w-[36px] min-w-[36px] h-[36px] flex justify-center items-center text-lg border-none bg-transparent text-[#F9F9F9] cursor-pointer disabled:text-[#AAA] disabled:hover:bg-transparent hover:bg-[#3b3b3b]"
          >
            +
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ValueStepper;
