// Shared constants
export const MIN_VALUE = 0;
export const PERCENTAGE_MAX = 100;

// Helper function to extract the first valid number from a string
export const extractNumber = (input: string): number | null => {
  const processed = input.replace(/,/g, ".");
  const match = processed.match(/^(-?\d+(\.\d+)?|-?\. \d+|-?\d+|\d+)/);
  if (match) {
    const num = parseFloat(match[0]);
    return isNaN(num) ? null : num;
  }
  return null;
};

// Helper function to clamp value based on unit
export const clampValue = (val: number, unit: string): number => {
  let clamped = Math.max(MIN_VALUE, val);
  if (unit === "%") {
    clamped = Math.min(PERCENTAGE_MAX, clamped);
  } else {
    clamped = Math.min(Number.MAX_SAFE_INTEGER, clamped);
  }
  return clamped;
};
