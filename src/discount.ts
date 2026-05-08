/**
 * Customer loyalty tier classifications.
 *
 * Each tier represents a different level of customer engagement
 * and grants different discount percentages on the final price.
 */
export type CustomerTier = "bronze" | "silver" | "gold";

/**
 * Apply tier-based discount to a price.
 *
 * @param amount        - The original price before discount (must be non-negative)
 * @param customerTier  - The customer's loyalty tier
 * @returns               The price after applying the tier-appropriate discount
 */
export const priceAfterDiscount = (
  amount: number,
  customerTier: CustomerTier,
): number => {
  if (amount < 0) {
    return 0;
  }

  let multiplier: number;

  if (customerTier === "bronze") {
    multiplier = 0.95;
  } else if (customerTier === "silver") {
    multiplier = 0.8;
  } else {
    multiplier = 0.75;
  }

  return amount * multiplier;
};

export type Tier = CustomerTier;
