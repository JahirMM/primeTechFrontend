export const validateNonNegativeNumber = (value: string): string => {
  if (value.includes("e") || value.includes("E")) {
    return value.replace(/e|E/g, "");
  }

  const numericValue = value.replace(/[^0-9.]/g, "");

  const numberValue = Number(numericValue);
  return numberValue < 0 || isNaN(numberValue) ? "0" : numericValue;
};
