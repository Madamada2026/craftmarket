import { ShoppingBag } from 'lucide-react';
import { useCartContext } from '../context/useCartContext';

export default function CartBadge() {
  const { totalCount } = useCartContext();

  return (
    <span className="relative inline-flex items-center gap-2">
      <ShoppingBag aria-hidden="true" className="h-6 w-6 text-ink-900" />

      {totalCount > 0 && (
        <span
          key={totalCount}
          aria-hidden="true"
          className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center
                     rounded-full bg-brand-600 px-1 text-xs font-semibold text-white
                     animate-badge-pop"
        >
          {totalCount}
        </span>
      )}

      <span role="status" className="sr-only">
        Кошик, товарів: {totalCount}
      </span>
    </span>
  );
}
