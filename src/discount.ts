export type Tier = 'bronze' | 'silver' | 'gold';

export function priceAfterDiscount(price: number, tier: Tier): number {
  if (price < 0) return 0;
  switch (tier) {
    case 'bronze': return price * 0.95;
    case 'silver': return price * 0.9;
    case 'gold': return price * 0.75;
  }
}
