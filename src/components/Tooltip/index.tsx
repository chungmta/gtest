import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  isShow?: boolean;
  verticalOffset?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  isShow = false,
  verticalOffset = 30,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible && triggerRef.current && isShow) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - verticalOffset, // Position tooltip above the button
        left: rect.left + rect.width / 2, // center horizontally
      });
    }
  }, [isVisible, isShow, verticalOffset]);

  if (!isShow) return children;

  const tooltipElement = (
    <div
      className="fixed z-50 px-2 py-1 bg-[#3b3b3b] text-xs rounded shadow-lg whitespace-nowrap pointer-events-none font-inter text-[#F9f9f9]"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        transform: "translateX(-50%)",
      }}
    >
      {content}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#3b3b3b]"></div>
    </div>
  );

  return (
    <>
      <div className="relative inline-block">
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
      </div>
      {isVisible && ReactDOM.createPortal(tooltipElement, document.body)}
    </>
  );
};

export default Tooltip;
