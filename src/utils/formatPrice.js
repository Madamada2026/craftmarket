const priceFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
});

/** @param {number} value сума в гривнях */
export function formatPrice(value) {
  return priceFormatter.format(value);
}
