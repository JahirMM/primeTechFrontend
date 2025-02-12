export const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ) => {
    if (
      isNaN(originalPrice) ||
      isNaN(discountPercentage) ||
      originalPrice < 0 ||
      discountPercentage < 0
    ) {
      return originalPrice;
    }
  
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;
  
    return isNaN(finalPrice) || finalPrice < 0 ? originalPrice : finalPrice;
  };
  