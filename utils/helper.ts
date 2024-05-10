const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatCurrency = (number: number): string => {
  return USDollar.format(+number);
};

const calculateDiscountedPrice = (originalPrice: number, maxDiscount: number = 50) => {
  if (maxDiscount <= 0 || maxDiscount > 100) {
    maxDiscount = 50;
  }

  const discountPercentage = +(Math.random() * maxDiscount).toFixed(0);
  const discount = originalPrice * (discountPercentage / 100);
  const discountedPrice = originalPrice - discount;

  return {
    discountPercentage: discountPercentage,
    discountedPrice: discountedPrice,
  };
};

export { formatCurrency, calculateDiscountedPrice };
