import { useCartContext } from '../context/useCartContext';

export default function CartBadge() {
  const { totalCount } = useCartContext();
  const label = totalCount === 0 ? 'Кошик порожній' : `Кошик, товарів: ${totalCount}`;

  return (
    <p className="app__cart-counter" aria-live="polite" aria-label={label}>
      У кошику: {totalCount} од.
    </p>
  );
}
