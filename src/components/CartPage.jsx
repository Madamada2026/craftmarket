import PropTypes from 'prop-types';
import CartItem from './CartItem.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export default function CartPage({ cart }) {
  const {
    items,
    totalCount,
    totalPrice,
    isEmpty,
    updateQuantity,
    removeItem,
    clearCart,
  } = cart;

  if (isEmpty) {
    return (
      <section className="cart" aria-labelledby="cart-title">
        <h2 id="cart-title" className="cart__title">
          Кошик
        </h2>
        <p className="cart__empty">
          У кошику поки немає товарів. Оберіть щось у каталозі.
        </p>
      </section>
    );
  }

  return (
    <section className="cart" aria-labelledby="cart-title">
      <h2 id="cart-title" className="cart__title">
        Кошик ({totalCount})
      </h2>
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

CartPage.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
  }).isRequired,
};
