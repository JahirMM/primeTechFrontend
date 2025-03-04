export const splitPrice = (price: number) => {
  if (isNaN(price) || price < 0) price = 0;

  const [integerPart, decimalPart] = price
    .toFixed(3)
    .split(".")
    .map((part) => part || "000");

  return { integerNumber: integerPart, decimalNumber: decimalPart };
};
