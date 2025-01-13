export const splitPrice = (price: number) => {
  const parts = price.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  const integerNumber = parseInt(integerPart, 10);
  const decimalNumber = parseInt(decimalPart, 10);

  return { integerNumber, decimalNumber };
};
