import { priceAfterDiscount, type CustomerTier } from "./discount.js";

/**
 * A single line item in a shopping cart.
 *
 * Quantity is required and must be a positive integer.
 * Unit price is the price of one unit before any discount is applied.
 */
export type CartLine = {
  sku: string;
  unitPrice: number;
  quantity: number;
};

/**
 * Aggregate summary of a customer's cart.
 *
 * Reports the subtotal (before discount), the discount amount,
 * and the final total payable after applying the tier discount.
 */
export type CartSummary = {
  subtotal: number;
  discountAmount: number;
  total: number;
};

/**
 * Compute the subtotal of a list of cart lines.
 *
 * Sums (unitPrice * quantity) across all lines.
 * Lines with quantity <= 0 are silently skipped.
 */
export const computeSubtotal = (lines: ReadonlyArray<CartLine>): number => {
  let runningSubtotal = 0;

  for (const line of lines) {
    if (line.quantity > 0) {
      runningSubtotal = runningSubtotal + line.unitPrice * line.quantity;
    }
  }

  return runningSubtotal;
};

/**
 * Summarize a cart for a customer at a given loyalty tier.
 *
 * Applies the tier discount to the per-line subtotal and rolls everything
 * up into a single CartSummary record.
 */
export const summarizeCart = (
  lines: ReadonlyArray<CartLine>,
  customerTier: CustomerTier,
): CartSummary => {
  const subtotal = computeSubtotal(lines);
  const total = priceAfterDiscount(subtotal, customerTier);
  const discountAmount = total - subtotal;

  return {
    subtotal,
    discountAmount,
    total,
  };
};
