import CartItem from './CartItem.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { useCartStore } from '../store/cartStore';
import {
  selectItems,
  selectTotalCount,
  selectTotalPrice,
} from '../store/cartSelectors';

export default function CartPage() {
  console.count('render: CartPage'); // <-- ДОДАНО

  const items = useCartStore(selectItems);
  const totalCount = useCartStore(selectTotalCount);
  const totalPrice = useCartStore(selectTotalPrice);

  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <section className="cart" aria-labelledby="cart-title">
        <h2 id="cart-title" className="cart__title">Кошик</h2>
        <p className="cart__empty">У кошику поки немає товарів. Оберіть щось у каталозі.</p>
      </section>
    );
  }

  return (
    <section className="cart" aria-labelledby="cart-title">
      <h2 id="cart-title" className="cart__title">Кошик ({totalCount})</h2>
      
      <ul className="cart__list">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>

      <div className="cart__summary">
        <p>
          Разом: <strong>{formatPrice(totalPrice)}</strong>
        </p>
        <button type="button" className="cart__clear" onClick={clearCart}>
          Очистити кошик
        </button>
      </div>
    </section>
  );
}