import React, { useState } from "react";
import { cn } from "../../utils/style";
import UnitSelector from "./Unit";
import ValueStepper from "./ValueStepper";

interface StepperInputProps {
  initialValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const StepperInput: React.FC<StepperInputProps> = ({
  initialValue = 1.0,
  disabled = false,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [unit, setUnit] = useState("%");

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    if (unit === "px" && newUnit === "%" && value > 100) {
      setValue(100);
      if (onChange) {
        onChange(100);
      }
    }
    setUnit(newUnit);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 bg-[#151515] w-full font-inter",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <UnitSelector
        unit={unit}
        onUnitChange={handleUnitChange}
        disabled={disabled}
      />
      <ValueStepper
        value={value}
        onValueChange={handleValueChange}
        unit={unit}
        disabled={disabled}
      />
    </div>
  );
};

export default StepperInput;
