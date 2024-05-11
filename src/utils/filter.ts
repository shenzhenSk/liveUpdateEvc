//price
export const formatPrice = (price: string | number | undefined | null) => {
  return price?.toString?.().replace('.', ',') || 'N/A';
};
