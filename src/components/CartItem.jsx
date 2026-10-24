import PropTypes from 'prop-types';
import { formatPrice } from '../utils/formatPrice.js';

const PLACEHOLDER = '/images/placeholder-product.svg';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, title, price, image, quantity } = item;

  return (
    <li className="cart-item">
      <img
        className="cart-item__image"
        src={image || PLACEHOLDER}
        alt=""
        width="64"
        height="64"
      />
      <div className="cart-item__info">
        <p className="cart-item__title">{title}</p>
        <p className="cart-item__unit">
          {formatPrice(price)} × {quantity}
        </p>
      </div>
      <div className="cart-item__controls">
        <button
          type="button"
          onClick={() => onQuantityChange(id, quantity - 1)}
          aria-label={`Зменшити кількість: ${title}`}
        >
          −
        </button>
        <span className="cart-item__qty" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => onQuantityChange(id, quantity + 1)}
          aria-label={`Збільшити кількість: ${title}`}
        >
          +
        </button>
      </div>
      <p className="cart-item__subtotal">{formatPrice(price * quantity)}</p>
      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(id)}
      >
        Видалити
      </button>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
