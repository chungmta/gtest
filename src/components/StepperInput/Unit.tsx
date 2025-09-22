import React from "react";
import { cn } from "../../utils/style";

interface UnitSelectorProps {
  unit: string;
  onUnitChange: (unit: string) => void;
  disabled?: boolean;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  unit,
  onUnitChange,
  disabled = false,
}) => {
  return (
    <div className="flex justify-between items-center ">
      <label className="text-sm font-medium text-[#AAAAAA]">Unit</label>
      <div className="flex items-center gap-[2px] bg-[#212121] rounded-lg p-[2px]">
        <button
          className={cn(
            "w-[67px] h-[32px] text-sm border-none bg-transparent text-[#AAAAAA] cursor-pointer rounded-l-md",
            unit === "%" && "bg-[#424242] text-[#F9F9F9]"
          )}
          onClick={() => onUnitChange("%")}
          disabled={disabled}
        >
          %
        </button>
        <button
          className={cn(
            "w-[67px] h-[32px] text-sm border-none bg-transparent text-[#AAAAAA] cursor-pointer rounded-r-md",
            unit === "px" && "bg-[#424242] text-[#F9F9F9]"
          )}
          onClick={() => onUnitChange("px")}
          disabled={disabled}
        >
          px
        </button>
      </div>
    </div>
  );
};

export default UnitSelector;
